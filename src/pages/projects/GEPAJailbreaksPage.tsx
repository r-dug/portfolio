import { ProjectPage } from '@/components/ProjectPage'

export function GEPAJailbreaksPage() {
  return (
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
  )
}
