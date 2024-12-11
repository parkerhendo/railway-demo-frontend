import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUsers, useUserCount, useFetchMoreUsers } from './hooks/fetchUsers';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const queryClient = new QueryClient();

function UserList() {
  const { data: users, isLoading: usersLoading, error: usersError } = useUsers();
  const { data: userCount, isLoading: countLoading } = useUserCount();
  const { mutate: fetchMore, isPending } = useFetchMoreUsers();

  if (usersLoading) return <div>Loading...</div>;
  if (usersError) return <div>Error loading users</div>;

  return (
    <Card className="w-full relative">
      {isPending && (
        <div className="absolute top-0 left-0 right-0 bg-primary/10 text-primary py-2 text-center text-sm font-medium">
          Adding users...
        </div>
      )}
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <CardTitle>Users</CardTitle>
          <button
            onClick={() => fetchMore()}
            disabled={isPending}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            {isPending ? 'Adding Users...' : 'Add Users'}
          </button>
        </div>
        <div className="text-sm text-gray-500">
          Total Users: {countLoading ? "Loading..." : userCount?.total || 0}
        </div>
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
