# Artifact Regeneration Guide

All commands assume the `federated-learning` conda environment is active:

```bash
source ~/miniconda3/etc/profile.d/conda.sh
conda activate federated-learning
cd /home/rcdoug03/fed_learn
```

---

## Data Artifacts in `portfolio/data/`

### `data/significance_tests.csv`

432-row table of Wilcoxon signed-rank tests comparing HDBSCAN Median (newMedian)
against each of four baselines (mean, trim, median, krum) across all
(dataset, model, attack) configurations.

**Columns:** dataset, model, attack, baseline, newMedian_mean, baseline_mean,
diff, p_value, effect_size, corrected_p, significant.

**Regenerate:**

```bash
python aggregate_results.py --significance
# Output: out/significance_tests.csv
cp out/significance_tests.csv portfolio/data/
```

---

## Figures Already Generated (in `portfolio/figures/`)

These were produced from existing experiment data (no GPU needed):

```bash
# Experiment audit heatmap
python visualize_results.py --task audit

# HDBSCAN detection plots (reads b_log_*.txt files)
python visualize_results.py --task detection

# Cross-dataset hero chart + win counts (reads all result files)
python visualize_results.py --task hero

# Significance heatmap (reads out/significance_tests.csv)
python visualize_results.py --task significance

# Backdoor trigger imagery (loads datasets from keras)
python visualize_results.py --task triggers

# Architecture and taxonomy diagrams (pure matplotlib)
python generate_diagrams.py
```

To regenerate all original plots (training curves, heatmaps, bars, etc.):

```bash
python visualize_results.py --task all
```

---

## GPU-Dependent Artifacts (Not Yet Generated)

These scripts are written and tested but require a GPU to run.  Submit via
Slurm or run interactively on a GPU node.

### 1. Computational Cost Measurement

Measures per-epoch wall-clock time for gradient computation, aggregation, and
evaluation across all five aggregation methods.

```bash
# Run 5 experiments (mnist/cnn, 100 epochs each, ~15 min)
python run_timing.py

# Plot the results
python visualize_results.py --task timing
# Output: plots/computational_cost_breakdown.png
```

**Produces:** `out/timing_{aggregation}.csv` (5 files), each with columns
`epoch,grad_ms,agg_ms,eval_ms`.

### 2. Non-IID Sensitivity Sweep

Sweeps bias in {0.1, 0.3, 0.5, 0.7, 0.9} to measure how data heterogeneity
affects each aggregation method.

```bash
# Run 150 experiments (mnist/cnn, none + gauss attacks, 500 epochs, ~2-4 hrs)
python run_bias_sweep.py

# Plot the results
python visualize_results.py --task bias_sweep
# Output: plots/bias_sweep_none.png, plots/bias_sweep_gauss.png
```

### 3. Byzantine Worker Scalability Sweep

Sweeps nbyz in {2, 5, 10, 20} to test aggregation robustness as the number
of adversaries increases.

```bash
# Run ~90 new experiments (mnist/cnn, gauss + scale attacks, 500 epochs, ~2-3 hrs)
python run_nbyz_sweep.py

# Plot the results
python visualize_results.py --task nbyz_sweep
# Output: plots/nbyz_sweep_gauss.png, plots/nbyz_sweep_scale.png
```

### 4. Gradient Norm Distributions

Visualizes honest vs. Byzantine gradient L2 norm distributions to explain why
HDBSCAN clustering on norms is effective.

```bash
# ~5 min on GPU (forward passes through 9 pretrained checkpoints)
python generate_norm_distributions.py
# Output: plots/gradient_norms_{dataset}_{model}.png (9 files)
```

---

## Completing Incomplete Experiments

52 experiments are missing or partial.  To fill them:

```bash
python run.py --resume
```

The `--resume` flag skips experiments whose result files are already complete
(>= 100 lines for 1000 epochs / interval 10) and re-runs incomplete ones.

---

## Slurm Submission

For any of the above on a Slurm cluster, adapt the existing job script:

```bash
#!/bin/bash
#SBATCH --job-name="fed_learn_sweep"
#SBATCH --partition="gpu"
#SBATCH --nodes=1
#SBATCH --gpus-per-task=1
#SBATCH --cpus-per-task=24
#SBATCH --time=8:00:00
#SBATCH --output=logs/sweep.out
#SBATCH --error=logs/sweep.err

cd /home/rcdoug03/fed_learn
source ~/miniconda3/etc/profile.d/conda.sh
conda activate federated-learning

python run_bias_sweep.py     # or run_nbyz_sweep.py, run_timing.py, etc.
```
