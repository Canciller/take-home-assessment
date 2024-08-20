import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { redirect } from 'next/navigation';

import { ThemeDropdown } from '@/components/ThemeDropdown';

import { UserMenu } from './_components/UserMenu';
import { getCurrentUser } from '../api/(auth)/_services/getCurrentUser';

export default async function Layout({
  children,
  modals,
}: Readonly<{
  children: React.ReactNode;
  modals: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  const user = await queryClient.fetchQuery({
    queryKey: ['me'],
    queryFn: () => getCurrentUser(),
  });

  if (!user) {
    return redirect('/sign-in');
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex h-screen min-w-[320px] flex-col">
        <header className="flex items-center justify-between border-b border-solid border-border px-5 py-5 md:px-10">
          <h1 className="text-xl font-semibold">Contacts</h1>

          <div className="flex items-center gap-5">
            <UserMenu />
            <ThemeDropdown />
          </div>
        </header>

        {children}

        {modals}
      </div>
    </HydrationBoundary>
  );
}
