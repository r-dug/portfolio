import { useEffect, useState } from 'react'
import { useTheme } from '@/lib/theme'

interface Props {
  words: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseMs?: number
  className?: string
}

export function TypingAnimation({
  words,
  typingSpeed = 80,
  deletingSpeed = 45,
  pauseMs = 1800,
  className,
}: Props) {
  const { theme } = useTheme()
  const [displayed, setDisplayed] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing')

  useEffect(() => {
    const target = words[wordIdx]

    if (phase === 'typing') {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), typingSpeed)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('pausing'), pauseMs)
        return () => clearTimeout(t)
      }
    }

    if (phase === 'pausing') {
      setPhase('deleting')
      return
    }

    if (phase === 'deleting') {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(d => d.slice(0, -1)), deletingSpeed)
        return () => clearTimeout(t)
      } else {
        setWordIdx(i => (i + 1) % words.length)
        setPhase('typing')
      }
    }
  }, [displayed, phase, wordIdx, words, typingSpeed, deletingSpeed, pauseMs])

  return (
    <span className={className}>
      {displayed}
      {theme === 'terminal' ? (
        <span className="cursor" />
      ) : (
        <span
          style={{
            display: 'inline-block',
            width: '2px',
            height: '1em',
            background: 'hsl(var(--primary))',
            marginLeft: '2px',
            verticalAlign: 'text-bottom',
            animation: 'cursor-pulse 1s step-end infinite',
          }}
        />
      )}
    </span>
  )
}
