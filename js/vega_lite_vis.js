// Reusable Vega / Vega-Lite chart loader.
// It keeps every card from going blank by showing a readable error message.
function loadChart(id, specPath, embedOptions) {
  var element = document.getElementById(id);

  if (!element) {
    console.warn("[vega] Container not found:", id);
    return;
  }

  var options = Object.assign(
    {
      actions: false,
      renderer: "svg",
      downloadFileName: id,
      defaultStyle: false
    },
    embedOptions || {}
  );

  return vegaEmbed("#" + id, specPath, options)
    .then(function (result) {
      // FIX: Inject viewBox so CSS max-width/height:auto scales SVG correctly.
      // Without viewBox, CSS height:auto collapses SVG height → Vega's internal
      // clip-paths shrink to 0 → all marks get clipped → colours disappear.
      var svgEl = element.querySelector("svg");
      if (svgEl) {
        var w = parseFloat(svgEl.getAttribute("width"));
        var h = parseFloat(svgEl.getAttribute("height"));
        if (w && h && !svgEl.getAttribute("viewBox")) {
          svgEl.setAttribute("viewBox", "0 0 " + w + " " + h);
          // Let CSS control size; remove hard-coded px dimensions
          svgEl.removeAttribute("width");
          svgEl.removeAttribute("height");
        }
      }
      element.classList.remove("placeholder-chart");
      element.setAttribute("data-chart-loaded", "true");
    })
    .catch(function (error) {
      console.warn("[vega] Could not load " + specPath, error);
      element.classList.remove("placeholder-chart");
      element.innerHTML =
        '<div class="chart-error" role="alert">' +
        '<span class="chart-error-icon">⚠</span>' +
        '<span class="chart-error-msg">Chart could not load.<br><code>' +
        specPath +
        "</code></span>" +
        "</div>";
    });
}

window.addEventListener("DOMContentLoaded", function () {
  var charts = [
    ["chart1", "js/chart1.vg.json"],
    ["chart2", "js/chart2.vg.json"],
    ["chart3", "js/chart3.vg.json"],
    ["chart4", "js/chart4.vg.json"],
    ["chart5", "js/chart5.vg.json"],
    ["chart12", "js/chart12.vg.json"],
    ["chart6", "js/chart6.vg.json"],
    ["chart7", "js/chart7.vg.json"],
    ["chart8", "js/chart8.vg.json"],
    ["chart15", "js/chart15.vg.json"],
    ["chart9", "js/chart9.vg.json"],
    ["chart10", "js/chart10.vg.json"],
    ["chart11", "js/chart11.vg.json"]
  ];

  charts.forEach(function (chart) {
    loadChart(chart[0], chart[1]);
  });
});
