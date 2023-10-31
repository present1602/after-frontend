import { useSession } from "next-auth/react"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const CreatePostValidation = z.object({
  content: z.string(),
  author_id: z.string(),
});


function CreatePostForm({ userId }: { userId: string }) {
  const { data: session } = useSession()
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof CreatePostValidation>>({
    resolver: zodResolver(CreatePostValidation),
    defaultValues: {
      content: "",
      author_id: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof CreatePostValidation>) => {
  };


  return (
    <div className="text-grey">
      <h2 className="head-text">user id : {JSON.stringify(session?.user)}</h2>
    </div>
  )
}

export default CreatePostForm