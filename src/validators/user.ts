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


export const profileSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters.')
    .optional(),

  username: z.string()
    .min(3, 'Username must be at least 3 characters long')
    .max(30, 'Username cannot exceed 30 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    
  bio: z.string()
    .max(500, 'Bio cannot exceed 500 characters')
    .optional(),
    
  gender: z.enum(['male', 'female', 'non-binary', 'other', 'prefer-not-to-say', ])
    .optional(),
    
  birthDate: z.coerce.date()
    .max(new Date(), 'Date of birth cannot be in the future')
    .optional()
    .refine(dob => {
      if (!dob) return true;
      const minAgeDate = new Date();
      minAgeDate.setFullYear(minAgeDate.getFullYear() - 13);
      return dob <= minAgeDate;
    }, 'You must be at least 13 years old'),
    
  photoUrl: z.string()
    // .url('Photo URL must be a valid URL')
    // .regex(/\.(jpeg|jpg|gif|png|webp)$/, 'Photo URL must point to an image file')
    .optional(),
  location: z.string()
    .optional(),
  isOnboarded: z.boolean()
    .optional(),
});


export type SignupValues = z.infer<typeof signupSchema>;
export type SigninValues = z.infer<typeof signinSchema>;
export type AuthValues = z.infer<typeof signupSchema> | z.infer<typeof signinSchema>

export type ProfileValues = z.infer<typeof profileSchema>