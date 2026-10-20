// Picks the AI provider set in src/data/assistant.ts (`provider`).

import { assistant } from '../../../src/data/assistant.js'
import * as anthropic from './anthropic.js'
import * as groq from './groq.js'

const providers = { anthropic, groq }

export const provider = providers[assistant.provider]
export type { ChatTurn } from './types.js'
