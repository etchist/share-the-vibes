/*
  # Fix RLS policies for stories table
  
  1. Security Changes
    - Drop existing policies
    - Add policy for anonymous story submissions
    - Add policy for public access to verified stories
    - Add admin policies for full control
    
  2. Changes
    - Use auth.jwt() instead of jwt() function
    - Ensure proper access control for stories
*/

-- Drop existing policies to start fresh
DROP POLICY IF EXISTS "Anyone can submit unverified stories" ON stories;
DROP POLICY IF EXISTS "Anyone can read verified stories" ON stories;
DROP POLICY IF EXISTS "Admin can read all stories" ON stories;
DROP POLICY IF EXISTS "Admin can insert stories" ON stories;
DROP POLICY IF EXISTS "Admin can update stories" ON stories;
DROP POLICY IF EXISTS "Admin can delete stories" ON stories;

-- Policy for submitting new stories (unverified)
CREATE POLICY "Anyone can submit unverified stories"
ON stories
FOR INSERT
TO anon
WITH CHECK (
  verified = false AND
  featured = false AND
  views = 0
);

-- Policy for reading verified stories
CREATE POLICY "Anyone can read verified stories"
ON stories
FOR SELECT
TO public
USING (verified = true);

-- Admin policies for full control
CREATE POLICY "Admin can read all stories"
ON stories
FOR SELECT
TO authenticated
USING ((auth.jwt() ->> 'role'::text) = 'admin'::text);

CREATE POLICY "Admin can insert stories"
ON stories
FOR INSERT
TO authenticated
WITH CHECK ((auth.jwt() ->> 'role'::text) = 'admin'::text);

CREATE POLICY "Admin can update stories"
ON stories
FOR UPDATE
TO authenticated
USING ((auth.jwt() ->> 'role'::text) = 'admin'::text)
WITH CHECK ((auth.jwt() ->> 'role'::text) = 'admin'::text);

CREATE POLICY "Admin can delete stories"
ON stories
FOR DELETE
TO authenticated
USING ((auth.jwt() ->> 'role'::text) = 'admin'::text);