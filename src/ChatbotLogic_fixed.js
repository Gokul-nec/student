import Quotes from './Quotes';
import Resources from './Resources';

class ChatbotLogic {
  constructor() {
    this.crisisKeywords = [
      'suicide', 'kill myself', 'end it all', 'not worth living',
      'harm myself', 'hurt myself', 'die', 'death',
      'crisis', 'emergency', 'help me', 'save me',
      'overwhelmed', 'hopeless', 'worthless', 'failure'
    ];

    this.anxietyKeywords = [
      'anxious', 'panic', 'worried', 'nervous', 'stressed',
      'overwhelmed', 'scared', 'fear', 'terrified', 'freaking out'
    ];

    this.positiveKeywords = [
      'good', 'great', 'better', 'happy', 'excited',
      'proud', 'accomplished', 'grateful', 'thankful'
    ];

    this.greetings = [
      'hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening',
      'howdy', 'greetings', 'what\'s up', 'sup'
    ];

    this.farewells = [
      'bye', 'goodbye', 'see you', 'farewell', 'take care', 'good night'
    ];
  }

  analyzeMessage(message) {
    const lowerMessage = message.toLowerCase();

    // Check for crisis keywords
    const crisisMatches = this.crisisKeywords.filter(keyword =>
      lowerMessage.includes(keyword)
    );

    // Check for anxiety keywords
    const anxietyMatches = this.anxietyKeywords.filter(keyword =>
      lowerMessage.includes(keyword)
    );

    // Check for positive keywords
    const positiveMatches = this.positiveKeywords.filter(keyword =>
      lowerMessage.includes(keyword)
    );

    // Check for greetings
    const isGreeting = this.greetings.some(greeting =>
      lowerMessage.includes(greeting)
    );

    // Check for farewells
    const isFarewell = this.farewells.some(farewell =>
      lowerMessage.includes(farewell)
    );

    return {
      isCrisis: crisisMatches.length > 0,
      crisisKeywords: crisisMatches,
      isAnxiety: anxietyMatches.length > 0 && crisisMatches.length === 0,
      anxietyKeywords: anxietyMatches,
      isPositive: positiveMatches.length > 0,
      positiveKeywords: positiveMatches,
      isGreeting,
      isFarewell,
      sentiment: this.getSentiment(lowerMessage)
    };
  }

  getSentiment(message) {
    const positiveWords = ['happy', 'good', 'great', 'wonderful', 'amazing', 'love', 'excited', 'proud', 'grateful'];
    const negativeWords = ['sad', 'bad', 'terrible', 'awful', 'hate', 'angry', 'frustrated', 'disappointed', 'worried'];

    let score = 0;
    positiveWords.forEach(word => {
      if (message.includes(word)) score += 1;
    });
    negativeWords.forEach(word => {
      if (message.includes(word)) score -= 1;
    });

    if (score > 0) return 'positive';
    if (score < 0) return 'negative';
    return 'neutral';
  }

  getResponse(message, analysis) {
    // Crisis response - highest priority
    if (analysis.isCrisis) {
      return this.getCrisisResponse(analysis.crisisKeywords);
    }

    // Anxiety response - second priority
    if (analysis.isAnxiety) {
      return this.getAnxietyResponse(analysis.anxietyKeywords);
    }

    // Greeting response
    if (analysis.isGreeting) {
      return this.getGreetingResponse();
    }

    // Farewell response
    if (analysis.isFarewell) {
      return this.getFarewellResponse();
    }

    // Check-in response
    if (this.isCheckInMessage(message)) {
      return this.getCheckInResponse(analysis.sentiment);
    }

    // Coping strategy request
    if (this.isCopingStrategyRequest(message)) {
      return this.getCopingStrategyResponse();
    }

    // Motivational quote request
    if (this.isQuoteRequest(message)) {
      return this.getQuoteResponse();
    }

    // Breathing exercise request
    if (this.isBreathingExerciseRequest(message)) {
      return this.getBreathingExerciseResponse();
    }

    // Default responses based on sentiment
    return this.getDefaultResponse(analysis.sentiment);
  }

  isCheckInMessage(message) {
    const checkInPatterns = [
      'how are you', 'how do you feel', 'how is it going',
      'what\'s up', 'how have you been', 'are you okay'
    ];
    return checkInPatterns.some(pattern => message.toLowerCase().includes(pattern));
  }

  isCopingStrategyRequest(message) {
    const copingPatterns = [
      'help me', 'i need help', 'coping', 'strategy', 'deal with',
      'handle', 'manage', 'feel better', 'calm down'
    ];
    return copingPatterns.some(pattern => message.toLowerCase().includes(pattern));
  }

  isQuoteRequest(message) {
    const quotePatterns = [
      'quote', 'inspire', 'motivate', 'encourage', 'uplift'
    ];
    return quotePatterns.some(pattern => message.toLowerCase().includes(pattern));
  }

  isBreathingExerciseRequest(message) {
    const breathingPatterns = [
      'breathe', 'breathing', 'relax', 'calm', 'meditate', 'meditation'
    ];
    return breathingPatterns.some(pattern => message.toLowerCase().includes(pattern));
  }

  getCrisisResponse(crisisKeywords) {
    return {
      type: 'crisis',
      message: "I'm really concerned about what you're going through. Please know that you're not alone and help is available right now. Here are immediate resources:",
      actions: [
        {
          type: 'emergency',
          label: '🚨 National Crisis Hotline: 988',
          action: 'tel:988'
        },
        {
          type: 'emergency',
          label: '💬 Crisis Text Line: Text HOME to 741741',
          action: 'sms:741741&body=HOME'
        },
        {
          type: 'counselor',
          label: 'Connect with a Counselor',
          action: 'counselor'
        }
      ],
      followUp: "Would you like me to help you connect with a crisis counselor right now?"
    };
  }

  getAnxietyResponse(anxietyKeywords) {
    return {
      type: 'anxiety',
      message: "I can hear that you're feeling anxious, and that's completely valid. Let's work through this together. Here are some immediate strategies that might help:",
      actions: [
        {
          type: 'breathing',
          label: '🫁 Try a 4-7-8 Breathing Exercise',
          action: 'breathing'
        },
        {
          type: 'grounding',
          label: '🌱 5-4-3-2-1 Grounding Technique',
          action: 'grounding'
        }
      ],
      followUp: "Would you like me to guide you through one of these exercises?"
    };
  }

  getGreetingResponse() {
    const greetings = [
      "Hello! I'm here to support you. How are you feeling today?",
      "Hi there! I'm glad you reached out. What's on your mind?",
      "Hey! I'm here whenever you need to talk. How can I help you today?",
      "Hello! I'm your mental health support companion. How are you doing?"
    ];
    return {
      type: 'greeting',
      message: greetings[Math.floor(Math.random() * greetings.length)],
      actions: []
    };
  }

  getFarewellResponse() {
    const farewells = [
      "Take care of yourself. Remember, I'm here 24/7 if you need support.",
      "You're doing great just by reaching out. Take care and come back anytime.",
      "Remember, it's okay to not be okay. I'm here whenever you need me.",
      "You're stronger than you know. Take care and reach out anytime."
    ];
    return {
      type: 'farewell',
      message: farewells[Math.floor(Math.random() * farewells.length)],
      actions: []
    };
  }

  getCheckInResponse(sentiment) {
    if (sentiment === 'positive') {
      return {
        type: 'checkin_positive',
        message: "That's wonderful to hear! It sounds like you're in a good place right now. What's contributing to you feeling this way?",
        actions: []
      };
    } else if (sentiment === 'negative') {
      return {
        type: 'checkin_negative',
        message: "I'm sorry to hear you're not feeling great. Would you like to talk about what's been going on, or would you prefer some coping strategies?",
        actions: [
          {
            type: 'talk',
            label: 'Talk about it',
            action: 'talk'
          },
          {
            type: 'strategies',
            label: 'Get coping strategies',
            action: 'strategies'
          }
        ]
      };
    } else {
      return {
        type: 'checkin_neutral',
        message: "Thank you for sharing how you're feeling. Sometimes it's helpful to talk about what's on your mind. Is there anything specific you'd like to discuss?",
        actions: []
      };
    }
  }

  getCopingStrategyResponse() {
    const strategies = [
      {
        type: 'breathing',
        message: "Let's try a simple breathing exercise. The 4-7-8 technique can help reduce anxiety:\n\n1. Inhale quietly through your nose for 4 seconds\n2. Hold your breath for 7 seconds\n3. Exhale completely through your mouth for 8 seconds\n\nRepeat 4 times. Would you like me to guide you through this?",
        actions: [
          {
            type: 'breathing',
            label: 'Start breathing exercise',
            action: 'breathing'
          }
        ]
      },
      {
        type: 'grounding',
        message: "Try the 5-4-3-2-1 grounding technique:\n\n5 things you can SEE\n4 things you can TOUCH\n3 things you can HEAR\n2 things you can SMELL\n1 thing you can TASTE\n\nThis can help bring you back to the present moment.",
        actions: []
      },
      {
        type: 'mindfulness',
        message: "Practice this simple mindfulness exercise: Focus on your breath for just 2 minutes. Notice how the air feels entering and leaving your nostrils. When your mind wanders (and it will!), gently bring it back to your breath. This builds your ability to stay present.",
        actions: []
      }
    ];

    return strategies[Math.floor(Math.random() * strategies.length)];
  }

  getQuoteResponse() {
    const quotesData = Quotes.quotes || [];
    const randomQuote = quotesData[Math.floor(Math.random() * quotesData.length)];
    return {
      type: 'quote',
      message: `"${randomQuote.text}"\n\n— ${randomQuote.author}`,
      actions: [
        {
          type: 'another_quote',
          label: 'Get another quote',
          action: 'quote'
        }
      ]
    };
  }

  getBreathingExerciseResponse() {
    return {
      type: 'breathing',
      message: "Here's a guided breathing exercise to help you relax:\n\n🫁 **4-7-8 Breathing Technique**\n\n1. Sit or lie down comfortably\n2. Inhale quietly through your nose for 4 seconds\n3. Hold your breath for 7 seconds\n4. Exhale completely through your mouth for 8 seconds\n\nRepeat this cycle 4 times. Focus on the counting and the sensation of your breath.",
      actions: [
        {
          type: 'breathing',
          label: 'Try another breathing exercise',
          action: 'breathing'
        }
      ]
    };
  }

  getDefaultResponse(sentiment) {
    const responses = {
      positive: [
        "That's great to hear! It sounds like you're in a good headspace. Is there anything specific you'd like to talk about or any goals you're working toward?",
        "Wonderful! I'm glad you're feeling positive. What's been going well for you lately?",
        "That's fantastic! Keep celebrating these good moments. They matter a lot."
      ],
      negative: [
        "I'm here to listen and support you. Sometimes just talking about what's bothering us can help. Would you like to share more about what's going on?",
        "I can hear that you're going through something difficult. You're taking a positive step by reaching out. How can I support you right now?",
        "It's okay to not feel okay. Would you like some coping strategies, or would you prefer to just talk about what's on your mind?"
      ],
      neutral: [
        "Thank you for sharing. Sometimes it's helpful to explore our thoughts and feelings. Is there anything specific you'd like to discuss?",
        "I'm here to support you however you need. Would you like some coping strategies, or is there something particular on your mind?",
        "Every feeling is valid. How can I help you today?"
      ]
    };

    const responseList = responses[sentiment] || responses.neutral;
    return {
      type: 'default',
      message: responseList[Math.floor(Math.random() * responseList.length)],
      actions: []
    };
  }

  getResourceRecommendation(mood = 'neutral') {
    const resourcesData = Resources.initialResources || [];

    if (mood === 'anxious' || mood === 'stressed') {
      return resourcesData.filter(r =>
        r.type === 'breathing' ||
        r.type === 'meditation' ||
        r.category === 'Stress Management'
      ).slice(0, 2);
    } else if (mood === 'sad' || mood === 'depressed') {
      return resourcesData.filter(r =>
        r.type === 'meditation' ||
        r.category === 'Self-Care'
      ).slice(0, 2);
    } else {
      return resourcesData.filter(r =>
        r.type === 'articles' ||
        r.category === 'Mindfulness'
      ).slice(0, 2);
    }
  }
}

export default ChatbotLogic;
