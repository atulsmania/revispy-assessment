'use client';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Input from '@/components/Input';
import { signUpNewUser } from '@/lib/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name')?.toString();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();

    try {
      const { error } = await signUpNewUser(
        email as string,
        password as string,
        name as string
      );
      if (error) throw error;

      router.push(`/verify?email=${email}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card title="Create your account">
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input placeholder="Enter" label="Name" name="name" required />
          <Input placeholder="Enter" label="Email" name="email" required />
          <Input
            name="password"
            type="password"
            placeholder="Enter"
            label="Password"
            required
          />
          <Button
            className="bg-black text-white h-14 rounded-md text-center w-full font-medium"
            type="submit"
          >
            Create Account
          </Button>
        </form>

        <div className="border-b border-[#C1C1C1]" />

        <div className="flex justify-center gap-2">
          <span className="text-base font-normal">Have an account?</span>
          <Link href="/login">
            <span className="text-base font-medium">LOGIN</span>
          </Link>
        </div>
      </div>
    </Card>
  );
}
