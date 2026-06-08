import { Mail } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

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

const SKILLS = {
  'Languages': ['Python', 'JavaScript', 'TypeScript', 'C/C++'],
  'ML & AI': ['PyTorch', 'TensorFlow', 'MXNet', 'Stable Diffusion', 'LLM APIs'],
  'Applied AI': ['Agentic Workflows', 'RAG', 'Prompt & Context Engineering', 'Federated Learning', 'Edge Inference', 'Evaluation'],
  'Systems': ['FastAPI', 'React', 'WebSockets', 'PostgreSQL', 'MongoDB', 'nginx', 'systemd', 'Azure', 'SLURM'],
  'Research': ['Empirical evaluation', 'Benchmarking', 'Manuscript prep', 'Fault-tolerant experiment design'],
}

interface Role {
  title: string
  org: string
  dates: string
  blurb: string
}

const EXPERIENCE: Role[] = [
  {
    title: 'Research Assistant',
    org: 'University of Louisville',
    dates: 'Feb 2025 – present',
    blurb:
      'Federated learning research: built fault-tolerant pipelines for multi-day runs and evaluated a novel robust aggregation method under Byzantine-failure conditions, focused on reproducible measurement and model resilience.',
  },
  {
    title: 'Software Developer / AI Consultant',
    org: 'Neonatal AI · Norton Healthcare Physicians',
    dates: 'Feb – Aug 2024',
    blurb:
      'Sole developer of a clinical web app combining structured inputs, existing ML predictors, and LLMs to generate case-specific informational documents — working directly with neonatal physicians to translate clinical feedback into the system.',
  },
  {
    title: 'Field Engineer',
    org: 'Volta, Inc.',
    dates: 'Nov 2023 – Jan 2024',
    blurb: 'Installed network infrastructure for the Kentucky Department of Education.',
  },
  {
    title: 'IT Technician',
    org: 'Alterra Mountain Company',
    dates: 'Dec 2022 – Mar 2023',
    blurb:
      'Hardware, software, and end-user support for 200+ internal users; automated entertainment systems and networked point-of-sale device configuration.',
  },
  {
    title: 'Rope Access Technician',
    org: 'Harrington Aerial',
    dates: 'Oct 2018 – Apr 2022',
    blurb:
      'Installed and troubleshot RF and telecom equipment on towers in safety-critical environments demanding procedural discipline and reliable execution. Where my interest in IT first took root.',
  },
]

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
            I came to software the long way around. Out of high school I went straight into culinary
            school, then spent my early career as a test-kitchen cook, in fine dining, and in beverage —
            and took a run at my own catering business. In my early twenties I started branching out: I
            liked farm work for the variety and the constant problem-solving, worked at climbing gyms,
            and was recruited into rope-access tower work — painting, window washing, and RF/telecom
            installs.
          </p>
          <p>
            The RF work got me into IT, and IT is where I got into code. What hooked me was the
            problem-solving — and that you can encode the instructions for a task once and let it happen
            automatically, instead of repeating the same effort over and over. At a ski resort I rewrote
            a tedious point-of-sale setup (hand-edited static IPs that kept colliding and knocking
            machines offline) into a Python setup script, and automated the customer-facing entertainment
            systems so the TVs powered on over Ethernet and played ski videos through the day instead of
            sitting blank. Seeing that work — and seeing patrons actually enjoy it — is what made me want
            to study computer science.
          </p>
          <p>
            The thread through all of it is problem-solving. I'm good at figuring out processes and at
            quickly deducing what's wrong from the information in front of me, rather than grinding
            through a long checklist. That kind of abstract problem-solving is my biggest strength, and
            it's what makes me effective in software. I pick up new domains fast and I'm easy to work
            with.
          </p>
        </div>
      </section>

      {/* Currently */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-[hsl(var(--foreground))]">Currently</h2>
        <div className="space-y-4 text-[hsl(var(--muted-foreground))] leading-relaxed">
          <p>
            Recently finished my M.S. and open to applied AI, ML, and software engineering roles.
          </p>
          <p>
            On the research side I'm pursuing a direction in <span className="text-[hsl(var(--foreground))]">interpretability and
            steerability</span>: whether sparse autoencoders can be used to read — and ultimately steer — broad
            model behaviors like compliance by interpreting the activations and circuits behind them.
            It builds on Anthropic's SAE work and Google DeepMind's open Gemma Scope tooling, and I'm
            developing it through UofL's weekly AI research seminar.
          </p>
        </div>
      </section>

      {/* Experience */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-[hsl(var(--foreground))]">Experience</h2>
        <div className="space-y-6">
          {EXPERIENCE.map(role => (
            <div key={role.title + role.org} className="rounded-lg border border-[hsl(var(--border))] p-5">
              <div className="mb-1 flex items-start justify-between gap-2">
                <h3 className="font-semibold text-[hsl(var(--foreground))]">
                  {role.title} <span className="font-normal text-[hsl(var(--muted-foreground))]">&mdash; {role.org}</span>
                </h3>
                <span className="shrink-0 text-xs text-[hsl(var(--muted-foreground))]">{role.dates}</span>
              </div>
              <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">{role.blurb}</p>
            </div>
          ))}
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
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-[hsl(var(--foreground))]">Education</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-[hsl(var(--border))] p-5">
            <div className="mb-1 flex items-start justify-between gap-2">
              <h3 className="font-semibold text-[hsl(var(--foreground))]">University of Louisville</h3>
              <span className="shrink-0 text-xs text-[hsl(var(--muted-foreground))]">May 2026</span>
            </div>
            <p className="text-sm text-[hsl(var(--primary))]">M.S. Computer Science &middot; GPA 3.53</p>
            <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
              Coursework: Artificial Intelligence, Advanced AI, AI Security, Data Mining
            </p>
            <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
              AI Research Assistant &middot; Computer Science Tutor &middot; Weekly AI Research Seminar
            </p>
          </div>
          <div className="rounded-lg border border-[hsl(var(--border))] p-5">
            <div className="mb-1 flex items-start justify-between gap-2">
              <h3 className="font-semibold text-[hsl(var(--foreground))]">Johnson &amp; Wales University</h3>
              <span className="shrink-0 text-xs text-[hsl(var(--muted-foreground))]">May 2015</span>
            </div>
            <p className="text-sm text-[hsl(var(--primary))]">B.S. Food Service Management &middot; A.S. Culinary Arts</p>
            <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
              Apprenti Cuisinier Award of Excellence
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-[hsl(var(--foreground))]">Contact</h2>
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:richard.douglas@louisville.edu"
            className="inline-flex items-center gap-2 rounded-md border border-[hsl(var(--border))] px-4 py-2 text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:border-[hsl(var(--ring)/0.5)] hover:text-[hsl(var(--foreground))]"
          >
            <Mail className="h-4 w-4" />
            richard.douglas@louisville.edu
          </a>
          <a
            href="https://github.com/r-dug"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-[hsl(var(--border))] px-4 py-2 text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:border-[hsl(var(--ring)/0.5)] hover:text-[hsl(var(--foreground))]"
          >
            <GitHubSVG className="h-4 w-4" />
            github.com/r-dug
          </a>
          <a
            href="https://www.linkedin.com/in/richard-douglas-a99a00271/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-[hsl(var(--border))] px-4 py-2 text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:border-[hsl(var(--ring)/0.5)] hover:text-[hsl(var(--foreground))]"
          >
            <LinkedInSVG className="h-4 w-4" />
            LinkedIn
          </a>
        </div>
      </section>
    </main>
  )
}
