import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
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

export function useUserCount() {
  return useQuery<{ total: number }>({
    queryKey: ['user-count'],
    queryFn: async () => {
      const { data } = await axios.get('https://hn-api-write-to-postgres-production.up.railway.app/api/user-count');
      return data;
    },
  });
}

export function useFetchMoreUsers() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.post('https://hn-api-write-to-postgres-production.up.railway.app/api/fetch-users');
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch users and count
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user-count'] });
    },
  });
} 