import * as z from 'zod';

export const UserValidation = z.object({
  profile_photo: z.string(),
  name: z.string().min(2).max(20),
  nickname: z.string().min(2).max(20),
  email: z.string().min(10).max(50),
  gender: z.string().min(10).max(50),
  bio: z.string(),
})