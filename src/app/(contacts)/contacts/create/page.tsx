'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { CreateContactForm } from '../../_components/CreateContactForm';

export default function AddContact() {
  const router = useRouter();

  return (
    <main className="flex flex-col gap-10 p-5 md:p-10">
      <div className="flex flex-col gap-5">
        <h1 className="text-lg font-semibold">Create a new contact</h1>

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Contacts</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Create a new contact</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <CreateContactForm onSuccess={() => router.replace(`/`)} />
    </main>
  );
}
