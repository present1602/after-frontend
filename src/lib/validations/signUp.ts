import * as z from 'zod';

export const signUpValidation = z.object({
  email: z.string().min(10).max(50),
  nickname: z.string().min(2).max(20),
  password: z.string().min(2).max(20),
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