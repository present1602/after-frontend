import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import SignOutButton from "./SignOutButton";
import SignInButton from "./SignInButton";

async function Topbar() {
  const session = await getServerSession()

  return (
    <nav className='topbar'>
      <Link href='/' className='flex items-center gap-4'>
        <Image src='/logo.svg' alt='logo' width={28} height={28} />
        <p className='text-heading3-bold text-light-1 max-xs:hidden'>Threads</p>
      </Link>

      <div className='flex items-center gap-1'>
        {
          session?.user ?
            <SignOutButton />
            :
            <SignInButton />
        }
        {/* <div className='block md:hidden'> */}
        {/* <div className=''>
          <div className='flex cursor-pointer' onClick={() => signOut()}>
            <Image
              src='/assets/logout.svg'
              alt='logout'
              width={24}
              height={24}
            />
          </div>
        </div> */}

      </div>
    </nav>
  );
}

export default Topbar;
