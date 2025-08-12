'use client';

import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen mt-10 mb-10">
      <SignUp path="/sign-up" routing="path" />
    </div>
  );
}
