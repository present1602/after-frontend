import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter()

  const formSchema = z.object({
    email: z.string().min(1, '이메일아이디를 입력해주세요').email('이메일을 올바르게 입력해주세요').max(100, '제한 글자수를 초과했습니다'),
    password: z.string().min(1, '비밀번호를 입력해주세요').min(6, '비밀번호는 6자~20자 이하로 입력 가능합니다.').max(20, '비밀번호는 6자~20자 이하로 입력 가능합니다.'),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const signInData = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    })
    console.log(signInData)

    if (signInData?.error) {
      console.log(signInData.error)
    } else {
      router.push('/mypage')
    }
    // const signInData = await fetch('/api/user/signin', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     email: values.email,
    //     password: values.password,
    //   })
    // })
  }

  return (

    <Form {...form}>
      <form
        className='flex flex-col justify-start gap-10'
        onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                이메일
              </FormLabel>
              <FormControl>
                <Input
                  type='text'
                  className='account-form_input no-focus'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                비밀번호
              </FormLabel>
              <FormControl>
                <Input
                  type='password'
                  className='account-form_input no-focus'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='bg-primary-500'>
          로그인
        </Button>
      </form>
    </Form>

  );
}

export default SignIn;