// ─── Vega-Lite chart loader ────────────────────────────────────────────────
// Safe wrapper: if JSON file not found yet, keep placeholder visible
function loadChart(id, path, opts = {}) {
  const el = document.getElementById(id);
  if (!el) return;
  vegaEmbed("#" + id, path, Object.assign({ actions: false, renderer: "svg" }, opts))
    .then(() => {
      el.classList.remove("placeholder-chart");
    })
    .catch(() => {
      console.warn("[vega] Could not load", path, "— placeholder kept for", id);
    });
}

// ─── Load all charts ──────────────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {

  // Section 01 — Drink preferences
  loadChart("chart-drink-preference",  "js/chart1.vg.json");
  loadChart("chart-taste-profile",     "js/chart2.vg.json");

  // Section 02 — Benefits
  loadChart("chart-coffee-benefits",   "js/chart3.vg.json");
  loadChart("chart-coffee-feelings",   "js/chart4.vg.json");

  // Section 03 — Trade
  loadChart("chart-coffee-imports-sankey", "js/chart5.vg.json");
  loadChart("chart-import-trend",      "js/chart6.vg.json");

  // Section 04 — Prices
  loadChart("chart-coffee-price-map",  "js/chart8.1.vg.json");
  loadChart("chart-state-price-ranking","js/chart8.vg.json");

  // Section 05 — Cafe map
  loadChart("chart-cafe-map",          "js/chart9.vg.json");

  // Section 06 — Global
  loadChart("chart-global-consumption","js/chart10.vg.json");
  loadChart("chart-domestic-consumption", "js/chart11.vg.json");
  loadChart("chart-australia-global-comparison", "js/chart12.vg.json");

});