'use client';

import { z } from 'zod';

export const registerSchema = z
  .object({
    username: z.string().min(1, 'This field has to be filled.'),
    email: z.email().min(1, 'This field has to be filled.'),
    password: z.string().min(8, 'Password must be at least 8 characters.'),
    confirmPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  });

export type RegisterFormType = z.infer<typeof registerSchema>;
