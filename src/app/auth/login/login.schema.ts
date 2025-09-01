'use client';

import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email().min(1, 'This field has to be filled.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});

export type LoginFormType = z.infer<typeof loginSchema>;
