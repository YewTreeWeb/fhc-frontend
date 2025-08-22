// Generic fetcher function for SWR
export const fetcher = async (url: string): Promise<any> => {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.');
    // Attach extra info to the error object
    (error as any).info = await response.json();
    (error as any).status = response.status;
    throw error;
  }

  return response.json();
};

// POST/PUT/DELETE fetcher for mutations
export const mutationFetcher = async (
  url: string,
  {
    arg,
  }: { arg: { method: string; data?: any; headers?: Record<string, string> } }
) => {
  const { method, data, headers = {} } = arg;

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (data && method !== 'GET') {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const error = new Error(`HTTP error! status: ${response.status}`);
    (error as any).info = await response.json().catch(() => ({}));
    (error as any).status = response.status;
    throw error;
  }

  return response.json();
};
