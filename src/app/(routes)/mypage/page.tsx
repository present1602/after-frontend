import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const MyPage = async () => {
  const session = await getServerSession(authOptions)
  console.log("session:")
  console.log(session)
  return (
    <div>mypage </div>
  );
}

export default MyPage;