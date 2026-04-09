import { createContext, useContext, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark' | 'synthwave' | 'terminal'

const THEMES: Theme[] = ['light', 'dark', 'synthwave', 'terminal']
const STORAGE_KEY = 'theme'

interface ThemeContextValue {
  theme: Theme
  setTheme: (t: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue>({ theme: 'dark', setTheme: () => {} })

// ── Ease helpers ──────────────────────────────────────────────────────────────
function easeOut(t: number) { return 1 - Math.pow(1 - t, 3) }
function easeIn(t: number)  { return t * t * t }

// ── Synthwave: radial sweep + slide ──────────────────────────────────────────
const TRANS_MS = 750
const GROW_END  = 0.42

function synthwaveTransition(btn: Element) {
  const rect = (btn as HTMLElement).getBoundingClientRect()
  const vw = window.innerWidth
  const vh = window.innerHeight
  const cx = rect.left + rect.width  / 2
  const cy = rect.top  + rect.height / 2

  const canvas = document.createElement('canvas')
  canvas.width  = vw
  canvas.height = vh
  Object.assign(canvas.style, {
    position: 'fixed', inset: '0', zIndex: '9999', pointerEvents: 'none',
  })
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')!
  const maxSize = Math.hypot(vw, vh) * 1.4
  const destX = -maxSize * 0.35
  const destY =  vh + maxSize * 0.35
  const start = performance.now()

  function drawShape(centerX: number, centerY: number, size: number) {
    const hw = size / 2
    const grad = ctx.createLinearGradient(centerX - hw, centerY - hw, centerX + hw, centerY + hw)
    grad.addColorStop(0,    'hsl(185 100% 55%)')
    grad.addColorStop(0.40, 'hsl(280  80% 38%)')
    grad.addColorStop(0.75, 'hsl(320 100% 60%)')
    grad.addColorStop(1,    'hsl(268  75% 22%)')
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.roundRect(centerX - hw, centerY - hw, size, size, 12)
    ctx.fill()
  }

  function frame(now: number) {
    const t = Math.min((now - start) / TRANS_MS, 1)
    ctx.clearRect(0, 0, vw, vh)
    if (t <= GROW_END) {
      const p    = easeOut(t / GROW_END)
      const size = rect.width + (maxSize - rect.width) * p
      drawShape(cx, cy, size)
    } else {
      const p      = easeIn((t - GROW_END) / (1 - GROW_END))
      const centerX = cx + (destX - cx) * p
      const centerY = cy + (destY - cy) * p
      const size    = maxSize * (1 - p)
      drawShape(centerX, centerY, size)
    }
    if (t < 1) requestAnimationFrame(frame)
    else canvas.remove()
  }
  requestAnimationFrame(frame)
}

// ── Dark / Light: page transition ─────────────────────────────────────────────
const DL_TRANS_MS = 700
const DL_GROW_END = 0.40

function darkLightPageTransition(el: Element, isDark: boolean) {
  const rect = (el as HTMLElement).getBoundingClientRect()
  const vw   = window.innerWidth
  const vh   = window.innerHeight
  const solid = isDark ? '#000' : '#fff'
  const r = isDark ? 0 : 255

  const canvas = document.createElement('canvas')
  canvas.width = vw; canvas.height = vh
  Object.assign(canvas.style, { position: 'fixed', inset: '0', zIndex: '9999', pointerEvents: 'none' })
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')!
  const start = performance.now()

  function frame(now: number) {
    const t = Math.min((now - start) / DL_TRANS_MS, 1)
    ctx.clearRect(0, 0, vw, vh)
    if (t <= DL_GROW_END) {
      const p = easeOut(t / DL_GROW_END)
      const x = rect.left   * (1 - p)
      const y = rect.top    * (1 - p)
      const w = rect.width  + (vw - rect.width)  * p
      const h = rect.height + (vh - rect.height) * p
      ctx.fillStyle = solid
      ctx.fillRect(x, y, w, h)
    } else {
      const p  = easeIn((t - DL_GROW_END) / (1 - DL_GROW_END))
      const tx = -p * vw
      const ty =  p * vh
      ctx.save()
      ctx.translate(tx, ty)
      const grad = ctx.createLinearGradient(vw, 0, vw * 0.5, vh * 0.5)
      grad.addColorStop(0,    `rgba(${r},${r},${r},0)`)
      grad.addColorStop(0.45, `rgba(${r},${r},${r},1)`)
      grad.addColorStop(1,    `rgba(${r},${r},${r},1)`)
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, vw, vh)
      ctx.restore()
    }
    if (t < 1) requestAnimationFrame(frame)
    else canvas.remove()
  }
  requestAnimationFrame(frame)
}

// ── Terminal: matrix rain transition ─────────────────────────────────────────
function terminalTransition() {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const canvas = document.createElement('canvas')
  canvas.width  = vw
  canvas.height = vh
  Object.assign(canvas.style, { position: 'fixed', inset: '0', zIndex: '9999', pointerEvents: 'none' })
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')!

  const fontSize = 14
  const cols = Math.ceil(vw / fontSize)
  const drops = new Array<number>(cols).fill(0).map(() => Math.random() * -50)
  const chars = '01アイウエオカキクケコ<>{}[]|/\\'.split('')

  const TOTAL_MS = 800
  const start = performance.now()

  function frame(now: number) {
    const elapsed = now - start
    const progress = Math.min(elapsed / TOTAL_MS, 1)

    ctx.fillStyle = `rgba(0, 0, 0, ${0.05 + progress * 0.05})`
    ctx.fillRect(0, 0, vw, vh)

    const brightness = Math.max(0, 1 - progress * 1.5)
    ctx.fillStyle = `rgba(0, ${Math.floor(255 * brightness)}, 0, ${0.8 * (1 - progress)})`
    ctx.font = `${fontSize}px monospace`

    for (let i = 0; i < cols; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)]
      ctx.fillText(char, i * fontSize, drops[i] * fontSize)
      drops[i] += 0.5 + progress * 2
    }

    if (elapsed < TOTAL_MS) requestAnimationFrame(frame)
    else canvas.remove()
  }
  requestAnimationFrame(frame)
}

// ── ThemeProvider ─────────────────────────────────────────────────────────────
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    return stored && THEMES.includes(stored) ? stored : 'dark'
  })

  useEffect(() => {
    const html = document.documentElement
    html.classList.remove('dark', 'synthwave', 'terminal')
    if (theme !== 'light') html.classList.add(theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      const target = e.target as Element

      if (theme === 'synthwave') {
        const transEl = target.closest('[data-page-transition]')
        if (transEl) synthwaveTransition(transEl)
      } else if (theme === 'terminal') {
        const transEl = target.closest('[data-page-transition]')
        if (transEl) terminalTransition()
      } else {
        const transEl = target.closest('[data-page-transition]')
        if (transEl) darkLightPageTransition(transEl, theme === 'dark')
      }

      const btn = target.closest('button:not([disabled])')
      if (!btn) return
      btn.classList.remove('btn-clicked')
      void (btn as HTMLElement).offsetWidth
      btn.classList.add('btn-clicked')
      setTimeout(() => btn.classList.remove('btn-clicked'), 520)
    }

    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeState }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
