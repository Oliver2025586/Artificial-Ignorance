/*
  # Create user onboarding table

  1. New Tables
    - `user_onboarding`
      - `id` (uuid, primary key) - Unique identifier for each onboarding record
      - `user_id` (uuid, foreign key) - References auth.users table
      - `company_name` (text) - Name of the user's company
      - `industry` (text) - Industry the company operates in
      - `team_size` (text) - Size of the team (e.g., "1-10", "11-50")
      - `use_case` (text) - Primary use case for the AI voice platform
      - `goals` (text, nullable) - User's goals and objectives
      - `completed_at` (timestamptz) - When onboarding was completed
      - `created_at` (timestamptz) - When record was created

  2. Security
    - Enable RLS on `user_onboarding` table
    - Add policy for authenticated users to insert their own onboarding data
    - Add policy for authenticated users to read their own onboarding data
    - Add policy for authenticated users to update their own onboarding data
*/

-- Create the user_onboarding table
CREATE TABLE IF NOT EXISTS user_onboarding (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name text NOT NULL,
  industry text NOT NULL,
  team_size text NOT NULL,
  use_case text NOT NULL,
  goals text,
  completed_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE user_onboarding ENABLE ROW LEVEL SECURITY;

-- Policy: Users can insert their own onboarding data
CREATE POLICY "Users can insert own onboarding"
  ON user_onboarding
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can read their own onboarding data
CREATE POLICY "Users can read own onboarding"
  ON user_onboarding
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Users can update their own onboarding data
CREATE POLICY "Users can update own onboarding"
  ON user_onboarding
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create index for faster user_id lookups
CREATE INDEX IF NOT EXISTS idx_user_onboarding_user_id ON user_onboarding(user_id);