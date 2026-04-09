import { ProjectPage } from '@/components/ProjectPage'

export function StyleMimicryPage() {
  return (
    <ProjectPage
      name="Style Mimicry Robustness"
      tagline="AI security research — graduate project (in progress)"
      tech={['Stable Diffusion 3.5 Large', 'PyTorch', 'Python', 'Adversarial ML', 'LoRA Fine-Tuning']}
      sections={[
        {
          heading: 'Research Question',
          body: 'Artists have begun using perturbation-based tools to protect their work from being used to train style-mimicry models. These tools add imperceptible noise to images that disrupts training. The question: how robust are these protections against countermeasures? Do they actually hold up, or can they be bypassed with off-the-shelf techniques?',
        },
        {
          heading: 'Experimental Design',
          body: [
            '4 perturbation-based protections × 4 countermeasures = 16 experimental conditions, plus baselines.',
            '639 original artworks collected across 26 artists and 6 art-historical styles (abstract, baroque, cubism, impressionism, realism, surrealism).',
            'Evaluated on Stable Diffusion 3.5 Large (MM-DiT), a current-generation open-weights diffusion model.',
            'LoRA fine-tuning pipeline with automated progress tracking and per-artist bookmarking to prevent redundant compute.',
            'Evaluation plan combines algorithmic benchmarking (FID, LPIPS, style similarity) with a human evaluation study.',
          ],
        },
        {
          heading: 'Current Status',
          body: [
            'Modular pipeline built: data collection, protection application, fine-tuning, generation, and evaluation stages.',
            '~40\u201350 GPU-hours of training completed across baseline and protected conditions.',
            'StyleGuard protection fully applied across all 26 artists; remaining protections in progress.',
            'Benchmarking and human evaluation phases are next\u2014metrics and visual comparisons forthcoming.',
          ],
        },
        {
          heading: 'Why it Matters',
          body: 'If the protections work, artists have a meaningful tool. If they don\'t, that\'s also important to know\u2014false security is worse than no security. Rigorous evaluation requires both automated metrics (which are fast but imperfect) and human judgment (which is slow but captures perceptual reality).',
        },
      ]}
      results={[
        '639 images across 26 artists and 6 styles collected and organized.',
        'Automated fine-tuning pipeline with JSON-based progress tracking built and validated.',
        '~20 baseline LoRA models trained; StyleGuard-protected models in progress.',
        '~570 mimic images generated for initial qualitative review.',
      ]}
    />
  )
}
