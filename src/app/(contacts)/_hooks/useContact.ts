import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';

import { GetSerializedContactResponse } from '@/app/api/(contacts)/_types/GetSerializedContactResponse';

export function useContact() {
  const params = useParams<{ id: string }>();

  return useQuery({
    queryKey: ['contact', params.id],
    queryFn: async () => {
      const res = await axios.get<GetSerializedContactResponse>(
        `/api/contacts/${params.id}`
      );
      return res.data;
    },
  });
}
