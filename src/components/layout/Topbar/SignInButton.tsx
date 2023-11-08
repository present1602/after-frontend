"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SignInButton = () => {
  const router = useRouter()
  return (
    <div className=''>
      <Button onClick={() => router.push('/auth/sign-in')}>
        로그인
      </Button>
    </div>
  );
}

export default SignInButton;