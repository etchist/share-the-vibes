import { createClient } from 'npm:@supabase/supabase-js@2.39.8';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req: Request) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Get request data
    const { storyId, email } = await req.json();

    if (!storyId || !email) {
      return new Response(
        JSON.stringify({ error: 'Missing storyId or email' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      );
    }

    // Check if story exists
    const { data: story, error } = await supabaseClient
      .from('stories')
      .select('id, title')
      .eq('id', storyId)
      .eq('email', email)
      .single();

    if (error || !story) {
      return new Response(
        JSON.stringify({ error: 'Story not found' }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      );
    }

    // Generate verification token (in a real app, you'd store this securely)
    const verificationToken = crypto.randomUUID();

    // Create verification link
    const baseUrl = Deno.env.get('FRONTEND_URL') || '';
    const verificationLink = `${baseUrl}/verify?id=${storyId}&token=${verificationToken}`;

    // In a real application, you would send an actual email here
    // For this demo, we'll just log the link and return success
    console.log(`Verification link for story on Share the Vibes: "${story.title}": ${verificationLink}`);

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Verification email sent',
        // Don't include this in production, just for demo purposes
        debug: { verificationLink }
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );

  } catch (error) {
    console.error('Error sending verification email:', error);

    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  }
});