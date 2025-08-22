import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { fetcher, mutationFetcher } from '../lib/fetcher';

// Generic hook for GET requests
export function useApi<T = any>(url: string | null, options?: any) {
  return useSWR<T>(url, fetcher, options);
}

// Hook for POST requests
export function usePost<T = any>(url: string) {
  return useSWRMutation<T>(url, mutationFetcher);
}

// Hook for PUT requests
export function usePut<T = any>(url: string) {
  return useSWRMutation<T>(url, mutationFetcher);
}

// Hook for DELETE requests
export function useDelete<T = any>(url: string) {
  return useSWRMutation<T>(url, mutationFetcher);
}

// Example usage hooks for common patterns
export function useUser(id?: string) {
  return useApi(id ? `/api/users/${id}` : null);
}

export function useUsers() {
  return useApi('/api/users');
}

export function useCreateUser() {
  const { trigger, isMutating, error } = usePost('/api/users');

  const createUser = async (userData: any) => {
    return trigger({ method: 'POST', data: userData });
  };

  return { createUser, isCreating: isMutating, error };
}

export function useUpdateUser(id: string) {
  const { trigger, isMutating, error } = usePut(`/api/users/${id}`);

  const updateUser = async (userData: any) => {
    return trigger({ method: 'PUT', data: userData });
  };

  return { updateUser, isUpdating: isMutating, error };
}

export function useDeleteUser(id: string) {
  const { trigger, isMutating, error } = useDelete(`/api/users/${id}`);

  const deleteUser = async () => {
    return trigger({ method: 'DELETE' });
  };

  return { deleteUser, isDeleting: isMutating, error };
}
