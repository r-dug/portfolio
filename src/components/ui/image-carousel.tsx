import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CarouselImage {
  src: string
  alt: string
  caption?: string
}

interface ImageCarouselProps {
  images: CarouselImage[]
  className?: string
}

export function ImageCarousel({ images, className }: ImageCarouselProps) {
  const [index, setIndex] = React.useState(0)
  const count = images.length

  const prev = () => setIndex(i => (i - 1 + count) % count)
  const next = () => setIndex(i => (i + 1) % count)

  if (count === 0) return null

  const current = images[index]

  return (
    <div className={cn('relative overflow-hidden rounded-lg border border-[hsl(var(--border))]', className)}>
      <div className="relative bg-black/20">
        <img
          src={current.src}
          alt={current.alt}
          className="w-full object-contain"
        />

        {count > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-1.5 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/80 hover:text-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-1.5 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/80 hover:text-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {/* caption + dots */}
      <div className="flex items-center justify-between gap-4 bg-[hsl(var(--card))] px-4 py-2.5">
        <p className="text-xs text-[hsl(var(--muted-foreground))]">
          {current.caption || current.alt}
        </p>
        {count > 1 && (
          <div className="flex shrink-0 items-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={cn(
                  'h-1.5 rounded-full transition-all',
                  i === index
                    ? 'w-4 bg-[hsl(var(--primary))]'
                    : 'w-1.5 bg-[hsl(var(--muted-foreground))/0.3] hover:bg-[hsl(var(--muted-foreground))/0.5]'
                )}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

interface ProjectImageProps {
  src: string
  alt: string
  caption?: string
  className?: string
}

export function ProjectImage({ src, alt, caption, className }: ProjectImageProps) {
  return (
    <div className={cn('overflow-hidden rounded-lg border border-[hsl(var(--border))]', className)}>
      <div className="bg-black/20">
        <img src={src} alt={alt} className="w-full object-contain" />
      </div>
      {caption && (
        <div className="bg-[hsl(var(--card))] px-4 py-2.5">
          <p className="text-xs text-[hsl(var(--muted-foreground))]">{caption}</p>
        </div>
      )}
    </div>
  )
}
