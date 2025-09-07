'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Loader2, Lock, Mail, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LoginFormType, loginSchema } from './login.schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { API_URL } from '@/constants/api';
import { useAuthStore } from '@/stores/auth';
import { getErrorMessage } from '@/utils/error.utils';
import { APP_ROUTES } from '@/constants/routes';

export default function LoginForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<LoginFormType>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (formData: LoginFormType) => {
    setIsLoading(true);

    try {
      const loginDto = {
        identifier: formData.email,
        password: formData.password,
      };

      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginDto),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error('Login failed', {
          description: data.error || data.message || 'Invalid credentials.',
        });
        return;
      }

      localStorage.setItem('token', data.token);
      useAuthStore.getState().setAuth(data.token, data.user);

      toast.success('Welcome back!', {
        description: "You've successfully logged in.",
      });

      router.push(APP_ROUTES.DASHBOARD);

      // toast.success('Welcome back!', {
      //   description: "You've successfully logged in as admin.",
      // });
    } catch (error) {
      toast.error('Login failed', {
        description: getErrorMessage(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel htmlFor="login-email" className="text-gray-700">
                Email
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel htmlFor="login-password" className="text-gray-700">
                Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full mb-2"
          variant="gradient"
          gradientColor="blue"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Sign In
        </Button>

        <div className="text-center">
          <Button variant="link" className="text-sm text-gray-600">
            Forgot your password?
          </Button>
        </div>
      </form>
    </Form>
  );
}
