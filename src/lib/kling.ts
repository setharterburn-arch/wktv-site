import crypto from 'node:crypto'

const HOST = process.env.KLING_API_HOST || 'https://api-singapore.klingai.com'

function b64url(buf: Buffer | string): string {
  return Buffer.from(buf)
    .toString('base64')
    .replace(/=+$/, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

function signJwt(): string {
  const accessKey = process.env.KLING_ACCESS_KEY
  const secretKey = process.env.KLING_SECRET_KEY
  if (!accessKey || !secretKey) {
    throw new Error('KLING_ACCESS_KEY / KLING_SECRET_KEY not set')
  }
  const header = { alg: 'HS256', typ: 'JWT' }
  const now = Math.floor(Date.now() / 1000)
  const payload = { iss: accessKey, exp: now + 1800, nbf: now - 5 }
  const data = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(payload))}`
  const sig = crypto.createHmac('sha256', secretKey).update(data).digest()
  return `${data}.${b64url(sig)}`
}

async function klingFetch(path: string, init?: RequestInit) {
  const res = await fetch(`${HOST}${path}`, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: `Bearer ${signJwt()}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })
  const text = await res.text()
  let json: any = null
  try {
    json = text ? JSON.parse(text) : null
  } catch {
    json = { raw: text }
  }
  return { ok: res.ok, status: res.status, json }
}

export type SubmitTextToVideoInput = {
  prompt: string
  negativePrompt?: string
  modelName?: string
  duration?: '5' | '10'
  aspectRatio?: '16:9' | '9:16' | '1:1'
  cfgScale?: number
}

export async function submitTextToVideo(input: SubmitTextToVideoInput) {
  const body = {
    model_name: input.modelName ?? 'kling-v1',
    prompt: input.prompt,
    negative_prompt: input.negativePrompt,
    duration: input.duration ?? '5',
    aspect_ratio: input.aspectRatio ?? '16:9',
    cfg_scale: input.cfgScale,
  }
  return klingFetch('/v1/videos/text2video', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export async function getTextToVideoTask(taskId: string) {
  return klingFetch(`/v1/videos/text2video/${encodeURIComponent(taskId)}`, {
    method: 'GET',
  })
}
