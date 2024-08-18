import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';

export function useEditContact() {
  const params = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) =>
      axios.put(`/api/contacts/${params.id}`, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['contacts'],
      });

      queryClient.invalidateQueries({
        queryKey: ['contact', params.id],
      });
    },
  });
}
