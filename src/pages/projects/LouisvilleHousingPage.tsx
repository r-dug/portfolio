import { ProjectPage } from '@/components/ProjectPage'

export function LouisvilleHousingPage() {
  return (
    <ProjectPage
      name="Louisville Housing Projections"
      tagline="Where does the data say to invest? An interactive forecast map of every Louisville neighborhood"
      intro="A full data pipeline and model competition behind a simple deliverable: an interactive map that projects home values, rents, and investor returns for all 128 Louisville neighborhoods and every Jefferson County ZIP, at 1, 3, 5, and 10-year horizons. Every projection was stress-tested by rewinding history and checking whether the method would actually have worked."
      liveUrl="/louisville-housing/map.html"
      tech={[
        'Python', 'XGBoost', 'PyTorch', 'statsmodels', 'scikit-learn',
        'pandas', 'GeoPandas', 'Leaflet', 'Zillow Research', 'FRED',
        'Census/ACS', 'HUD', 'Redfin',
      ]}
      heroEmbed={{
        // bump ?v= when the map data refreshes so returning visitors bypass cache
        src: '/louisville-housing/map.html?v=2026-07-06b',
        title: 'Louisville Housing Projections — interactive map',
        height: 640,
        caption:
          'Live map — pick a layer, horizon, and area level; hover any neighborhood for its full investment profile. Best experienced fullscreen via the Live Demo link above.',
      }}
      sections={[
        {
          heading: 'What an Investor Sees',
          body: [
            {
              point: '**Seven layers, four time horizons, two zoom levels.** Pick a metric (projected appreciation, monthly rent, gross annual rent, net operating income, cap rate, gross rent multiplier, or a composite investment score), pick a horizon (1/3/5/10 years), and view it by neighborhood or ZIP. Hover any area for its full profile.',
            },
            {
              point: '**Plain-English metrics.** Cap rate = the annual rental profit you would keep, after typical operating costs, as a percentage of the property value — the rental investor’s yield. Gross rent multiplier = how many years of rent it takes to equal the purchase price — lower means rents pay the price back faster.',
            },
            {
              point: '**Confidence you can act on.** Every projection carries a per-area 80% range from quantile models, conformally calibrated against 21k+ historical forecasts (out-of-time coverage 87–96%). One-year appreciation: typical error ±2.8 points. Ten-year: ±28.7 — direction and ranking, not precision. Layers without backtest evidence say so explicitly instead of showing a number.',
            },
            {
              point: '**Assumptions on the label.** Every number’s recipe — the area-varying operating-expense model, how rents are estimated, where boundaries are approximate — is one click away in the map’s methodology panel, and each tooltip shows the expense ratio assumed for that area.',
            },
          ],
        },
        {
          heading: 'Key Findings (as of mid-2026)',
          body: [
            {
              point: '**Near-term growth is modest and uneven.** The median Louisville area projects +1.8% over the next 12 months, but 21 of 219 areas project outright declines. The strongest near-term areas are urban-core neighborhoods with momentum: Smoketown-Jackson (+6.3%), Shawnee (+5.8%), and the 40212 corridor.',
            },
            {
              point: '**Louisville splits into a yield market and a growth market.** West-end neighborhoods (Shawnee, Algonquin, Chickasaw, Park Hill, Park DuValle) offer projected cap rates approaching 9% — roughly triple the yields in the east end, where prices are high relative to rents. That premium is compensation for real risk: older housing stock, higher vacancy and collection risk, and thinner resale markets.',
            },
            {
              point: '**The value corridor leads on total return.** The map’s headline aggregate is unlevered total return — projected appreciation plus net rental yield, in plain %/yr with no weighting choices. Five-year leaders: Hallmark (16.4%/yr), Shawnee (13.0%), Edgewood (12.7%) — each with its uncertainty range shown. A percentile-based investment score is also available, with the component weights set by you (growth vs cash-flow presets or custom sliders), not baked in.',
            },
            {
              point: '**Long-run trajectory: +45% median over ten years** (~3.8%/yr), with the strongest trend areas (Smoketown-Jackson, West Buechel) projecting to more than double. Ten-year figures are trend extrapolations — treat them as direction, not precision.',
            },
            {
              point: '**A disclosed disagreement:** Zillow’s own metro model calls the next 12 months flat (−0.1%); this system’s median area projection is +1.8%. The gap is documented rather than hidden — reasonable models disagree at turning points.',
            },
          ],
        },
        {
          heading: 'How the Projections Are Made',
          body: [
            {
              point: '**Rewind-and-test discipline.** Every candidate method was evaluated by rolling the clock back (35 forecast dates, 2008–2025), forecasting forward with only the data available at that moment, and scoring against what actually happened — 21,841 scored forecasts per model. Nothing ships unless it beats the “prices don’t change” baseline.',
              sub: [
                'Seven model families competed: gradient-boosted trees, an LSTM neural network, Amazon\u2019s Chronos-2 pretrained time-series transformer (zero-shot), ARIMA, exponential smoothing, and simple trend baselines',
                'Statistical significance checked with Diebold-Mariano tests',
              ],
            },
            {
              point: '**Different horizons, different physics.** Housing markets have momentum over 1–2 years and revert to trend beyond that — a pattern from the academic literature that Louisville’s data reproduces. So short horizons use machine learning on momentum, inventory, days-on-market, price cuts, mortgage rates, and local employment; long horizons use each area’s own long-run trend, because 18 years of backtesting says that’s what stays reliable.',
            },
            {
              point: '**The neural networks lost fair and square.** The LSTM was diagnosed (training curves, epoch sweeps, feature ablations) and dropped: at ~200 areas of monthly data, it could not beat gradient-boosted trees. A pretrained transformer (Chronos-2, run zero-shot) beat the trained LSTM at every horizon without any training — but still lost to the simpler engine. Both results match the latest published benchmark on ZIP-level housing data (HouseTS, 2026).',
              sub: [
                'Best 1-year forecaster: pooled XGBoost — 32% more accurate than the no-change baseline',
                '10-year projections: each area’s long-run trend — 38% more accurate than no-change',
              ],
            },
            {
              point: '**Data engineering under the hood:** eight public sources (Zillow Research, FRED, Census/ACS, HUD Fair Market Rents, Redfin, LOJIC GIS, Census TIGER, LMPD), a composite boundary layer that recovers 2000-vintage Census geographies for post-merger neighborhoods, and 22 automated tests including leakage guards that prove no forecast ever saw the future.',
            },
          ],
          carousel: [
            {
              src: '/images/louisville-housing/model-skill.png',
              alt: 'Model skill by horizon',
              caption: 'Forecast accuracy vs the no-change baseline, by horizon — the basis for the horizon-specific engine',
            },
            {
              src: '/images/louisville-housing/momentum-vs-benchmark.png',
              alt: 'Momentum decay curve',
              caption: 'Louisville price momentum decays over ~5 years — the pattern that dictates which model handles which horizon',
            },
          ],
        },
        {
          heading: 'Honest Limitations',
          body: [
            {
              point: '**Not investment advice.** These are model projections with real uncertainty, built for screening and comparison — not appraisals of individual properties.',
            },
            {
              point: '**Rent data is young.** ZIP-level market rents exist only since ~2016, and 53 of 219 areas lack rent coverage entirely (shown gray). Neighborhood rents are estimated from surrounding ZIPs, never observed directly.',
            },
            {
              point: '**Expenses are modeled, not observed.** Net operating income uses an area-varying expense ratio (39–65%, median ~47%) built from Census housing-stock age, rental vacancy rates, and value-proportional taxes and insurance. It captures systematic differences between areas, but any individual property’s costs can differ substantially from its area’s assumption.',
            },
            {
              point: '**The training era had no completed bust.** Models learned mostly from 2012–2026, a long expansion. A 2008-style downturn would degrade every model here — the long-horizon numbers especially.',
            },
          ],
        },
      ]}
      metrics={[
        {
          category: 'Modeling',
          items: [
            '6 model families backtested over 35 origins (2008–2025)',
            '21,841 scored forecasts per model run',
            '1-yr engine 32% better than no-change baseline; 10-yr engine 38% better',
          ],
        },
        {
          category: 'Coverage',
          items: [
            '128 neighborhoods + 91 metro ZIPs, monthly data 2000–2026',
            '8 public data sources, all free',
            '22 automated tests incl. temporal-leakage guards',
          ],
        },
      ]}
    />
  )
}
