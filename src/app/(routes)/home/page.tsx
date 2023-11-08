"use client"

import axios from "axios";
import CreatePost from "./_components/CreatePost";
import { useEffect, useState } from "react";
import PostCard from "./_components/PostCard";



async function fetchPosts(page: number) {
  const perPage = 20;
  const apiUrl = `/api/post/list?page=${page}`;
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

  const loadMorePosts = async () => {
    const postList = (await fetchPosts(1)) ?? [];
    setPosts(postList.data)
  };


  useEffect(() => {
    loadMorePosts()
  }, [])

  // setBeers((prevProducts: Beer[]) => [...prevProducts, ...newProducts]);
  return (
    <div className="w-full">

      <CreatePost placeholder="" />
      {
        posts.length > 0 && posts.map((post: any) => {
          return <PostCard key={Math.random()} post={post} />
        })
      }
    </div>

  );
}

export default Home;