# Figure Captions

Each figure lives in `portfolio/figures/`.  Paths are relative to the
portfolio folder for easy import into a static site or LaTeX document.

---

## Architecture Diagrams

### `figures/diagram_fl_architecture.png`
**Federated Learning System Architecture.**
Central server (blue) coordinates N = 100 workers.  Honest workers (green)
upload true gradients; Byzantine workers (red, first 2) upload adversarial
gradients.  Orange arrows represent gradient uploads; blue dashed arrows
represent model broadcasts.  The server applies an aggregation defense before
updating the global model.

### `figures/diagram_hdbscan_defense.png`
**HDBSCAN Median: Two-Layer Defense Flowchart.**
Layer 1 computes the coordinatewise median and selects the m = n - f workers
closest to the median on each coordinate.  Layer 2 runs HDBSCAN on gradient
L2 norms with strict-majority `min_cluster_size`; workers outside the majority
cluster (label = -1) are flagged as Byzantine.  The two layers compose to
provide both coordinate-level and worker-level robustness.

### `figures/diagram_attack_taxonomy.png`
**Byzantine Attack Taxonomy.**
Tree diagram classifying the 12 attack types into three families: data
poisoning (label flip), untargeted model poisoning (Gaussian, Trim Attack,
Krum Attack, MinMax, MinSum, LIE, IPM), and backdoor / targeted attacks
(Scaling, Model Replacement, Adaptive Model Replacement).  Untargeted attacks
aim to reduce overall accuracy; backdoor attacks inject a trigger pattern for
targeted misclassification while preserving clean-task performance.

---

## Main Results

### `figures/hero_chart_cross_dataset.png`
**Cross-Dataset Aggregation Comparison (Hero Chart).**
Three side-by-side heatmaps (one per dataset: MNIST, Fashion-MNIST, CIFAR-10).
Rows represent each (model, attack) combination; columns are the five
aggregation methods.  Cell values are mean final accuracy across five seeds.
Bold values mark the best aggregation per row.  The HDBSCAN Median column
(rightmost) is highlighted with purple dashed borders.  This is the single
summary view of all 540 experiment configurations.

### `figures/aggregation_win_counts.png`
**Aggregation Win Counts.**
Bar chart showing the number of (dataset, model, attack) configurations where
each aggregation method achieves the highest mean final accuracy.  A "win"
means the method had the best accuracy for that specific scenario.  The chart
complements the hero chart by providing a scalar ranking of overall
competitiveness.

### `figures/aggregation_ranking.png`
**Average Final Accuracy Across All Experiments.**
Bar chart of each aggregation method's average accuracy, computed over all
attack types, datasets, and models.  This is the broadest possible summary
metric.  Value labels on bars show accuracy to three decimal places.

---

## HDBSCAN Detection Analysis

### `figures/hdbscan_detection_timeseries.png`
**HDBSCAN Byzantine Detection Over Training.**
A 4x3 grid of time-series plots (one per attack type).  For attacks with
actual Byzantine workers (11 of 12), the solid line shows the detection
rate = min(b_detected, f_known) / f_known, averaged across all datasets and
seeds, with +/- 1 std shading.  For the "No Attack" panel, the line shows
the false-positive count (how many honest workers HDBSCAN incorrectly flags).
Reveals how detection accuracy varies across attack types and stabilizes over
training.

### `figures/hdbscan_detection_summary.png`
**HDBSCAN Detection Rate and False Positives by Attack (Summary).**
Two-panel bar chart.  Left panel: mean detection rate per attack type
(fraction of true Byzantines caught).  Right panel: mean false-positive count
(honest workers incorrectly flagged).  High-noise attacks (Gaussian, Scaling)
show near-perfect detection; evasion attacks (MinMax, MinSum, LIE) show lower
detection rates, consistent with their design goal of mimicking honest
gradients.

---

## Statistical Significance

### `figures/significance_heatmap.png`
**Statistical Significance: HDBSCAN Median vs. Baselines.**
Heatmap where each row is a (dataset, model, attack) configuration and each
column is one of the four baseline aggregations (Mean, Trimmed Mean, Median,
Krum).  Green = HDBSCAN Median significantly outperforms the baseline;
red = significantly worse; white = no statistically significant difference
(Wilcoxon signed-rank test, alpha = 0.05, Holm--Bonferroni corrected).  With
n = 5 seeds and 432 comparisons, no results survive correction -- see
FOLLOW_UP.md for the recommendation to increase seeds.

---

## Backdoor Analysis

### `figures/backdoor_triggers.png`
**Backdoor Trigger Patterns.**
3 x 6 grid showing original images (odd columns) and triggered images (even
columns) for MNIST, Fashion-MNIST, and CIFAR-10.  Each dataset row shows three
sample images from classes 0, 1, and 5.  Red circles on triggered images mark
the 4-pixel trigger pattern in the lower-right corner.  The trigger sets
pixels to maximum intensity (1.0).  Target class for all backdoor attacks
is 0.

---

## Experiment Audit

### `figures/experiment_audit_heatmap.png`
**Experiment Completion Audit.**
Coverage matrix showing seed completion (0--5) for each cell in the full
experiment grid.  Rows are (dataset, model) combinations; columns are
(attack, aggregation) combinations.  Green = all 5 seeds complete;
yellow/red = fewer seeds finished.  2,648 of 2,700 experiments are complete.
The 52 missing/incomplete runs are concentrated in mnist and Fashion with the
newMedian aggregation (partial saves from interrupted GPU jobs).
