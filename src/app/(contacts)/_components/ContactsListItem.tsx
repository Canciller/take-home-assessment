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

  const formattedDate = formatDate(new Date(lastContactDate), 'PPP, hh:mm aaa');

  return (
    <Link
      href={`/contacts/${id}?page=${params.page}&limit=${params.limit}`}
      className="relative flex items-center justify-between gap-5 border-b px-5 py-2 last:border-none hover:bg-accent"
    >
      <div className="flex flex-1 items-center justify-between">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-5">
          {imageUrl ? (
            <Image
              className="h-20 w-20 rounded-full object-cover md:h-16 md:w-16"
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

          <div>
            <p>{name}</p>
            <p className="text-sm text-muted-foreground md:hidden">
              {formattedDate}
            </p>
          </div>
        </div>

        <p className="hidden text-sm text-muted-foreground md:block">
          {formattedDate}
        </p>
      </div>

      <Actions contactId={id} />
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
          <Button
            variant="outline"
            className="absolute right-5 top-5 h-8 w-8 p-0 md:relative md:right-auto md:top-auto"
          >
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
