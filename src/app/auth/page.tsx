'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Layers, Users } from 'lucide-react';
import { AnimatedBackground } from '@/components/ui/animated-background';
import LoginForm from './login/login.form';
import RegisterForm from './register/register.form';

// interface AuthPageProps {
//   onLogin: (role?: 'user' | 'admin') => void;
// }

export default function AuthPage() {
  return (
    <AnimatedBackground className="items-center">
      <div className="flex items-center justify-center p-4">
        <section className="w-full max-w-md">
          <header className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <Layers className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Welcome to CardShare
            </h1>
            <p className="text-gray-600 mt-2">
              Create, share, and discover amazing cards
            </p>
          </header>

          <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
            <CardContent className="p-6">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100/50">
                  <TabsTrigger
                    value="login"
                    className="transition duration-150 data-[state=inactive]:hover:bg-gray-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger
                    value="register"
                    className="transition duration-150 data-[state=inactive]:hover:bg-gray-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
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
            <div className="bg-white/40 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <Layers className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <p className="text-xs text-gray-600">Create Cards</p>
            </div>
            <div className="bg-white/40 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <Users className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <p className="text-xs text-gray-600">Share & Discover</p>
            </div>
            <div className="bg-white/40 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <Sparkles className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <p className="text-xs text-gray-600">Get Inspired</p>
            </div>
          </section>
        </section>
      </div>
    </AnimatedBackground>
  );
}
