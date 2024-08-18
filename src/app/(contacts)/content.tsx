'use client';

import { PlusIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { ContactsList } from './_components/ContactsList';
import { useContactsParams } from './_hooks/useContactsParams';

export function Content() {
  const params = useContactsParams();

  return (
    <main className="flex flex-1 flex-col">
      <header className="flex flex-wrap items-center justify-between gap-5 px-5 pb-5 pt-5 md:px-10 md:pt-10">
        <h1 className="text-lg font-semibold">Contacts</h1>

        <Button asChild>
          <Link
            href={`/contacts/create?page=${params.page}&limit=${params.limit}`}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Add contact
          </Link>
        </Button>
      </header>

      <div className="relative flex-1">
        <div className="absolute inset-0 flex flex-col gap-5 px-5 pb-5 md:gap-10 md:px-10 md:pb-10">
          <ContactsList />
        </div>
      </div>
    </main>
  );
}
