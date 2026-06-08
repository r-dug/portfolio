import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CalendarDays, MapPin, Download, Table, Map } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { MARKETS, allDays, ICS_PATH, CSV_PATH, MYMAPS_VIEW, ALL_CATEGORIES, marketCategories } from './data'

export function FarmersMarketsPage() {
  const days = useMemo(() => allDays(), [])
  const [active, setActive] = useState<string>('All')
  const [cats, setCats] = useState<Set<string>>(new Set())

  // categories actually present across markets, in master order
  const categories = useMemo(() => {
    const present = new Set(MARKETS.flatMap(m => marketCategories(m)))
    return ALL_CATEGORIES.filter(c => present.has(c))
  }, [])

  function toggleCat(c: string) {
    setCats(prev => {
      const next = new Set(prev)
      next.has(c) ? next.delete(c) : next.add(c)
      return next
    })
  }

  const filtered = useMemo(
    () =>
      MARKETS.filter(m => {
        const dayOk = active === 'All' || m.days.some(d => d.day === active)
        if (!dayOk) return false
        if (cats.size === 0) return true
        const mc = new Set(marketCategories(m))
        // OR semantics: market has at least one of the selected categories
        for (const c of cats) if (mc.has(c)) return true
        return false
      }),
    [active, cats],
  )

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <Link
        to="/projects"
        data-page-transition
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        All Projects
      </Link>

      <header className="mb-10">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[hsl(var(--primary))]">
          Louisville · 2026 season
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Louisville Farmers Markets
        </h1>
        <div className="mb-4 h-1 w-16 rounded-full bg-[hsl(var(--primary))]" />
        <p className="max-w-2xl text-[hsl(var(--muted-foreground))] leading-relaxed">
          A guide to {MARKETS.length} farmers markets across the Louisville area — schedules, seasons,
          vendor lists, and locations. Compiled from each market&apos;s own pages, multi-source
          verification, and weekly vendor lineups. Schedules shift; check a market&apos;s page before
          relying on a specific date.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={ICS_PATH}
            download
            className={cn(buttonVariants({ variant: 'default', size: 'sm' }))}
          >
            <Download className="h-4 w-4" />
            Add all to your calendar (.ics)
          </a>
          <a
            href={CSV_PATH}
            download
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          >
            <Table className="h-4 w-4" />
            Map data (CSV for Google My Maps)
          </a>
        </div>
      </header>

      {/* Full map of all markets (published Google My Map). A live iframe embed is
          blocked by this site's cross-origin isolation (COEP: require-corp, set by
          coi-serviceworker for the wllama chatbot), so this links out instead. */}
      <section className="mb-10">
        <a
          href={MYMAPS_VIEW}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 transition-colors hover:border-[hsl(var(--ring)/0.5)]"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--primary)/0.12)]">
            <Map className="h-6 w-6 text-[hsl(var(--primary))]" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-medium text-[hsl(var(--card-foreground))]">
              All {MARKETS.length} markets on one map
            </span>
            <span className="block text-sm text-[hsl(var(--muted-foreground))]">
              Open the interactive Google map of every location
            </span>
          </span>
          <ArrowRight className="h-5 w-5 shrink-0 text-[hsl(var(--muted-foreground))] transition-colors group-hover:text-[hsl(var(--primary))]" />
        </a>
      </section>

      {/* day filter */}
      <div className="mb-3">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[hsl(var(--muted-foreground))]">Day</p>
        <div className="flex flex-wrap gap-2">
          {['All', ...days].map(d => (
            <button
              key={d}
              onClick={() => setActive(d)}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
                active === d
                  ? 'border-transparent bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'
                  : 'border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--ring)/0.5)] hover:text-[hsl(var(--foreground))]',
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* vendor-type filter */}
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <p className="text-xs font-medium uppercase tracking-widest text-[hsl(var(--muted-foreground))]">Vendor type</p>
          {cats.size > 0 && (
            <button
              onClick={() => setCats(new Set())}
              className="text-xs text-[hsl(var(--primary))] hover:underline"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(c => {
            const on = cats.has(c)
            return (
              <button
                key={c}
                onClick={() => toggleCat(c)}
                aria-pressed={on}
                className={cn(
                  'rounded-full border px-3 py-1 text-sm transition-colors',
                  on
                    ? 'border-transparent bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'
                    : 'border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--ring)/0.5)] hover:text-[hsl(var(--foreground))]',
                )}
              >
                {c}
              </button>
            )
          })}
        </div>
      </div>

      <p className="mb-6 text-sm text-[hsl(var(--muted-foreground))]">
        {filtered.length} of {MARKETS.length} markets
        {cats.size > 0 && ' with ' + [...cats].join(', ').toLowerCase() + ' vendors'}
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(m => (
          <Card
            key={m.slug}
            className="group flex flex-col transition-shadow hover:shadow-md hover:border-[hsl(var(--ring)/0.5)]"
          >
            <CardHeader className="pb-3">
              <p className="mb-1 text-xs font-medium uppercase tracking-widest text-[hsl(var(--primary))]">
                {m.neighborhood}
              </p>
              <CardTitle className="text-lg leading-snug">{m.name}</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col justify-between gap-4 pt-0">
              <div className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
                {m.days.map((d, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--primary))]" />
                    <span>
                      <span className="font-medium text-[hsl(var(--foreground))]">{d.day}</span> {d.hours}
                      {d.note && <span className="block text-xs opacity-80">{d.note}</span>}
                    </span>
                  </div>
                ))}
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--primary))]" />
                  <span>{m.season}</span>
                </div>
                {marketCategories(m).length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {marketCategories(m).map(c => (
                      <span
                        key={c}
                        className={cn(
                          'rounded-full px-2 py-0.5 text-[10px] font-medium',
                          cats.has(c)
                            ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'
                            : 'bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]',
                        )}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {m.payment?.map(p => (
                    <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>
                  ))}
                  {m.vendors.length > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {m.vendors.length} vendor{m.vendors.length === 1 ? '' : 's'} listed
                    </Badge>
                  )}
                </div>
                <Link
                  to={`/projects/farmers-markets/${m.slug}`}
                  data-page-transition
                  className="flex items-center gap-1 text-sm font-medium text-[hsl(var(--primary))] hover:underline"
                >
                  Details, vendors &amp; map
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 text-center text-sm text-[hsl(var(--muted-foreground))]">
          No markets match those filters. Try clearing the vendor type or day.
        </p>
      )}

      <p className="mt-12 text-xs text-[hsl(var(--muted-foreground))]">
        Data compiled June 2026 for the 2026 season. Vendor categories reflect listed vendors; lineups rotate. Not affiliated with any market.
      </p>
    </main>
  )
}
