// Supabase client for Grenoucerie Marketing Dashboard
// Credentials via environment variables (VITE_ prefix required for Vite)
import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL  || 'https://iveyofwlpqtohxvxvvrp.supabase.co'
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2ZXlvZndscHF0b2h4dnh2dnJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4OTI1NTksImV4cCI6MjA5NTQ2ODU1OX0.f7Xfy_anbIaB-z0u1Hn6DI5RDzjalovP2oehDflEfiE'

export const supabase = supabaseAnon
    ? createClient(supabaseUrl, supabaseAnon)
    : null

export const isConnected = !!supabaseAnon
