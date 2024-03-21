import { Session } from '@supabase/supabase-js';
import { supabase } from '@/supabaseClient';
import { useState, useEffect } from 'react';

export default function useSession() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async function getSession() {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    }

    getSession();
  }, []);

  return session;
}
