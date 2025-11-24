// Подключение к Supabase
import { createClient } from '@supabase/supabase-js'

// Замените эти значения на ваши данные из Supabase dashboard
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key-here'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Function to initialize Supabase client
export const initSupabase = async () => {
  if (supabaseUrl && supabaseAnonKey) {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      supabase = createClient(supabaseUrl, supabaseAnonKey);
      return supabase;
    } catch (error) {
      console.error('Error initializing Supabase client:', error);
      return null;
    }
  }
  return null;
};

// Getter function for Supabase client
export const getSupabase = () => supabase;