import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { anthropic } from '@/lib/anthropic'
import { supabaseAdmin } from '@/lib/supabase'
import type { Opportunity } from '@/types'

type RawOpportunity = {
  title: string
  description: string
  signal_count: number
  impact_score: number
  category: Opportunity['category']
  customer_quotes: string[]
}

const DEMO_SIGNALS = [
  '[INTERCOM][enterprise] Sarah Chen: "We lose deals because you dont have CSV export"',
  '[SLACK][enterprise] Marcus Webb: "Bulk user management is blocking our rollout"',
  '[INTERCOM][pro] Priya Nair: "Slack notifications would be a game changer"',
  '[GONG][enterprise] Tom Wilson: "CSV export was deal-breaker on renewal call"',
  '[SLACK][enterprise] Amy Johnson: "Bulk management is our #1 enterprise complaint"',
  '[INTERCOM][enterprise] David Park: "We almost churned over missing CSV export"',
  '[GONG][pro] Lisa Chen: "Customer asked about mobile app 3 times this call"',
  '[INTERCOM][standard] Ryan Moore: "API webhooks blocking our automation entirely"',
  '[SLACK][enterprise] Emma R: "Finance team needs CSV export for monthly close"',
  '[INTERCOM][enterprise] Kevin Z: "Bulk provisioning took ops team 4 hours this week"',
]

async function verifyWorkspace(userId: string, workspaceId: string) {
  const { data } = await supabaseAdmin
    .from('workspaces')
    .select('id')
    .eq('id', workspaceId)
    .eq('owner_id', userId)
    .maybeSingle()

  return Boolean(data)
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = (await req.json()) as {
      signals?: string[]
      workspaceId?: string
    }
    const { signals, workspaceId } = body

    if (workspaceId && !(await verifyWorkspace(userId, workspaceId))) {
      return NextResponse.json({ error: 'Workspace not found' }, { status: 403 })
    }

    let signalTexts: string[] = []

    if (signals && signals.length > 0) {
      signalTexts = signals

      if (workspaceId) {
        const rows = signals.map((s: string) => ({
          workspace_id: workspaceId,
          source: 'manual',
          content: s,
        }))
        await supabaseAdmin.from('signals').insert(rows)
      }
    } else if (workspaceId) {
      const { data } = await supabaseAdmin
        .from('signals')
        .select('content, source, customer_name')
        .eq('workspace_id', workspaceId)
        .order('created_at', { ascending: false })
        .limit(100)

      signalTexts =
        data?.map(
          (s) =>
            `[${s.source.toUpperCase()}] ${s.customer_name || 'Customer'}: "${s.content}"`,
        ) || []
    }

    if (signalTexts.length === 0) {
      signalTexts = DEMO_SIGNALS
    }

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      system: `You are a senior product analyst. 
Analyze customer signals and return ONLY a valid 
JSON array. No markdown, no explanation, 
just the raw JSON array.

Each object must have exactly:
{
  "title": "short feature name under 5 words",
  "description": "2-3 sentences about the problem and impact",
  "signal_count": number of related signals,
  "impact_score": number 0-100 (enterprise=higher, churn risk=highest),
  "category": "Revenue risk" | "Churn risk" | "Retention" | "Growth unlock",
  "customer_quotes": ["quote 1", "quote 2"]
}

Return 3-5 opportunities sorted by 
impact_score descending.`,
      messages: [
        {
          role: 'user',
          content: `Analyze these ${signalTexts.length} signals:\n\n${signalTexts.join('\n')}`,
        },
      ],
    })

    const block = message.content[0]
    const responseText = block.type === 'text' ? block.text : '[]'

    const cleaned = responseText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim()

    const parsed = JSON.parse(cleaned) as RawOpportunity[]
    const opportunities = Array.isArray(parsed) ? parsed : []

    let saved: Opportunity[] = []

    if (workspaceId && opportunities.length > 0) {
      await supabaseAdmin.from('opportunities').delete().eq('workspace_id', workspaceId)

      const rows = opportunities.map((o) => ({
        workspace_id: workspaceId,
        title: o.title,
        description: o.description,
        signal_count: o.signal_count,
        impact_score: o.impact_score,
        category: o.category,
        customer_quotes: o.customer_quotes,
      }))

      const { data: inserted, error } = await supabaseAdmin
        .from('opportunities')
        .insert(rows)
        .select()

      if (error) throw error
      saved = (inserted ?? []) as Opportunity[]
    }

    return NextResponse.json({
      success: true,
      opportunities: saved.length > 0 ? saved : opportunities,
      signal_count: signalTexts.length,
    })
  } catch (error) {
    console.error('Analyze error:', error)
    return NextResponse.json(
      { error: 'Analysis failed', details: String(error) },
      { status: 500 },
    )
  }
}
