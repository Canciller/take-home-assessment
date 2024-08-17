import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

import { GetSerializedContactsResponse } from '@/app/api/(contacts)/_types/GetSerializedContactsResponse';

export function useContacts() {
  const searchParams = useSearchParams();

  const params = {
    page: searchParams.get('page') ?? 1,
    limit: searchParams.get('limt') ?? 10,
  };

  return useQuery({
    queryKey: ['contacts', params],
    queryFn: async () => {
      const res = await axios.get<GetSerializedContactsResponse>(
        `/api/contacts?page=${params.page}&limit=${params.limit}`
      );
      return res.data;
    },
  });
}
