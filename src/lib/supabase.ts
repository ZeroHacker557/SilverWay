import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// This client is used for public client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Service role client for server-side administrative actions (like the bot)
// Using a function here prevents immediate initialization during build if keys are missing
export const getSupabaseServiceRole = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceRoleKey) {
        throw new Error('SUPABASE_SERVICE_ROLE_KEY yoki NEXT_PUBLIC_SUPABASE_URL Vercel sozlamalarida topilmadi.');
    }

    return createClient(url, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
};
