import { generateSpeech, cleanupAudioUrl, VOICE_IDS } from './elevenLabsService';

interface ConversationTurn {
  speaker: 'agent' | 'customer';
  text: string;
  pauseAfter?: number;
}

let currentAborted = false;
let currentAudio: HTMLAudioElement | null = null;
let isPaused = false;
let pauseResolve: (() => void) | null = null;

export function stopConversation() {
  currentAborted = true;
  isPaused = false;
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  if (pauseResolve) {
    pauseResolve();
    pauseResolve = null;
  }
}

export function pauseConversation() {
  if (currentAudio && !currentAudio.paused) {
    currentAudio.pause();
    isPaused = true;
  }
}

export function resumeConversation() {
  if (currentAudio && isPaused) {
    currentAudio.play();
    isPaused = false;
  }
  if (pauseResolve) {
    pauseResolve();
    pauseResolve = null;
  }
}

export function isConversationPaused(): boolean {
  return isPaused;
}

async function playConversation(
  turns: ConversationTurn[],
  agentVoiceId: string,
  customerVoiceId: string,
  onProgress?: (turnIndex: number) => void
): Promise<void> {
  currentAborted = false;
  isPaused = false;

  for (let i = 0; i < turns.length; i++) {
    if (currentAborted) {
      break;
    }

    const turn = turns[i];

    if (turn.speaker === 'customer') {
      if (turn.pauseAfter && !currentAborted) {
        await new Promise<void>(resolve => {
          if (isPaused) {
            pauseResolve = resolve;
          } else {
            setTimeout(resolve, turn.pauseAfter);
          }
        });
      }
      continue;
    }

    if (onProgress) {
      onProgress(i);
    }

    const voiceId = agentVoiceId;
    const speed = 0.95;

    try {
      const audioUrl = await generateSpeech(turn.text, voiceId, speed);

      if (currentAborted) {
        cleanupAudioUrl(audioUrl);
        break;
      }

      await new Promise<void>((resolve, reject) => {
        const audio = new Audio(audioUrl);
        currentAudio = audio;

        const checkPause = () => {
          if (isPaused && audio) {
            audio.pause();
            const resumeInterval = setInterval(() => {
              if (!isPaused) {
                clearInterval(resumeInterval);
                if (audio && !currentAborted) {
                  audio.play().catch(reject);
                }
              }
              if (currentAborted) {
                clearInterval(resumeInterval);
                cleanupAudioUrl(audioUrl);
                currentAudio = null;
                resolve();
              }
            }, 100);
          }
        };

        audio.onended = () => {
          cleanupAudioUrl(audioUrl);
          currentAudio = null;
          resolve();
        };

        audio.onerror = () => {
          cleanupAudioUrl(audioUrl);
          currentAudio = null;
          reject(new Error('Audio playback failed'));
        };

        audio.onpause = () => {
          checkPause();
        };

        if (currentAborted) {
          cleanupAudioUrl(audioUrl);
          currentAudio = null;
          resolve();
          return;
        }

        audio.play().catch(reject);
      });

      if (turn.pauseAfter && !currentAborted) {
        await new Promise<void>(resolve => {
          if (isPaused) {
            pauseResolve = resolve;
          } else {
            setTimeout(resolve, turn.pauseAfter);
          }
        });
      }
    } catch (error) {
      console.error('Error playing turn:', error);
      break;
    }
  }

  currentAborted = false;
  isPaused = false;
  currentAudio = null;
}

export async function playRealEstateDemo(onProgress?: (turnIndex: number) => void): Promise<void> {
  const conversation: ConversationTurn[] = [
    {
      speaker: 'agent',
      text: 'Good afternoon! Thank you for calling Prestige Properties. My name is Sarah. How may I help you today?',
      pauseAfter: 700
    },
    {
      speaker: 'customer',
      text: 'Hi, I\'m interested in looking at some properties in the downtown area.',
      pauseAfter: 700
    },
    {
      speaker: 'agent',
      text: 'Wonderful! I\'d be happy to help you find the perfect property. Are you looking to buy or rent?',
      pauseAfter: 700
    },
    {
      speaker: 'customer',
      text: 'I\'m looking to buy, actually. Probably a two or three bedroom.',
      pauseAfter: 700
    },
    {
      speaker: 'agent',
      text: 'Excellent! And what\'s your budget range, if you don\'t mind me asking?',
      pauseAfter: 700
    },
    {
      speaker: 'customer',
      text: 'Somewhere between four hundred and five hundred thousand pounds.',
      pauseAfter: 700
    },
    {
      speaker: 'agent',
      text: 'Perfect. I have several beautiful properties in that range. When would you like to schedule a viewing? I have availability this Thursday afternoon or Friday morning.',
      pauseAfter: 700
    },
    {
      speaker: 'customer',
      text: 'Friday morning works great for me.',
      pauseAfter: 700
    },
    {
      speaker: 'agent',
      text: 'Fantastic! I\'ll book you in for Friday at 10 AM. Could I get your name and phone number please?',
      pauseAfter: 700
    },
    {
      speaker: 'customer',
      text: 'Sure, it\'s James Wilson, and my number is oh seven nine one two, three four five, six seven eight.',
      pauseAfter: 700
    },
    {
      speaker: 'agent',
      text: 'Thank you, James. I\'ll send you a confirmation text with the property details and address. Looking forward to showing you these homes on Friday!',
      pauseAfter: 400
    }
  ];

  await playConversation(conversation, VOICE_IDS.ALICE, VOICE_IDS.CHARLIE, onProgress);
}

export async function playEcommerceDemo(onProgress?: (turnIndex: number) => void): Promise<void> {
  const conversation: ConversationTurn[] = [
    {
      speaker: 'agent',
      text: 'Hello! Thank you for contacting ShopSmart customer support. My name is Emma. How can I assist you today?',
      pauseAfter: 700
    },
    {
      speaker: 'customer',
      text: 'Hi, I placed an order three days ago and I haven\'t received a tracking number yet.',
      pauseAfter: 700
    },
    {
      speaker: 'agent',
      text: 'I\'m sorry to hear that. Let me look that up for you right away. Could you provide your order number?',
      pauseAfter: 700
    },
    {
      speaker: 'customer',
      text: 'Yes, it\'s SS dash three two one seven eight nine.',
      pauseAfter: 700
    },
    {
      speaker: 'agent',
      text: 'Thank you. I\'ve found your order. It looks like your package was dispatched yesterday and should arrive by tomorrow evening. Would you like me to send the tracking details to your email?',
      pauseAfter: 700
    },
    {
      speaker: 'customer',
      text: 'Oh perfect! Yes, please send it to my email.',
      pauseAfter: 700
    },
    {
      speaker: 'agent',
      text: 'Done! You should receive the tracking information within the next few minutes. Is there anything else I can help you with today?',
      pauseAfter: 700
    },
    {
      speaker: 'customer',
      text: 'No, that\'s all. Thank you so much!',
      pauseAfter: 700
    },
    {
      speaker: 'agent',
      text: 'You\'re very welcome! Thank you for shopping with ShopSmart. Have a wonderful day!',
      pauseAfter: 400
    }
  ];

  await playConversation(conversation, VOICE_IDS.LILY, VOICE_IDS.ADAM, onProgress);
}

export async function playHealthcareDemo(onProgress?: (turnIndex: number) => void): Promise<void> {
  const conversation: ConversationTurn[] = [
    {
      speaker: 'agent',
      text: 'Good morning, Riverside Medical Centre. This is Lisa speaking. How may I help you?',
      pauseAfter: 700
    },
    {
      speaker: 'customer',
      text: 'Hi, I need to book an appointment with Doctor Martinez, please.',
      pauseAfter: 700
    },
    {
      speaker: 'agent',
      text: 'Of course, I\'d be happy to help you schedule that. Is this for a routine check-up or a specific concern?',
      pauseAfter: 700
    },
    {
      speaker: 'customer',
      text: 'It\'s for a follow-up appointment from my last visit.',
      pauseAfter: 700
    },
    {
      speaker: 'agent',
      text: 'I understand. Let me check Doctor Martinez\'s availability. What days work best for you?',
      pauseAfter: 700
    },
    {
      speaker: 'customer',
      text: 'I\'m pretty flexible. Maybe sometime next week?',
      pauseAfter: 700
    },
    {
      speaker: 'agent',
      text: 'Perfect. I have openings on Tuesday at two thirty PM, or Wednesday at eleven AM. Which would you prefer?',
      pauseAfter: 700
    },
    {
      speaker: 'customer',
      text: 'Tuesday at two thirty works perfectly.',
      pauseAfter: 700
    },
    {
      speaker: 'agent',
      text: 'Excellent! I\'ve booked you in for Tuesday, the fifteenth, at two thirty PM with Doctor Martinez. You\'ll receive a reminder text the day before. Is there anything else I can help you with?',
      pauseAfter: 700
    },
    {
      speaker: 'customer',
      text: 'No, that\'s everything. Thank you!',
      pauseAfter: 700
    },
    {
      speaker: 'agent',
      text: 'You\'re welcome! We look forward to seeing you next Tuesday. Take care!',
      pauseAfter: 400
    }
  ];

  await playConversation(conversation, VOICE_IDS.ALICE, VOICE_IDS.CLYDE, onProgress);
}

export async function playRestaurantDemo(onProgress?: (turnIndex: number) => void): Promise<void> {
  const conversation: ConversationTurn[] = [
    {
      speaker: 'agent',
      text: 'Good evening, thank you for calling The Garden Bistro. This is Michael. How may I assist you?',
      pauseAfter: 700
    },
    {
      speaker: 'customer',
      text: 'Hi, I\'d like to make a reservation for dinner this Saturday.',
      pauseAfter: 700
    },
    {
      speaker: 'agent',
      text: 'Wonderful! We\'d love to have you. How many guests will be joining you?',
      pauseAfter: 700
    },
    {
      speaker: 'customer',
      text: 'It\'ll be four people.',
      pauseAfter: 700
    },
    {
      speaker: 'agent',
      text: 'Perfect. And what time would you prefer? We have availability at six PM, seven thirty PM, or nine PM.',
      pauseAfter: 700
    },
    {
      speaker: 'customer',
      text: 'Seven thirty would be ideal.',
      pauseAfter: 700
    },
    {
      speaker: 'agent',
      text: 'Excellent choice! I have you down for four guests at seven thirty PM this Saturday. May I have a name for the reservation?',
      pauseAfter: 700
    },
    {
      speaker: 'customer',
      text: 'Yes, it\'s under Sarah Thompson.',
      pauseAfter: 700
    },
    {
      speaker: 'agent',
      text: 'Thank you, Sarah. Would you like a table by the window or in our garden terrace area?',
      pauseAfter: 700
    },
    {
      speaker: 'customer',
      text: 'Oh, the garden terrace sounds lovely!',
      pauseAfter: 700
    },
    {
      speaker: 'agent',
      text: 'Wonderful! I\'ve reserved our best terrace table for you. We\'ll send you a confirmation shortly. Is there anything else I can help you with today?',
      pauseAfter: 700
    },
    {
      speaker: 'customer',
      text: 'No, that\'s all. Thank you so much!',
      pauseAfter: 700
    },
    {
      speaker: 'agent',
      text: 'You\'re very welcome, Sarah! We look forward to seeing you Saturday evening. Have a great day!',
      pauseAfter: 400
    }
  ];

  await playConversation(conversation, VOICE_IDS.GEORGE, VOICE_IDS.ELLI, onProgress);
}
