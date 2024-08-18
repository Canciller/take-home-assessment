import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import { getSerializedContact } from '@/app/api/(contacts)/_services/getSerializedContact';

import { Content } from './content';

export default async function EditContactModal({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const queryClient = new QueryClient();

  const data = await queryClient.fetchQuery({
    queryKey: ['contact', params.id],
    queryFn: () => getSerializedContact(params.id),
  });

  if (!data.data) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Content />
    </HydrationBoundary>
  );
}
