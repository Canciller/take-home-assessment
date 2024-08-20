import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: { username: string; password: string }) =>
      axios.post('/api/sign-in', values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['me'],
      });
    },
  });
}
