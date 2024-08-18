import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import { Content } from './content';
import { getSerializedContacts } from '../api/(contacts)/_services/getSerializedContacts';

export default async function Home({
  searchParams,
}: {
  searchParams: {
    limit?: string;
    page?: string;
  };
}) {
  const queryClient = new QueryClient();

  const params = {
    page: searchParams.page ?? '1',
    limit: searchParams.limit ?? '10',
  };

  await queryClient.prefetchQuery({
    queryKey: ['contacts', params],
    queryFn: () => getSerializedContacts(params),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Content />
    </HydrationBoundary>
  );
}
