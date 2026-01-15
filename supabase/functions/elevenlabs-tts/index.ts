import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const {
      text,
      voiceId = "JBFqnCBsd6RMkjVDRZzb",
      speed = 1.0,
      stability = 0.5,
      similarityBoost = 0.75,
      style = 0.5,
      useSpeakerBoost = true
    } = await req.json();

    if (!text) {
      return new Response(
        JSON.stringify({ error: "Text is required" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");

    if (!ELEVENLABS_API_KEY) {
      console.error("ELEVENLABS_API_KEY not found in environment");
      return new Response(
        JSON.stringify({ error: "ElevenLabs API key not configured" }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    console.log("API Key present, length:", ELEVENLABS_API_KEY.length);
    console.log("API Key starts with sk_:", ELEVENLABS_API_KEY.startsWith("sk_"));
    console.log("Voice ID:", voiceId);
    console.log("Text length:", text.length);

    const requestBody: any = {
      text,
      model_id: "eleven_turbo_v2_5",
      voice_settings: {
        stability: stability,
        similarity_boost: similarityBoost,
        style: style,
        use_speaker_boost: useSpeakerBoost,
      },
    };

    console.log("Voice settings being sent:", requestBody.voice_settings);

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: {
          "Accept": "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": ELEVENLABS_API_KEY,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("ElevenLabs API Error:", {
        status: response.status,
        statusText: response.statusText,
        error: error,
        voiceId: voiceId
      });
      return new Response(
        JSON.stringify({
          error: `ElevenLabs API error: ${error}`,
          status: response.status,
          voiceId: voiceId
        }),
        {
          status: response.status,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const audioData = await response.arrayBuffer();

    return new Response(audioData, {
      headers: {
        ...corsHeaders,
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});