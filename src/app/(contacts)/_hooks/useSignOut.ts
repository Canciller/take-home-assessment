import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function useSignOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => axios.post('/api/sign-out'),
    onSuccess: () => {
      queryClient.clear();
    },
  });
}
