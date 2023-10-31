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


  return (
    <div>
      <h1 className="head-text">Create Post</h1>
      {session?.user.id
        ? <CreatePostForm userId={session?.user.id} />
        : null
      }
    </div>
  )
}

export default Page;

