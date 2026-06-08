import { useState } from 'react'
import logos from './vendor-logos.json'

const LOGOS = logos as Record<string, string>

function initials(name: string): string {
  const words = name.replace(/[^a-zA-Z0-9 &]/g, '').split(/\s+/).filter(w => w && w !== '&')
  if (words.length === 0) return '•'
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

/** Deterministic hue from the name so each monogram tile has a stable color. */
function hue(name: string): number {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360
  return h
}

export function VendorThumb({ name }: { name: string }) {
  const src = LOGOS[name]
  const [broken, setBroken] = useState(false)

  if (src && !broken) {
    return (
      <img
        src={src}
        alt=""
        aria-hidden
        loading="lazy"
        onError={() => setBroken(true)}
        className="h-10 w-10 shrink-0 rounded-md border border-[hsl(var(--border))] bg-white object-contain p-1"
      />
    )
  }

  const h = hue(name)
  return (
    <span
      aria-hidden
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-sm font-semibold text-white"
      style={{ backgroundColor: `hsl(${h} 42% 42%)` }}
    >
      {initials(name)}
    </span>
  )
}
