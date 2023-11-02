import * as z from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Input,
  Textarea,
} from "@/components/ui";
import { useToast } from "@/components/ui/use-toast";
import FileUploader from "@/components/shared/FileUploader";

type PostFormProps = {
};

const CreatePostValidation = z.object({
  content: z.string(),
  file: z.custom<File[]>(),
  userId: z.string()
})

const PostForm = ({ post, action }: any) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof CreatePostValidation>>({
    resolver: zodResolver(CreatePostValidation),
    defaultValues: {
      content: '',
      userId: '',
      file: [],
    },
  });

  // Query

  // Handler
  const handleSubmit = async (value: z.infer<typeof CreatePostValidation>) => {
    // if (post && action === "Update") {
    //   const updatedPost = await updatePost({
    //     ...value,
    //     postId: post.$id,
    //     imageId: post.imageId,
    //     imageUrl: post.imageUrl,
    //   });

    //   if (!updatedPost) {
    //     toast({
    //       title: `${action} post failed. Please try again.`,
    //     });
    //   }
    //   return navigate(`/posts/${post.$id}`);
    // }

    // const newPost = await createPost({
    //   ...value,
    //   userId: user.id,
    // });

    // if (!newPost) {
    //   toast({
    //     title: `${action} post failed. Please try again.`,
    //   });
    // }
    // navigate("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-9 w-full  max-w-5xl">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">포스팅</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">IMAGE/SHORTS</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => { }}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap">
            Post
          </Button>
          {/* <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingCreate || isLoadingUpdate}>
            {(isLoadingCreate || isLoadingUpdate) && <Loader />}
            {action} Post
          </Button> */}
        </div>
      </form>
    </Form>
  );
};

export default PostForm;