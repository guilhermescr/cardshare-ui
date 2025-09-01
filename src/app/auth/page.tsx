'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Loader2,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  AlertCircle,
  Sparkles,
  Layers,
  Users,
} from 'lucide-react';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { toast } from 'sonner';

interface AuthPageProps {
  onLogin: (role?: 'user' | 'admin') => void;
}

export default function AuthPage({ onLogin }: AuthPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  const handleSubmit = async (type: 'login' | 'register') => {
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (formData.email === 'admin@example.com') {
        onLogin('admin');
        toast.success('Welcome back!', {
          description: "You've successfully logged in as admin.",
        });
      } else if (formData.email && formData.password) {
        onLogin('user');
        if (type === 'login') {
          toast.success('Welcome back!', {
            description: "You've successfully logged in.",
          });
        } else {
          toast.success('Account created!', {
            description: 'Your account has been created successfully.',
          });
        }
      } else {
        setError('Please fill in all required fields');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

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
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-gray-700">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange('email', e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-gray-700">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        className="pl-10 pr-10 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange('password', e.target.value)
                        }
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
                  </div>

                  {error && (
                    <Alert
                      variant="destructive"
                      className="bg-red-50 border-red-200"
                    >
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                    onClick={() => handleSubmit('login')}
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
                    <Button
                      variant="link"
                      className="text-sm text-gray-600 hover:text-blue-600"
                    >
                      Forgot your password?
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="register" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name" className="text-gray-700">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="Enter your full name"
                        className="pl-10 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange('name', e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-gray-700">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange('email', e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="register-password"
                      className="text-gray-700"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a password"
                        className="pl-10 pr-10 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange('password', e.target.value)
                        }
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-gray-700">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        className="pl-10 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          handleInputChange('confirmPassword', e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {error && (
                    <Alert
                      variant="destructive"
                      className="bg-red-50 border-red-200"
                    >
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 shadow-lg"
                    onClick={() => handleSubmit('register')}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Users className="mr-2 h-4 w-4" />
                    )}
                    Create Account
                  </Button>
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
