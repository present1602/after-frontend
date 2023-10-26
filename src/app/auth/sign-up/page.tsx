// import AccountProfile from '@/components/forms/AccountProfile'
import AccountProfile from '@/components/forms/AccountProfile'
import Image from 'next/image'
import SignupForm from './_components/SignupForm'
import { useRouter } from 'next/navigation'

const userInfo = {
  name: "cy",
  profile_photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRny6M7SVLugIiTJGIYPcr744JSqVf5oPe1Vg&usqp=CAU",
  bio: "cy intro",
}
const userData = {
  id: "12341234",
  name: userInfo ? userInfo?.name : "",
  profile_photo: "",
  // profile_photo: userInfo ? userInfo?.profile_photo : "",
  bio: userInfo ? userInfo?.bio : "",
}

export default function Page() {
  const router = useRouter()

  return (
    <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
      <h1 className='head-text'>회원가입</h1>
      <p className='mt-3 text-base-regular text-light-2'>
        회원가입 정보를 입력해주세요
      </p>

      <section className='mt-9 bg-dark-2 p-10'>
        <SignupForm />
      </section>

      <p className='text-white p-2'>
        이미 회원이신가요?
        <span
          className='text-blue px-2 cursor-pointer'
          onClick={() => { router.push('/auth/sign-in') }}>회원가입</span>
      </p>

    </main>

  )
}

