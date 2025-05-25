/*
  # Fix Stories RLS Policies

  1. Changes
    - Drop existing RLS policies for stories table
    - Create new, more permissive policies for story submission
    - Maintain admin privileges
    - Allow public to read verified stories
    - Allow anonymous users to submit stories

  2. Security
    - Maintains RLS enabled
    - Ensures proper access control
    - Preserves admin capabilities
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Admin can delete stories" ON stories;
DROP POLICY IF EXISTS "Admin can insert stories" ON stories;
DROP POLICY IF EXISTS "Admin can read all stories" ON stories;
DROP POLICY IF EXISTS "Admin can update stories" ON stories;
DROP POLICY IF EXISTS "Anyone can read verified stories" ON stories;
DROP POLICY IF EXISTS "Anyone can submit unverified stories" ON stories;

-- Recreate policies with proper permissions
-- Allow admins full access
CREATE POLICY "Admin can manage all stories"
ON stories
FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin')
WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Allow public to read verified stories
CREATE POLICY "Public can read verified stories"
ON stories
FOR SELECT
TO public
USING (verified = true);

-- Allow anonymous users to submit stories
CREATE POLICY "Anyone can submit stories"
ON stories
FOR INSERT
TO anon
WITH CHECK (
  verified = false AND 
  featured = false AND 
  views = 0
);