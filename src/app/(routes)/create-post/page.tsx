"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CreatePostForm from "./_components/CreatePost";
import { useEffect } from "react";



const Page = () => {
  const router = useRouter()
  const { data: session } = useSession()
  useEffect(() => {

  }, [])

  return (<div>aaaa</div>)
}

export default Page;

