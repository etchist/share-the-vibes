/*
  # Add story outcome field
  
  1. Changes
    - Add `outcome` column to stories table
    - Update sample data with outcomes
    
  2. Schema Changes
    - New column `outcome` with type 'text'
    - Possible values: 'positive', 'negative', 'neutral'
    - Default value: 'neutral'
*/

-- Add outcome column to stories table
ALTER TABLE stories 
ADD COLUMN IF NOT EXISTS outcome text 
DEFAULT 'neutral' 
CHECK (outcome IN ('positive', 'negative', 'neutral'));

-- Update existing stories with outcomes
UPDATE stories SET outcome = 
  CASE id 
    WHEN (SELECT id FROM stories WHERE title = 'The Case of the Mysterious Memory Leak' LIMIT 1) THEN 'negative'
    WHEN (SELECT id FROM stories WHERE title = 'CSS Specificity Wars' LIMIT 1) THEN 'negative'
    WHEN (SELECT id FROM stories WHERE title = 'The Production Database Incident' LIMIT 1) THEN 'negative'
    WHEN (SELECT id FROM stories WHERE title = 'The Infinite Loop That Brought Down Production' LIMIT 1) THEN 'negative'
    WHEN (SELECT id FROM stories WHERE title = 'The TypeScript Type That Ate My Afternoon' LIMIT 1) THEN 'neutral'
    ELSE 'neutral'
  END;