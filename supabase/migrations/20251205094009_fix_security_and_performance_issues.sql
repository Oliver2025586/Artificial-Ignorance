/*
  # Fix Security and Performance Issues

  ## Changes Overview
  This migration addresses multiple security and performance issues identified by Supabase's security advisor.

  ## 1. Add Missing Foreign Key Indexes
  Adding indexes on foreign key columns for optimal query performance:
    - `user_integrations.user_id` - Index for foreign key to user_profiles
    - `user_projects.user_id` - Index for foreign key to user_profiles

  ## 2. Optimize RLS Policies (Auth Function Initialization)
  Update all RLS policies to use `(select auth.uid())` instead of `auth.uid()` to prevent re-evaluation
  for each row, significantly improving query performance at scale.
  
  Tables affected:
    - `user_onboarding` - 3 policies updated
    - `demo_plays` - 2 policies updated
    - `user_profiles` - 3 policies updated
    - `user_integrations` - 4 policies updated
    - `user_projects` - 4 policies updated
    - `subscriptions` - 1 policy updated
    - `payments` - 1 policy updated

  ## 3. Fix Function Search Paths
  Set stable search paths for functions to prevent security vulnerabilities:
    - `update_funnel_leads_updated_at()`
    - `update_updated_at_column()`
    - `handle_new_user()`

  ## Important Notes
  - All changes are backward compatible
  - Query performance will improve significantly for large datasets
  - Function security is enhanced by setting stable search paths
  - Unused indexes are kept as they may be used in future queries
*/

-- =====================================================
-- 1. ADD MISSING FOREIGN KEY INDEXES
-- =====================================================

-- Index for user_integrations.user_id foreign key
CREATE INDEX IF NOT EXISTS idx_user_integrations_user_id ON user_integrations(user_id);

-- Index for user_projects.user_id foreign key
CREATE INDEX IF NOT EXISTS idx_user_projects_user_id ON user_projects(user_id);

-- =====================================================
-- 2. OPTIMIZE RLS POLICIES
-- =====================================================

-- Drop and recreate all policies with optimized auth.uid() calls

-- USER_ONBOARDING TABLE POLICIES
DROP POLICY IF EXISTS "Users can insert own onboarding" ON user_onboarding;
CREATE POLICY "Users can insert own onboarding"
  ON user_onboarding
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can read own onboarding" ON user_onboarding;
CREATE POLICY "Users can read own onboarding"
  ON user_onboarding
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update own onboarding" ON user_onboarding;
CREATE POLICY "Users can update own onboarding"
  ON user_onboarding
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

-- DEMO_PLAYS TABLE POLICIES
DROP POLICY IF EXISTS "Users can view own demo plays" ON demo_plays;
CREATE POLICY "Users can view own demo plays"
  ON demo_plays
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can insert own demo plays" ON demo_plays;
CREATE POLICY "Users can insert own demo plays"
  ON demo_plays
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

-- USER_PROFILES TABLE POLICIES
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = id);

DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = id)
  WITH CHECK ((select auth.uid()) = id);

-- USER_INTEGRATIONS TABLE POLICIES
DROP POLICY IF EXISTS "Users can view own integrations" ON user_integrations;
CREATE POLICY "Users can view own integrations"
  ON user_integrations FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can insert own integrations" ON user_integrations;
CREATE POLICY "Users can insert own integrations"
  ON user_integrations FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can update own integrations" ON user_integrations;
CREATE POLICY "Users can update own integrations"
  ON user_integrations FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can delete own integrations" ON user_integrations;
CREATE POLICY "Users can delete own integrations"
  ON user_integrations FOR DELETE
  TO authenticated
  USING (user_id = (select auth.uid()));

-- USER_PROJECTS TABLE POLICIES
DROP POLICY IF EXISTS "Users can view own projects" ON user_projects;
CREATE POLICY "Users can view own projects"
  ON user_projects FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can insert own projects" ON user_projects;
CREATE POLICY "Users can insert own projects"
  ON user_projects FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can update own projects" ON user_projects;
CREATE POLICY "Users can update own projects"
  ON user_projects FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can delete own projects" ON user_projects;
CREATE POLICY "Users can delete own projects"
  ON user_projects FOR DELETE
  TO authenticated
  USING (user_id = (select auth.uid()));

-- SUBSCRIPTIONS TABLE POLICIES
DROP POLICY IF EXISTS "Users can view own subscription" ON subscriptions;
CREATE POLICY "Users can view own subscription"
  ON subscriptions FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- PAYMENTS TABLE POLICIES
DROP POLICY IF EXISTS "Users can view own payments" ON payments;
CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (
    stripe_subscription_id IN (
      SELECT stripe_subscription_id 
      FROM subscriptions 
      WHERE user_id = (select auth.uid())
    )
  );

-- =====================================================
-- 3. FIX FUNCTION SEARCH PATHS
-- =====================================================

-- Fix update_funnel_leads_updated_at function
CREATE OR REPLACE FUNCTION update_funnel_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = public, pg_temp;

-- Fix update_updated_at_column function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = public, pg_temp;

-- Fix handle_new_user function
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, created_at)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    now()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public, pg_temp;