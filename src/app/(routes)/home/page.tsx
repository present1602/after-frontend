"use client"

import axios from "axios";
import CreatePost from "./_components/CreatePost";
import { useEffect, useState } from "react";
import PostCard from "./_components/post/PostCard";
import LayerBackground from "@/components/shared/LayerBackground";
import ReplyContentContainer from "./_components/reply/ContentContainer";
import InfiniteScroll from 'react-infinite-scroll-component';


async function fetchPosts(start: number) {
  const perPage = 20;
  const apiUrl = `/api/post/list?_start=${start}`;
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

  const loadMorePosts = async () => {
    const postList = (await fetchPosts(posts.length)) ?? [];

    setPosts([...posts, ...postList.data])
    if (postList.data.length < 3) {
      setHasMore(false)
    }
  };

  const initPosts = async () => {
    const postList = await fetchPosts(0)
    setPosts(postList.data)
  }
  useEffect(() => {
    loadMorePosts()
  }, [])

  return (
    <div className="w-full">

      <CreatePost placeholder="" initPosts={() => initPosts()} />
      <InfiniteScroll
        dataLength={posts.length}
        next={loadMorePosts}
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