import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export function useSignUp() {
  return useMutation({
    mutationFn: (values: { username: string; password: string }) =>
      axios.post('/api/sign-up', values),
  });
}
