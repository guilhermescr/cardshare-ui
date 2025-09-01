'use client';

import { AnimatedBackground } from '@/components/ui/animated-background';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, ArrowLeft, Compass, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <AnimatedBackground className="items-center">
      <div className="flex items-center justify-center p-4">
        <Card className="w-full max-w-md backdrop-blur-sm bg-white/80 border-white/20 shadow-xl text-center">
          <CardContent className="p-8">
            <div className="mb-6">
              <h1 className="text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                404
              </h1>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-2 rounded-full"></div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Page Not Found
              </h2>
              <p className="text-gray-600">
                Oops! The page you're looking for seems to have disappeared into
                the digital void.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                onClick={() => router.back()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>

              <Button
                variant="outline"
                className="w-full border-gray-200 hover:bg-gray-50"
                onClick={() => router.push('/')}
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-200 hover:bg-gray-50"
                  onClick={() => router.push('/auth')}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>

                <Button
                  variant="outline"
                  className="flex-1 border-gray-200 hover:bg-gray-50"
                  onClick={() => router.push('/explore')}
                >
                  <Compass className="mr-2 h-4 w-4" />
                  Explore
                </Button>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-3">
                Maybe try one of these:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  variant="link"
                  size="sm"
                  className="text-xs text-gray-600 hover:text-blue-600"
                >
                  Help Center
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AnimatedBackground>
  );
}
