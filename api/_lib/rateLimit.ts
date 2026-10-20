// Simple per-visitor limit kept in memory. Serverless instances are short-lived
// and not shared, so this is a speed bump against spam, not a hard guarantee.
// The real safety net is a monthly spend limit in the Anthropic Console.

const hits = new Map<string, number[]>()

export function isRateLimited(visitor: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const recent = (hits.get(visitor) ?? []).filter((time) => now - time < windowMs)
  recent.push(now)
  hits.set(visitor, recent)

  // don't let the map grow forever on a long-lived instance
  if (hits.size > 5000) hits.clear()

  return recent.length > limit
}
