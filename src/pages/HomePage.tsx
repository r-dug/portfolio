import { Link } from 'react-router-dom'
import { Mail, ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { TypingAnimation } from '@/components/TypingAnimation'
import { cn } from '@/lib/utils'

function GitHubSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedInSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0h.003z" />
    </svg>
  )
}

const TYPING_WORDS = [
  'ML Systems',
  'Agentic Pipelines',
  'Production AI',
  'Research',
  'Full-Stack Apps',
]

export function HomePage() {
  return (
    <main className="flex min-h-[calc(100vh-57px)] flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-2xl">
        {/* eyebrow */}
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
          MS Computer Science &middot; University of Louisville
        </p>

        {/* name */}
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-[hsl(var(--foreground))] sm:text-6xl">
          Richard Douglas
        </h1>

        {/* typing animation */}
        <p className="mb-6 text-2xl font-light text-[hsl(var(--primary))] sm:text-3xl">
          Building{' '}
          <TypingAnimation
            words={TYPING_WORDS}
            className="font-semibold"
          />
        </p>

        {/* bio */}
        <p className="mb-10 max-w-xl text-base leading-relaxed text-[hsl(var(--muted-foreground))]">
          I build AI systems that ship to production&mdash;agentic pipelines, clinical LLM apps,
          federated learning research, and tools that actually work under real-world constraints.
          Currently finishing my M.S. in CS at UofL while working at the intersection of applied
          ML and systems engineering.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/projects"
            data-page-transition
            className={cn(buttonVariants({ size: 'lg' }), 'inline-flex items-center gap-2')}
          >
            View Projects
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/about"
            data-page-transition
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
          >
            About Me
          </Link>
        </div>

        {/* social links */}
        <div className="mt-12 flex items-center gap-4 border-t border-[hsl(var(--border))] pt-8">
          <a
            href="https://github.com/r-dug"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
          >
            <GitHubSVG className="h-4 w-4" />
            r-dug
          </a>
          <a
            href="https://www.linkedin.com/in/richard-douglas-a99a00271/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
          >
            <LinkedInSVG className="h-4 w-4" />
            LinkedIn
          </a>
          <a
            href="mailto:richard.douglas@louisville.edu"
            className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
          >
            <Mail className="h-4 w-4" />
            richard.douglas@louisville.edu
          </a>
        </div>
      </div>
    </main>
  )
}
