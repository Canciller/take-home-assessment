import { formatDate } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

import { useContactsParams } from '../_hooks/useContactsParams';

export function ContactsListItem({
  id,
  imageUrl,
  name,
  lastContactDate,
}: {
  id: string;
  imageUrl?: string;
  name: string;
  lastContactDate: string;
}) {
  const params = useContactsParams();

  return (
    <Link
      href={`/contacts/${id}?page=${params.page}&limit=${params.limit}`}
      className="hover:bg-accent flex items-center justify-between border-b px-5 py-2 last:border-none"
    >
      <div className="flex items-center gap-5">
        {imageUrl ? (
          <Image
            className="h-16 w-16 rounded-full object-cover"
            src={imageUrl}
            width={128}
            height={128}
            alt={`${name} image`}
          />
        ) : (
          <div className="bg-muted text-foreground flex h-16 w-16 items-center justify-center rounded-full">
            {name.at(0)?.toUpperCase()}
          </div>
        )}

        <p>{name}</p>
      </div>

      <p className="text-muted-foreground text-sm">
        {formatDate(new Date(lastContactDate), 'PPP, hh:mm aaa')}
      </p>
    </Link>
  );
}
