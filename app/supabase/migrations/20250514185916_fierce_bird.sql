/*
  # Add sample data for development

  1. Changes
    - Insert sample stories with various tags
    - Insert popular tags
    - All sample stories are verified for visibility
*/

-- Insert sample tags
INSERT INTO tags (name, count) VALUES
  ('javascript', 5),
  ('python', 3),
  ('css', 4),
  ('react', 3),
  ('typescript', 2),
  ('debugging', 6),
  ('production', 4),
  ('backend', 2),
  ('frontend', 3),
  ('database', 2)
ON CONFLICT (name) DO NOTHING;

-- Insert sample stories
INSERT INTO stories (
  title,
  content,
  email,
  verified,
  views,
  featured,
  tags
) VALUES
(
  'The Case of the Mysterious Memory Leak',
  '<h2>It all started with a simple React component...</h2><p>I was building what seemed like a straightforward dashboard. Everything was going great until users started reporting that the app would slow down after about an hour of use. "No problem," I thought, "I''ll just check the usual suspects."</p><p>After hours of "vibe debugging" (aka randomly commenting out code and refreshing the page), I finally discovered that I had created an infinite loop in my useEffect hook. The cleanup function wasn''t properly removing event listeners, and each re-render was adding new ones.</p><p>The fix was simple, but finding it? That took three energy drinks and a very concerned code review from my senior developer.</p>',
  'developer1@example.com',
  true,
  156,
  true,
  ARRAY['javascript', 'react', 'debugging']
),
(
  'CSS Specificity Wars',
  '<h2>The battle of !important vs !important</h2><p>In my defense, it was a legacy codebase. The previous developer had used !important on every other CSS rule. So naturally, I thought adding more !important declarations would fix the styling issues.</p><p>Narrator: It did not fix the styling issues.</p><p>Two weeks and countless specificity calculations later, I had created a stylesheet that would make any CSS developer cry. The solution? A complete refactor using proper CSS methodology and a stern talk about CSS specificity from our UI lead.</p>',
  'developer2@example.com',
  true,
  89,
  false,
  ARRAY['css', 'frontend', 'debugging']
),
(
  'The Production Database Incident',
  '<h2>A tale of mistaken environments</h2><p>Picture this: It''s 3 AM, and I''m trying to clean up some test data in our development database. I had my terminal windows split, one for dev, one for prod (first mistake).</p><p>You can probably guess where this is going...</p><p>One wrong terminal, one rushed command, and suddenly our production database was as empty as my coffee cup. Thank goodness for backups, but explaining this in the morning standup was... interesting.</p><p>Lessons learned: Always double-check your environment, and maybe don''t do database cleanup at 3 AM while running on energy drinks.</p>',
  'developer3@example.com',
  true,
  234,
  true,
  ARRAY['database', 'production', 'debugging']
),
(
  'The Infinite Loop That Brought Down Production',
  '<h2>A story of recursion gone wrong</h2><p>It was a simple task: implement a tree traversal algorithm. The code looked perfect in my local environment with small test cases. I even wrote tests (okay, one test).</p><p>Deployed to production, everything seemed fine... until someone uploaded a deeply nested directory structure. My beautiful recursive function turned into an infinite loop that brought our entire API to its knees.</p><p>The fix? Adding a simple depth limit. Sometimes the simplest solutions are the ones we overlook while "vibing" with our code.</p>',
  'developer4@example.com',
  true,
  167,
  false,
  ARRAY['javascript', 'backend', 'production']
),
(
  'The TypeScript Type That Ate My Afternoon',
  '<h2>A journey into type inference hell</h2><p>I thought I was being clever with TypeScript''s type inference. The type definition started simple enough, but as I added more edge cases and conditional types, it grew into a monster.</p><p>The final type definition was so complex that TypeScript would occasionally crash VS Code. My colleagues started calling it "The Type That Must Not Be Named".</p><p>In the end, we simplified the entire thing to a basic interface and some utility types. Sometimes, simpler really is better.</p>',
  'developer5@example.com',
  true,
  122,
  false,
  ARRAY['typescript', 'frontend', 'debugging']
)
ON CONFLICT DO NOTHING;