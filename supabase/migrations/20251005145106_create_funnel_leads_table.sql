/*
  # Create Funnel Leads Table

  1. New Tables
    - `funnel_leads`
      - `id` (uuid, primary key) - unique identifier for each lead
      - `industry` (text) - selected industry
      - `service_need` (text) - selected service need
      - `challenge` (text) - selected challenge
      - `name` (text) - lead's full name
      - `email` (text) - lead's business email
      - `phone` (text) - lead's phone number
      - `created_at` (timestamptz) - timestamp of submission
      - `updated_at` (timestamptz) - timestamp of last update

  2. Security
    - Enable RLS on `funnel_leads` table
    - Add policy for inserting leads (public access for form submissions)
    - Add policy for authenticated users to view all leads (for admin purposes)

  3. Indexes
    - Index on email for quick lookups
    - Index on created_at for sorting by date
*/

CREATE TABLE IF NOT EXISTS funnel_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  industry text NOT NULL,
  service_need text NOT NULL,
  challenge text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE funnel_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to insert leads"
  ON funnel_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view all leads"
  ON funnel_leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS funnel_leads_email_idx ON funnel_leads(email);
CREATE INDEX IF NOT EXISTS funnel_leads_created_at_idx ON funnel_leads(created_at DESC);

CREATE OR REPLACE FUNCTION update_funnel_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_funnel_leads_updated_at_trigger'
  ) THEN
    CREATE TRIGGER update_funnel_leads_updated_at_trigger
      BEFORE UPDATE ON funnel_leads
      FOR EACH ROW
      EXECUTE FUNCTION update_funnel_leads_updated_at();
  END IF;
END $$;
