// import { useSession } from "next-auth/react"
// import * as z from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { usePathname, useRouter } from "next/navigation";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";

// export const CreatePostValidation = z.object({
//   content: z.string(),
//   author_id: z.string(),
// });


// function CreatePostForm({ userId, action }: { action: string, userId: string }) {
//   const { data: session } = useSession()
//   const router = useRouter();
//   const pathname = usePathname();

//   const form = useForm<z.infer<typeof CreatePostValidation>>({
//     resolver: zodResolver(CreatePostValidation),
//     defaultValues: {
//       content: "",
//       author_id: userId,
//     },
//   });

//   const onSubmit = async (values: z.infer<typeof CreatePostValidation>) => {
//   };


//   return (
//     // <div className="text-grey">
//     //   <h2 className="head-text">user id : {JSON.stringify(session?.user)}</h2>
//     // </div>
//     <Form {...form}>
//       <form
//         className='mt-10 flex flex-col justify-start gap-10'
//         onSubmit={form.handleSubmit(onSubmit)}
//       >
//         <FormField
//           control={form.control}
//           name='content'
//           render={({ field }) => (
//             <FormItem className='flex w-full flex-col gap-3'>
//               <FormLabel className='text-base-semibold text-light-2'>
//                 Content
//               </FormLabel>
//               <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
//                 <Textarea rows={15} {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button type='submit' className='bg-primary-500'>
//           Post Thread
//         </Button>
//       </form>
//     </Form>
//   )
// }

// export default CreatePostForm