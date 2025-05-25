/*
  # Add outcome column to stories table

  1. Changes
    - Add `outcome` column to `stories` table with type TEXT
    - Add check constraint to ensure valid values ('positive', 'negative', 'neutral')
    - Set default value to 'neutral'
  
  2. Notes
    - Column is nullable to handle existing data
    - Check constraint ensures data integrity
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'stories' 
    AND column_name = 'outcome'
  ) THEN
    ALTER TABLE stories 
    ADD COLUMN outcome TEXT DEFAULT 'neutral'::text;

    ALTER TABLE stories 
    ADD CONSTRAINT stories_outcome_check 
    CHECK (outcome = ANY (ARRAY['positive'::text, 'negative'::text, 'neutral'::text]));
  END IF;
END $$;