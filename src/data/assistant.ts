// "Ask my AI" chat: what visitors see, extra facts the AI can use, and model settings.
// The AI also reads about.ts, work.ts and contact.ts automatically —
// update those and the AI's knowledge updates with them.

type Provider = 'groq' | 'anthropic'
type Effort = 'low' | 'medium' | 'high'

export const assistant = {
  // ── chat panel ──
  buttonLabel: 'Ask my AI',
  title: 'Ask my AI',
  subtitle: 'Knows my projects, skills and experience',
  greeting:
    'Hi! I’m Aditya’s AI assistant 👋 Ask me about his projects, experience, or what kind of role he’s looking for.',
  placeholder: 'Ask about projects, skills, experience…',
  resetLabel: 'New chat',   // button that clears the conversation
  suggestions: [
    'What does Aditya work on day to day?',
    'Tell me about the AI Loan Assistant',
    'Has he worked with Kafka or AWS?',
    'What kind of team is he looking for?',
  ],
  disclaimer: 'AI answers can be imperfect. For anything important, reach out directly.',
  errorMessage: 'Sorry, I couldn’t answer that right now. Please try again, or reach out through the Contact section.',
  refusalMessage: 'I can’t help with that one, but ask me anything about Aditya’s work!',
  rateLimitMessage: 'You’re asking faster than I can keep up 😅 Please wait a few minutes and try again.',

  // ── what the AI knows beyond the site's content ──
  // How the AI should refer to you, e.g. 'he/him'. Leave empty to have it use your name.
  ownerPronouns: '',
  // Add only things that are true — the AI is told never to invent facts.
  // Examples: 'Based in <city>', 'Master’s in Computer Science from <university>',
  // 'Open to remote and hybrid roles', 'Work authorization: <status>'.
  extraFacts: [] as string[],

  // ── model settings (used by worker/chat.ts on the server) ──
  endpoint: '/api/chat',
  // Which AI answers. Each needs its own key in .dev.vars (and on Cloudflare):
  //   'groq'      → GROQ_API_KEY
  //   'anthropic' → ANTHROPIC_API_KEY
  provider: 'groq' as Provider,
  models: {
    // Groq retires models now and then. If you get "model not found", pick a
    // current chat model from https://console.groq.com/docs/models
    groq: 'openai/gpt-oss-120b',
    anthropic: 'claude-opus-5-5',
  },
  effort: 'low' as Effort,   // how long the AI thinks first: chat answers are simple, low keeps replies fast
  maxTokens: 1024,           // cap per answer: keeps replies short and costs predictable
  maxHistory: 10,            // past messages sent along with each question
  maxMessageLength: 500,     // longest question a visitor can type
  rateLimit: {
    requests: 20,            // questions allowed per visitor…
    windowMinutes: 10,       // …in this many minutes
  },
}
