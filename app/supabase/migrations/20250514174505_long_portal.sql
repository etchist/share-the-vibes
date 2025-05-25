/*
  # Fix Stories RLS Policy

  1. Changes
    - Update RLS policy for story submissions to allow anonymous users to create unverified stories
    - Keep existing policies for admin and public access

  2. Security
    - Maintains security by only allowing unverified story submissions
    - Preserves admin control over verified stories
    - Keeps public read access to verified stories only
*/

-- Drop the existing "Anyone can submit stories" policy
DROP POLICY IF EXISTS "Anyone can submit stories" ON stories;

-- Create new policy for story submissions that explicitly allows unverified stories
CREATE POLICY "Anyone can submit unverified stories" ON stories
  FOR INSERT
  TO anon
  WITH CHECK (
    -- Ensure stories start as unverified
    verified = false AND
    -- Prevent setting featured flag
    featured = false AND
    -- Ensure views start at 0
    views = 0
  );