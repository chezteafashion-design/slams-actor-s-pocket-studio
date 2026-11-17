-- SLAMS Phase 1: accounts, roles, settings

create type public.app_role as enum ('admin', 'coach', 'actor');
create type public.experience_level as enum ('beginner', 'developing', 'experienced', 'professional', 'returning');
create type public.language_intensity as enum ('full', 'softened');

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- Profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '' check (char_length(display_name) <= 80),
  experience_level public.experience_level,
  goals text not null default '' check (char_length(goals) <= 1000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "Actors read their own profile" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "Actors update their own profile" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create trigger profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();

-- Roles (separate table; never on profiles)
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users read their own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

-- Settings
create table public.user_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  language_intensity public.language_intensity not null default 'full',
  reduced_motion boolean not null default false,
  captions boolean not null default true,
  recording_countdown smallint not null default 3 check (recording_countdown in (3, 5, 10)),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, update on public.user_settings to authenticated;
grant all on public.user_settings to service_role;
alter table public.user_settings enable row level security;
create policy "Actors read their own settings" on public.user_settings for select to authenticated using (auth.uid() = user_id);
create policy "Actors update their own settings" on public.user_settings for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create trigger user_settings_updated_at before update on public.user_settings for each row execute function public.set_updated_at();

-- New account: profile, settings and the actor role
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, left(coalesce(new.raw_user_meta_data ->> 'display_name', new.raw_user_meta_data ->> 'full_name', ''), 80));
  insert into public.user_settings (user_id) values (new.id);
  insert into public.user_roles (user_id, role) values (new.id, 'actor');
  return new;
end $$;

create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

revoke execute on function public.handle_new_user() from public, anon, authenticated;