"use client"

import axios from "axios";
import CreatePost from "./_components/CreatePost";
import { useEffect, useState } from "react";
import PostCard from "./_components/post/PostCard";
import LayerBackground from "@/components/shared/LayerBackground";
import ReplyContentContainer from "./_components/reply/ContentContainer";
import InfiniteScroll from "react-infinite-scroll-component";
import { useQuery, useQueryClient } from "@tanstack/react-query"

async function fetchPosts(page: number) {
  const apiUrl = `/api/post/list?_page=${page}`;
  try {
    const response = await axios.get(apiUrl);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}


const Home = () => {

  const [posts, setPosts] = useState<any[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const queryClient = useQueryClient()

  const loadMorePosts = async () => {
    const postList = (await fetchPosts(currentPage)) ?? [];
    return postList.data
  };

  const { data, isLoading, isError } = useQuery(
    {
      queryKey: ['posts', currentPage],
      queryFn: loadMorePosts
    }
  )

  const initPosts = async () => {
    const postList = await fetchPosts(1)
    setPosts(postList.data)
  }

  useEffect(() => {
    initPosts()
  }, [])

  useEffect(() => {
    if (!isLoading && data && data.length > 0) {
      setPosts([...posts, ...data])
      if (data.length < 6) {
        setHasMore(false)
      }
    }
  }, [data, isLoading])

  function handleLoad() {
    setCurrentPage(currentPage + 1)
  }

  return (
    <div className="w-full">

      <CreatePost placeholder="" initPosts={() => initPosts()} />
      <InfiniteScroll
        dataLength={posts.length}
        next={handleLoad}
        hasMore={hasMore}
        loader={<h4 className="text-white py-3 text-center">Loading...</h4>}
        endMessage={<h4 className="text-white py-3 text-center">마지막 포스트입니다.</h4>}
      >
        {
          posts.length > 0 && posts.map((post: any) => {
            return <PostCard key={Math.random()} post={post} />
          })
        }
      </InfiniteScroll>
    </div>
  );
}

{/* <LayerBackground>
  <ReplyContentContainer postId={3}/>
  <h1>in layer</h1>
</LayerBackground> */}
export default Home;