import { getServerSession } from "next-auth";

async function Page() {
  const session = await getServerSession()

  console.log("session user")
  console.log(session?.user)
  // if (!session?.user) {
  //   alert("로그인이 필요합니다.")
  //   return;
  // }
  return <h1 className="head-text">포스팅
    <pre>{JSON.stringify(session)}</pre>
  </h1>
}

export default Page;