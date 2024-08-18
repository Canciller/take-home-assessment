import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function useDeleteContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => axios.delete(`/api/contacts/${id}`),
    onSuccess: (_: any, id: string) => {
      queryClient.invalidateQueries({
        queryKey: ['contacts'],
      });

      queryClient.removeQueries({
        queryKey: ['contact', id],
      });
    },
  });
}
