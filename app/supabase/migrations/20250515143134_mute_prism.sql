/*
  # Fix Story Submission RLS Policy

  1. Changes
    - Drop existing policies for stories table
    - Create new policy for public story submissions
    - Maintain admin access policies
    - Keep public read access for verified stories

  2. Security
    - Allow anonymous users to submit stories
    - Ensure proper default values for new stories
    - Maintain data integrity
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Admin can manage all stories" ON stories;
DROP POLICY IF EXISTS "Public can read verified stories" ON stories;
DROP POLICY IF EXISTS "Anyone can submit stories" ON stories;

-- Create policy for public story submissions
CREATE POLICY "Public can submit stories"
ON stories
FOR INSERT
TO public
WITH CHECK (true);

-- Allow public to read verified stories
CREATE POLICY "Public can read verified stories"
ON stories
FOR SELECT
TO public
USING (verified = true);

-- Admin has full control
CREATE POLICY "Admin can manage all stories"
ON stories
FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin')
WITH CHECK (auth.jwt() ->> 'role' = 'admin');