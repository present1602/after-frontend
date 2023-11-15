"use client"

import { Button, Textarea } from "@/components/ui";
import { defaultProfileImageUrl } from "@/constants";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

interface Props {
  placeholder: string;
}

interface IFileEl {
  filename: string,
  url: string,
  ord?: number
}

const CreatePost: React.FC<any> = (props) => {
  const { data: session } = useSession()
  const [content, setContent] = useState('')
  const [fileData, setFileData] = useState<IFileEl[]>([])

  const inputFileRef: React.RefObject<HTMLInputElement> = useRef(null)

  const onSubmit = async () => {
    try {
      const fileList = fileData.map((el: IFileEl, idx: number) => ({ ...el, ord: idx }))

      const response = await axios.post('/api/post/create', {
        content: content,
        userId: Number(session?.user.id),
        fileList: fileList
      })
      console.log("post response : ", response)

      if (response.status === 200) {
        alert(response.data.message)
        props.initPosts()

      } else {
        alert(`포스팅 등록에 실패했습니다. \n${response.data.message}`)
      }

    } catch (error) {
      console.log(error)
      alert('포스팅 등록에 실패했습니다.')
    }

  }

  function handleFileButton() {
    if (fileData.length > 3) {
      alert("이미지 파일은 최대 4장까지 업로드 가능합니다.")
      return;
    }
    inputFileRef.current!.click()
  }

  async function handleFileInputChange(e: any) {
    const selectedFiles = e.target.files
    if (selectedFiles.length > 4) {
      alert("이미지 파일은 최대 4장까지 업로드 가능합니다.")
      return;
    }
    if (fileData.length + selectedFiles > 4) {
      alert("이미지 파일은 최대 4장까지 업로드 가능합니다.")
      return;
    }

    if (!process.env.NEXT_PUBLIC_AWS_S3_REGION || !process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || !process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY) return

    const bucketName = process.env.NEXT_PUBLIC_AWS_S3_BUCKET;
    const bucketRegion = process.env.NEXT_PUBLIC_AWS_S3_REGION

    const s3Client = new S3Client({
      region: bucketRegion,
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
      }
    });

    let newArr: any[] = []
    let cnt = 0;
    for (let i = 0; i < selectedFiles.length; i++) {
      console.log(`key: ${uuidv4()}_${selectedFiles[i].name}`)
      const fileKey = `${uuidv4()}_${selectedFiles[i].name}`
      const params = {
        Bucket: bucketName,
        Key: fileKey,
        Body: selectedFiles[i],
      };

      s3Client.send(new PutObjectCommand(params), (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
          const newFile = {
            url: `https://s3.${bucketRegion}.amazonaws.com/${bucketName}/${fileKey}`,
            filename: fileKey
          }
          newArr.push(newFile)
          cnt++
          if (cnt === selectedFiles.length) {
            setFileData([...fileData, ...newArr])
          }
        }
      });
    }

  }

  function removeFile(idx: number) {
    setFileData(fileData.filter((el, index) => index != idx))
  }

  return (
    <div className="border-b-[1px] border-dark-4 pt-2 py-5">
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
          <div className="flex flex-col gap-4">
            {
              fileData.length > 0 && fileData.map((el: any, idx: number) => {
                return (
                  <div className="w-full relative" key={el.url}>
                    <img src="/assets/icons/close.svg" className="cursor-pointer absolute top-3 right-3" width={32}
                      onClick={() => removeFile(idx)}
                    />
                    <img src={el.url} className="w-full" />
                  </div>
                );
              })
            }
          </div>
          <div className="mt-4 flex flex-row">
            <div className="flex flex-1 gap-5">
              <img alt="add-image"
                src="/assets/icons/file-upload.svg"
                width={40} height={40}
                onClick={handleFileButton}
              />
              <input type="file" className="hidden" ref={inputFileRef} multiple
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
  )

    ;
}

export default CreatePost;


// async function getFileData(key: string) {
//   const S3_BUCKET = process.env.NEXT_PUBLIC_AWS_S3_BUCKET;
//   const REGION = process.env.NEXT_PUBLIC_AWS_S3_REGION;

//   const s3 = new AWS.S3({
//     params: { Bucket: S3_BUCKET },
//     region: REGION,
//   });

//   var getParams: any = {
//     Bucket: S3_BUCKET,
//     Key: key
//   }

//   s3.getObject(getParams, function (err, data) {
//     if (err) {
//       return err;
//     }
//     let objectData = data.Body!.toString('utf-8');
//     console.log(objectData);
//   });
// }

// function uploadFile(file: File) {
//   const S3_BUCKET = process.env.NEXT_PUBLIC_AWS_S3_BUCKET;
//   const REGION = process.env.NEXT_PUBLIC_AWS_S3_REGION;

//   AWS.config.update({
//     accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
//   });
//   const s3 = new AWS.S3({
//     params: { Bucket: S3_BUCKET },
//     region: REGION,
//   });

//   const fileKey = `${Math.random() + file.name}`

//   const params: any = {
//     Bucket: S3_BUCKET,
//     Key: fileKey,
//     Body: file,
//   };

//   try {
//     const upload: any = s3.putObject(params);

//     upload.on("httpUploadProgress", (evt: any) => {
//       console.log(
//         `Uploading ${(evt.loaded * 100) / evt.total}%`
//       );
//     });

//     upload.promise()
//       .then((data: any) => {
//         console.log("Upload success");
//         console.log("data.location : ", data.location);

//       }, (err: any) => {
//         throw err;
//       });
//   } catch (err) {
//     console.error(err);
//   }

// };