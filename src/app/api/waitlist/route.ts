import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase-server'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  let body: { email?: string }

  try {
    body = (await request.json()) as { email?: string }
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const email = body.email?.trim().toLowerCase()

  if (!email || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  try {
    const supabase = createServerSupabase()
    const table = process.env.SUPABASE_WAITLIST_TABLE ?? 'waitlist'
    const emailColumn = process.env.SUPABASE_WAITLIST_EMAIL_COLUMN ?? 'email'

    const result =
      emailColumn === 'Email'
        ? await supabase.from(table).insert({ Email: email })
        : await supabase.from(table).insert({ email })

    const { error } = result

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'This email is already on the waitlist.' },
          { status: 409 },
        )
      }

      if (error.code === '42P01' || error.code === 'PGRST205') {
        return NextResponse.json(
          { error: 'Waitlist is not set up yet. Run supabase/waitlist.sql in your Supabase project.' },
          { status: 503 },
        )
      }

      if (error.code === 'PGRST204') {
        return NextResponse.json(
          { error: 'Waitlist table is misconfigured. Check SUPABASE_WAITLIST_EMAIL_COLUMN in .env.local.' },
          { status: 503 },
        )
      }

      return NextResponse.json({ error: 'Unable to join the waitlist. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Waitlist is unavailable. Please try again later.' }, { status: 500 })
  }
}
