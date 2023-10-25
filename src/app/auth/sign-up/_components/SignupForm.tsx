"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";


const SignupForm = () => {

  // const form = useForm<z.infer<typeof UserValidation>>({
  //   resolver: zodResolver(UserValidation),
  //   defaultValues: {
  //     profile_photo: user?.profile_photo ? user?.profile_photo : "",
  //     name: user?.name ? user.name : "",
  //     bio: user?.bio ? user.bio : "",
  //   },
  // });

  const router = useRouter()

  const SignupFormSchema = z.object({
    email: z.string().min(10).max(50),
    nickname: z.string().min(2).max(50),
    password: z.string().min(6).max(20),
    gender: z.string().min(1).max(1),
  })

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: '',
      password: '',
      nickname: '',
      gender: 'M',
    }
  })

  const onSubmit = async (values: z.infer<typeof SignupFormSchema>) => {
    debugger
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        nickname: values.nickname,
        gender: values.gender,
      })
    })


    if (response.ok) {
      router.push('/auth/sign-in')
    } else {
      console.error('회원가입에 실패했습니다.')
    }

  }

  return (
    // <div>aa</div>
    <Form {...form}>
      <form
        className='flex flex-col justify-start gap-10'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'
              >
                이메일
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="이메일아이디를 입력해주세요"
                  type='text'
                  className='account-form_input no-focus'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )
          }
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'
              >
                비밀번호
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="비밀번호를 입력해주세요"
                  type='password'
                  className='account-form_input no-focus'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )
          }
        />
        <FormField
          name="nickname"
          control={form.control}
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'
              >
                닉네임
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="닉네임을 입력해주세요"
                  type='text'
                  className='account-form_input no-focus'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )
          }
        />
        <FormField
          name="gender"
          control={form.control}
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'
              >
                성별을 선택해주세요
              </FormLabel>
              <div className="grid grid-cols-2">
                <label>
                  <input type="radio" name="gender" value="M" checked={true} className="hidden peer"
                    onChange={() => { }}
                  />
                  <div className="flex items-center justify-center
                rounded-md py-2 
                peer-checked:border-2 text-white">남자</div>
                </label>
                <label>
                  <input type="radio" name="gender" value="F" className="hidden peer" />
                  <div className="flex flex-col items-center 
                rounded-md py-2 
                peer-checked:border-2 text-white">여자</div>
                </label>
              </div>
              <FormMessage />
            </FormItem>
          )
          }
        />
        <Button type='submit' className='bg-primary-500'>
          확인
        </Button>
      </form>
    </Form>

  );
}

export default SignupForm;