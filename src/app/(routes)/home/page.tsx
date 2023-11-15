"use client"

import LayerBackground from "@/components/shared/LayerBackground";
import ReplyContentContainer from "./_components/reply/ContentContainer";
import axios from "axios";
import CreatePost from "./_components/CreatePost";
import { useEffect, useState } from "react";
import PostCard from "./_components/post/PostCard";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"

async function fetchPosts({ pageParam = 1 }: { pageParam: number }) {
  const apiUrl = `/api/post/list?_page=${pageParam}`;
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

  const loadMorePosts = async () => {
    const postList = (await fetchPosts({ pageParam: currentPage })) ?? [];
    return postList.data
  };

  // const { data, isLoading, isError } = useQuery(
  //   {
  //     queryKey: ['posts', currentPage],
  //     queryFn: async () => {
  //       if (currentPage !== 1) {
  //         return await loadMorePosts();
  //       }
  //       return null;
  //     }
  //   }
  // )
  async function fetchPage(page: any) {
    // const response: any = await fetch(`/api/post/list?_page=${page}`)
    // return response.data
    const apiUrl = `/api/post/list?_page=${page}`;

    try {
      // const response = await axios.get(apiUrl);
      const response = await fetch(apiUrl);
      console.log("fetch res : ", response)
      return response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }

  }

  interface IPost {
    content: string,
    created_at: string,
  }
  interface IResponse {
    list: any[],
    page: number,
    total_page: number
  }

  const { data, fetchNextPage, hasNextPage, isError, error } = useInfiniteQuery<IResponse>(
    {
      queryKey: ['posts'],
      queryFn: ({ pageParam }) => fetchPage(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPosts) => {
        return lastPage.page !== lastPage.total_page ? lastPage.page + 1 : undefined;
      }
    }
  )


  if (isError) {
    return (
      <div className="w-full">
        <div className="text-center max-w-2xl h3-semibold text-white">
          콘텐츠를 가져오는 도중 에러가 발생했습니다.
        </div>
        <p className="text-center max-w-2xl text-white">
          {error.toString()}
        </p>
      </div>
    )
  }

  function initPosts() {

  }

  return (
    <div className="w-full">

      <CreatePost placeholder="" initPosts={() => initPosts()} />
      <InfiniteScroll
        pageStart={0}
        loadMore={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
        {
          data ? data.pages.map((pageData) => {
            return pageData.list.map((post) => {
              return (
                <PostCard key={Math.random()} post={post} />)
            })
          })
            : <></>
        }
      </InfiniteScroll>
    </div>
  );
}

export default Home;
{/* <LayerBackground>
  <ReplyContentContainer postId={3}/>
  <h1>in layer</h1>
</LayerBackground> */}