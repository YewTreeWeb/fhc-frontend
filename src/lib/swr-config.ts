import type { SWRConfiguration } from 'swr';
import { fetcher } from './fetcher';

// Global SWR configuration
export const swrConfig: SWRConfiguration = {
  fetcher,
  // Revalidate on focus
  revalidateOnFocus: true,
  // Revalidate on reconnect
  revalidateOnReconnect: true,
  // Retry on error
  errorRetryCount: 3,
  errorRetryInterval: 5000,
  // Dedupe requests within 2 seconds
  dedupingInterval: 2000,
  // Cache data for 5 minutes
  focusThrottleInterval: 5 * 60 * 1000,
  // Refresh interval (0 = disabled)
  refreshInterval: 0,
  // Loading timeout
  loadingTimeout: 3000,
  // Keep previous data when key changes
  keepPreviousData: true,
};
