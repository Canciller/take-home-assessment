'use client';

import { ContactsListItem } from './ContactsListItem';
import { useContacts } from '../_hooks/useContacts';

export function ContactsList() {
  const query = useContacts();

  const data = query.data?.data ?? [];

  return (
    <div className="overflow-auto rounded-md border">
      {data.length ? (
        data.map((e) => {
          return (
            <ContactsListItem
              key={e._id}
              id={e._id}
              name={e.name}
              imageUrl={e.image?.signedUrl}
              lastContactDate={e.last_contact_date}
            />
          );
        })
      ) : (
        <p className="m-10 text-center text-sm text-muted-foreground">
          No contacts have been added.
        </p>
      )}
    </div>
  );
}
