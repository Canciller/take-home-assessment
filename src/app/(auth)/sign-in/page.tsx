/* eslint-disable react/no-unescaped-entities */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { isAxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useSignIn } from '../_hooks/useSignIn';

const formScheme = z.object({
  username: z.string().trim().min(1, 'Name is required.'),
  password: z.string().min(1, 'Password is required.'),
});

export default function SignIn() {
  const router = useRouter();
  const mutation = useSignIn();

  const form = useForm<z.input<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (values: z.output<typeof formScheme>) => {
    mutation.mutate(values);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      router.replace('/');
      router.refresh();
    }
  }, [mutation.isSuccess, router]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full px-5 py-20 md:max-w-[400px] md:rounded-md md:border md:px-10">
        <h1 className="mb-10 text-3xl font-semibold">Sign in</h1>

        <Form {...form}>
          <form
            className="flex flex-col gap-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              // disabled={mutation.isPending}
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter username" autoFocus />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              // disabled={mutation.isPending}
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p className="text-center text-sm">
              Don't have an account?{' '}
              <Link
                href="/sign-up"
                replace
                className="text-blue-500 hover:underline"
              >
                Sign up
              </Link>
            </p>

            {mutation.error ? (
              <p className="text-center text-sm text-destructive">
                {(isAxiosError(mutation.error) &&
                  mutation.error.response &&
                  mutation.error.response.data.error.message) ||
                  mutation.error.message}
              </p>
            ) : null}

            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Sign in
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
