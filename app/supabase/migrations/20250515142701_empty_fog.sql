/*
  # Fix Stories RLS Policies for Anonymous Story Submission

  1. Changes
    - Drop existing RLS policies for stories table
    - Create new policy for anonymous story submissions
    - Maintain admin privileges
    - Allow public to read verified stories

  2. Security
    - Maintains RLS enabled
    - Ensures proper access control
    - Preserves admin capabilities
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Admin can manage all stories" ON stories;
DROP POLICY IF EXISTS "Public can read verified stories" ON stories;
DROP POLICY IF EXISTS "Anyone can submit stories" ON stories;

-- Allow admins full access
CREATE POLICY "Admin can manage all stories"
ON stories
FOR ALL
TO authenticated
USING ((auth.jwt() ->> 'role'::text) = 'admin'::text)
WITH CHECK ((auth.jwt() ->> 'role'::text) = 'admin'::text);

-- Allow public to read verified stories
CREATE POLICY "Public can read verified stories"
ON stories
FOR SELECT
TO public
USING (verified = true);

-- Allow anonymous users to submit stories with proper defaults
CREATE POLICY "Anyone can submit stories"
ON stories
FOR INSERT
TO public
WITH CHECK (
  -- Ensure stories start unverified
  (COALESCE(verified, false) = false) AND
  -- Prevent setting featured flag
  (COALESCE(featured, false) = false) AND
  -- Ensure views start at 0
  (COALESCE(views, 0) = 0)
);