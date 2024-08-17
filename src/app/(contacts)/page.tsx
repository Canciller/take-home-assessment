import { PlusIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="p-10">
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold">Contacts</h1>

        <Button asChild>
          <Link href="/contacts/create">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add contact
          </Link>
        </Button>
      </div>
    </main>
  );
}
