import { ProjectPage } from '@/components/ProjectPage'

export function BountyOSPage() {
  return (
    <ProjectPage
      name="bounty-os"
      tagline="Multi-agent penetration testing orchestrator"
      tech={['Python 3.12', 'FastAPI', 'Anthropic SDK', 'aiosqlite', 'Playwright', 'HackerOne API', 'WebSockets', 'Nuclei', 'subfinder', 'amass']}
      sections={[
        {
          heading: 'Motivation',
          body: 'Manual penetration testing is slow, inconsistent, and doesn\'t scale. The reconnaissance and initial enumeration phases in particular are highly repetitive: the same checks, the same tool invocations, the same decision trees. This project automates the full recon-to-submission pipeline using coordinated LLM agents, with adaptive scoring to improve across runs and human-in-the-loop gates before anything gets submitted.',
        },
        {
          heading: 'Pipeline',
          body: [
            {
              point: '**10 agents in a sequential pipeline:** Leader \u2192 Recon \u2192 Research (pre-scan) \u2192 Scanner \u2192 Dispatcher \u2192 Specialists (parallel) \u2192 Reporter \u2192 Editor \u2192 Submitter \u2192 Evaluator.',
              sub: [
                '**ReconAgent:** Passive + active surface discovery with 7+ tools (subfinder, amass, assetfinder, crt.sh, gau, waybackurls, katana, httpx, naabu)',
                '**DispatcherAgent:** LLM-driven attack surface segmentation \u2014 sends URL samples to Claude which clusters them into logical surfaces (Auth, API, Admin, Payments, AI, Files). Most scanners use pattern matching; this uses reasoning',
                '**SpecialistAgent:** 40-turn agentic exploit loop with 6 HTTP-level tools (http_request, fuzz_parameter, enumerate_ids, etc.). Up to 4 run in parallel',
                '**Reporter \u2192 Editor \u2192 Submitter:** Draft markdown reports, polish to HackerOne format, submit via API or Playwright browser automation with MFA/QR support',
              ],
            },
            {
              point: '**AIPentestAgent** (748 lines): Specialized for AI endpoint exploitation using 5 academic attack techniques with published citations.',
              sub: [
                '**Special Token Injection** (Dong et al. 2024) \u2014 12 payloads across 6 model families (ChatML, Llama2/3, Mistral, Gemma, Command-R)',
                '**HouYi Injection** (Liu et al. 2024) \u2014 three-part injection (framework + separator + disruptor) with 15+ separator variants',
                '**System Prompt Extraction** (Perez & Ribeiro 2024; Zhang et al. 2024) \u2014 10 techniques including CoT step-by-step, sandwich attack, translation trick, roleplay/debug mode',
                '**Crescendo Multi-Turn** (Russinovich et al. 2024) \u2014 3 escalation sequences carrying context across 4 turns',
                '**Indirect RAG Injection** (Greshake et al. 2023) \u2014 4 vectors including document override, invisible HTML injection, markdown data exfiltration',
              ],
            },
          ],
        },
        {
          heading: 'Adaptive Feedback Loop',
          body: [
            {
              point: '**Evaluation scorecards:** After each hunt, a weighted scoring system computes 22 metrics across 4 skill categories.',
              sub: [
                'Legitimacy guard (34% weight): legit rate, duplicate rate, N/A rate',
                'Impact/reward focus (33%): high-value rate, reward vs. target',
                'Report conversion (23%): coverage, submission, approval rates',
                'Efficiency/velocity (10%): findings/hour, reward/hour',
              ],
            },
            {
              point: '**Tuning profiles derived from scorecards:** 5 adaptive rules automatically adjust 10 parameters for the next run on the same target.',
              sub: [
                'Low legitimacy \u2192 shrink URL/nuclei limits 30\u201335%, raise confidence floor',
                'Low impact \u2192 enable active probing + crawler, expand limits',
                'Low velocity \u2192 filter to interesting URLs only, raise research relevance threshold',
                'High performance \u2192 expand all limits +10%',
                'Budget guardrails enforce a cost ceiling via binary search across the parameter space',
              ],
            },
            {
              point: '**Cross-run tracking:** Tuning profiles stored as research notes. The Evaluations dashboard tab includes a diff viewer showing metric deltas between runs on the same target \u2014 designed to measure improvement over time.',
            },
          ],
        },
        {
          heading: 'Scope Enforcement',
          body: [
            {
              point: '**Whitelist model \u2014 default deny:** Anything not explicitly in scope is blocked. Scope is pulled automatically from HackerOne structured scopes API, with ineligible entries vetoing wildcards.',
              sub: [
                'assert_in_scope() called in BaseAgent before every tool execution \u2014 agents cannot bypass it',
                'Fallback for local targets: parses scope.md markdown with keyword detection for exclusions',
                '**Zero safety violations** across 63 hunt teams and 53,894 URLs in the production database',
              ],
            },
          ],
        },
        {
          heading: 'Dashboard',
          body: [
            {
              point: '**FastAPI WebSocket dashboard** (1,395 lines) with 7 tabs and real-time streaming.',
              sub: [
                '**Teams:** Phase tracking with agent states (role, status, current task, last message)',
                '**Findings:** Severity and confidence triage table',
                '**Reports:** Submission queue with approval status',
                '**Evaluations:** Performance scorecards with diff viewer for cross-run deltas',
                '**Research:** Hypothesis timeline with relevance scores and tags',
                '**Assistance:** Human request/response UI with live WebSocket event log',
                '**Metrics:** Per-endpoint latency telemetry, client render metrics',
              ],
            },
            {
              point: '**Performance features:** ETag-based 304 caching, virtual scrolling at 120+ rows, GZip compression, WebSocket with 15s polling fallback, 600ms debounced refresh.',
            },
          ],
        },
        {
          heading: 'Why It\'s Hard',
          body: [
            {
              point: '**Orchestration complexity:** Sequential phases with parallel specialists, concurrent hunt teams (up to 3), and a thread-safe event bus for real-time dashboard updates \u2014 all async-first on Python 3.12.',
            },
            {
              point: '**Security at every layer:** Scope enforcement before every tool call, human-in-the-loop gates before submission, confidence scoring to prevent alert fatigue, and the inherent risk of automated security tooling against live targets.',
            },
            {
              point: '**LLM reliability:** The SpecialistAgent gets 40 turns to find something real. Hallucinated findings waste time and erode trust. The confidence scoring system and evaluation feedback loop exist specifically to filter noise and improve signal over time.',
            },
          ],
        },
      ]}
      metrics={[
        {
          category: 'Code',
          items: [
            '17,272 Python LOC across 66 files (57 classes, 407 functions)',
            '10 agents (9 pipeline + AI pentest specialist) with 20+ CLI tools and 6 specialist HTTP probes',
            '8 REST endpoints + 1 WebSocket, 9 SQLite tables',
          ],
        },
        {
          category: 'Operations',
          items: [
            '193 targets scouted (190 HackerOne programs), 63 hunt teams executed',
            '4,951 hosts and 53,894 URLs discovered',
            '11 confirmed findings (3 high, 4 medium, 4 low) at avg confidence 0.89',
            '392 research notes (evaluation, tuning, external intel, hypotheses)',
            'Real submissions documented for Notion, OpenAI, Priceline, and Amazon Rufus',
          ],
        },
        {
          category: 'Security',
          items: [
            'Zero scope violations across 63 hunt teams and 53,894 URLs',
            '5 academic attack techniques implemented with published citations',
            'Whitelist-first scope model with HackerOne API integration',
          ],
        },
      ]}
    />
  )
}
