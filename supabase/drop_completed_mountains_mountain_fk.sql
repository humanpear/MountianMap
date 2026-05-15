-- Run this once in the Supabase SQL editor if completed mountain records
-- fail to save with a foreign key error.
--
-- The app currently uses the local src/data/mountains.ts file as the mountain
-- source of truth, so completed_mountains must not require matching rows in
-- public.mountains until mountain data is seeded into Supabase.

alter table public.completed_mountains
  drop constraint if exists completed_mountains_mountain_id_fkey;
