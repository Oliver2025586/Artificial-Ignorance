export interface VoiceSettings {
  speed?: number;
  stability?: number;
  similarityBoost?: number;
  style?: number;
  useSpeakerBoost?: boolean;
}

export async function generateSpeech(
  text: string,
  voiceId: string = 'EXAVITQu4vr4xnSDxMaL',
  settings: VoiceSettings = {}
): Promise<string> {
  const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts`;

  const {
    speed = 1.0,
    stability = 0.5,
    similarityBoost = 0.75,
    style = 0.5,
    useSpeakerBoost = true
  } = settings;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      voiceId,
      speed,
      stability,
      similarityBoost,
      style,
      useSpeakerBoost
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate speech');
  }

  const audioBlob = await response.blob();
  const audioUrl = URL.createObjectURL(audioBlob);
  return audioUrl;
}

export function cleanupAudioUrl(url: string) {
  URL.revokeObjectURL(url);
}

export const VOICE_IDS = {
  SARAH: 'EXAVITQu4vr4xnSDxMaL',
  RACHEL: '21m00Tcm4TlvDq8ikWAM',
  DOMI: 'AZnzlk1XvdvUeBnXmlld',
  BELLA: 'EXAVITQu4vr4xnSDxMaL',
  ANTONI: 'ErXwobaYiN019PkySvjV',
  ELLI: 'MF3mGyEYCl7XYWbV9V6O',
  JOSH: 'TxGEqnHWrfWFTfGW9XjX',
  ARNOLD: 'VR6AewLTigWG4xSOukaG',
  ADAM: 'pNInz6obpgDQGcFmaJgB',
  SAM: 'yoZ06aMxZJJ28mfd3POQ',
  CHARLIE: 'IKne3meq5aSn9XLyUdCD',
  CLYDE: '2EiwWnXFnvU5JabPnv8n',
  ALICE: 'Xb7hH8MSUJpSbSDYk0k2',
  LILY: 'pFZP5JQG7iQjIQuC4Bku',
  HARRY: 'SOYHLrjzK2X1ezoPC6cr',
  GEORGE: 'JBFqnCBsd6RMkjVDRZzb',
  DANIEL: 'onwK4e9ZLuTAKqWW03F9',
  GLINDA: 'z9fAnlkpzviPz146aGWa',
  CALLUM: 'N2lVS1w4EtoT3dr4eOWO',
  THOMAS: 'GBv7mTt0atIp3Br8iCZE',
  JESSICA: 'cgSgspJ2msm6clMCkdW9',
  CHARLOTTE: 'XB0fDUnXU5powFXDhCwa',
  MATILDA: 'XrExE9yKIg1WjnnlVkGX',
  JAMES: 'ZQe5CZNOzWyzPSCn5a3c',
  JOSEPH: 'Zlb1dXrM653N07WRdFW3',
  PATRICK: 'ODq5zmih8GrVes37Dizd',
  SERENA: 'pMsXgVXv3BLzUgSXRplE'
};
