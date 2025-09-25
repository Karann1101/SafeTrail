import { createClient } from '@supabase/supabase-js';

// Read from public env for Expo apps
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string | undefined;
// Support either the older ANON key name or the new publishable key name
const supabasePublicKey =
  (process.env.EXPO_PUBLIC_SUPABASE_KEY as string | undefined) ??
  (process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string | undefined);

if (!supabaseUrl || !supabasePublicKey) {
  // Throwing helps catch misconfiguration immediately during development
  throw new Error('Missing Supabase env. Define EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabasePublicKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});


