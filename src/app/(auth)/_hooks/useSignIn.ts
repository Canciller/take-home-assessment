import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export function useSignIn() {
  return useMutation({
    mutationFn: (values: { username: string; password: string }) =>
      axios.post('/api/sign-in', values),
  });
}
