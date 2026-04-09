import { Badge } from '@/components/ui/badge'

const SKILLS = {
  'Languages': ['Python', 'JavaScript', 'TypeScript', 'C/C++'],
  'ML & AI': ['PyTorch', 'TensorFlow', 'MXNet', 'Stable Diffusion', 'LLM APIs'],
  'Applied AI': ['Agentic Workflows', 'RAG', 'Prompt Engineering', 'Federated Learning'],
  'Systems': ['FastAPI', 'React', 'WebSockets', 'nginx', 'systemd', 'Azure'],
  'ML Tasks': ['Dataset Curation', 'Model Training', 'Quantization', 'Benchmarking', 'Evaluation'],
}

export function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-2 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">About</h1>
      <div className="mb-12 h-1 w-16 rounded-full bg-[hsl(var(--primary))]" />

      {/* Background */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-[hsl(var(--foreground))]">Background</h2>
        <div className="space-y-4 text-[hsl(var(--muted-foreground))] leading-relaxed">
          <p>
            I came to software engineering the long way around. I spent years in professional
            kitchens&mdash;cooking, managing, teaching&mdash;before pivoting hard into computer
            science. That path gave me a different kind of intuition: how to work under pressure,
            how systems actually fail in the real world, and what it means to build something
            people depend on.
          </p>
          <p>
            Now I'm finishing an M.S. in Computer Science at the University of Louisville, with
            coursework in AI, Advanced AI, AI Security, and Data Mining. My focus is on systems
            that actually work in production: LLM applications, agentic pipelines, federated
            learning, and the infrastructure that makes ML viable outside a research notebook.
          </p>
          <p>
            I care about precision over cleverness. I'd rather build something that handles
            edge cases gracefully than something impressive that breaks on real data.
          </p>
        </div>
      </section>

      {/* Current Work */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-[hsl(var(--foreground))]">Current Work</h2>
        <div className="space-y-6">
          <div className="rounded-lg border border-[hsl(var(--border))] p-5">
            <div className="mb-1 flex items-start justify-between gap-2">
              <h3 className="font-semibold text-[hsl(var(--foreground))]">Software Developer &mdash; Neonatal AI</h3>
              <span className="shrink-0 text-xs text-[hsl(var(--muted-foreground))]">Feb 2024 &ndash; present</span>
            </div>
            <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
              Deploying LLM-powered clinical applications end-to-end: model integration, UI guardrails,
              production deployment. Working directly with medical professionals to iterate on model
              performance and translate clinical feedback into system improvements.
            </p>
          </div>

          <div className="rounded-lg border border-[hsl(var(--border))] p-5">
            <div className="mb-1 flex items-start justify-between gap-2">
              <h3 className="font-semibold text-[hsl(var(--foreground))]">Research Assistant &mdash; University of Louisville</h3>
              <span className="shrink-0 text-xs text-[hsl(var(--muted-foreground))]">Feb 2025 &ndash; present</span>
            </div>
            <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
              Federated learning research: experimental pipelines, training infrastructure, evaluation,
              and manuscript preparation. Proposed a novel aggregation method using unsupervised
              clustering on gradient properties.
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-[hsl(var(--foreground))]">Skills</h2>
        <div className="space-y-4">
          {Object.entries(SKILLS).map(([category, items]) => (
            <div key={category}>
              <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
                {category}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map(skill => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-[hsl(var(--foreground))]">Education</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-[hsl(var(--border))] p-5">
            <div className="mb-1 flex items-start justify-between gap-2">
              <h3 className="font-semibold text-[hsl(var(--foreground))]">University of Louisville</h3>
              <span className="shrink-0 text-xs text-[hsl(var(--muted-foreground))]">Expected Apr 2026</span>
            </div>
            <p className="text-sm text-[hsl(var(--primary))]">M.S. Computer Science</p>
            <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
              Coursework: Artificial Intelligence, Advanced AI, AI Security, Data Mining
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
