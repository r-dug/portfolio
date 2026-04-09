# Follow-Up Items

Ordered by priority.  Each item describes the gap, why it matters, and the
concrete action to close it.

---

## High Priority

### 1. Complete the 52 Incomplete Experiments

**Gap:** 52 of 2,700 experiments are missing or have partial result files
(fewer than the expected 100 validation checkpoints for 1,000 epochs).  Most
are concentrated in mnist and Fashion datasets with the newMedian aggregation,
likely from interrupted GPU jobs.

**Impact:** Incomplete cells in the experiment grid reduce statistical power
and create gaps in the hero chart and heatmaps.

**Action:**
```bash
python run.py --resume
```
Estimated GPU time: 1--2 hours (only the missing runs execute).

---

### 2. Increase Seeds for Statistical Significance

**Gap:** With n = 5 seeds and 432 pairwise comparisons, the Holm--Bonferroni
correction makes it impossible to reach alpha = 0.05 significance (the minimum
raw Wilcoxon p-value for 5 paired observations is 0.03125, and the correction
factor is up to 432x).

**Impact:** Cannot make publishable claims about statistical superiority of
HDBSCAN Median over baselines.

**Action:** Re-run the full grid with seeds 0--9 (10 seeds).  With n = 10, the
minimum p-value drops to ~0.002, which can survive moderate correction.
Alternatively, focus on a reduced comparison set (e.g., only the primary
baseline) to lower the correction factor.

Estimated GPU time: ~double the original run (2,700 additional experiments).

---

### 3. Run GPU-Dependent Sweep Experiments

**Gap:** Four sets of experiments are scripted but not yet executed because
they require GPU time:

| Script                          | Purpose                              | Est. GPU Time |
|---------------------------------|--------------------------------------|---------------|
| `run_timing.py`                 | Computational cost measurement       | ~15 min       |
| `run_bias_sweep.py`             | Non-IID sensitivity (bias sweep)     | ~2--4 hrs     |
| `run_nbyz_sweep.py`             | Byzantine scalability (nbyz sweep)   | ~2--3 hrs     |
| `generate_norm_distributions.py`| Gradient norm honest vs. Byzantine   | ~5 min        |

**Impact:** These provide crucial evidence for the portfolio: overhead
justification, robustness claims under varying data heterogeneity and
adversary counts, and an intuitive explanation of why norm-based HDBSCAN
works.

**Action:** Submit all four as Slurm jobs (see `REGENERATION.md`).  They can
run in parallel on separate GPUs or sequentially on one.

---

## Medium Priority

### 4. Add Per-Dataset Heatmaps to Portfolio

**Gap:** The existing 9 per-dataset accuracy heatmaps and 9 ASR heatmaps
(already in `plots/`) were not copied into the portfolio folder.  The hero
chart provides the cross-dataset view, but the individual heatmaps have
higher resolution per cell.

**Action:** Copy selected heatmaps:
```bash
cp plots/cnn_cifar10_heatmap.png portfolio/figures/
cp plots/cnn_cifar10_asr_heatmap.png portfolio/figures/
# etc. for key dataset/model combos
```

---

### 5. Publish Aggregated Statistics CSV

**Gap:** The `aggregate_results.py --save` command produces per-configuration
mean/std tables, but these are not yet in the portfolio.

**Action:**
```bash
python aggregate_results.py --save
cp out/aggregated_results.csv portfolio/data/
```

---

## Low Priority

### 6. Non-IID Bias Sensitivity: Expand Scope

**Gap:** The bias sweep covers only mnist/cnn with two attacks (none, gauss).
A stronger claim would sweep all three datasets and add one evasion attack
(e.g., MinMax) and one backdoor (e.g., scale).

**Action:** Edit `run_bias_sweep.py` to extend the grid, then re-run.
Roughly 3x the current sweep size (~450 experiments, ~8--12 hours).

---

### 7. Byzantine Scalability: Expand Scope

**Gap:** The nbyz sweep covers only mnist/cnn with two attacks.  Expanding to
cifar10/resnet would test whether HDBSCAN Median's advantage holds for larger
models and harder tasks.

**Action:** Edit `run_nbyz_sweep.py` to add more dataset/model combos.

---

### 8. Formal Publication Preparation

**Gap:** The project currently targets a portfolio page, not a peer-reviewed
paper.  For publication, additional items would be needed:

- Formal related-work comparison table.
- Theoretical analysis of HDBSCAN Median's breakdown point.
- Communication overhead analysis (currently all workers are simulated
  locally; no actual network costs are measured).
- Larger-scale experiments (e.g., 1,000 workers, ImageNet subsets).
