'use client';

import { Suspense } from 'react';
import { AnimatedBackground } from '@/components/animated-background';
import { AuthHeader } from '../auth-header';
import { CheckCircle, Clock, Mail, Shield, Zap, Sparkles } from 'lucide-react';
import { CheckEmailActionButton } from './check-email-action-button';
import { AuthFeatureCard } from '../auth-feature-card';
import { useSearchParams } from 'next/navigation';

function CheckEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  if (!email) {
    return (
      <AnimatedBackground className="items-center">
        <div className="flex flex-col items-center justify-center min-h-screen w-full max-w-sm mx-auto">
          <h2 className="text-xl font-semibold mb-4">No email provided</h2>
          <p className="mb-6 text-gray-600">
            Please register or log in to continue.
          </p>
          <CheckEmailActionButton variant="back" className="bg-white border" />
        </div>
      </AnimatedBackground>
    );
  }

  return (
    <AnimatedBackground className="items-center">
      <div className="flex items-center justify-center p-4">
        <section className="w-full max-w-md">
          <AuthHeader
            title="Check Your Email"
            description="We've sent you a verification link"
          />

          <section className="bg-white flex flex-col justify-center items-center rounded-2xl shadow-xl/10 p-6">
            <span className="bg-[#D6FCEA] p-5 rounded-full shadow-green-400/50">
              <Mail className="text-green-600" size={40} />
            </span>

            <h2 className="text-xl font-semibold my-5">
              Verification Email Sent!
            </h2>
            <p className="text-[#444] font-medium">
              We've sent a verification email to:
            </p>
            <span className="bg-blue-50 border border-blue-200 p-2 w-full text-center text-blue-600 font-semibold rounded-md mt-2 mb-4">
              {email}
            </span>

            <div className="bg-blue-50 border border-blue-200 p-3 pr-4 rounded-md flex gap-3">
              <CheckCircle className="pb-2.5" size={30} />
              <p className="text-blue-800 text-sm">
                Click the verification link in your email to activate your
                account and start creating amazing cards!
              </p>
            </div>

            <h3 className="font-semibold my-6">What's next?</h3>

            <ol className="space-y-8 w-full ml-6">
              <li className="flex gap-3 items-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-white text-lg">
                  1
                </div>

                <div>
                  <h4 className="font-medium text-sm">Check your inbox</h4>
                  <p className="text-[13px] text-gray-700">
                    Look for an email from CardShare
                  </p>
                </div>
              </li>

              <li className="flex gap-3 items-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-lime-500 to-emerald-400 font-bold text-white text-lg">
                  2
                </div>

                <div>
                  <h4 className="font-medium text-sm">
                    Click the verification link
                  </h4>
                  <p className="text-[13px] text-gray-700">
                    This will activate your account
                  </p>
                </div>
              </li>

              <li className="flex gap-3 items-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-pink-600 to-red-400 font-bold text-white text-lg">
                  3
                </div>

                <div>
                  <h4 className="font-medium text-sm">Start creating!</h4>
                  <p className="text-[13px] text-gray-700">
                    Begin your amazing card journey
                  </p>
                </div>
              </li>
            </ol>

            <div className="bg-orange-50 border border-orange-200 p-3 rounded-md w-full mt-7 mb-2">
              <h3 className="flex gap-2 items-center font-medium text-amber-800 mb-2.5">
                <Clock size={18} /> Didn't receive the email?
              </h3>

              <ul className="list-disc list-inside pl-0.5 space-y-1">
                <li className="text-amber-700 font-medium text-sm">
                  Check your spam or junk folder
                </li>
                <li className="text-amber-700 font-medium text-sm">
                  Make sure {email} is correct
                </li>
                <li className="text-amber-700 font-medium text-sm">
                  Wait a few minutes for delivery
                </li>
              </ul>
            </div>

            <CheckEmailActionButton variant="resend" />
            <CheckEmailActionButton variant="back" />
          </section>

          <section className="mt-8 grid grid-cols-3 gap-4 text-center">
            <AuthFeatureCard
              icon={<Shield className="text-blue-600" />}
              text="Secure"
            />
            <AuthFeatureCard
              icon={<Zap className="text-green-600" />}
              text="Fast Setup"
            />
            <AuthFeatureCard
              icon={<Sparkles className="text-purple-600" />}
              text="Amazing Cards"
            />
          </section>
        </section>
      </div>
    </AnimatedBackground>
  );
}

export default function CheckEmailPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CheckEmailContent />
    </Suspense>
  );
}
