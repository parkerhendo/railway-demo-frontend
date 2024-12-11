import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUsers } from './hooks/fetchUsers';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import React from 'react';

const queryClient = new QueryClient();

function UserList() {
  const { data: users, isLoading, error } = useUsers();
 
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  // Add mock data for testing
  const mockUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com", 
      phone: "(555) 123-4567",
      company: "Acme Corp"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "(555) 987-6543", 
      company: "TechCo Inc"
    },
    {
      id: 3,
      name: "Bob Wilson",
      email: "bob@example.com",
      phone: "(555) 246-8135",
      company: "Global Systems"
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.first_name + " " + user.last_name}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto p-10 flex items-center justify-center">
        <UserList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
