import { createClient } from '@supabase/supabase-js'

// Original Supabase (existing articles)
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

// Your own Supabase (your new articles — shown first)
export const supabaseOwn = createClient(
  import.meta.env.VITE_SUPABASE_URL_OWN,
  import.meta.env.VITE_SUPABASE_ANON_KEY_OWN
)