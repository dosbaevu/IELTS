// ============================================
// TargetBand9 — Supabase client & auth helpers
// ============================================
// 1. Create a free project at https://supabase.com
// 2. Go to Project Settings → API
// 3. Paste your Project URL and anon public key below
// ============================================

const SUPABASE_URL = "https://ecumkjiqbdvooebkhsvz.supabase.co"; // e.g. https://xxxxx.supabase.co
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjdW1ramlxYmR2b29lYmtoc3Z6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1NzM0NjMsImV4cCI6MjEwMTE0OTQ2M30.bMo-3jWKk2mAvYMuK9gpbHhQpR0KNIsOW_gHV5YJg0A";

const supabaseClient = (SUPABASE_URL !== "YOUR_SUPABASE_PROJECT_URL")
  ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

/*
  ONE-TIME DATABASE SETUP
  Run this in Supabase → SQL Editor once:

  create table profiles (
    id uuid references auth.users on delete cascade primary key,
    email text,
    is_premium boolean default false,
    created_at timestamp default now()
  );

  alter table profiles enable row level security;

  create policy "Users can view own profile"
    on profiles for select using (auth.uid() = id);

  create policy "Users can update own profile"
    on profiles for update using (auth.uid() = id);

  -- Auto-create a profile row whenever someone signs up
  create function public.handle_new_user()
  returns trigger as $$
  begin
    insert into public.profiles (id, email)
    values (new.id, new.email);
    return new;
  end;
  $$ language plpgsql security definer;

  create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();
*/

async function signUp(email, password) {
  if (!supabaseClient) return { error: { message: "Supabase not configured yet." } };
  return await supabaseClient.auth.signUp({ email, password });
}

async function signIn(email, password) {
  if (!supabaseClient) return { error: { message: "Supabase not configured yet." } };
  return await supabaseClient.auth.signInWithPassword({ email, password });
}

async function signOut() {
  if (!supabaseClient) return;
  await supabaseClient.auth.signOut();
  window.location.href = "index.html";
}

async function getCurrentUser() {
  if (!supabaseClient) return null;
  const { data } = await supabaseClient.auth.getUser();
  return data?.user || null;
}

async function isPremiumUser() {
  const user = await getCurrentUser();
  if (!user) return false;
  const { data } = await supabaseClient
    .from("profiles")
    .select("is_premium")
    .eq("id", user.id)
    .single();
  return data?.is_premium === true;
}

// Guards a premium page: redirects to login if signed out,
// or to pricing if signed in but not subscribed.
async function requirePremium() {
  const user = await getCurrentUser();
  if (!user) {
    window.location.href = "login.html";
    return false;
  }
  const premium = await isPremiumUser();
  if (!premium) {
    window.location.href = "pricing.html";
    return false;
  }
  return true;
}
