// One message in the conversation, the same shape for every AI provider.
export type ChatTurn = {
  role: 'user' | 'assistant'
  content: string
}
