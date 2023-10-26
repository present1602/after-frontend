import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const MyPage = async () => {
  return (
    <div className="bg-blue">
      mypage
    </div>
  );
}

export default MyPage;