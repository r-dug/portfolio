import { Link, useLocation } from 'react-router-dom'
import { ThemePicker } from './ThemePicker'
import { cn } from '@/lib/utils'

const LINKS = [
  { to: '/',         label: 'Home' },
  { to: '/about',    label: 'About' },
  { to: '/projects', label: 'Projects' },
]

export function Nav() {
  const { pathname } = useLocation()

  return (
    <nav className="sticky top-0 z-40 border-b border-[hsl(var(--border))] bg-[hsl(var(--background)/0.85)] backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <Link
          to="/"
          className="text-sm font-semibold tracking-tight text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors"
          data-page-transition
        >
          RD
        </Link>

        <div className="flex items-center gap-1">
          {LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              data-page-transition
              className={cn(
                'rounded-md px-3 py-1.5 text-sm transition-colors',
                pathname === to
                  ? 'text-[hsl(var(--primary))] font-medium'
                  : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]',
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        <ThemePicker />
      </div>
    </nav>
  )
}
