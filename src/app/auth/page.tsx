'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Layers, Users } from 'lucide-react';
import { AnimatedBackground } from '@/components/ui/animated-background';
import LoginForm from './login/login.form';
import RegisterForm from './register/register.form';
import { AuthHeader } from './AuthHeader';
import { AuthFeatureCard } from './AuthFeatureCard';

// interface AuthPageProps {
//   onLogin: (role?: 'user' | 'admin') => void;
// }

export default function AuthPage() {
  return (
    <AnimatedBackground className="items-center">
      <div className="flex items-center justify-center p-4">
        <section className="w-full max-w-md">
          <AuthHeader
            title="Welcome to CardShare"
            description="Create, share, and discover amazing cards"
          />

          <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
            <CardContent className="p-6">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100/50">
                  <TabsTrigger
                    value="login"
                    className="cursor-pointer transition duration-150 data-[state=inactive]:hover:bg-gray-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Sign In
                  </TabsTrigger>

                  <TabsTrigger
                    value="register"
                    className="cursor-pointer transition duration-150 data-[state=inactive]:hover:bg-gray-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  <LoginForm />
                </TabsContent>

                <TabsContent value="register" className="space-y-4">
                  <RegisterForm />
                </TabsContent>
              </Tabs>
            </CardContent>

            <CardFooter className="px-6 pb-6">
              <div className="w-full text-center">
                <p className="text-xs text-gray-500 mb-2">
                  Demo credentials: admin@example.com for admin access
                </p>
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
                  <span>Secure</span>
                  <span>•</span>
                  <span>Private</span>
                  <span>•</span>
                  <span>Encrypted</span>
                </div>
              </div>
            </CardFooter>
          </Card>

          <section className="mt-8 grid grid-cols-3 gap-4 text-center">
            <AuthFeatureCard
              icon={<Layers className="text-blue-600" />}
              text="Create Cards"
            />
            <AuthFeatureCard
              icon={<Users className="text-green-600" />}
              text="Share & Discover"
            />
            <AuthFeatureCard
              icon={<Sparkles className="text-purple-600" />}
              text="Get Inspired"
            />
          </section>
        </section>
      </div>
    </AnimatedBackground>
  );
}
