import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function useCreateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await axios.post<{ insertedId: string }>(
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
