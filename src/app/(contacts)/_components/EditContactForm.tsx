'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { DatePicker } from '@/components/DatePicker';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useContact } from '../_hooks/useContact';
import { useEditContact } from '../_hooks/useEditContact';

const formScheme = z.object({
  name: z.string().trim().min(1, 'Name is required.'),
  last_contact_date: z.date({
    required_error: 'Last contact date is required.',
  }),
  image: z.instanceof(File).optional(),
});

export function EditContactForm({ onSuccess }: { onSuccess?: () => void }) {
  const query = useContact();
  const contact = query.data?.data;

  const mutation = useEditContact();

  const form = useForm<z.input<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      name: contact?.name ?? '',
      last_contact_date: contact?.last_contact_date
        ? new Date(contact.last_contact_date)
        : new Date(),
    },
  });

  const onSubmit = (values: z.output<typeof formScheme>) => {
    const formData = new FormData();
    formData.set('name', values.name);
    formData.set('last_contact_date', values.last_contact_date.toISOString());
    if (values.image) {
      formData.set('image', values.image);
    }

    mutation.mutate(formData);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      onSuccess?.();
    }
  }, [mutation.isSuccess, onSuccess]);

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          disabled={mutation.isPending}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name *</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter contact name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={mutation.isPending}
          control={form.control}
          name="image"
          render={({ field }) => (
            <ImageFormItem
              field={field}
              signedUrl={contact?.image?.signedUrl}
              name={contact?.name}
            />
          )}
        />

        <FormField
          control={form.control}
          name="last_contact_date"
          render={({ field: { onChange, value } }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Last contact date *</FormLabel>
              <FormControl>
                <DatePicker
                  value={value}
                  onChange={onChange}
                  disabled={mutation.isPending}
                  calendarDisabled={(date) => date > new Date()}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {mutation.error ? (
          <p className="text-destructive text-sm">{mutation.error.message}</p>
        ) : null}

        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Update contact
        </Button>
      </form>
    </Form>
  );
}

function ImageFormItem({
  field: { onChange, value, ...field },
  signedUrl,
  name,
}: {
  field: any;
  signedUrl?: string;
  name?: string;
}) {
  const [src, setSrc] = useState<string | undefined>(undefined);

  return (
    <FormItem>
      <FormLabel>Image</FormLabel>
      <FormControl>
        <>
          <Avatar className="h-20 w-20">
            <AvatarImage className="object-cover" src={src ?? signedUrl} />
            <AvatarFallback>{name?.at(0)?.toUpperCase()}</AvatarFallback>
          </Avatar>

          <Input
            {...field}
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : undefined;
              onChange(file);

              if (!file) {
                setSrc(undefined);
                return;
              }

              var fr = new FileReader();
              fr.onload = function () {
                if (fr.result) {
                  setSrc(fr.result.toString());
                }
              };

              fr.readAsDataURL(file);
            }}
            type="file"
            accept="image/png, image/jpeg, image/gif"
          />
        </>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
