/*
  # Create Subscriptions and Payments Tables

  1. New Tables
    - `subscriptions`
      - `id` (uuid, primary key) - Unique subscription identifier
      - `user_id` (uuid, foreign key) - References auth.users
      - `stripe_customer_id` (text) - Stripe customer ID
      - `stripe_subscription_id` (text, unique) - Stripe subscription ID
      - `plan_name` (text) - Name of the subscribed plan (Starter, Professional, Growth, Agency)
      - `billing_period` (text) - Billing period (monthly, yearly)
      - `status` (text) - Subscription status (active, canceled, past_due, etc.)
      - `current_period_start` (timestamptz) - Current billing period start
      - `current_period_end` (timestamptz) - Current billing period end
      - `created_at` (timestamptz) - When subscription was created
      - `updated_at` (timestamptz) - When subscription was last updated

    - `payments`
      - `id` (uuid, primary key) - Unique payment identifier
      - `stripe_invoice_id` (text, unique) - Stripe invoice ID
      - `stripe_subscription_id` (text) - References subscription
      - `amount` (integer) - Payment amount in cents
      - `currency` (text) - Payment currency (default GBP)
      - `status` (text) - Payment status (succeeded, failed, pending)
      - `paid_at` (timestamptz) - When payment was completed
      - `created_at` (timestamptz) - When payment record was created

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to read their own subscription and payment data
    - Only service role can write to these tables (via webhook)

  3. Indexes
    - Index on user_id for fast subscription lookups
    - Index on stripe_subscription_id for webhook processing
    - Index on stripe_customer_id for Stripe operations
*/

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id text,
  stripe_subscription_id text UNIQUE,
  plan_name text NOT NULL,
  billing_period text NOT NULL CHECK (billing_period IN ('monthly', 'yearly')),
  status text NOT NULL DEFAULT 'active',
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_invoice_id text UNIQUE,
  stripe_subscription_id text,
  amount integer NOT NULL,
  currency text NOT NULL DEFAULT 'gbp',
  status text NOT NULL,
  paid_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_subscription_id ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer_id ON subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_payments_stripe_subscription_id ON payments(stripe_subscription_id);

-- Enable RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Subscriptions policies
CREATE POLICY "Users can view own subscription"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Payments policies
CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (
    stripe_subscription_id IN (
      SELECT stripe_subscription_id 
      FROM subscriptions 
      WHERE user_id = auth.uid()
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();