import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
}

export function useUsers() {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axios.get('https://hn-api-write-to-postgres-production.up.railway.app/api/users');
      return data;
    },
  });
} 