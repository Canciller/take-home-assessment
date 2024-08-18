import { ReloadIcon } from '@radix-ui/react-icons';
import { formatDate } from 'date-fns';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useContactsParams } from '../_hooks/useContactsParams';
import { useDeleteContact } from '../_hooks/useDeleteContact';

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
      className="flex items-center justify-between border-b px-5 py-2 last:border-none hover:bg-accent"
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
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-foreground">
            {name.at(0)?.toUpperCase()}
          </div>
        )}

        <p>{name}</p>
      </div>

      <div className="flex items-center gap-5">
        <p className="text-sm text-muted-foreground">
          {formatDate(new Date(lastContactDate), 'PPP, hh:mm aaa')}
        </p>

        <Actions contactId={id} />
      </div>
    </Link>
  );
}

function Actions({ contactId }: { contactId: string }) {
  const mutation = useDeleteContact();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (mutation.isSuccess) {
      setOpen(false);
    }
  }, [mutation.isSuccess]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DialogTrigger asChild>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              Remove contact
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            remove this contact?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={mutation.isPending}
            type="submit"
            variant="destructive"
            onClick={() => mutation.mutate(contactId)}
          >
            {mutation.isPending ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
