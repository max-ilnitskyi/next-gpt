export const words = {
  analyze: 'Analyze',
  reset: 'Reset',
  arousal: 'Arousal',
  valence: 'Valence',
  description: 'Description',
  unknown: 'Unknown',
  email: 'Email',
  phone: 'Phone',
} as const;

export const pages = {
  home: {
    shortName: 'Home',
    title: 'Analyze Client Messages – AI-powered Sentiment Analysis',
    description:
      'Use our AI-powered tool to analyze the emotional tone of customer feedback, comments, and messages. Gain insights into how your customers feel.',
  },
  contacts: {
    shortName: 'Contacts',
    title: 'Contact Us – AI Emotional Tone Analyzer for Business',
    description:
      'Get in touch to learn more about how our AI-powered sentiment analysis tool can help your business better understand customer feedback.',
  },
  examples: {
    shortName: 'Examples',
    title: 'Customer Message Examples – Emotional Tone Analysis',
    description:
      'Browse through examples of analyzed customer feedback and comments. See how our AI tool detects emotional sentiment in client communication.',
  },
  myMessages: {
    shortName: 'My Messages',
    title: 'My Analyzed Messages',
    description:
      'Review and manage the emotional analysis of your customer messages. Monitor the sentiment of comments, reviews, and conversations with ease.',
  },
  howItWorks: {
    shortName: 'How It Works',
    title: 'How AI Sentiment Analysis Works – Understanding Emotional Insights',
    description:
      'Learn how our AI analyzes customer feedback and messages, providing insights into the emotional tone of client interactions.',
  },
} as const;

export const strings = {
  analyzeMessage: 'Analyze Message',
  aiPoweredToolForMonitoringEmotionalTone:
    'AI-powered tool for monitoring emotional tone',
  enterYourMessageHere: 'Enter your message here...',
  fromMinus1to1: 'from -1.0 to 1.0',
  from0to1: 'from 0 to 1.0',
  currentValue: 'Current value',
  ifYouHaveAnyQuestionsOrWantToLearnMore:
    'If you have any questions or would like to learn more about our AI-powered emotional analysis tool, feel free to contact us.',
  arousalClassification: {
    low: 'The message has a low level of emotional intensity. This typically indicates calmness, relaxation, or a lack of strong emotional engagement.',
    medium:
      'The message has a moderate level of emotional intensity. It suggests a balanced emotional state, where some excitement or engagement is present, but not at extreme levels.',
    high: 'The message has a high level of emotional intensity. This indicates strong emotions such as excitement, anger, or stress, signaling a highly charged emotional response',
  },
  valenceClassification: {
    strong_negative:
      'The message conveys very negative emotions. This could indicate intense dissatisfaction, anger, or frustration, reflecting a strong negative sentiment.',
    negative:
      'The message has a negative emotional tone. It may express mild dissatisfaction, disappointment, or concern.',
    neutral:
      'The message is emotionally neutral. It neither expresses strong positive nor negative feelings, indicating a balanced or indifferent tone.',
    positive:
      'The message carries a positive emotional tone. It may reflect satisfaction, appreciation, or general contentment',
    strong_positive:
      'The message conveys very positive emotions. This could indicate strong enthusiasm, excitement, or happiness, reflecting a highly positive sentiment.',
  },
} as const;
