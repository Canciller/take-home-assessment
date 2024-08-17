import { PlusIcon } from '@radix-ui/react-icons';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { ContactsList } from './_components/ContactsList';
import { getSerializedContacts } from '../api/(contacts)/_services/getSerializedContacts';

export default async function Home({
  searchParams,
}: {
  searchParams: {
    limit?: string;
    page?: string;
  };
}) {
  const queryClient = new QueryClient();

  const params = {
    page: searchParams.page ?? 1,
    limit: searchParams.limit ?? 10,
  };

  await queryClient.prefetchQuery({
    queryKey: ['contacts', params],
    queryFn: () => getSerializedContacts(params),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex flex-1 flex-col">
        <header className="flex items-center justify-between px-10 pb-5 pt-10">
          <h1 className="text-lg font-semibold">Contacts</h1>

          <Button asChild>
            <Link href="/contacts/create">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add contact
            </Link>
          </Button>
        </header>

        <div className="relative flex-1">
          <div className="absolute inset-0 flex flex-col px-10 pb-10">
            <ContactsList />
          </div>
        </div>
      </main>
    </HydrationBoundary>
  );
}
