'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { DatePicker } from '@/components/DatePicker';
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

import { useCreateContact } from '../_hooks/useCreateContact';

const formScheme = z.object({
  name: z.string().trim().min(1, 'Name is required.'),
  last_contact_date: z.date({
    required_error: 'Last contact date is required.',
  }),
  image: z.instanceof(File, {
    message: 'Image is required.',
  }),
});

export function CreateContactForm({
  onSuccess,
}: {
  onSuccess: (insertedId: string) => void;
}) {
  const mutation = useCreateContact();

  const form = useForm<z.input<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      name: '',
      last_contact_date: new Date(),
    },
  });

  const onSubmit = (values: z.output<typeof formScheme>) => {
    const formData = new FormData();
    formData.set('name', values.name);
    formData.set('last_contact_date', values.last_contact_date.toISOString());
    formData.set('image', values.image);

    mutation.mutate(formData);
  };

  useEffect(() => {
    if (mutation.data?.insertedId) {
      onSuccess(mutation.data.insertedId);
    }
  }, [mutation.data?.insertedId, onSuccess]);

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
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Image *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) =>
                    onChange(e.target.files ? e.target.files[0] : null)
                  }
                  type="file"
                  accept="image/png, image/jpeg, image/gif"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
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
          <p className="text-sm text-destructive">{mutation.error.message}</p>
        ) : null}

        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Create contact
        </Button>
      </form>
    </Form>
  );
}
