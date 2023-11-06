import { useCallback, useRef, useState } from "react";

import { Button } from "@/components/ui";
// import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);
  const inputFile: any = useRef()

  // const onDrop = useCallback(
  //   (acceptedFiles: FileWithPath[]) => {
  //     setFile(acceptedFiles);
  //     fieldChange(acceptedFiles);
  //     // setFileUrl(convertFileToUrl(acceptedFiles[0]));
  //   },
  //   [file]
  // );

  const handleFileChange = (e: any) => {

  }

  return (
    <div
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer">

      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img src={fileUrl} alt="image" className="file_uploader-img" />
          </div>
          <p className="file_uploader-label">Click to replace</p>
        </>
      ) : (
        <div className="file_uploader-box ">
          <img
            src="/assets/icons/file-upload.svg"
            width={96}
            height={77}
            alt="file upload"
          />

          <p className="text-light-4 small-regular mb-6">PNG, JPG</p>

          <Button type="button" className="shad-button_dark_4">
            Select from computer
          </Button>
          <input type="file" ref={inputFile} onChange={handleFileChange} />
        </div>
      )}
    </div>
  );
};

export default FileUploader;
