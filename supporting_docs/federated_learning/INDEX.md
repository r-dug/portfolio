# Portfolio Folder Index

Drop this `portfolio/` folder into the repository root.  All paths below are
relative to `portfolio/` for easy reference from a portfolio page or README.

```
portfolio/
  INDEX.md                  -- this file
  PROJECT_SUMMARY.md        -- narrative: architecture, datasets, models,
                               attacks, defenses, validation, key results
  FIGURE_CAPTIONS.md        -- one caption per figure, ready for copy-paste
                               into a static site or LaTeX
  REGENERATION.md           -- commands to regenerate every artifact
  FOLLOW_UP.md              -- outstanding items and next steps

  figures/
    diagram_fl_architecture.png       -- FL system overview
    diagram_hdbscan_defense.png       -- two-layer defense flowchart
    diagram_attack_taxonomy.png       -- attack classification tree
    hero_chart_cross_dataset.png      -- cross-dataset aggregation comparison
    aggregation_win_counts.png        -- win count per aggregation method
    aggregation_ranking.png           -- average accuracy bar chart
    hdbscan_detection_timeseries.png  -- detection rate over epochs (12 attacks)
    hdbscan_detection_summary.png     -- detection rate + FP summary bars
    significance_heatmap.png          -- newMedian vs baselines (Wilcoxon)
    backdoor_triggers.png             -- original vs triggered images
    experiment_audit_heatmap.png      -- experiment completion coverage

  data/
    significance_tests.csv            -- 432-row pairwise significance table
```

## Suggested Portfolio Page Layout

1. **Hero section** -- `diagram_fl_architecture.png` + one-paragraph summary
   from PROJECT_SUMMARY.md section 1.
2. **How it works** -- `diagram_hdbscan_defense.png` +
   `diagram_attack_taxonomy.png` + sections 5--6 from PROJECT_SUMMARY.md.
3. **Results** -- `hero_chart_cross_dataset.png` +
   `aggregation_win_counts.png` + section 8 from PROJECT_SUMMARY.md.
4. **Detection analysis** -- `hdbscan_detection_timeseries.png` +
   `hdbscan_detection_summary.png`.
5. **Backdoor defense** -- `backdoor_triggers.png` + caption.
6. **Methodology** -- `experiment_audit_heatmap.png` +
   `significance_heatmap.png` + validation notes from section 7.
7. **Future work** -- bullet list from FOLLOW_UP.md sections 2--3.

## Figures Pending GPU Runs

After running the sweep scripts (see REGENERATION.md), copy the new plots
into `portfolio/figures/`:

```bash
cp plots/computational_cost_breakdown.png portfolio/figures/
cp plots/bias_sweep_*.png                 portfolio/figures/
cp plots/nbyz_sweep_*.png                 portfolio/figures/
cp plots/gradient_norms_*.png             portfolio/figures/
```

Then add captions to FIGURE_CAPTIONS.md for:
- `computational_cost_breakdown.png` -- aggregation overhead comparison
- `bias_sweep_{attack}.png` -- accuracy vs non-IID bias
- `nbyz_sweep_{attack}.png` -- accuracy vs Byzantine worker count
- `gradient_norms_{dataset}_{model}.png` -- honest vs Byzantine norm distributions
