import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { TypingAnimation } from '@/components/TypingAnimation'
import { cn } from '@/lib/utils'

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
            <Github className="h-4 w-4" />
            r-dug
          </a>
          <a
            href="https://www.linkedin.com/in/richard-douglas-a99a00271/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
          >
            <Linkedin className="h-4 w-4" />
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
