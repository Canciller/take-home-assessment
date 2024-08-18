'use client';

import { useRouter } from 'next/navigation';

import Paginator from '@/components/Paginator/Paginator';

import { ContactsListItem } from './ContactsListItem';
import { useContacts } from '../_hooks/useContacts';

export function ContactsList() {
  const router = useRouter();

  const query = useContacts();

  const data = query.data?.data ?? [];
  const error = query.error;

  const renderContent = () => {
    if (data.length) {
      return data.map((e) => {
        return (
          <ContactsListItem
            key={e._id}
            id={e._id}
            name={e.name}
            imageUrl={e.image?.signedUrl}
            lastContactDate={e.last_contact_date}
          />
        );
      });
    }

    if (query.isPending) {
      return (
        <p className="text-muted-foreground m-10 text-center text-sm">
          Loading contacts...
        </p>
      );
    }

    if (error) {
      return (
        <p className="text-destructive m-10 text-center text-sm">
          {error.message}
        </p>
      );
    }

    return (
      <p className="text-muted-foreground m-10 text-center text-sm">
        No contacts found.
      </p>
    );
  };

  return (
    <>
      <div className="overflow-auto rounded-md border">{renderContent()}</div>

      {query.data && query.data.totalPages > 1 ? (
        <Paginator
          currentPage={query.data.page}
          totalPages={query.data.totalPages}
          onPageChange={(page) =>
            router.push(`/?page=${page}&limit=${query.data.limit}`)
          }
          showPreviousNext
        />
      ) : null}
    </>
  );
}
