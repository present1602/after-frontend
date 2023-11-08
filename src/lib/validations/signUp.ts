import * as z from 'zod';

export const signUpValidation = z.object({
  email: z.string().min(1, '이메일아이디를 입력해주세요').email('이메일을 올바르게 입력해주세요').max(100, '제한 글자수를 초과했습니다'),
  password: z.string().min(1, '비밀번호를 입력해주세요').min(6, '비밀번호는 6자~20자 이하로 입력 가능합니다.').max(20, '비밀번호는 6자~20자 이하로 입력 가능합니다.'),
  nickname: z.string().min(1, '닉네임을 입력해주세요').min(2, '닉네임은 2자 이상 12자 이하로 입력 가능합니다.').max(12, '닉네임은 2자 이상 12자 이하로 입력 가능합니다.'),
})

// export const signUpValidation = z
//   .object({
//     email: z.string().min(10, 'Email is required').email('Invalid email'),
//     nickname: z.string().min(2, 'Username is required').max(100),
//     password: z
//       .string()
//       .min(6, 'Password is required')
//       .min(20, 'Password must have than 8 characters'),
//     confirmPassword: z.string().min(1, 'Password confirmation is required'),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     path: ['confirmPassword'],
//     message: 'Password do not match',
//   });