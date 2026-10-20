// Secrets the Worker can read.
// Locally they come from the .dev.vars file; on Cloudflare, from the Worker's
// Settings → Variables and Secrets. Only the active provider's key is needed.
export type Env = {
  GROQ_API_KEY?: string
  ANTHROPIC_API_KEY?: string
}
