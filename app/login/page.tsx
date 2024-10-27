'use client';

import React from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Card from '@/components/Card';
import Link from 'next/link';
import { setToken, signInUser } from '@/lib/auth';

export default function Login() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();

    try {
      const { data, error } = await signInUser(
        email as string,
        password as string
      );
      if (error) throw error;

      setToken(data.session?.access_token);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card title="Login">
      <div className="space-y-6">
        <div className="flex flex-col gap-2 items-center">
          <span className="text-2xl font-medium">
            Welcome back to ECOMMERCE
          </span>
          <span className="text-base font-normal">
            The next gen business marketplace
          </span>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input placeholder="Enter" name="email" label="Email" required />
          <Input
            type="password"
            name="password"
            placeholder="Enter"
            label="Password"
            required
          />
          <Button
            className="bg-black text-white h-14 rounded-md text-center w-full font-medium"
            type="submit"
          >
            Login
          </Button>
        </form>
        <div className="border-b border-[#C1C1C1]" />
        <div className="flex justify-center gap-2">
          <span className="text-base font-normal">
            Don&apos;t have an account?
          </span>
          <Link href="/register">
            <span className="text-base font-medium">SIGN UP</span>
          </Link>
        </div>
      </div>
    </Card>
  );
}
