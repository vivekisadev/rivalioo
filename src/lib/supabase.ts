
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('🔧 Initializing Supabase client...');
console.log('📍 URL:', supabaseUrl);
console.log('🔑 Key present:', !!supabaseAnonKey);
console.log('🔑 Key length:', supabaseAnonKey?.length);

let client = null;

try {
    if (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')) {
        console.log('✅ Creating Supabase client...');
        client = createClient(supabaseUrl, supabaseAnonKey, {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true
            },
            db: {
                schema: 'public',
            },
            global: {
                headers: {
                    'apikey': supabaseAnonKey,
                    'Authorization': `Bearer ${supabaseAnonKey}`
                }
            }
        });
        console.log('✅ Supabase client created successfully!');
    } else {
        console.error("❌ Supabase configuration missing or invalid!");
        console.error('URL valid:', supabaseUrl?.startsWith('http'));
        console.error('Key present:', !!supabaseAnonKey);
    }
} catch (error) {
    console.error("❌ Error initializing Supabase client:", error);
}

export const supabase = client;
