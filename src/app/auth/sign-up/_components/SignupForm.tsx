"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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
    email: z.string().min(1, '이메일아이디를 입력해주세요').email('이메일을 올바르게 입력해주세요').max(100, '제한 글자수를 초과했습니다'),
    password: z.string().min(1, '비밀번호를 입력해주세요').min(6, '비밀번호는 6자~20자 이하로 입력 가능합니다.').max(20, '비밀번호는 6자~20자 이하로 입력 가능합니다.'),
    nickname: z.string().min(1, '닉네임을 입력해주세요').min(2, '닉네임은 2자 이상 12자 이하로 입력 가능합니다.').max(12, '닉네임은 2자 이상 12자 이하로 입력 가능합니다.'),
    gender: z.string().min(1, '성별을 선택해주세요').max(1, '성별을 선택해주세요'),
    birth_date: z.string().min(1, '생년월일 6자리를 입력해주세요').min(6, '생년월일 6자리를 올바르게 입력해주세요').max(6, '생년월일 6자리를 올바르게 입력해주세요').regex(/^[0-9]*$/, '생년월일 6자리를 올바르게 입력해주세요')
  })

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: '',
      password: '',
      nickname: '',
      gender: '',
      birth_date: '',
    }
  })

  const onSubmit = async (values: z.infer<typeof SignupFormSchema>) => {
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
        birth_date: values.birth_date,
      })
    })

    if (response.ok) {
      router.push('/auth/sign-in')
    } else {
      console.error('회원가입에 실패했습니다.')
    }

  }

  return (
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
          name="birth_date"
          control={form.control}
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'
              >
                생년월일 6자리
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="생년월일 6자리를 입력해주세요"
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
                  <input type="radio" name="gender" value="M" className="hidden peer"
                  />
                  <div className="flex items-center justify-center
                rounded-md py-2 
                peer-checked:border-2 text-white"
                  >남자</div>
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