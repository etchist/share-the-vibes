/*
  # Fix Stories RLS Policies

  1. Changes
    - Drop and recreate RLS policies for stories table
    - Allow public story submissions
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
DROP POLICY IF EXISTS "Public can submit stories" ON stories;
DROP POLICY IF EXISTS "Anyone can submit stories" ON stories;
DROP POLICY IF EXISTS "Anyone can submit unverified stories" ON stories;
DROP POLICY IF EXISTS "Anyone can read verified stories" ON stories;
DROP POLICY IF EXISTS "Admin can read all stories" ON stories;
DROP POLICY IF EXISTS "Admin can insert stories" ON stories;
DROP POLICY IF EXISTS "Admin can update stories" ON stories;
DROP POLICY IF EXISTS "Admin can delete stories" ON stories;

-- Create new policies with proper permissions
-- Allow public to submit stories
CREATE POLICY "Enable story submissions"
ON stories
FOR INSERT
TO public
WITH CHECK (true);

-- Allow public to read verified stories
CREATE POLICY "Enable reading verified stories"
ON stories
FOR SELECT
TO public
USING (verified = true);

-- Admin has full control
CREATE POLICY "Enable admin management"
ON stories
FOR ALL
TO authenticated
USING ((auth.jwt() ->> 'role'::text) = 'admin'::text)
WITH CHECK ((auth.jwt() ->> 'role'::text) = 'admin'::text);