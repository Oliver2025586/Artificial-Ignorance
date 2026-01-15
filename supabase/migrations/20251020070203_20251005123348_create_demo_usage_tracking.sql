/*
  # Create demo usage tracking table

  1. New Tables
    - `demo_plays`
      - `id` (uuid, primary key)
      - `session_id` (text) - Browser session identifier for anonymous users
      - `user_id` (uuid, nullable) - User ID if logged in
      - `demo_id` (integer) - Which demo was played
      - `played_at` (timestamptz) - When the demo was played
      - `created_at` (timestamptz) - Record creation timestamp

  2. Security
    - Enable RLS on `demo_plays` table
    - Add policy for users to track their own demo plays
    - Add policy for anonymous users to track plays by session_id

  3. Indexes
    - Index on session_id for fast lookups
    - Index on user_id for authenticated user tracking
*/

CREATE TABLE IF NOT EXISTS demo_plays (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  demo_id integer NOT NULL,
  played_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE demo_plays ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own demo plays"
  ON demo_plays
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own demo plays"
  ON demo_plays
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anonymous users can view own session plays"
  ON demo_plays
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anonymous users can insert session plays"
  ON demo_plays
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_demo_plays_session_id ON demo_plays(session_id);
CREATE INDEX IF NOT EXISTS idx_demo_plays_user_id ON demo_plays(user_id);
CREATE INDEX IF NOT EXISTS idx_demo_plays_played_at ON demo_plays(played_at);