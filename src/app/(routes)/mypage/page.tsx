"use client"

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

const MyPage = () => {
  const { data: session } = useSession()

  return (
    <div className="bg-blue">
      mypage
      <h2>{session?.user.nickname}</h2>
    </div>
  );
}

export default MyPage;