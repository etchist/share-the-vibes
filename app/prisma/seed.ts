import { PrismaClient, Outcome } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample tags
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { name: 'javascript' },
      update: { count: 5 },
      create: { name: 'javascript', count: 5 },
    }),
    prisma.tag.upsert({
      where: { name: 'python' },
      update: { count: 3 },
      create: { name: 'python', count: 3 },
    }),
    prisma.tag.upsert({
      where: { name: 'css' },
      update: { count: 4 },
      create: { name: 'css', count: 4 },
    }),
    prisma.tag.upsert({
      where: { name: 'react' },
      update: { count: 3 },
      create: { name: 'react', count: 3 },
    }),
    prisma.tag.upsert({
      where: { name: 'typescript' },
      update: { count: 2 },
      create: { name: 'typescript', count: 2 },
    }),
    prisma.tag.upsert({
      where: { name: 'debugging' },
      update: { count: 6 },
      create: { name: 'debugging', count: 6 },
    }),
    prisma.tag.upsert({
      where: { name: 'production' },
      update: { count: 4 },
      create: { name: 'production', count: 4 },
    }),
    prisma.tag.upsert({
      where: { name: 'backend' },
      update: { count: 2 },
      create: { name: 'backend', count: 2 },
    }),
    prisma.tag.upsert({
      where: { name: 'frontend' },
      update: { count: 3 },
      create: { name: 'frontend', count: 3 },
    }),
    prisma.tag.upsert({
      where: { name: 'database' },
      update: { count: 2 },
      create: { name: 'database', count: 2 },
    }),
  ]);

  // Create sample stories
  await prisma.story.create({
    data: {
      title: 'The Case of the Mysterious Memory Leak',
      content:
        '<h2>It all started with a simple React component...</h2><p>I was building what seemed like a straightforward dashboard. Everything was going great until users started reporting that the app would slow down after about an hour of use. "No problem," I thought, "I\'ll just check the usual suspects."</p><p>After hours of "vibe debugging" (aka randomly commenting out code and refreshing the page), I finally discovered that I had created an infinite loop in my useEffect hook. The cleanup function wasn\'t properly removing event listeners, and each re-render was adding new ones.</p><p>The fix was simple, but finding it? That took three energy drinks and a very concerned code review from my senior developer.</p>',
      email: 'developer1@example.com',
      verified: true,
      views: 156,
      featured: true,
      outcome: Outcome.NEGATIVE,
      tags: {
        connect: [
          { name: 'javascript' },
          { name: 'react' },
          { name: 'debugging' },
        ],
      },
    },
  });

  await prisma.story.create({
    data: {
      title: 'CSS Specificity Wars',
      content:
        '<h2>The battle of !important vs !important</h2><p>In my defense, it was a legacy codebase. The previous developer had used !important on every other CSS rule. So naturally, I thought adding more !important declarations would fix the styling issues.</p><p>Narrator: It did not fix the styling issues.</p><p>Two weeks and countless specificity calculations later, I had created a stylesheet that would make any CSS developer cry. The solution? A complete refactor using proper CSS methodology and a stern talk about CSS specificity from our UI lead.</p>',
      email: 'developer2@example.com',
      verified: true,
      views: 89,
      featured: false,
      outcome: Outcome.NEGATIVE,
      tags: {
        connect: [{ name: 'css' }, { name: 'frontend' }, { name: 'debugging' }],
      },
    },
  });

  await prisma.story.create({
    data: {
      title: 'The Production Database Incident',
      content:
        "<h2>A tale of mistaken environments</h2><p>Picture this: It's 3 AM, and I'm trying to clean up some test data in our development database. I had my terminal windows split, one for dev, one for prod (first mistake).</p><p>You can probably guess where this is going...</p><p>One wrong terminal, one rushed command, and suddenly our production database was as empty as my coffee cup. Thank goodness for backups, but explaining this in the morning standup was... interesting.</p><p>Lessons learned: Always double-check your environment, and maybe don't do database cleanup at 3 AM while running on energy drinks.</p>",
      email: 'developer3@example.com',
      verified: true,
      views: 234,
      featured: true,
      outcome: Outcome.NEGATIVE,
      tags: {
        connect: [
          { name: 'database' },
          { name: 'production' },
          { name: 'debugging' },
        ],
      },
    },
  });

  console.log('Database has been seeded. 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.disconnect();
  });
