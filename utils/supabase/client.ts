import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

// Create a singleton Supabase client for the browser
const supabaseUrl = `https://${projectId}.supabase.co`;

export const supabase = createClient(supabaseUrl, publicAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Helper to get the base API URL
export const getApiUrl = () => `https://${projectId}.supabase.co/functions/v1/make-server-16f227d8`;

// Helper to make authenticated API calls
export async function apiCall(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const url = `${getApiUrl()}${endpoint}`;
  
  // Get the current session
  const { data: { session } } = await supabase.auth.getSession();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  // Add auth token if available
  if (session?.access_token) {
    headers['Authorization'] = `Bearer ${session.access_token}`;
  } else {
    // Use public anon key if no session
    headers['Authorization'] = `Bearer ${publicAnonKey}`;
  }
  
  return fetch(url, {
    ...options,
    headers,
  });
}
