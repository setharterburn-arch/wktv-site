import { NextRequest, NextResponse } from 'next/server'
import { getTextToVideoTask } from '@/lib/kling'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params?.id?.trim()
  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 })
  }

  try {
    const { ok, status, json } = await getTextToVideoTask(id)
    if (!ok) {
      return NextResponse.json(
        { error: 'Kling status query failed', status, response: json },
        { status: 502 }
      )
    }

    const data = json?.data
    const videos = data?.task_result?.videos ?? []
    return NextResponse.json({
      taskId: data?.task_id,
      taskStatus: data?.task_status,
      taskStatusMsg: data?.task_status_msg,
      createdAt: data?.created_at,
      updatedAt: data?.updated_at,
      videos: videos.map((v: any) => ({
        id: v?.id,
        url: v?.url,
        duration: v?.duration,
      })),
      raw: json,
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Unknown error' },
      { status: 500 }
    )
  }
}
