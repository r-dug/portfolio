import * as React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ImageCarousel, ProjectImage } from '@/components/ui/image-carousel'

interface CarouselImage {
  src: string
  alt: string
  caption?: string
}

/** A body item can be a plain string or a structured point with sub-bullets. */
type BodyItem = string | { point: string; sub?: string[] }

interface Section {
  heading: string
  body: string | BodyItem[]
  image?: CarouselImage
  carousel?: CarouselImage[]
}

interface MetricGroup {
  category: string
  items: string[]
}

interface ProjectPageProps {
  name: string
  tagline: string
  intro?: string
  liveUrl?: string
  githubUrl?: string
  tech: string[]
  sections: Section[]
  /** Legacy ordered results list */
  results?: string[]
  /** Categorized unordered metrics */
  metrics?: MetricGroup[]
  heroImage?: CarouselImage
  heroCarousel?: CarouselImage[]
}

/**
 * Parses **bold** markers in a string into React nodes.
 * e.g. "**Three-layer architecture:** React SPA" →
 *   [<strong>Three-layer architecture:</strong>, " React SPA"]
 */
function renderInline(text: string): React.ReactNode {
  // Split on **bold** and [text](url) markers
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)
  if (parts.length === 1) return text
  return parts.map((part, i) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/)
    if (bold) return <strong key={i} className="font-semibold text-[hsl(var(--foreground))]">{bold[1]}</strong>
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) return <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--primary))] underline underline-offset-2 hover:opacity-80 transition-opacity">{link[1]}</a>
    return part
  })
}

// Keep old name as alias for any existing callers
const renderBold = renderInline

function renderBodyItem(item: BodyItem, i: number) {
  if (typeof item === 'string') {
    return (
      <li key={i} className="flex gap-2">
        <span className="mt-1 shrink-0 text-[hsl(var(--primary))]">&#8250;</span>
        <span>{renderBold(item)}</span>
      </li>
    )
  }

  return (
    <li key={i}>
      <div className="flex gap-2">
        <span className="mt-1 shrink-0 text-[hsl(var(--primary))]">&#8250;</span>
        <span>{renderBold(item.point)}</span>
      </div>
      {item.sub && item.sub.length > 0 && (
        <ul className="ml-6 mt-1.5 space-y-1.5">
          {item.sub.map((s, j) => (
            <li key={j} className="flex gap-2">
              <span className="mt-1 shrink-0 text-[hsl(var(--muted-foreground))/0.5]">&#8211;</span>
              <span>{renderBold(s)}</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

export function ProjectPage({
  name,
  tagline,
  intro,
  liveUrl,
  githubUrl,
  tech,
  sections,
  results,
  metrics,
  heroImage,
  heroCarousel,
}: ProjectPageProps) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      {/* back */}
      <Link
        to="/projects"
        data-page-transition
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        All Projects
      </Link>

      {/* header */}
      <div className="mb-10">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[hsl(var(--primary))]">
          {tagline}
        </p>
        <div className="mb-4 flex items-start justify-between gap-4">
          <h1 className="text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">{name}</h1>
          <div className="flex shrink-0 items-center gap-2 pt-1">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                aria-label="Live site"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
        <div className="mb-2 h-0.5 w-full bg-[hsl(var(--border))]" />
        <div className="mt-4 flex flex-wrap gap-2">
          {tech.map(t => (
            <Badge key={t} variant="secondary">{t}</Badge>
          ))}
        </div>
        {intro && (
          <p className="mt-6 text-[hsl(var(--muted-foreground))] leading-relaxed">{renderBold(intro)}</p>
        )}
      </div>

      {/* hero image or carousel */}
      {heroCarousel && <ImageCarousel images={heroCarousel} className="mb-10" />}
      {heroImage && !heroCarousel && <ProjectImage {...heroImage} className="mb-10" />}

      {/* content sections */}
      <div className="space-y-10">
        {sections.map(section => (
          <section key={section.heading}>
            <h2 className="mb-3 text-lg font-semibold text-[hsl(var(--foreground))]">
              {section.heading}
            </h2>
            {Array.isArray(section.body) ? (
              <ul className="space-y-3 text-[hsl(var(--muted-foreground))] leading-relaxed">
                {section.body.map((item, i) => renderBodyItem(item, i))}
              </ul>
            ) : (
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">{renderBold(section.body)}</p>
            )}
            {section.carousel && <ImageCarousel images={section.carousel} className="mt-4" />}
            {section.image && !section.carousel && <ProjectImage {...section.image} className="mt-4" />}
          </section>
        ))}

        {/* metrics (categorized, unordered) */}
        {metrics && (
          <section>
            <h2 className="mb-3 text-lg font-semibold text-[hsl(var(--foreground))]">Metrics</h2>
            <div className="space-y-4">
              {metrics.map(group => (
                <div key={group.category}>
                  <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[hsl(var(--primary))]">
                    {group.category}
                  </p>
                  <ul className="space-y-1.5">
                    {group.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-2.5 text-sm"
                      >
                        <span className="mt-0.5 shrink-0 text-[hsl(var(--primary))]">&#8226;</span>
                        <span className="text-[hsl(var(--card-foreground))]">{renderBold(item)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* legacy results (ordered) */}
        {results && !metrics && (
          <section>
            <h2 className="mb-3 text-lg font-semibold text-[hsl(var(--foreground))]">Key Results</h2>
            <ul className="space-y-2">
              {results.map((r, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-3 text-sm"
                >
                  <span className="mt-0.5 shrink-0 font-bold text-[hsl(var(--primary))]">{i + 1}.</span>
                  <span className="text-[hsl(var(--card-foreground))]">{renderBold(r)}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  )
}
