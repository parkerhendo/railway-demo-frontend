import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUsers, useUserCount, useFetchMoreUsers, useTriggerFailure } from './hooks/fetchUsers';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from './components/ui/button';

const queryClient = new QueryClient();

function UserList() {
  const { data: users, isLoading: usersLoading, error: usersError } = useUsers();
  const { data: userCount, isLoading: countLoading } = useUserCount();
  const { mutate: fetchMore, isPending } = useFetchMoreUsers();
  const { mutate: triggerFailure } = useTriggerFailure();

  if (usersLoading) return <div>Loading...</div>;
  if (usersError) return <div>Error loading users</div>;

  return (
    <Card className="w-full relative">
      <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Users</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => triggerFailure()}
            >
              Trigger failed call
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchMore()}
              disabled={isPending}
            >
              {isPending ? 'Adding more users...' : 'Add Users'}
            </Button>
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
      <div className="mx-auto p-10 flex items-center justify-center bg-gray-50">
        <UserList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
