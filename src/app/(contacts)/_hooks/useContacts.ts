import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { GetSerializedContactsResponse } from '@/app/api/(contacts)/_types/GetSerializedContactsResponse';

import { useContactsParams } from './useContactsParams';

export function useContacts() {
  const params = useContactsParams();

  return useQuery({
    retry: false,
    queryKey: ['contacts', params],
    queryFn: async () => {
      const res = await axios.get<GetSerializedContactsResponse>(
        `/api/contacts?page=${params.page}&limit=${params.limit}`
      );
      return res.data;
    },
  });
}
