'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useCurrentUser } from '../_hooks/useCurrentUser';
import { useSignOut } from '../_hooks/useSignOut';

export function UserMenu() {
  const query = useCurrentUser();

  const router = useRouter();
  const mutation = useSignOut();

  useEffect(() => {
    if (mutation.isSuccess) {
      router.replace('/sign-in');
      router.refresh();
    }
  }, [mutation.isSuccess, router]);

  if (!query.data) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{query.data.username}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => mutation.mutate()}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
