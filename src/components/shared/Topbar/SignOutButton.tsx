"use client"

import { signOut } from "next-auth/react";
import Image from "next/image";

const SignOutButton = () => {
  return (
    <div className=''>
      <div className='flex cursor-pointer' onClick={() => signOut()}>
        <Image
          src='/assets/logout.svg'
          alt='logout'
          width={24}
          height={24}
        />
        <p className="text-white text-small-regular px-1">
          로그아웃
        </p>
      </div>
    </div>
  );
}

export default SignOutButton;