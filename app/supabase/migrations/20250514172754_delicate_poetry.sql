/*
  # Initial Schema for Vibe Coding Horrors

  1. New Tables
    - `stories` - Main table for storing coding horror stories
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `title` (text)
      - `content` (text - stores HTML content)
      - `email` (text)
      - `verified` (boolean)
      - `views` (integer)
      - `featured` (boolean)
      - `tags` (text array)
    
    - `tags` - Table for storing tag metadata
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `count` (integer)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated admin users to manage content
    - Add policies for public access to read published stories
*/

-- Create stories table
CREATE TABLE IF NOT EXISTS stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  content text NOT NULL,
  email text NOT NULL,
  verified boolean DEFAULT false,
  views integer DEFAULT 0,
  featured boolean DEFAULT false,
  tags text[] DEFAULT '{}'
);

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  count integer DEFAULT 0
);

-- Enable Row Level Security
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

-- Create function to increment counters
CREATE OR REPLACE FUNCTION increment(x int) RETURNS int AS $$
  BEGIN
    RETURN x + 1;
  END;
$$ LANGUAGE plpgsql;

-- RLS Policies for stories table

-- Anyone can read verified stories
CREATE POLICY "Anyone can read verified stories" 
  ON stories 
  FOR SELECT 
  USING (verified = true);

-- Admin can read all stories
CREATE POLICY "Admin can read all stories" 
  ON stories 
  FOR SELECT 
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Admin can insert, update, delete stories
CREATE POLICY "Admin can insert stories" 
  ON stories 
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin can update stories" 
  ON stories 
  FOR UPDATE 
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin can delete stories" 
  ON stories 
  FOR DELETE 
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Anonymous users can submit new stories (but they start as unverified)
CREATE POLICY "Anyone can submit stories" 
  ON stories 
  FOR INSERT 
  TO anon
  WITH CHECK (true);

-- RLS Policies for tags table

-- Anyone can read tags
CREATE POLICY "Anyone can read tags" 
  ON tags 
  FOR SELECT 
  USING (true);

-- Admin can insert, update, delete tags
CREATE POLICY "Admin can insert tags" 
  ON tags 
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin can update tags" 
  ON tags 
  FOR UPDATE 
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin can delete tags" 
  ON tags 
  FOR DELETE 
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Function to handle story verification via email
CREATE OR REPLACE FUNCTION verify_story(story_id uuid, verification_token text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  matching_count integer;
BEGIN
  -- Check if the verification token matches
  -- In a real implementation, you would store and validate actual tokens
  -- This is a simplified version
  UPDATE stories
  SET verified = true
  WHERE id = story_id;
  
  GET DIAGNOSTICS matching_count = ROW_COUNT;
  
  RETURN matching_count > 0;
END;
$$;