# Byzantine-Resilient Federated Learning with HDBSCAN Median Aggregation

## 1. Project Overview

This project benchmarks **Byzantine-resilient aggregation strategies** for
federated learning (FL).  The central contribution is **HDBSCAN Median**, a
novel two-layer defense that combines coordinatewise trimming with
density-based outlier detection on gradient norms.  The framework evaluates
five aggregation methods against twelve attack types across three standard
image-classification datasets and three model architectures, yielding a
2,700-experiment grid (five random seeds each) for statistical robustness.

---

## 2. Architecture

Federated learning distributes model training across *N* workers.  Each round,
workers compute local gradients on private data, upload them to a central
server, and receive an updated global model.  Byzantine workers may send
arbitrarily corrupted gradients to degrade the global model.

```
Central Server
  |-- collects gradients from N workers
  |-- applies aggregation defense
  |-- broadcasts updated model
  '-- repeats for T epochs

Workers (N = 100, nbyz = 2 by default)
  |-- honest workers: compute true gradients on local data
  '-- Byzantine workers: submit malicious gradients via attack function
```

**Key design decisions:**

- Non-IID data distribution via label-biased assignment (bias = 0.5).
- Centralized pretraining (50 epochs) before federated rounds so gradient
  norms carry meaningful task signal for the HDBSCAN clustering layer.
- No Byzantine corruption in the first federated epoch (warmup effect).
- GPU-accelerated aggregation using DLPack zero-copy transfers and CuPy
  chunked median selection.

See `figures/diagram_fl_architecture.png` for the system diagram.

---

## 3. Datasets

| Dataset       | Shape       | Train | Test | Source        |
|---------------|-------------|------:|-----:|---------------|
| MNIST         | 28 x 28 x 1 | 6,000 |  500 | keras.datasets |
| Fashion-MNIST | 28 x 28 x 1 | 6,000 |  500 | keras.datasets |
| CIFAR-10      | 32 x 32 x 3 | 5,000 |  500 | keras.datasets |

Data is distributed across 100 workers using a **label-biased non-IID
scheme**.  With bias = 0.5, each worker predominantly receives samples from
one class while still seeing others, simulating realistic data heterogeneity.

---

## 4. Models

| Model  | Architecture                                             | ~Params |
|--------|----------------------------------------------------------|--------:|
| CNN    | 2 x Conv2D + MaxPool -> Dense(100) -> Dense(10)          | 200 K   |
| MLR    | Dense(64) -> Dense(64) -> Dense(10)                      |  45 K   |
| ResNet | 3 residual blocks (16/32/64) + BatchNorm -> Dense(10)    | 150 K   |

All models output logits (no softmax); the loss is
`SparseCategoricalCrossentropy(from_logits=True)`.

---

## 5. Attacks (12)

### Data Poisoning
- **Label Flip** -- maps each label y to 9-y for Byzantine workers.

### Untargeted Model Poisoning
- **Gaussian** -- replaces Byzantine gradients with N(0, 200^2) noise.
- **Trim Attack** -- crafts gradients that evade coordinatewise trimming.
- **Krum Attack** -- binary search for the gradient with the lowest Krum score.
- **MinMax** -- minimizes maximum L2 distance to any benign gradient.
- **MinSum** -- minimizes sum of L2 distances to all benign gradients.
- **LIE (A Little Is Enough)** -- positions at mean - z * std for a
  statistically calibrated survival threshold.
- **IPM (Inner Product Manipulation)** -- gradients in the -g_honest direction
  with orthogonal noise.

### Backdoor (Targeted)
- **Scaling** -- amplifies Byzantine gradients by the worker count (n/f).
- **Model Replacement** -- scales to gamma * g_byz - (gamma-1) * g_honest,
  clipped to 10x benign norm.
- **Adaptive Model Replacement** -- gradual warmup (30 epochs), Gaussian noise
  injection, and per-coordinate projection onto [mean +/- 4 sigma] bounds.

See `figures/diagram_attack_taxonomy.png` for the full taxonomy.

---

## 6. Defenses / Aggregation Methods (5)

| Method              | Strategy                                                          |
|---------------------|-------------------------------------------------------------------|
| Mean                | Simple average of all gradients (no defense, baseline).           |
| Trimmed Mean        | Remove f highest and f lowest values per coordinate, average rest.|
| Median              | Coordinatewise median across all workers.                         |
| Krum                | Select the single gradient closest to its k-nearest neighbors.    |
| **HDBSCAN Median**  | **Two-layer defense (novel contribution):**                       |
|                     | Layer 1 -- Coordinatewise median, select m = n-f closest workers. |
|                     | Layer 2 -- HDBSCAN clustering on gradient L2 norms; workers      |
|                     | outside the majority cluster are predicted Byzantine.             |

The HDBSCAN layer uses `min_cluster_size = (n//2) + 1` (strict majority) with
`allow_single_cluster = True`, running on 1-D L2 norms rather than the full
gradient space.  This is efficient (O(n log n) vs O(n * d)) and effective
because non-IID data creates large honest-worker norm variance that would
confuse clustering in the full gradient space.

See `figures/diagram_hdbscan_defense.png` for the defense flowchart.

---

## 7. Validation Strategy

- **5 random seeds** (0--4) per experiment configuration.
- **Full grid**: 5 seeds x 3 datasets x 3 models x 12 attacks x 5
  aggregations = **2,700 experiments**.
- **Metrics recorded every 10 epochs** (plus the final epoch):
  - Test accuracy (all experiments).
  - Attack success rate / ASR (backdoor attacks only).
- **HDBSCAN detection count** logged per-epoch in `b_log_*.txt` files for
  post-hoc analysis of outlier detection accuracy.
- **Centralized pretrain checkpoint** cached and reused across seeds for
  reproducibility.
- **Completion status**: 2,648 / 2,700 experiments complete (see the
  experiment audit heatmap in `figures/`).

---

## 8. Key Results

### Cross-Dataset Comparison

The hero chart (`figures/hero_chart_cross_dataset.png`) shows final accuracy
for all 540 (dataset x model x attack x aggregation) configurations.  HDBSCAN
Median is competitive with or exceeds the baselines on the majority of
configurations.  The aggregation win-count chart
(`figures/aggregation_win_counts.png`) tallies how many configurations each
method achieves the highest accuracy.

### HDBSCAN Detection Behavior

The HDBSCAN detection time-series (`figures/hdbscan_detection_timeseries.png`)
reveals how the outlier detector's behavior varies across attacks:

- For high-noise attacks (Gaussian, Scaling), detection rate is high
  throughout training.
- For evasion-oriented attacks (MinMax, MinSum, LIE), detection rate is
  lower, reflecting these attacks' design goal of staying close to benign
  gradients.
- For the no-attack baseline, any detections are false positives on honest
  workers -- an expected artifact of using L2 norm clustering on non-IID data.

The summary chart (`figures/hdbscan_detection_summary.png`) compares mean
detection rate and false-positive count across all 12 attacks.

### Statistical Significance

With n = 5 seeds and Holm--Bonferroni correction over 432 comparisons, no
pairwise differences reach alpha = 0.05 significance.  The minimum achievable
p-value with 5 paired observations under the Wilcoxon signed-rank test is
0.03125, which cannot survive the correction factor.  **Increasing seeds to
10+ is recommended for publishable significance claims.**  Raw p-values and
effect sizes are in `data/significance_tests.csv`.

### Backdoor Trigger Visualization

The trigger imagery (`figures/backdoor_triggers.png`) shows original vs.
triggered images for MNIST, Fashion-MNIST, and CIFAR-10.  Trigger pixels are a
4-pixel pattern in the lower-right corner of each image, set to maximum
intensity (1.0).  The target class for all backdoor attacks is 0.

---

## 9. Outstanding Items

See `FOLLOW_UP.md` for the complete list.  The main gaps:

1. **52 incomplete experiments** (mostly partial runs on mnist/mlr and
   Fashion/mlr with newMedian).  Re-run via `python run.py --resume`.
2. **Significance power** -- increase seeds from 5 to 10+ and re-run
   `python aggregate_results.py --significance`.
3. **GPU-dependent sweep experiments** (timing, bias, nbyz) -- scripts are
   written and ready; see `REGENERATION.md` for commands.
4. **Gradient norm distributions** -- script ready, requires GPU for forward
   passes through pretrained checkpoints.

---

## 10. Supporting Materials & Documentation

- `INDEX.md` lays out a suggested portfolio page flow (hero, how-it-works, detection, methodology, future work) and maps each figure to the appropriate section.
- `FIGURE_CAPTIONS.md` contains ready-to-print captions for all 11 figures so they can be dropped into the site or a paper without rewrite.
- `REGENERATION.md` records the exact commands for every plot (visualize_results tasks, aggregation/significance flags, diagram generation) plus the new GPU sweep scripts.
- `FOLLOW_UP.md` keeps an audit trail of what remains: the 52 runs, more seeds for significance, timing/bias/nbyz sweeps, gradient norm distributions, and any additional validation notebooks.
- `figures/` bundles the hero diagram, defense/attack flowcharts, detection plots, hero chart, filters, and audit heatmap mentioned above.
- `data/significance_tests.csv` stores the 432 Wilcoxon comparisons (no significance at n=5 after Holm-Bonferroni). Use it as the statistical backbone for the portfolio’s “limitations/next steps” paragraph.
