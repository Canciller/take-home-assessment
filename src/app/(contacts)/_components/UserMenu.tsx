'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useSignOut } from '../_hooks/useSignOut';

export function UserMenu({ username }: { username: string }) {
  const router = useRouter();
  const mutation = useSignOut();

  useEffect(() => {
    if (mutation.isSuccess) {
      router.replace('/sign-in');
    }
  }, [mutation.isSuccess, router]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{username}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => mutation.mutate()}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
