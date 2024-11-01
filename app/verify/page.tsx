'use client';

import Button from '@/components/Button';
import PinInput from '@/components/PinInput';
import { setToken, verifyUserEmail } from '@/lib/auth';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

const VerifyEmailComponent = () => {
  const [code, setCode] = useState('');
  const userEmail = useSearchParams().get('email');

  const handleChange = (value: string) => {
    setCode(value);
  };

  const handleVerify = async () => {
    try {
      const { data, error } = await verifyUserEmail(userEmail as string, code);
      if (error) throw error;

      setToken(data.session?.access_token as string);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center">
        <span>Enter the 8 digit code you have received on</span>
        <span className="font-medium">{userEmail}</span>
      </div>
      <PinInput label="Code" length={8} onChange={handleChange} />
      <Button disabled={code.length < 8} onClick={handleVerify}>
        Verify
      </Button>
    </div>
  );
};

export default function VerifyEmail() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailComponent />
    </Suspense>
  );
}
