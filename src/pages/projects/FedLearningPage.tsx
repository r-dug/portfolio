import { ProjectPage } from '@/components/ProjectPage'

export function FedLearningPage() {
  return (
    <ProjectPage
      name="Federated Learning Research"
      tagline="Graduate research — University of Louisville"
      tech={['PyTorch', 'HDBSCAN', 'Python', 'Federated Learning', 'Byzantine Robustness', 'CuPy', 'DLPack']}
      heroImage={{
        src: '/images/federated-learning/architecture.png',
        alt: 'Federated learning architecture',
        caption: 'Central server coordinates honest and Byzantine workers across training rounds.',
      }}
      sections={[
        {
          heading: 'Research Question',
          body: 'Federated learning enables training ML models across distributed clients without sharing raw data — critical for privacy-sensitive domains like healthcare and finance. The challenge: how do you aggregate gradient updates from heterogeneous clients without letting noisy or adversarial (Byzantine) clients degrade the global model? Existing methods like FedAvg assume clients are roughly homogeneous. In practice, data heterogeneity and adversaries make that assumption dangerous.',
        },
        {
          heading: 'The Novel Method: HDBSCAN Median',
          body: [
            {
              point: '**Two-layer defense** that augments coordinatewise trimming with density-based outlier detection on gradient norms.',
              sub: [
                '**Layer 1:** Coordinatewise Median — select the n\u2212f closest updates per coordinate (standard trimming)',
                '**Layer 2:** HDBSCAN on L2 gradient norms — cluster workers by gradient magnitude, flag outliers (cluster = \u22121) as suspected Byzantine',
                'Operates on 1-D norms to avoid curse-of-dimensionality, while still adapting to non-IID variance',
                'GPU-accelerated via DLPack + CuPy for the clustering step',
              ],
            },
          ],
          image: { src: '/images/federated-learning/hdbscan-defense.png', alt: 'HDBSCAN Median defense flow', caption: 'Two-layer defense: coordinatewise trimming followed by HDBSCAN norm clustering.' },
        },
        {
          heading: 'Experimental Design',
          body: [
            {
              point: '**2,700 experiments** across a full combinatorial grid.',
              sub: [
                '5 random seeds \u00d7 3 datasets (MNIST, Fashion-MNIST, CIFAR-10) \u00d7 3 models (CNN, MLP, ResNet) \u00d7 12 attacks \u00d7 5 aggregation methods',
                '100 distributed clients per experiment, 2 Byzantine by default',
                'Non-IID label-biased data assignment (bias = 0.5)',
                '2,648 / 2,700 completed — remaining 52 tracked in an audit heatmap',
              ],
            },
            {
              point: '**12 Byzantine attacks** spanning three categories: data poisoning (label flip), untargeted model poisoning (Gaussian, Trim, Krum, MinMax, MinSum, LIE, IPM), and backdoor attacks (Scaling, Model Replacement, Adaptive Replacement).',
            },
            {
              point: '**5 aggregation baselines:** Mean, Trimmed Mean, Median, Krum, and our proposed HDBSCAN Median.',
            },
          ],
          image: { src: '/images/federated-learning/attack-taxonomy.png', alt: 'Byzantine attack taxonomy', caption: 'Taxonomy of the 12 Byzantine attack strategies evaluated.' },
        },
        {
          heading: 'Results',
          body: [
            {
              point: '**Detection performance:** HDBSCAN Median achieves near-perfect detection rates on high-noise attacks (Gaussian, MinMax, MinSum). Stealthier attacks (LIE, IPM) are harder to distinguish from honest variance — detection rates approach the false-positive baseline.',
            },
            {
              point: '**Cross-dataset accuracy:** The hero chart shows final accuracy per configuration across all three datasets. HDBSCAN Median is competitive with existing defenses and shows wins on specific attack/model combinations.',
            },
            {
              point: '**Honest status:** Wilcoxon pairwise tests (432 comparisons) currently show no statistical significance after Holm-Bonferroni correction. More seeds (10+) are needed for publishable claims. The method works — but proving it\'s *significantly better* requires more compute.',
            },
          ],
          carousel: [
            { src: '/images/federated-learning/detection-summary.png', alt: 'Detection rates by attack', caption: 'Mean detection rate and false positive count across all 12 attacks.' },
            { src: '/images/federated-learning/cross-dataset-results.png', alt: 'Cross-dataset results', caption: 'Final accuracy per configuration across MNIST, Fashion-MNIST, and CIFAR-10.' },
            { src: '/images/federated-learning/experiment-audit.png', alt: 'Experiment audit heatmap', caption: '2,648 / 2,700 experiments completed — audit heatmap tracks remaining gaps.' },
          ],
        },
        {
          heading: 'Infrastructure',
          body: [
            {
              point: '**GPU-driven experiment pipeline** with subprocess management, thread pools, and OOM recovery guards to keep the 2,700-experiment grid running reliably.',
            },
            {
              point: '**Reproducibility:** Fixed seeds, config-driven experiment definitions, resume logic for interrupted runs, and automated visualization scripts that regenerate all 163 plots from raw results.',
            },
          ],
        },
      ]}
      metrics={[
        {
          category: 'Scale',
          items: [
            '2,700 experiments (2,648 completed) across 3 datasets, 3 models, 12 attacks, 5 aggregations',
            '100 distributed clients per experiment',
            '163 plots generated from automated visualization pipeline',
          ],
        },
        {
          category: 'Research',
          items: [
            'Novel HDBSCAN Median aggregation method proposed and experimentally evaluated',
            'Near-perfect detection on high-noise Byzantine attacks',
            'Manuscript preparation ongoing under faculty supervision',
          ],
        },
      ]}
    />
  )
}
