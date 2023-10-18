// import AccountProfile from '@/components/forms/AccountProfile'
import Image from 'next/image'

const userInfo = {
  name: "cy",
  profile_photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRny6M7SVLugIiTJGIYPcr744JSqVf5oPe1Vg&usqp=CAU",
  bio: "cy intro",
}
const userData = {
  id: "12341234",
  name: userInfo ? userInfo?.name : "",
  profile_photo: userInfo ? userInfo?.profile_photo : "",
  bio: userInfo ? userInfo?.bio : "",
}

export default function Page() {
  return (
    <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
      <h1 className='head-text'>Onboarding</h1>
      <p className='mt-3 text-base-regular text-light-2'>
        Complete your profile now, to use Threds.
      </p>

      <section className='mt-9 bg-dark-2 p-10'>
        {/* <AccountProfile user={userData} /> */}
      </section>
    </main>
  )
}

