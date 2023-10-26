import { signOut } from "next-auth/react";
import Image from "next/image";

const SignOutButton = () => {

  return (
    <div className='flex gap-4 p-4 cursor-pointer'
      onClick={() => signOut()}
    >
      <Image
        src='/assets/logout.svg'
        alt='logout'
        width={24}
        height={24}
      />
      <p className='text-light-2 max-lg:hidden'>Logout</p>
    </div>
  );
}

export default SignOutButton;