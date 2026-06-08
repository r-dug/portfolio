import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  CalendarPlus,
  ExternalLink,
  Globe,
  Store,
  Info,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getMarket, mapsSearchUrl, ICS_PATH, vendorCategoriesFor, marketCategories } from './data'
import { VendorThumb } from './VendorThumb'
import descriptions from './vendor-descriptions.json'

const DESCRIPTIONS = descriptions as Record<string, string>

export function FarmersMarketDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const market = slug ? getMarket(slug) : undefined
  // Active vendor-type filter (null = All). Hook must run before the early return.
  const [vType, setVType] = useState<string | null>(null)

  if (!market) return <Navigate to="/projects/farmers-markets" replace />

  const mapsUrl = mapsSearchUrl(market.mapsQuery)

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link
        to="/projects/farmers-markets"
        data-page-transition
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        All Louisville markets
      </Link>

      {/* header */}
      <div className="mb-10">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[hsl(var(--primary))]">
          {market.neighborhood}
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          {market.name}
        </h1>
        <div className="mb-4 h-0.5 w-full bg-[hsl(var(--border))]" />
        {market.payment && market.payment.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {market.payment.map(p => (
              <Badge key={p} variant="secondary">{p}</Badge>
            ))}
          </div>
        )}
      </div>

      {/* schedule + location */}
      <section className="mb-10">
        <h2 className="mb-3 text-lg font-semibold text-[hsl(var(--foreground))]">When &amp; where</h2>
        <ul className="space-y-3 text-[hsl(var(--muted-foreground))] leading-relaxed">
          {market.days.map((d, i) => (
            <li key={i} className="flex items-start gap-2">
              <CalendarDays className="mt-1 h-4 w-4 shrink-0 text-[hsl(var(--primary))]" />
              <span>
                <span className="font-medium text-[hsl(var(--foreground))]">{d.day}</span> {d.hours}
                {d.note && <span className="block text-sm opacity-80">{d.note}</span>}
              </span>
            </li>
          ))}
          <li className="flex items-start gap-2">
            <MapPin className="mt-1 h-4 w-4 shrink-0 text-[hsl(var(--primary))]" />
            <span>
              <span className="font-medium text-[hsl(var(--foreground))]">Season:</span> {market.season}
              <span className="block text-sm">{market.address}</span>
            </span>
          </li>
        </ul>

        <div className="mt-5 flex flex-wrap gap-3">
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}>
            <MapPin className="h-4 w-4" />
            Open in Google Maps
          </a>
          {market.website && (
            <a href={market.website} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}>
              <Globe className="h-4 w-4" />
              Market website
            </a>
          )}
          <a href={ICS_PATH} download className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}>
            <CalendarPlus className="h-4 w-4" />
            Add to calendar (.ics)
          </a>
        </div>
      </section>

      {/* map panel — links out to Google Maps (an inline iframe embed is blocked by
          this site's cross-origin isolation / COEP: require-corp policy). */}
      <section className="mb-10">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 transition-colors hover:border-[hsl(var(--ring)/0.5)]"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--primary)/0.12)]">
            <MapPin className="h-6 w-6 text-[hsl(var(--primary))]" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-medium text-[hsl(var(--card-foreground))]">{market.address}</span>
            <span className="block text-sm text-[hsl(var(--muted-foreground))]">View location & directions on Google Maps</span>
          </span>
          <ExternalLink className="h-5 w-5 shrink-0 text-[hsl(var(--muted-foreground))] transition-colors group-hover:text-[hsl(var(--primary))]" />
        </a>
      </section>

      {/* highlights */}
      {market.highlights.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-3 text-lg font-semibold text-[hsl(var(--foreground))]">Good to know</h2>
          <ul className="space-y-3 text-[hsl(var(--muted-foreground))] leading-relaxed">
            {market.highlights.map((h, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1 shrink-0 text-[hsl(var(--primary))]">&#8250;</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* flags */}
      {market.flags && market.flags.length > 0 && (
        <section className="mb-10">
          <div className="rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
            {market.flags.map((f, i) => (
              <p key={i} className="flex gap-2 text-sm text-[hsl(var(--card-foreground))]">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--primary))]" />
                <span>{f}</span>
              </p>
            ))}
          </div>
        </section>
      )}

      {/* vendors */}
      <section className="mb-10">
        <div className="mb-3 flex items-center gap-2">
          <Store className="h-5 w-5 text-[hsl(var(--primary))]" />
          <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">Vendors</h2>
          {market.vendorListUrl && (
            <a
              href={market.vendorListUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1 text-sm text-[hsl(var(--primary))] hover:underline"
            >
              Source <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>

        {market.vendorNote && (
          <p className="mb-4 text-sm text-[hsl(var(--muted-foreground))]">{market.vendorNote}</p>
        )}

        {(() => {
          const presentCats = marketCategories(market)
          const visible = vType
            ? market.vendors.filter(v => vendorCategoriesFor(v.name).includes(vType))
            : market.vendors

          return (
            <>
              {/* vendor-type filter (only when worth it) */}
              {presentCats.length > 1 && market.vendors.length > 2 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => setVType(null)}
                    className={cn(
                      'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                      vType === null
                        ? 'border-transparent bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'
                        : 'border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--ring)/0.5)] hover:text-[hsl(var(--foreground))]',
                    )}
                  >
                    All ({market.vendors.length})
                  </button>
                  {presentCats.map(c => {
                    const n = market.vendors.filter(v => vendorCategoriesFor(v.name).includes(c)).length
                    return (
                      <button
                        key={c}
                        onClick={() => setVType(vType === c ? null : c)}
                        aria-pressed={vType === c}
                        className={cn(
                          'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                          vType === c
                            ? 'border-transparent bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'
                            : 'border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--ring)/0.5)] hover:text-[hsl(var(--foreground))]',
                        )}
                      >
                        {c} ({n})
                      </button>
                    )
                  })}
                </div>
              )}

              {market.vendors.length > 0 ? (
                <ul className="grid gap-2 sm:grid-cols-2">
                  {visible.map((v, i) => {
                    const desc = DESCRIPTIONS[v.name]
                    const vcats = vendorCategoriesFor(v.name)
                    return (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2.5"
                >
                  <VendorThumb name={v.name} />
                  <div className="min-w-0">
                    {v.url ? (
                      <a
                        href={v.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-[hsl(var(--primary))] hover:underline"
                      >
                        {v.name}
                        <ExternalLink className="h-3 w-3 shrink-0" />
                      </a>
                    ) : (
                      <span className="text-sm font-medium text-[hsl(var(--card-foreground))]">{v.name}</span>
                    )}
                    {desc && (
                      <p className="text-xs leading-snug text-[hsl(var(--muted-foreground))]">{desc}</p>
                    )}
                    {vcats.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {vcats.map(c => (
                          <span
                            key={c}
                            className="rounded-full bg-[hsl(var(--secondary))] px-2 py-0.5 text-[10px] font-medium text-[hsl(var(--secondary-foreground))]"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              )
            })}
                </ul>
              ) : (
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  No public vendor roster for this market.
                </p>
              )}
            </>
          )
        })()}
      </section>

      <p className="text-xs text-[hsl(var(--muted-foreground))]">
        Compiled June 2026. Vendor lineups rotate week to week — treat lists as representative, not fixed.
      </p>
    </main>
  )
}
