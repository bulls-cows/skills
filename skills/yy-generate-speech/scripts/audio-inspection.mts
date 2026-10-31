import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

const execute = promisify(execFile)

export interface AudioInspection {
  duration: number
  meanDb: number
  peakDb: number
  silenceSeconds: number
}

/** 解码与基本质量门槛；发音与听感仍需人工试听。 */
export async function inspectAudioDetails(
  path: string,
  commands: { ffmpeg?: string; ffprobe?: string } = {},
): Promise<AudioInspection> {
  const probe = await execute(commands.ffprobe ?? 'ffprobe', [
    '-v',
    'error',
    '-select_streams',
    'a:0',
    '-show_entries',
    'stream=codec_name:format=duration',
    '-of',
    'json',
    path,
  ])
  const info = JSON.parse(probe.stdout) as {
    streams: { codec_name: string }[]
    format: { duration: string }
  }
  const duration = Number(info.format.duration)
  if (
    info.streams[0]?.codec_name !== 'mp3' ||
    !Number.isFinite(duration) ||
    duration < 0.15 ||
    duration > 30
  )
    throw new Error('音频格式或时长不合格')
  const decoded = await execute(
    commands.ffmpeg ?? 'ffmpeg',
    [
      '-v',
      'info',
      '-xerror',
      '-i',
      path,
      '-af',
      'volumedetect,silencedetect=noise=-45dB:d=0.4',
      '-f',
      'null',
      '-',
    ],
    { maxBuffer: 2 * 1024 * 1024 },
  )
  const mean = Number(/mean_volume: ([-\d.]+) dB/.exec(decoded.stderr)?.[1])
  const peak = Number(/max_volume: ([-\d.]+) dB/.exec(decoded.stderr)?.[1])
  if (!Number.isFinite(mean) || mean < -40 || peak >= 0)
    throw new Error('音频静音、音量过低或存在削波风险')
  const silence = [...decoded.stderr.matchAll(/silence_duration: ([\d.]+)/g)].reduce(
    (sum, match) => sum + Number(match[1]),
    0,
  )
  if (silence > duration * 0.65) throw new Error('音频静音占比过高，需人工检查')
  return { duration, meanDb: mean, peakDb: peak, silenceSeconds: silence }
}

export async function inspectAudio(path: string): Promise<number> {
  return (await inspectAudioDetails(path)).duration
}
