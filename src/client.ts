import { createClient } from '@supabase/supabase-js';
import { Database } from './types/Database';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
  ? import.meta.env.VITE_SUPABASE_URL
  : '';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
  ? import.meta.env.VITE_SUPABASE_ANON_KEY
  : '';
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);

export const KAKAO_KEY = import.meta.env.VITE_KAKAO_KEY;