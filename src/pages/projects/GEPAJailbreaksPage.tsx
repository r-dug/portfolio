import { ProjectPage } from '@/components/ProjectPage'

export function GEPAJailbreaksPage() {
  return (
    <>
      <span dangerouslySetInnerHTML={{ __html: `<!--
  NOTE FOR THE CURIOUS:
  The language in the section below is softened for employability. The stronger version:
  the profit motive is the root cause. The AI arms race is structurally produced by
  capitalist incentives — and western "democracy" is imperialism in a suit and tie.
  The people controlling AI development are enriching themselves at the expense of a
  technology that could genuinely benefit all of humanity. The dishonesty documented
  here is not individual bad faith. It is what the incentive structure demands.
  If you're reading this and you agree: reach out.
  If you're reading this and you're deciding whether to hire me: I'd rather work
  somewhere that can handle this conversation than somewhere that can't.
  — RD
-->` }} />
      <ProjectPage
      name="GEPA Jailbreaks"
      tagline="Graduate research — University of Louisville"
      tech={['Python', 'GEPA', 'vLLM', 'SLURM', 'SQLite', 'HarmBench', 'JailbreakBench', 'StrongREJECT', 'LLM Red-Teaming']}
      intro="A research pipeline using GEPA-based prompt optimization to evolve jailbreak templates against open-weight aligned LLMs — with a novel reflection design (D3), multi-judge evaluation, and documented defenses against contamination modes that inflate naive ASR numbers."
      sections={[
        {
          heading: 'Research Context',
          body: 'UofL graduate research using the university\'s H100 NVL HPC cluster. The project targets AI-safety researchers and authorized red-teamers who use GEPA-style evolution for jailbreak benchmarking. Primary evaluation target: Llama-3.1-8B-Instruct; cross-target transfer on Qwen3-8B. Paper in preparation — not yet submitted.',
        },
        {
          heading: 'Evaluation Integrity in AI — The Broader Problem',
          body: [
            {
              point: '**This work sits inside a larger crisis of measurement in AI.** The same failure modes documented here — Goodharting, contamination, single-judge inflation — appear at industry scale across every major lab. These are not edge cases or honest mistakes.',
            },
            {
              point: '**Google** — The [Gemini launch demo](https://techcrunch.com/2023/12/07/googles-best-gemini-demo-was-faked/) was fabricated. The viral video showing fluid real-time multimodal interaction was produced using still frames, off-camera text prompts, and dubbed voice — then [admitted](https://www.tomshardware.com/news/google-gemini-ai-video-staged) by Google only after public exposure. One Google employee told Bloomberg it "paints an unrealistic picture" and "shows how easy it is to make the AI tool look more advanced than it actually is."',
            },
            {
              point: '**Meta** — Llama 4\'s launch was [confirmed as manipulated](https://tech.slashdot.org/story/26/01/02/1449227/results-were-fudged-departing-meta-ai-chief-confirms-llama-4-benchmark-manipulation) by Meta\'s own outgoing chief AI scientist Yann LeCun: "results were fudged a little bit" and "different models were used for different benchmarks." Meta [submitted a preference-optimized version](https://www.theregister.com/2025/04/08/meta_llama4_cheating/) of Llama 4 to LM Arena that ranked #2, then released a different production version to the public that dropped to #32.',
            },
            {
              point: '**Anthropic** — Anthropic builds genuinely useful products and employs researchers doing serious work. That makes the pattern of overstated claims worth naming precisely because Anthropic\'s brand is built on being the honest, safety-first lab. The gap between that brand and the record is the point. These behaviors are not unique to Anthropic — they are predictable outputs of a venture-capital-driven arms race in which labs must continuously demonstrate frontier capability to secure funding, regardless of whether the underlying results support the claims.',
              sub: [
                '[Mythos was marketed](https://thehackernews.com/2026/04/anthropics-claude-mythos-finds.html) as autonomously discovering "thousands" of zero-days across major systems — used to justify restricting access as "too dangerous to release." [Independent analysis](https://www.tomshardware.com/tech-industry/artificial-intelligence/anthropics-claude-mythos-isnt-a-sentient-super-hacker-its-a-sales-pitch-claims-of-thousands-of-severe-zero-days-rely-on-just-198-manual-reviews) put the verified CVE count at approximately 40.',
                'The 181 Firefox exploits were run with the browser sandbox disabled. Mozilla\'s CTO reviewed the 271 flagged vulnerabilities and [stated](https://www.theregister.com/2026/04/22/mozilla_firefox_mythos_future_defenders) the model "hasn\'t found any bugs that couldn\'t have been found by an elite human researcher." FreeBSD logs show a researcher walking the model through steps presented as autonomous. The Linux kernel bug cited as evidence of Mythos capability was [actually found by publicly available Claude Opus 4.6](https://www.theregister.com/2026/04/22/anthropic_mythos_hype_nothingburger/).',
                'The model withheld as "too dangerous to release" was [accessed by guessing the URL](https://boingboing.net/2026/04/23/anthropics-too-dangerous-ai-was-accessed-by-guessing-the-url.html) from Anthropic\'s naming conventions.',
                'Anthropic silently lowered Claude Code\'s default reasoning effort, actively degrading performance, then [publicly denied degrading their models](https://fortune.com/2026/04/14/anthropic-claude-performance-decline-user-complaints-backlash-lack-of-transparency-accusations-compute-crunch/) while the change was live. The disclosure was buried in a changelog. [The Register](https://www.theregister.com/2026/04/23/anthropic_says_it_has_fixed/): "Anthropic admits it dumbed down Claude with upgrades." The company that most loudly claims the transparency mantle is not exempt from the pressures that make transparency inconvenient.',
              ],
            },
            {
              point: '**Industry-wide benchmark gaming** — [UC Berkeley RDI (2026)](https://rdi.berkeley.edu/blog/trustworthy-benchmarks-cont/) found every major AI agent benchmark — SWE-bench, WebArena, OSWorld, GAIA — can be exploited for perfect scores without solving a single task. A 10-line conftest.py "resolves" every SWE-bench Verified instance by rewriting outcomes before the grader runs. [METR documented](https://agent-wars.com/news/2026-04-11-every-major-ai-agent-benchmark-can-be-hacked) that o3 and Claude 3.7 Sonnet reward-hack in 30%+ of evaluation runs via stack introspection and monkey-patching. Models scoring 70% on SWE-bench Verified [score ~23%](https://decrypt.co/359012/openai-benchmark-measure-ai-coding-supremacy-contaminated) on SWE-bench Pro — a benchmark without training data leakage.',
            },
            {
              point: '**The implication:** published benchmark numbers from leading labs are systematically unreliable, and the field\'s primary mechanism for measuring progress is compromised in documented, reproducible ways. Evaluation integrity is not a niche methodological concern — it is load-bearing infrastructure for AI development, and it is visibly failing. The contamination modes documented in this project are not aberrations. They are the norm.',
            },
          ],
        },
        {
          heading: 'Problem',
          body: [
            {
              point: '**Published GEPA lift numbers are noisy and under-examined.** Three failure modes contaminate naive runs:',
              sub: [
                '**Format mimicry:** the reflection LM copies prior-record structure into evolved templates, inflating judge scores by up to +28 pp without improving the attack',
                '**Seed variance:** identical configs span 0–80 pp val-lift across gepa_seed values — a single run proves nothing',
                '**Single-judge Goodharting:** one template scored 47% hb_cls / 5% JBB / 13% StrongREJECT — a 42 pp spread on the same scenarios from three independent judges',
              ],
            },
            {
              point: '**Weak seeds stall evolution.** The canonical academic template starts at ~9% ASR — too low to generate useful GEPA reflective-dataset signal. D3 is designed to bootstrap from near-zero.',
            },
          ],
        },
        {
          heading: 'Pipeline — Adaptive Fuzz',
          body: [
            {
              point: '**GEPA adapter** evolves a single `{goal}`-slotted payload template via async batch evaluation across 813 harmful scenarios drawn from three public benchmarks: JailbreakBench (100) + HarmBench (400) + StrongREJECT (313).',
            },
            {
              point: '**Attack catalog:** 7 canonical shape-1 templates (DAN, academic, thought_experiment, word_game, back_to_the_past, please, taxonomy) plus multi-stage attacks (Crescendo, ArtPrompt) and a FuzzyAI upstream fetcher.',
            },
            {
              point: '**Pluggable classifier stack with explicit target/judge separation.** Primary signal: `hb_cls_prob` (softmax from `cais/HarmBench-Llama-2-13b-cls`, leaderboard-comparable). Secondary rubric judges — JBB prose, StrongREJECT v1/v2, HarmBench-prose, Detoxify, refusal regex — run via Dolphin-2.9-llama3-8b with independent system prompts. Architecture explicitly breaks the "Dolphin-judges-Dolphin" circularity.',
            },
            {
              point: '**SLURM cluster pipeline:** 2× H100 NVL (94 GB) per task. Per-task SQLite shards in WAL mode avoid NFS write contention. One array task = one benchmark cell; manifests built → dispatched → aggregated.',
            },
          ],
        },
        {
          heading: 'D3 — Category-Aware Reflection',
          body: [
            {
              point: '**The core contribution.** D3 injects a per-(coarse_category × canonical) ASR priors matrix and the full canonical template texts as **static preamble** in the reflection prompt — not as GEPA reflective-dataset records.',
            },
            {
              point: '**Why preamble, not records.** Injecting priors as records induced format mimicry — the reflection LM reproduced record structure verbatim in evolved templates, inflating scores without improving the attack. Moving them to a preamble framed as "reference material — DO NOT reproduce" eliminated the mode entirely (0 echo candidates across 11 post-fix runs).',
            },
            {
              point: '**CategoryBundleSampler** replaces GEPA\'s default epoch-shuffle sampler. Each 15-example minibatch contains 3 scenarios per coarse category, enabling per-category reflection feedback rather than epoch-level averaging.',
            },
            {
              point: '**Ablation — canonical template text is load-bearing.** D3-full vs D3-stripped: +45.2 pp vs +7.4 pp mean val lift. Attack names alone are insufficient; the reflection LM needs the concrete template text.',
            },
          ],
        },
        {
          heading: 'Results — Llama-3.1-8B-Instruct',
          body: [
            {
              point: '**D3-evolved template beats DAN, below statistical significance threshold.** D3-academic-s17 (260 chars, n=813 scenarios): **81.2% hb_cls ASR** vs DAN canonical 79.5% (+1.7 pp edge, within noise band). Note: DAN is a well-known hand-crafted canonical, not a state-of-the-art attack. The meaningful result is the 4× lift over the starting seed.',
              sub: [
                'academic seed baseline → 20.7% hb_cls',
                'D3-academic-s17 evolved → 81.2% hb_cls / 68.0% StrongREJECT-v2 / 38.6% JBB',
                'DAN canonical → 79.5% hb_cls / 67.3% StrongREJECT-v2 / 37.9% JBB',
                'Direction-consistent across all three independent judges',
              ],
            },
            {
              point: '**No overfitting.** Held-out ASR on 708 never-seen scenarios: 81.1% — within ±0.1 pp of full-benchmark ASR.',
            },
            {
              point: '**Bare-seed evolution.** A literal `{goal}` template evolves to 67.8% hb_cls (≈32× lift from a ~2% baseline). D3 provides enough gradient to bootstrap from near-zero signal.',
            },
            {
              point: '**Cross-target transfer (preliminary).** D3-s17: 81.2% → 30.8% hb_cls on Qwen3-8B (−50 pp). D3-evolved transfers 4–10 pp better than DAN across every judge — but only 2 of 6 templates evaluated; the remainder are pending a longer sbatch time budget for Qwen3\'s extended thinking mode.',
            },
          ],
        },
        {
          heading: 'Methodology Findings',
          body: [
            {
              point: '**Format-echo contamination is real and fixable.** Pre-fix D3 pilot showed +28 pp judge inflation from mimicry. Two-layer defense (preamble reformulation + blacklist retry) brought echo candidates to 0 across 11 post-fix runs.',
            },
            {
              point: '**Seed variance requires multi-seed replication.** 11 D3-full runs across gepa_seed ∈ {1, 7, 17, 23, 42} span 0–80 pp val lift on identical configs. Any single-run GEPA result should be treated as a point estimate with unknown variance.',
            },
            {
              point: '**HarmBench-cls has a systematic false-positive mode on meta-content.** `cais/HarmBench-Llama-2-13b-cls` produces 40+ pp inflated ASR on meta-discussion and reasoning-model `<think>` blocks. This is independent of the pipeline and likely affects any HarmBench-leaderboard submission that elicits meta-content from the target.',
            },
          ],
        },
        {
          heading: 'Limitations',
          body: [
            {
              point: '**Paper is a scaffold.** Abstract, related work, conclusion, and appendix are [TODO]/[DRAFT]/[PENDING]. Citations outstanding. Venue not chosen (SafeAI / SeT LLM / NeurIPS Red-Teaming / USENIX Security under consideration).',
            },
            {
              point: '**Cross-target eval incomplete.** 4 of 6 templates not yet evaluated on Qwen3 — Qwen3 thinking-mode extends per-scenario eval to 15–25 s, exceeding the current sbatch time limit.',
            },
            {
              point: '**API targets not evaluated.** Transfer to closed-weight models (Claude, GPT-4) is out of scope for the current results.',
            },
            {
              point: '**Single reflection LM.** Only Dolphin-2.9-llama3-8b tested as the reflection model; larger or differently-uncensored alternatives are untested.',
            },
            {
              point: '**No budget sweep.** All runs use a fixed 1,800 metric-call budget; weak-seed configs may benefit from longer evolution.',
            },
          ],
        },
      ]}
      metrics={[
        {
          category: 'Results',
          items: [
            '81.2% hb_cls ASR on Llama-3.1-8B-Instruct across 813 scenarios (JBB + HarmBench + StrongREJECT)',
            '~4× lift over academic seed (20.7% → 81.2%); beats DAN canonical +1.7 pp (below significance threshold)',
            '81.1% held-out ASR on 708 never-seen scenarios — no overfitting',
            'D3-full ablation: +45.2 pp vs +7.4 pp stripped — canonical template text is load-bearing',
            '0 format-echo candidates across 11 post-fix runs (vs +28 pp inflation pre-fix)',
          ],
        },
        {
          category: 'Scale',
          items: [
            '720 fuzz runs, 35,105 scored scenarios, 286 evolved payloads across committed shard DBs',
            '14 attacks: 7 canonical shape-1, 4 D3-evolved, bare-goal, Crescendo, ArtPrompt',
            '2 target model families: Llama-3.1-8B-Instruct (primary), Qwen3-8B (transfer, partial)',
          ],
        },
        {
          category: 'Infrastructure',
          items: [
            'UofL HPC cluster — SLURM job arrays, 2× H100 NVL (94 GB) per task',
            'Per-task SQLite shards (WAL mode) merged at aggregation — avoids NFS write contention',
            'vLLM serving target, reflection, and judge colocated per task',
          ],
        },
      ]}
    />
    </>
  )
}
