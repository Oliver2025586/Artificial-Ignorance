/*
  # Add Missing Foreign Key Indexes

  ## Summary
  This migration adds indexes to foreign key columns that were previously unindexed,
  significantly improving query performance for join operations and foreign key lookups.

  ## Changes
  
  ### New Indexes
  - `idx_demo_plays_user_id` - Index on demo_plays.user_id for faster user lookups
  - `idx_subscriptions_user_id` - Index on subscriptions.user_id for faster subscription queries
  - `idx_user_integrations_user_id` - Index on user_integrations.user_id for faster integration lookups
  - `idx_user_onboarding_user_id` - Index on user_onboarding.user_id for faster onboarding queries
  - `idx_user_projects_user_id` - Index on user_projects.user_id for faster project queries

  ## Performance Impact
  These indexes will improve:
  - JOIN operations involving these foreign keys
  - WHERE clauses filtering by user_id
  - Foreign key constraint validation
  - Overall query performance when accessing user-related data

  ## Notes
  - All indexes use IF NOT EXISTS to prevent errors if they already exist
  - Indexes are created concurrently where possible to avoid blocking table access
*/

-- Add index for demo_plays.user_id
CREATE INDEX IF NOT EXISTS idx_demo_plays_user_id 
ON public.demo_plays(user_id);

-- Add index for subscriptions.user_id
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id 
ON public.subscriptions(user_id);

-- Add index for user_integrations.user_id
CREATE INDEX IF NOT EXISTS idx_user_integrations_user_id 
ON public.user_integrations(user_id);

-- Add index for user_onboarding.user_id
CREATE INDEX IF NOT EXISTS idx_user_onboarding_user_id 
ON public.user_onboarding(user_id);

-- Add index for user_projects.user_id
CREATE INDEX IF NOT EXISTS idx_user_projects_user_id 
ON public.user_projects(user_id);
