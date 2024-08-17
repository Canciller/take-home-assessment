import { formatDate } from 'date-fns';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
  return (
    <Link
      href={`/contacts/${id}`}
      className="flex items-center justify-between border-b px-5 py-2 last:border-none hover:bg-accent"
    >
      <div className="flex items-center gap-5">
        <Avatar className="h-12 w-12">
          <AvatarImage className="object-cover" src={imageUrl} />
          <AvatarFallback>{name.at(0)?.toUpperCase()}</AvatarFallback>
        </Avatar>

        <p>{name}</p>
      </div>

      <p className="text-sm text-muted-foreground">
        {formatDate(new Date(lastContactDate), 'PPP, hh:mm aaa')}
      </p>
    </Link>
  );
}
