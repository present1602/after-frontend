"use client"

import { Button, Textarea } from "@/components/ui";
import { defaultProfileImageUrl } from "@/constants";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import AWS from "aws-sdk"

interface Props {
  placeholder: string;
}

interface remoteFile {
  filename: string,
  url: string,
  ord: number,
}

async function uploadFile(file: File): Promise<void> {
  const S3_BUCKET = process.env.NEXT_PUBLIC_AWS_S3_BUCKET;
  const REGION = process.env.NEXT_PUBLIC_AWS_S3_REGION;

  AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  });
  const s3 = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const params: any = {
    Bucket: S3_BUCKET,
    Key: `${Math.random() + file.name}`,
    Body: file,
  };

  try {
    const upload: any = s3.putObject(params);

    upload.on("httpUploadProgress", (evt: any) => {
      console.log(
        `Uploading ${(evt.loaded * 100) / evt.total}%`
      );
    });

    await upload.promise();
    console.log("File uploaded successfully.");
  } catch (err) {
    console.error(err);
  }

  // var upload = s3
  //   .putObject(params)
  //   .on("httpUploadProgress", (evt: any) => {
  //     console.log(
  //       `Uploading ${(evt.loaded * 100) / evt.total}%`
  //     );
  //   })
  //   .promise();

  // await upload.then((err, data) => {
  //   console.log(err);
  //   alert("File uploaded successfully.");
  // });
};

const CreatePost: React.FC<Props> = ({
  placeholder
}) => {
  const { data: session } = useSession()
  const [content, setContent] = useState('')
  const [fileData, setFileData] = useState<remoteFile[]>([])

  const inputFileRef: React.RefObject<HTMLInputElement> = useRef(null)

  const onSubmit = async () => {
    try {
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

  function handleFileButton() {
    if (fileData.length > 3) {
      alert("이미지 파일은 최대 4장까지 업로드 가능합니다.")
      return;
    }
    inputFileRef.current!.click()
  }

  function handleFileInputChange(e: any) {
    const selectedFiles = e.target.files
    if (selectedFiles.length > 4) {
      alert("이미지 파일은 최대 4장까지 업로드 가능합니다.")
      return;
    }
    if (fileData.length + selectedFiles > 4) {
      alert("이미지 파일은 최대 4장까지 업로드 가능합니다.")
      return;
    }
    debugger
    // selectedFiles.map((file: any) => {
    //   uploadFile(file)
    // })
    for (const file of selectedFiles) {
      uploadFile(file)
    }
    /*
    case1: fileData.length == 0  
    */
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
            src={session?.user.profile_img || defaultProfileImageUrl}
          />
        </div>

        <div className="flex flex-1 flex-col">
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
              <img alt="add-image"
                src="/assets/icons/file-upload.svg"
                width={40} height={40}
                onClick={handleFileButton}
              />
              <input type="file" className="hidden" ref={inputFileRef}
                onChange={handleFileInputChange}
              />

              {/* <img alt="add-video" src="/assets/icons/file-upload.svg" width={40} height={40} /> */}
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