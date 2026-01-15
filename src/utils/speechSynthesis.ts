interface SpeechConfig {
  rate: number;
  pitch: number;
  volume: number;
  voice?: SpeechSynthesisVoice;
}

interface ConversationTurn {
  speaker: 'agent' | 'customer';
  text: string;
  pauseAfter?: number;
}

let currentCancelled = false;

function getBestVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();

  const preferredVoices = [
    'Google UK English Female',
    'Google US English Female',
    'Microsoft Zira - English (United States)',
    'Samantha',
    'Karen',
    'Moira',
    'Tessa',
    'Alex',
    'Fiona',
    'Daniel',
    'Google UK English Male',
    'Microsoft David - English (United States)',
  ];

  for (const preferred of preferredVoices) {
    const voice = voices.find(v => v.name === preferred);
    if (voice) return voice;
  }

  const englishVoices = voices.filter(v => v.lang.startsWith('en'));
  return englishVoices.find(v => v.name.includes('Female') || v.name.includes('Natural')) || englishVoices[0];
}

function splitIntoSentences(text: string): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  return sentences.map(s => s.trim());
}

function speakWithNaturalPauses(text: string, config: SpeechConfig): Promise<void> {
  return new Promise((resolve, reject) => {
    if (currentCancelled) {
      resolve();
      return;
    }

    const sentences = splitIntoSentences(text);
    let currentSentence = 0;

    const speakNextSentence = () => {
      if (currentCancelled || currentSentence >= sentences.length) {
        resolve();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(sentences[currentSentence]);

      if (config.voice) {
        utterance.voice = config.voice;
      }

      utterance.rate = config.rate;
      utterance.pitch = config.pitch;
      utterance.volume = config.volume;

      utterance.onend = () => {
        currentSentence++;
        if (currentSentence < sentences.length) {
          setTimeout(() => speakNextSentence(), 300);
        } else {
          resolve();
        }
      };

      utterance.onerror = (event) => {
        if (!currentCancelled) {
          reject(event);
        } else {
          resolve();
        }
      };

      window.speechSynthesis.speak(utterance);
    };

    speakNextSentence();
  });
}

async function speakConversation(turns: ConversationTurn[], onProgress?: (turnIndex: number) => void): Promise<void> {
  const agentVoice = getBestVoice();

  const agentConfig: SpeechConfig = {
    rate: 0.85,
    pitch: 1.0,
    volume: 1,
    voice: agentVoice
  };

  const customerConfig: SpeechConfig = {
    rate: 0.9,
    pitch: 0.95,
    volume: 1,
    voice: agentVoice
  };

  for (let i = 0; i < turns.length; i++) {
    if (currentCancelled) {
      break;
    }

    const turn = turns[i];

    if (onProgress) {
      onProgress(i);
    }

    const config = turn.speaker === 'agent' ? agentConfig : customerConfig;

    await speakWithNaturalPauses(turn.text, config);

    if (turn.pauseAfter && !currentCancelled) {
      await new Promise(resolve => setTimeout(resolve, turn.pauseAfter));
    }
  }
}

export function stopSpeech() {
  currentCancelled = true;
  window.speechSynthesis.cancel();
  setTimeout(() => {
    currentCancelled = false;
  }, 100);
}

export function initializeSpeech() {
  if (window.speechSynthesis.getVoices().length === 0) {
    return new Promise<void>((resolve) => {
      window.speechSynthesis.onvoiceschanged = () => {
        resolve();
      };
    });
  }
  return Promise.resolve();
}

export async function playRealEstateDemo(onProgress?: (turnIndex: number) => void): Promise<void> {
  await initializeSpeech();

  const conversation: ConversationTurn[] = [
    {
      speaker: 'agent',
      text: 'Good afternoon! Thank you for calling Prestige Properties. My name is Sarah. How may I help you today?',
      pauseAfter: 800
    },
    {
      speaker: 'customer',
      text: 'Hi, um, I\'m interested in looking at some properties in the downtown area.',
      pauseAfter: 600
    },
    {
      speaker: 'agent',
      text: 'Wonderful! I\'d be happy to help you find the perfect property. Are you looking to buy or rent?',
      pauseAfter: 700
    },
    {
      speaker: 'customer',
      text: 'I\'m looking to buy, actually. Probably a two or three bedroom.',
      pauseAfter: 600
    },
    {
      speaker: 'agent',
      text: 'Excellent! And what\'s your budget range, if you don\'t mind me asking?',
      pauseAfter: 800
    },
    {
      speaker: 'customer',
      text: 'Somewhere between four hundred and five hundred thousand pounds.',
      pauseAfter: 600
    },
    {
      speaker: 'agent',
      text: 'Perfect. I have several beautiful properties in that range. When would you like to schedule a viewing? I have availability this Thursday afternoon or Friday morning.',
      pauseAfter: 900
    },
    {
      speaker: 'customer',
      text: 'Friday morning works great for me.',
      pauseAfter: 500
    },
    {
      speaker: 'agent',
      text: 'Fantastic! I\'ll book you in for Friday at 10 AM. Could I get your name and phone number please?',
      pauseAfter: 700
    },
    {
      speaker: 'customer',
      text: 'Sure, it\'s James Wilson, and my number is oh seven nine one two, three four five, six seven eight.',
      pauseAfter: 800
    },
    {
      speaker: 'agent',
      text: 'Thank you, James. I\'ll send you a confirmation text with the property details and address. Looking forward to showing you these homes on Friday!',
      pauseAfter: 500
    }
  ];

  await speakConversation(conversation, onProgress);
}

export async function playEcommerceDemo(onProgress?: (turnIndex: number) => void): Promise<void> {
  await initializeSpeech();

  const conversation: ConversationTurn[] = [
    {
      speaker: 'agent',
      text: 'Hello! Thank you for contacting ShopSmart customer support. My name is Emma. How can I assist you today?',
      pauseAfter: 700
    },
    {
      speaker: 'customer',
      text: 'Hi, I placed an order three days ago and I haven\'t received a tracking number yet.',
      pauseAfter: 600
    },
    {
      speaker: 'agent',
      text: 'I\'m sorry to hear that. Let me look that up for you right away. Could you provide your order number?',
      pauseAfter: 800
    },
    {
      speaker: 'customer',
      text: 'Yes, it\'s SS dash three two one seven eight nine.',
      pauseAfter: 700
    },
    {
      speaker: 'agent',
      text: 'Thank you. I\'ve found your order. It looks like your package was dispatched yesterday and should arrive by tomorrow evening. Would you like me to send the tracking details to your email?',
      pauseAfter: 800
    },
    {
      speaker: 'customer',
      text: 'Oh perfect! Yes, please send it to my email.',
      pauseAfter: 600
    },
    {
      speaker: 'agent',
      text: 'Done! You should receive the tracking information within the next few minutes. Is there anything else I can help you with today?',
      pauseAfter: 700
    },
    {
      speaker: 'customer',
      text: 'No, that\'s all. Thank you so much!',
      pauseAfter: 500
    },
    {
      speaker: 'agent',
      text: 'You\'re very welcome! Thank you for shopping with ShopSmart. Have a wonderful day!',
      pauseAfter: 400
    }
  ];

  await speakConversation(conversation, onProgress);
}

export async function playHealthcareDemo(onProgress?: (turnIndex: number) => void): Promise<void> {
  await initializeSpeech();

  const conversation: ConversationTurn[] = [
    {
      speaker: 'agent',
      text: 'Good morning, Riverside Medical Centre. This is Lisa speaking. How may I help you?',
      pauseAfter: 700
    },
    {
      speaker: 'customer',
      text: 'Hi, I need to book an appointment with Doctor Martinez, please.',
      pauseAfter: 600
    },
    {
      speaker: 'agent',
      text: 'Of course, I\'d be happy to help you schedule that. Is this for a routine check-up or a specific concern?',
      pauseAfter: 800
    },
    {
      speaker: 'customer',
      text: 'It\'s for a follow-up appointment from my last visit.',
      pauseAfter: 600
    },
    {
      speaker: 'agent',
      text: 'I understand. Let me check Doctor Martinez\'s availability. What days work best for you?',
      pauseAfter: 900
    },
    {
      speaker: 'customer',
      text: 'I\'m pretty flexible. Maybe sometime next week?',
      pauseAfter: 600
    },
    {
      speaker: 'agent',
      text: 'Perfect. I have openings on Tuesday at two thirty PM, or Wednesday at eleven AM. Which would you prefer?',
      pauseAfter: 800
    },
    {
      speaker: 'customer',
      text: 'Tuesday at two thirty works perfectly.',
      pauseAfter: 600
    },
    {
      speaker: 'agent',
      text: 'Excellent! I\'ve booked you in for Tuesday, the fifteenth, at two thirty PM with Doctor Martinez. You\'ll receive a reminder text the day before. Is there anything else I can help you with?',
      pauseAfter: 800
    },
    {
      speaker: 'customer',
      text: 'No, that\'s everything. Thank you!',
      pauseAfter: 500
    },
    {
      speaker: 'agent',
      text: 'You\'re welcome! We look forward to seeing you next Tuesday. Take care!',
      pauseAfter: 400
    }
  ];

  await speakConversation(conversation, onProgress);
}

export async function playRestaurantDemo(onProgress?: (turnIndex: number) => void): Promise<void> {
  await initializeSpeech();

  const conversation: ConversationTurn[] = [
    {
      speaker: 'agent',
      text: 'Good evening, thank you for calling The Garden Bistro. This is Michael. How may I assist you?',
      pauseAfter: 700
    },
    {
      speaker: 'customer',
      text: 'Hi, I\'d like to make a reservation for dinner this Saturday.',
      pauseAfter: 600
    },
    {
      speaker: 'agent',
      text: 'Wonderful! We\'d love to have you. How many guests will be joining you?',
      pauseAfter: 700
    },
    {
      speaker: 'customer',
      text: 'It\'ll be four people.',
      pauseAfter: 500
    },
    {
      speaker: 'agent',
      text: 'Perfect. And what time would you prefer? We have availability at six PM, seven thirty PM, or nine PM.',
      pauseAfter: 800
    },
    {
      speaker: 'customer',
      text: 'Seven thirty would be ideal.',
      pauseAfter: 600
    },
    {
      speaker: 'agent',
      text: 'Excellent choice! I have you down for four guests at seven thirty PM this Saturday. May I have a name for the reservation?',
      pauseAfter: 700
    },
    {
      speaker: 'customer',
      text: 'Yes, it\'s under Sarah Thompson.',
      pauseAfter: 600
    },
    {
      speaker: 'agent',
      text: 'Thank you, Sarah. Would you like a table by the window or in our garden terrace area?',
      pauseAfter: 800
    },
    {
      speaker: 'customer',
      text: 'Oh, the garden terrace sounds lovely!',
      pauseAfter: 600
    },
    {
      speaker: 'agent',
      text: 'Wonderful! I\'ve reserved our best terrace table for you. We\'ll send you a confirmation shortly. Is there anything else I can help you with today?',
      pauseAfter: 700
    },
    {
      speaker: 'customer',
      text: 'No, that\'s all. Thank you so much!',
      pauseAfter: 500
    },
    {
      speaker: 'agent',
      text: 'You\'re very welcome, Sarah! We look forward to seeing you Saturday evening. Have a great day!',
      pauseAfter: 400
    }
  ];

  await speakConversation(conversation, onProgress);
}
