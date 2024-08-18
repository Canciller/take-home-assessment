import { useSearchParams } from 'next/navigation';

export function useContactsParams() {
  const searchParams = useSearchParams();

  return {
    page: searchParams.get('page') ?? 1,
    limit: searchParams.get('limit') ?? 10,
  };
}
