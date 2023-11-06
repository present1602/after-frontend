import { Button, Textarea } from "@/components/ui";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useCallback, useState } from "react";

interface Props {
  placeholder: string;
}

const usrSrc = "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"

const CreatePost: React.FC<Props> = ({
  placeholder
}) => {
  const { data: session } = useSession()

  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const onSubmit = async () => {
    debugger
    try {
      setIsLoading(true)
      await axios.post('/api/post/create', {
        content: content,
        userId: Number(session?.user.id)
      })
      // const res = await fetch(
      //   '/api/post/create', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     content: content,
      //     userId: 3,
      //   })
      // }
      // )
      // setContent('')
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="border-b-[1px] border-gray-500 py-2">
      <div className="flex flex-row gap-4">
        <div
          className="h-14 w-14 rounded-full cursor-pointer relative"
        >
          <Image
            fill
            style={{
              objectFit: 'cover',
              borderRadius: '100%'
            }}
            alt="Avatar"
            src={usrSrc}
          />
        </div>

        <div className="w-full flex flex-col">
          <textarea
            onChange={(event) => setContent(event.target.value)}
            value={content}
            className="
                disabled:opacity-80
                resize-none 
                mt-3 
                w-full 
                bg-black 
                ring-0 
                outline-none 
                text-[20px] 
                placeholder-gray-500 
                text-white
              "
            placeholder="질문, 팁, 정보, 피드 등 콘텐츠를 자유롭게 올려주세요">
          </textarea>
          <div className="mt-4 flex flex-row">
            <div className="flex flex-1 gap-5">
              <img alt="add-image" src="/assets/icons/file-upload.svg" width={40} height={40} />
              <img alt="add-video" src="/assets/icons/file-upload.svg" width={40} height={40} />
            </div>
            <Button onClick={onSubmit}
              className="bg-primary-500"
            >포스팅</Button>
          </div>
        </div>
      </div>
    </div >
    // <div className="flex flex-col">
    //   <div className="flex flex-row">
    //     <div>
    //       <Image
    //         src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
    //         alt="profile img"
    //         width={100}
    //         height={40}
    //         objectFit="contain"
    //       />
    //     </div>
    //     <div>
    //       <Textarea />
    //     </div>
    //   </div>

    //   <div className="flex flex-row">
    //     <div>
    //       img icon
    //     </div>
    //     <div>
    //       button area
    //     </div>
    //   </div>
    // </div>
  )

    ;
}

export default CreatePost;