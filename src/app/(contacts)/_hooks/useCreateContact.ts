import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { SerializedCreateContactResponse } from '@/app/api/(contacts)/_types/SerializedCreateContactResponse';

export function useCreateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await axios.post<SerializedCreateContactResponse>(
        '/api/contacts/create',
        formData
      );

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['contacts'],
      });
    },
  });
}
