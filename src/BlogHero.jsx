import { AbsoluteFill } from 'remotion'

const ACCENT = '#6d5dfc'
const ACCENT_2 = '#e94baf'

// A static header image for the blog article: a stylized code editor
// floating over the same glowing background as the intro video.
const lines = [
  [['#c792ea', 'function '], ['#82aaff', 'App'], ['#eceefa', '() {']],
  [['#c792ea', '  return '], ['#eceefa', '(']],
  [['#89ddff', '    <'], ['#f07178', 'h1'], ['#89ddff', '>'], ['#eceefa', 'Hello, World!'], ['#89ddff', '</'], ['#f07178', 'h1'], ['#89ddff', '>']],
  [['#eceefa', '  )']],
  [['#eceefa', '}']],
]

export const BlogHero = () => (
  <AbsoluteFill
    style={{
      background: 'radial-gradient(circle at 50% 40%, #1d1c3a, #0b0b18 75%)',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'SF Mono', Menlo, monospace",
    }}
  >
    {[
      [ACCENT, 700, 150, 50],
      [ACCENT_2, 600, 950, 350],
      ['#3fb6ff', 450, 550, 500],
    ].map(([color, size, x, y]) => (
      <div
        key={color}
        style={{
          position: 'absolute', left: x, top: y, width: size, height: size,
          borderRadius: '50%', background: color, filter: 'blur(120px)', opacity: 0.45,
        }}
      />
    ))}
    <div
      style={{
        width: 900,
        borderRadius: 24,
        background: 'rgba(20, 21, 40, 0.85)',
        border: '2px solid rgba(255,255,255,0.1)',
        boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
        transform: 'perspective(1600px) rotateY(-8deg) rotateX(6deg)',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', gap: 12, padding: '20px 24px', borderBottom: '2px solid rgba(255,255,255,0.06)' }}>
        {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
          <div key={c} style={{ width: 18, height: 18, borderRadius: '50%', background: c }} />
        ))}
        <div style={{ marginLeft: 20, color: '#9aa0b8', fontSize: 22 }}>App.jsx</div>
      </div>
      <div style={{ padding: '36px 44px', fontSize: 40, lineHeight: 1.7 }}>
        {lines.map((line, i) => (
          <div key={i} style={{ whiteSpace: 'pre' }}>
            <span style={{ color: '#4b4f6b', marginRight: 36 }}>{i + 1}</span>
            {line.map(([color, text], j) => (
              <span key={j} style={{ color }}>{text}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  </AbsoluteFill>
)
