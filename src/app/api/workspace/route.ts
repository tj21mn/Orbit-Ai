import { NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await currentUser()
    const firstName = user?.firstName || 'there'
    const workspaceName = `${firstName}'s workspace`

    const { data: existing } = await supabaseAdmin
      .from('workspaces')
      .select('*')
      .eq('owner_id', userId)
      .maybeSingle()

    if (existing) {
      return NextResponse.json(existing)
    }

    const { data: created, error } = await supabaseAdmin
      .from('workspaces')
      .insert({
        name: workspaceName,
        owner_id: userId,
        slug: userId.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(created)
  } catch (error) {
    console.error('Workspace error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
