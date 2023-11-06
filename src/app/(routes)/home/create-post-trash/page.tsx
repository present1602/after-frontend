"use client"
import { useSession } from "next-auth/react";
import PostForm from "./_components/CreatePostForm";

const Page = () => {
  // if (!session?.user) {
  //   alert("로그인이 필요합니다.")
  //   return;
  // }
  const { data: session } = useSession()

  return (<div className="flex flex-1">
    <div className="common-container">
      <div className="max-w-5xl w-full flex flex-row gap-4">
        <img
          src="/assets/icons/add-post.svg"
          width={36}
          height={36}
          alt="add"
        />
        <h2 className="h2-semibold md:h3-semibold text-left w-full text-white">포스팅</h2>
      </div>
      <PostForm userId={session?.user.id} action="create" />
    </div>
  </div>)

}

export default Page;