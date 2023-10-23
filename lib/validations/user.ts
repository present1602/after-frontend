import * as z from 'zod';

export const UserValidation = z.object({
  profile_photo: z.string(),
  name: z.string().min(2).max(20),
  bio: z.string(),
})