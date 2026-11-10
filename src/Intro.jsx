import {
  AbsoluteFill,
  Sequence,
  interpolate,
  interpolateColors,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'

const ACCENT = '#6d5dfc'
const ACCENT_2 = '#e94baf'
const GRADIENT = `linear-gradient(90deg, ${ACCENT}, ${ACCENT_2})`
const FONT = "'Inter', -apple-system, 'SF Pro Display', system-ui, sans-serif"

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }

// Fades a scene in at the start and out at the end of its sequence.
const useSceneFade = (duration, fadeLen = 12) => {
  const frame = useCurrentFrame()
  return interpolate(frame, [0, fadeLen, duration - fadeLen, duration], [0, 1, 1, 0], clamp)
}

const Background = () => {
  const frame = useCurrentFrame()
  const orb = (color, size, x, y, speed, phase) => ({
    position: 'absolute',
    width: size,
    height: size,
    borderRadius: '50%',
    background: color,
    filter: 'blur(120px)',
    opacity: 0.45,
    left: x + Math.sin(frame / speed + phase) * 120,
    top: y + Math.cos(frame / speed + phase) * 80,
  })
  return (
    <AbsoluteFill style={{ background: 'radial-gradient(circle at 50% 40%, #1d1c3a, #0b0b18 70%)' }}>
      <div style={orb(ACCENT, 700, 200, 100, 60, 0)} />
      <div style={orb(ACCENT_2, 600, 1100, 450, 70, 2)} />
      <div style={orb('#3fb6ff', 450, 700, 650, 50, 4)} />
    </AbsoluteFill>
  )
}

const Atom = ({ size }) => (
  <svg width={size} height={size} viewBox="-50 -50 100 100">
    <defs>
      <linearGradient id="g" x1="0" x2="1">
        <stop offset="0" stopColor={ACCENT} />
        <stop offset="1" stopColor={ACCENT_2} />
      </linearGradient>
    </defs>
    {[0, 60, 120].map((r) => (
      <ellipse key={r} rx="44" ry="17" fill="none" stroke="url(#g)" strokeWidth="4" transform={`rotate(${r})`} />
    ))}
    <circle r="8" fill="url(#g)" />
  </svg>
)

const LogoScene = ({ duration }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const pop = spring({ frame, fps, config: { damping: 12 } })
  const textIn = spring({ frame: frame - 15, fps, config: { damping: 200 } })
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: useSceneFade(duration) }}>
      <div style={{ transform: `scale(${pop}) rotate(${(1 - pop) * -180 + frame * 0.6}deg)` }}>
        <Atom size={260} />
      </div>
      <div
        style={{
          marginTop: 40,
          fontSize: 64,
          fontWeight: 700,
          color: 'white',
          letterSpacing: 2,
          opacity: textIn,
          transform: `translateY(${(1 - textIn) * 40}px)`,
        }}
      >
        Hello React
      </div>
    </AbsoluteFill>
  )
}

const Letters = ({ text, start, gradient }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  return text.split('').map((ch, i) => {
    const s = spring({ frame: frame - start - i * 3, fps, config: { damping: 14 } })
    return (
      <span
        key={i}
        style={{
          display: 'inline-block',
          whiteSpace: 'pre',
          opacity: s,
          transform: `translateY(${(1 - s) * 80}px) scale(${0.6 + s * 0.4})`,
          ...(gradient && {
            color: interpolateColors(i, [0, text.length - 1], [ACCENT, ACCENT_2]),
          }),
        }}
      >
        {ch}
      </span>
    )
  })
}

const HelloScene = ({ duration }) => {
  const frame = useCurrentFrame()
  const sub = interpolate(frame, [45, 65], [0, 1], clamp)
  const zoom = interpolate(frame, [0, duration], [1, 1.06])
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        opacity: useSceneFade(duration),
        transform: `scale(${zoom})`,
      }}
    >
      <div style={{ fontSize: 190, fontWeight: 800, color: 'white', letterSpacing: -4 }}>
        <Letters text="Hello, " start={0} />
        <Letters text="World!" start={21} gradient />
      </div>
      <div style={{ fontSize: 44, color: '#b6bad0', opacity: sub, marginTop: 10 }}>
        Your first React app.
      </div>
    </AbsoluteFill>
  )
}

const features = [
  { icon: '⚡', title: 'Fast' },
  { icon: '🧩', title: 'Components' },
  { icon: '🎨', title: 'Styled' },
]

const FeaturesScene = ({ duration }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  return (
    <AbsoluteFill
      style={{ justifyContent: 'center', alignItems: 'center', gap: 50, flexDirection: 'row', opacity: useSceneFade(duration) }}
    >
      {features.map((f, i) => {
        const s = spring({ frame: frame - i * 8, fps, config: { damping: 13 } })
        return (
          <div
            key={f.title}
            style={{
              width: 400,
              padding: '56px 0',
              borderRadius: 36,
              background: 'rgba(255,255,255,0.06)',
              border: '2px solid rgba(255,255,255,0.12)',
              textAlign: 'center',
              color: 'white',
              opacity: s,
              transform: `translateY(${(1 - s) * 150}px)`,
            }}
          >
            <div style={{ fontSize: 110 }}>{f.icon}</div>
            <div style={{ fontSize: 56, fontWeight: 700, marginTop: 16 }}>{f.title}</div>
          </div>
        )
      })}
    </AbsoluteFill>
  )
}

const OutroScene = ({ duration }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = spring({ frame, fps, config: { damping: 200 } })
  const bar = interpolate(frame, [10, 40], [0, 1], clamp)
  const fadeOut = interpolate(frame, [duration - 20, duration], [1, 0], clamp)
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: fadeOut }}>
      <div
        style={{
          fontSize: 120,
          fontWeight: 800,
          color: 'white',
          letterSpacing: -2,
          opacity: s,
          transform: `scale(${0.9 + s * 0.1})`,
        }}
      >
        Let's build something.
      </div>
      <div style={{ width: 600 * bar, height: 10, borderRadius: 5, background: GRADIENT, marginTop: 36 }} />
    </AbsoluteFill>
  )
}

export const Intro = () => (
  <AbsoluteFill style={{ fontFamily: FONT }}>
    <Background />
    <Sequence from={0} durationInFrames={90}>
      <LogoScene duration={90} />
    </Sequence>
    <Sequence from={84} durationInFrames={120}>
      <HelloScene duration={120} />
    </Sequence>
    <Sequence from={198} durationInFrames={90}>
      <FeaturesScene duration={90} />
    </Sequence>
    <Sequence from={282} durationInFrames={78}>
      <OutroScene duration={78} />
    </Sequence>
  </AbsoluteFill>
)
