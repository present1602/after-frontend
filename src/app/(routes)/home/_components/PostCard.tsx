import { Link } from "react-router-dom";

import { multiFormatDateString } from "@/lib/utils";
import { useSession } from "next-auth/react";


const PostCard = ({ post }: any) => {
  const { data: session } = useSession();

  return (
    <div className="post-card my-5">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <img
            src={
              post.author.user_profile_image[0]?.url ||
              "/assets/icons/profile-placeholder.svg"
            }
            alt="creator"
            className="w-12 lg:h-12 rounded-full"
          />

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {post.author.nickname}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular ">
                {multiFormatDateString(post.created_at)}
              </p>
            </div>
          </div>
        </div>

        {/* <Link
          to={`/update-post/${post.id}`}
          className={`${session?.user.id !== post.author_id && "hidden"}`}> */}
        <img
          src={"/assets/icons/edit.svg"}
          alt="edit"
          width={20}
          height={20}
        />
        {/* </Link> */}
      </div>

      <div className="small-medium lg:base-medium py-5">
        <p>{post.content}</p>
        {/* <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string, index: string) => (
              <li key={`${tag}${index}`} className="text-light-3 small-regular">
                #{tag}
              </li>
            ))}
          </ul> */}
      </div>

      {post.post_media_image?.length > 0 &&
        post.post_media_image.map((el: any) => {
          return (<img
            key={el.media.url}
            src={el.media.url}
            // src={post.post_media_image[index].media.url}
            alt="post image"
            className="post-card_img"
          />)
        })
      }


    </div>
  );
};

export default PostCard;
