import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await axios.get<{ _id: string; username: string }>('/api/me');
      return res.data;
    },
  });
}
