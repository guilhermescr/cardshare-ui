import { AnimatedBackground } from '@/components/ui/animated-background';
import { AuthHeader } from '../AuthHeader';
import { CheckCircle, Clock, Mail } from 'lucide-react';
import { CheckEmailActionButton } from './CheckEmailActionButton';

export default function CheckEmailPage() {
  return (
    <AnimatedBackground className="items-center">
      <div className="flex items-center justify-center p-4">
        <section className="w-full max-w-md">
          <AuthHeader
            title="Check Your Email"
            description="We've sent you a verification link"
          />

          <section className="bg-white flex flex-col justify-center items-center rounded-md shadow-xl/20 p-6">
            <span className="bg-[#D6FCEA] p-5 rounded-full shadow-green-400/50">
              <Mail className="text-green-600" size={40} />
            </span>

            <h2 className="text-xl font-semibold my-5">
              Verification Email Sent!
            </h2>
            <p className="text-[#444] font-semibold">
              We've sent a verification email to:
            </p>
            <span className="bg-blue-50 border border-blue-200 p-2 w-full text-center text-blue-600 font-bold rounded-md mt-2 mb-4">
              user@gmail.com
            </span>

            <div className="bg-blue-50 border border-blue-200 p-3 pr-6 rounded-md flex gap-3">
              <CheckCircle className="pb-2.5" size={30} />
              <p className="text-blue-800 text-sm">
                Click the verification link in your email to activate your
                account and start creating amazing cards!
              </p>
            </div>

            <h3 className="font-semibold my-4">What's next?</h3>

            <ol className="space-y-4 w-full">
              <li className="flex gap-3 items-center">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 py-1.5 px-3.5 rounded-full font-bold text-white">
                  1
                </span>

                <div>
                  <h4 className="font-semibold">Check your inbox</h4>
                  <p className="text-sm text-gray-700">
                    Look for an email from CardShare
                  </p>
                </div>
              </li>

              <li className="flex gap-3 items-center">
                <span className="bg-gradient-to-r from-lime-500 to-emerald-400 py-1.5 px-3.5 rounded-full font-bold text-white">
                  2
                </span>

                <div>
                  <h4 className="font-semibold">Click the verification link</h4>
                  <p className="text-sm text-gray-700">
                    This will activate your account
                  </p>
                </div>
              </li>

              <li className="flex gap-3 items-center">
                <span className="bg-gradient-to-r from-pink-600 to-red-400 py-1.5 px-3.5 rounded-full font-bold text-white">
                  3
                </span>

                <div>
                  <h4 className="font-semibold">Start creating!</h4>
                  <p className="text-sm text-gray-700">
                    Begin your amazing card journey
                  </p>
                </div>
              </li>
            </ol>

            <div className="bg-orange-50 border border-orange-200 p-3 rounded-md w-full mt-7 mb-2">
              <h3 className="flex gap-2 items-center font-semibold text-amber-800 mb-2.5">
                <Clock size={18} /> Didn't receive the email?
              </h3>

              <ul className="list-disc list-inside pl-0.5 space-y-1">
                <li className="text-amber-700 font-semibold text-sm">
                  Check your spam or junk folder
                </li>
                <li className="text-amber-700 font-semibold text-sm">
                  Make sure user@gmail.com is correct
                </li>
                <li className="text-amber-700 font-semibold text-sm">
                  Wait a few minutes for delivery
                </li>
              </ul>
            </div>

            {/* TO-DO: Code Resend Email Endpoint! */}
            <CheckEmailActionButton variant="resend" />
            <CheckEmailActionButton variant="back" />
          </section>
        </section>
      </div>
    </AnimatedBackground>
  );
}
