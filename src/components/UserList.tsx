import { mutate } from 'swr';
import { useCreateUser, useDeleteUser, useUsers } from '../hooks/useApi';

interface User {
  id: string;
  name: string;
  email: string;
}

const UserList = () => {
  const { data: users, error, isLoading } = useUsers();
  const { createUser, isCreating } = useCreateUser();
  const { deleteUser } = useDeleteUser('');

  const handleCreateUser = async () => {
    try {
      await createUser({
        name: 'New User',
        email: 'user@example.com',
      });
      // Revalidate the users list
      mutate('/api/users');
    } catch (err) {
      console.error('Failed to create user:', err);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser();
      // Revalidate the users list
      mutate('/api/users');
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Users</h2>
      <button
        onClick={handleCreateUser}
        disabled={isCreating}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isCreating ? 'Creating...' : 'Create User'}
      </button>

      <ul>
        {users?.map((user: User) => (
          <li key={user.id} className="flex justify-between items-center p-2">
            <span>
              {user.name} - {user.email}
            </span>
            <button
              onClick={() => handleDeleteUser(user.id)}
              className="px-2 py-1 bg-red-500 text-white rounded text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
