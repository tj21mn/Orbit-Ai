import { streamText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { auth } from '@clerk/nextjs/server'
import type { Opportunity } from '@/types'

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const opportunity = (await req.json()) as Opportunity

  const result = streamText({
    model: anthropic('claude-sonnet-4-20250514'),
    prompt: `Write a concise product requirements document (PRD) for this opportunity:

Title: ${opportunity.title}
Description: ${opportunity.description}
Signals: ${opportunity.signal_count}
Impact score: ${opportunity.impact_score}/100
Category: ${opportunity.category}
Customer quotes: ${opportunity.customer_quotes.join('; ')}

Use markdown-style section headers starting with ## for:
## Problem Statement
## Who Is Affected
## Proposed Solution
## User Stories
## Success Metrics
## Out of Scope

Write clear, actionable content under each section. No preamble.`,
  })

  return result.toTextStreamResponse()
}
