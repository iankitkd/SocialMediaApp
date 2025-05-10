import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
})

export const signinSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
})

export type SignupValues = z.infer<typeof signupSchema>;
export type SigninValues = z.infer<typeof signinSchema>;
export type FormValues = z.infer<typeof signupSchema> | z.infer<typeof signinSchema>