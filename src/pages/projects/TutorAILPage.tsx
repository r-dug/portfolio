import { ProjectPage } from '@/components/ProjectPage'

export function TutorAILPage() {
  return (
    <ProjectPage
      name="TutorAIL"
      tagline="Agentic learning platform"
      liveUrl="https://tutorail.app"
      intro="TutorAIL is live — create an account at tutorail.app and try it yourself."
      tech={['React 19', 'TypeScript', 'FastAPI', 'PostgreSQL', 'WebSockets', 'Anthropic SDK', 'OpenAI SDK', 'faster-whisper', 'WhisperX', 'Kokoro TTS', 'bubblewrap', 'nginx', 'systemd']}
      sections={[
        {
          heading: 'Motivation',
          body: 'Most AI-powered tools follow the same paradigm: the user engages the model to extract something — an answer, a summary, generated code. TutorAIL inverts this. The goal is to create lightweight domain-expert agents, grounded in RAG and supporting documents to reduce hallucination, that actively engage the user. These agents ask questions, probe understanding, employ tools to create rich interactive experiences, and advance the learner through a curriculum. We use episodic context distillation to build bespoke agent instructions from past interactions — the tutor learns how to teach each student.',
        },
        {
          heading: 'Architecture',
          body: [
            {
              point: '**Three-layer architecture:** React SPA, a FastAPI BFF (auth, rate-limiting, WebSocket proxy), and a dedicated backend service for business logic and agent orchestration.',
              sub: [
                '79 API routes across 27 backend routers',
                '16 client pages with full SPA routing',
                'WebSocket flow: Client \u2192 BFF proxy \u2192 Backend WS handler \u2192 STT \u2192 Agent (tool loop) \u2192 TTS \u2192 audio chunks back to client',
              ],
            },
            {
              point: '**Real-time voice pipeline:** Client-side voice activity detection \u2192 WebSocket \u2192 STT (faster-whisper, WhisperX, or OpenAI Whisper API) \u2192 agentic teaching loop \u2192 TTS (Kokoro local or OpenAI fallback) \u2192 streamed audio.',
              sub: [
                'Thread-safe callback bridge using asyncio.run_coroutine_threadsafe() to push audio from worker threads back to the async WebSocket event loop',
                'Multi-provider fallback for LLM (Anthropic Claude primary, OpenAI GPT-4o-mini fallback), TTS, and STT — graceful degradation across all three',
              ],
            },
            {
              point: '**Agentic tools (20 total):** Categorized by purpose to support different dimensions of the learning experience.',
              sub: [
                '**Content delivery:** cross-section RAG (PostgreSQL full-text search), web search, image search — grounding the tutor in source material rather than hallucinated content',
                '**Interactive exercises:** code sandbox (AST-inspected + bubblewrap-isolated execution), drawing/sketchpad, flashcards — hands-on practice, not just Q&A',
                '**Assessment & progress:** lesson goal capture, section advancement, task completion — the agent manages curriculum state and knows when the student is ready to move on',
                '**Visual aids:** DALL-E 3 image generation, diagram rendering — explaining concepts that are hard to convey in text alone',
              ],
            },
            {
              point: '**Course publishing & enrollment:** Instructors define curricula with section-level structure, students enroll, and progress is tracked per-section with task checklists for mastery verification.',
            },
          ],
          image: { src: '/images/tutorail/code-sandbox.png', alt: 'Code sandbox', caption: 'Sandboxed code execution \u2014 AST inspection + bubblewrap isolation, with Run/Submit and output pane' },
        },
        {
          heading: 'Key Systems',
          body: [
            {
              point: '**Memory strategy framework:** 4 pluggable context management strategies, swappable per-session.',
              sub: [
                '**Goals:** accuracy, self-consistency, and token efficiency — balancing context quality against cost',
                '**Strategies:** turn summaries (~3.5K tokens constant), full history with base64 stripped (leverages prefix caching), RAG semantic retrieval (top-K by embedding similarity), sliding distillation (old turns compressed + recent window)',
                '**Status:** strategies are implemented but not yet evaluated. Planned evaluation uses synthetic data generation with agent-driven browser automation to compare strategies under controlled conditions',
              ],
            },
            {
              point: '**Eval framework:** 4 deterministic graders + 1 LLM-as-judge grader, with an admin dashboard for visualization.',
              sub: [
                '**Goal:** gain explainable behavioral insights across all components of the agentic pipeline — model selection, memory strategies, prompt design, tool use patterns',
                '**Deterministic graders:** voice formatting rules, response conciseness, student engagement (does the tutor ask questions?), tool use correctness',
                '**LLM grader:** factual accuracy scored against source material',
                'Results inform architectural design choices through data, and the pipeline builds usable fine-tuning datasets — measuring performance of fine-tuning processes through the same eval harness',
                '30+ seed cases with admin dashboard for run comparison and regression detection',
              ],
            },
            {
              point: '**Distillation pipeline:** Live conversation turns collected for future fine-tuning.',
              sub: [
                'Combined with the eval framework, this creates a closed feedback loop — deploy, measure teaching quality, collect data, improve',
                'Episodic context distillation: past interaction patterns inform per-student agent behavior',
              ],
            },
            {
              point: '**Persona system:** 3 built-in personas (default instructor, Socratic, encouraging coach) plus user-created custom personas.',
              sub: [
                'Persona instructions injected into the system prompt, with per-lesson persona selection stored in enrollment records',
              ],
            },
          ],
          carousel: [
            { src: '/images/tutorail/sketchpad.png', alt: 'Sketchpad tool', caption: 'Drawing tool \u2014 handwriting practice with multi-color pen and eraser' },
            { src: '/images/tutorail/flashcard.png', alt: 'Flashcard tool', caption: 'Flashcard tool \u2014 tap-to-flip cards for vocabulary drilling' },
            { src: '/images/tutorail/progress-tracking.png', alt: 'Progress tracking', caption: 'Per-section task checklists for mastery verification' },
            { src: '/images/tutorail/lesson-session.png', alt: 'Active lesson', caption: 'Active tutoring session with CAVEMAN persona and section progress' },
            { src: '/images/tutorail/admin-personas.png', alt: 'Persona management', caption: 'Admin persona management \u2014 custom personas with per-course defaults' },
            { src: '/images/tutorail/admin-usage.png', alt: 'Usage dashboard', caption: 'Usage dashboard \u2014 cost tracking, token counts, and per-event breakdowns' },
          ],
        },
        {
          heading: 'Why It\'s Hard',
          body: [
            {
              point: '**State management:** Real-time voice with agentic sub-task execution means managing multiple concurrent async streams, handling partial transcriptions, and recovering gracefully when a sub-agent errors mid-lesson.',
            },
            {
              point: '**Agentic system design:** Knowing when to use an agent vs. when deterministic code is better (or necessary). Not every problem benefits from an LLM in the loop — tool selection, orchestration boundaries, and fallback paths all require deliberate design.',
            },
            {
              point: '**Infrastructure & DBMS choices:** PostgreSQL for relational data, full-text search, and usage aggregation. Choosing the right storage layer for each concern — transactional data, search indexes, eval results (JSONL), audio streams — without over-engineering.',
            },
            {
              point: '**Security:** Standard web security (auth, rate-limiting, input validation) plus the unknowns specific to LLM-based systems — prompt injection, tool misuse, sandboxing user-submitted code with AST inspection and bubblewrap isolation.',
            },
          ],
          carousel: [
            { src: '/images/tutorail/landing.png', alt: 'Sign in', caption: 'Auth flow \u2014 sign in' },
            { src: '/images/tutorail/signup.png', alt: 'Sign up', caption: 'Auth flow \u2014 account creation' },
            { src: '/images/tutorail/forgot-password.png', alt: 'Password reset', caption: 'Auth flow \u2014 password reset via Resend transactional email' },
          ],
        },
      ]}
      metrics={[
        {
          category: 'Code',
          items: [
            '~40,000 lines across Python, TypeScript, and SQL',
            '79 API routes across 27 backend routers, 16 React pages',
          ],
        },
        {
          category: 'Testing & Robustness',
          items: [
            '212 passing tests across 31 test files (255 test functions)',
            'Backend, frontend, and integration suites',
            'Sandboxed code execution with AST inspection + bubblewrap',
          ],
        },
        {
          category: 'Agents',
          items: [
            '20 agent tools across content delivery, interactive exercises, assessment, and visual aids',
            '4 memory strategies for context management',
            '5 eval graders (4 deterministic + 1 LLM-as-judge)',
            'Multi-provider fallback for LLM, TTS, and STT',
            'Distillation pipeline for fine-tuning data collection',
          ],
        },
      ]}
    />
  )
}
