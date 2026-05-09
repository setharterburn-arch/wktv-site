import { NextRequest, NextResponse } from 'next/server'
import { submitTextToVideo } from '@/lib/kling'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  let body: any
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const prompt = typeof body?.prompt === 'string' ? body.prompt.trim() : ''
  if (!prompt) {
    return NextResponse.json({ error: 'prompt is required' }, { status: 400 })
  }

  try {
    const { ok, status, json } = await submitTextToVideo({
      prompt,
      negativePrompt: body?.negativePrompt,
      modelName: body?.modelName,
      duration: body?.duration,
      aspectRatio: body?.aspectRatio,
      cfgScale: body?.cfgScale,
    })

    if (!ok) {
      return NextResponse.json(
        { error: 'Kling submission failed', status, response: json },
        { status: 502 }
      )
    }

    const taskId = json?.data?.task_id
    return NextResponse.json({
      taskId,
      taskStatus: json?.data?.task_status,
      requestId: json?.request_id,
      raw: json,
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Unknown error' },
      { status: 500 }
    )
  }
}
