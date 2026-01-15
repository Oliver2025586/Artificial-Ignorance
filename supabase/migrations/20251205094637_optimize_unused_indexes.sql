/*
  # Optimize Database Indexes

  ## Changes Overview
  Remove genuinely unnecessary indexes while keeping critical ones for RLS policies,
  foreign key relationships, and high-frequency queries.

  ## Indexes Being REMOVED (3 total)
  These indexes are for low-priority admin/analytics queries:
    - `idx_demo_plays_played_at` - Time-based analytics are not performance-critical
    - `funnel_leads_email_idx` - Admin lead lookups are low-volume
    - `funnel_leads_created_at_idx` - Admin lead sorting is not performance-critical

  ## Indexes Being KEPT (9 total)
  These are critical for application performance:
    - `idx_user_integrations_user_id` - Required for foreign key joins and RLS policy filtering
    - `idx_user_projects_user_id` - Required for foreign key joins and RLS policy filtering
    - `idx_user_onboarding_user_id` - Required for RLS policy filtering (WHERE user_id = auth.uid())
    - `idx_demo_plays_session_id` - Required for anonymous session tracking
    - `idx_demo_plays_user_id` - Required for RLS policy filtering (WHERE user_id = auth.uid())
    - `idx_subscriptions_user_id` - Required for RLS policy filtering (WHERE user_id = auth.uid())
    - `idx_subscriptions_stripe_subscription_id` - Required for webhook processing and lookups
    - `idx_subscriptions_stripe_customer_id` - Required for Stripe API operations
    - `idx_payments_stripe_subscription_id` - Required for RLS policy subquery join

  ## Performance Impact
  - Removing 3 low-priority indexes reduces storage and write overhead
  - Keeping 9 critical indexes ensures RLS policies and foreign key joins remain fast
  - Overall database write performance improves slightly
  - Query performance for critical user-facing operations remains optimal

  ## Important Notes
  "Unused" indexes in a new database will show as unused until queries run against them.
  The indexes being kept are essential for production workloads and RLS policy performance.
*/

-- =====================================================
-- REMOVE LOW-PRIORITY INDEXES
-- =====================================================

-- Drop time-based analytics index (not critical for performance)
DROP INDEX IF EXISTS idx_demo_plays_played_at;

-- Drop lead email lookup index (low-volume admin queries)
DROP INDEX IF EXISTS funnel_leads_email_idx;

-- Drop lead sorting index (table scans acceptable for admin queries)
DROP INDEX IF EXISTS funnel_leads_created_at_idx;

-- =====================================================
-- VERIFY CRITICAL INDEXES EXIST
-- =====================================================

-- These indexes are essential and must remain:
-- idx_user_integrations_user_id (foreign key + RLS)
-- idx_user_projects_user_id (foreign key + RLS)
-- idx_user_onboarding_user_id (RLS)
-- idx_demo_plays_session_id (session tracking)
-- idx_demo_plays_user_id (RLS)
-- idx_subscriptions_user_id (RLS)
-- idx_subscriptions_stripe_subscription_id (webhooks)
-- idx_subscriptions_stripe_customer_id (Stripe API)
-- idx_payments_stripe_subscription_id (RLS subquery)