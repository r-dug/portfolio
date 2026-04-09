import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Project {
  slug: string
  name: string
  tagline: string
  description: string
  tech: string[]
  liveUrl?: string
  highlight: string
}

const PROJECTS: Project[] = [
  {
    slug: 'tutorail',
    name: 'TutorAIL',
    tagline: 'Agentic learning platform',
    description:
      'Live web app (tutorail.app) built on a three-layer stack: React SPA, FastAPI BFF proxy, and a dedicated orchestration backend powering real-time voice tutoring with STT → agent → TTS loops, multi-provider fallbacks, and context distillation.',
    tech: [
      'React 19',
      'TypeScript',
      'FastAPI',
      'PostgreSQL',
      'WebSockets',
      'Anthropic SDK',
      'OpenAI SDK',
      'faster-whisper',
      'WhisperX',
      'Kokoro TTS',
    ],
    liveUrl: 'https://tutorail.app',
    highlight: '20 agent tools, 4 memory strategies, and 212 passing tests across backend, frontend, and integration suites',
  },
  {
    slug: 'bounty-os',
    name: 'bounty-os',
    tagline: 'Multi-agent penetration testing orchestrator',
    description:
      'Production-ready, multi-agent bug-bounty pipeline that runs async reconnaissance, scanning, exploitation, reporting, and submission phases with measurable confidence scoring.',
    tech: ['Python', 'FastAPI', 'Anthropic SDK', 'WebSockets', 'HackerOne API', 'SQLite'],
    highlight: '9-agent recon-to-submission flow + WebSocket dashboard and adaptive scoring',
  },
  {
    slug: 'neonatal-ai',
    name: 'Neonatal AI',
    tagline: 'Clinical LLM application',
    description:
      'Clinical LLM application built for the UofL Health neonatal wing (Neonatal.AI org). React/Express/Node front-end and back-end intended to improve workflow documentation, keep clinicians in the loop, and safely constrain model output with guardrails.',
    tech: ['React', 'Express', 'Node.js', 'MongoDB', 'OpenAI APIs', 'Clinical Guardrails'],
    highlight: 'Mission-driven clinical deployment with new documentation, QA checklist, and release notes to fill the audit gaps',
  },
  {
    slug: 'fungus-classifier',
    name: 'Fungus Image Classifier',
    tagline: 'Mobile edge ML',
    description:
      'Dataset curation using unsupervised outlier detection, followed by model quantization and deployment targeting mobile edge inference. Built to run accurately with constrained resources.',
    tech: ['PyTorch', 'Model Quantization', 'Python', 'Computer Vision'],
    highlight: 'Outlier-cleaned dataset + quantized mobile deployment',
  },
  {
    slug: 'federated-learning',
    name: 'Federated Learning Research',
    tagline: 'Graduate research, UofL',
    description:
      'Experimental pipelines for federated learning: data models, training infrastructure, evaluation, and manuscript preparation. Proposed a novel aggregation method using unsupervised clustering on gradient properties.',
    tech: ['PyTorch', 'Federated Learning', 'Python', 'Research'],
    highlight: 'Novel gradient-clustering aggregation method',
  },
  {
    slug: 'style-mimicry',
    name: 'Style Mimicry Robustness',
    tagline: 'AI security research',
    description:
      'Evaluating four perturbation-based protections against four countermeasures on Stable Diffusion 3.5 Large. Full experimental pipeline with algorithmic benchmarking and human evaluation study.',
    tech: ['Stable Diffusion 3.5', 'PyTorch', 'Python', 'Human Evaluation'],
    highlight: 'Benchmarked 4x4 protection/attack matrix on SD3.5',
  },
]

export function ProjectsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="mb-2 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">Projects</h1>
      <div className="mb-4 h-1 w-16 rounded-full bg-[hsl(var(--primary))]" />
      <p className="mb-12 text-[hsl(var(--muted-foreground))]">
        A selection of work spanning production AI systems, security research, and applied ML.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map(project => (
          <Card
            key={project.slug}
            className="group flex flex-col transition-shadow hover:shadow-md hover:border-[hsl(var(--ring)/0.5)]"
          >
            <CardHeader className="pb-3">
              <div className="mb-1 flex items-start justify-between gap-2">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="shrink-0 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
              <p className="text-xs font-medium uppercase tracking-widest text-[hsl(var(--primary))]">
                {project.tagline}
              </p>
              <CardDescription className="text-sm leading-relaxed">
                {project.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col justify-between gap-4 pt-0">
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
                  Key Result
                </p>
                <p className="text-xs text-[hsl(var(--foreground))] font-medium">{project.highlight}</p>
              </div>

              <div>
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {project.tech.map(t => (
                    <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                  ))}
                </div>
                <Link
                  to={`/projects/${project.slug}`}
                  data-page-transition
                  className="flex items-center gap-1 text-sm font-medium text-[hsl(var(--primary))] hover:underline"
                >
                  Read more
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
