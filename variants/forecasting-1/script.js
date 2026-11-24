const years = Array.from({ length: 23 }, (_, index) => 2009 + index)
const colors = ["#1659f3", "#8252bd", "#bd5b37", "#39795a", "#aa456f", "#397687"]
const chartCanvas = document.querySelector("#forecast-chart")
const chartError = document.querySelector("#chart-error")
const emptyPrompt = document.querySelector("#empty-prompt")
const legend = document.querySelector("#series-legend")
const exportButton = document.querySelector("#export-button")
const yourDataButton = document.querySelector("#yourdata-button")
const toast = document.querySelector("#toast")
const forecastShell = document.querySelector("#forecast-shell")
const helpButton = document.querySelector("#help-button")
const helpPanel = document.querySelector("#help-panel")
const chartDisplayButton = document.querySelector("#chart-display-button")
const chartDisplayPanel = document.querySelector("#chart-display-panel")
const chartToolbar = document.querySelector(".chart-toolbar")
const chartScroll = document.querySelector(".chart-scroll")
const filterArea = document.querySelector("#filter-area")
const filterButton = document.querySelector("#filter-button")
const filterPanel = document.querySelector("#filter-panel")
const filterChipList = document.querySelector("#filter-chip-list")
let toastTimer
let forecastChart

const analysisPanel = document.querySelector(".analysis-panel")
new ResizeObserver(([entry]) => {
  analysisPanel.style.setProperty("--selected-filters-height", `${entry.target.getBoundingClientRect().height}px`)
}).observe(document.querySelector(".selected-filters"))

const selectedValues = (name) => [...document.querySelectorAll(`input[name="${name}"]:checked`)].map((input) => input.value)

function sampleValue(seriesIndex, yearIndex, name) {
  const seed = [...name].reduce((total, character) => total + character.charCodeAt(0), 0)
  const step = yearIndex
  const base = [81, 19, 8, 41, 28, 63][seriesIndex % 6]
  const slope = [-0.74, 1.12, 1.65, -0.62, 0.86, -1.08][seriesIndex % 6]
  const noise = Math.sin((step + 1) * 12.9898 + (seriesIndex + 1) * 78.233 + seed) * 43758.5453
  const variation = (noise - Math.floor(noise) - 0.5) * 12
  const forecastLift = yearIndex > 16 ? (yearIndex - 16) * ((seriesIndex % 2) ? 0.34 : -0.2) : 0
  return Math.max(3, Math.min(96, Math.round(base + step * slope + variation + forecastLift)))
}

function selectedSeries() {
  return selectedValues("technology").map((technology, index) => ({
    technology,
    color: colors[index % colors.length],
    values: years.map((_, yearIndex) => sampleValue(index, yearIndex, technology)),
  }))
}

const forecastPeriodPlugin = {
  id: "forecastPeriod",
  beforeDraw(chart) {
    const { ctx, chartArea, scales } = chart
    if (!chartArea) return
    const forecastX = scales.x.getPixelForValue(years.indexOf(2026))
    ctx.save()
    ctx.fillStyle = "rgba(22, 89, 243, 0.035)"
    ctx.fillRect(forecastX, chartArea.top, chartArea.right - forecastX, chartArea.bottom - chartArea.top)
    ctx.restore()
  },
  afterDraw(chart) {
    const { ctx, chartArea, scales } = chart
    if (!chartArea) return
    const forecastX = scales.x.getPixelForValue(years.indexOf(2026))
    ctx.save()
    ctx.strokeStyle = "#a9c6ff"
    ctx.lineWidth = 1
    ctx.setLineDash([4, 4])
    ctx.beginPath()
    ctx.moveTo(forecastX, chartArea.top)
    ctx.lineTo(forecastX, chartArea.bottom)
    ctx.stroke()
    ctx.setLineDash([])
    ctx.fillStyle = "#6a7282"
    ctx.font = "500 14px Roboto, Arial, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Actuals", (chartArea.left + forecastX) / 2, chartArea.top - 14)
    ctx.fillText("Forecasts", (forecastX + chartArea.right) / 2, chartArea.top - 14)
    ctx.restore()
  },
}

const pointValuesPlugin = {
  id: "pointValues",
  afterDatasetsDraw(chart) {
    const mode = selectedValues("value-labels")[0]
    if (mode === "none") return
    const { ctx } = chart
    ctx.save()
    ctx.font = "500 14px Roboto, Arial, sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "bottom"
    ctx.strokeStyle = "#fff"
    ctx.lineWidth = 3
    chart.data.datasets.forEach((dataset, datasetIndex) => {
      if (!chart.isDatasetVisible(datasetIndex)) return
      ctx.fillStyle = dataset.borderColor
      chart.getDatasetMeta(datasetIndex).data.forEach((point, index) => {
        if (mode === "endpoints" && index !== 0 && index !== dataset.data.length - 1) return
        const label = `${dataset.data[index]}%`
        const halfWidth = ctx.measureText(label).width / 2 + 2
        const x = Math.max(halfWidth, Math.min(chart.width - halfWidth, point.x))
        ctx.strokeText(label, x, point.y - 9)
        ctx.fillText(label, x, point.y - 9)
      })
    })
    ctx.restore()
  },
}

function renderChart(series) {
  if (!window.Chart) {
    chartCanvas.hidden = true
    emptyPrompt.hidden = true
    chartError.hidden = false
    return
  }

  chartError.hidden = true
  chartCanvas.hidden = false
  emptyPrompt.hidden = Boolean(series.length)
  chartCanvas.setAttribute("aria-label", series.length
    ? `Percentage penetration for ${selectedValues("market").join(", ")}. ${series.length} series from 2009 to 2031.`
    : "Empty percentage penetration chart. Select a product, a market and at least one technology to display a forecast.")

  const pointStyle = selectedValues("point-shape")[0]
  const datasets = series.map((item) => ({
    label: item.technology,
    data: item.values,
    borderColor: item.color,
    backgroundColor: item.color,
    borderWidth: 2.5,
    borderCapStyle: "round",
    borderJoinStyle: "round",
    tension: 0.28,
    fill: false,
    pointRadius: 5,
    pointStyle,
    pointBackgroundColor: item.color,
    pointBorderColor: "#fff",
    pointBorderWidth: 1.5,
    pointHoverRadius: 7,
    pointHoverBackgroundColor: "#fff",
    pointHoverBorderColor: item.color,
    pointHoverBorderWidth: 2,
    segment: {
      borderDash: (context) => context.p0DataIndex >= years.indexOf(2026) ? [5, 4] : [],
    },
  }))

  if (!forecastChart) {
    Chart.defaults.font.family = "Roboto, Arial, sans-serif"
    Chart.defaults.font.size = 14
    Chart.defaults.color = "#6a7282"
    forecastChart = new Chart(chartCanvas, {
      type: "line",
      data: { labels: years, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? false : { duration: 250 },
        layout: { padding: { top: 28, right: 12, bottom: 4, left: 0 } },
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#15233b",
            titleColor: "#fff",
            bodyColor: "#fff",
            padding: 10,
            cornerRadius: 6,
            displayColors: true,
            boxPadding: 4,
            callbacks: {
              title: (items) => `${items[0].label} · ${Number(items[0].label) < 2026 ? "Actual" : "Forecast"}`,
              label: (context) => `${context.dataset.label}: ${context.formattedValue}%`,
            },
          },
        },
        scales: {
          x: {
            border: { display: false },
            grid: { display: false },
            ticks: {
              autoSkip: true,
              maxRotation: 0,
              minRotation: 0,
              color: "#6a7282",
              font: { size: 14 },
            },
          },
          y: {
            min: 0,
            max: 100,
            border: { display: false },
            ticks: { stepSize: 20, callback: (value) => `${value}%`, padding: 10, color: "#6a7282", font: { size: 14 } },
            grid: { color: "rgba(21, 35, 59, 0.08)", lineWidth: 1, drawTicks: false },
          },
        },
      },
      plugins: [forecastPeriodPlugin, pointValuesPlugin],
    })
    return
  }

  forecastChart.data.labels = years
  forecastChart.data.datasets = datasets
  forecastChart.update("none")
}

function renderLegend(series) {
  legend.innerHTML = series.map((item) => `
    <span class="legend-item">
      <svg class="legend-line" viewBox="0 0 24 8" style="--series-color:${item.color}" aria-hidden="true"><line x1="0" y1="4" x2="24" y2="4" /></svg>
      <span class="legend-name">${item.technology}</span>
    </span>`).join("")
}

function renderFilterChips() {
  const fragment = document.createDocumentFragment()
  const selections = [
    ...selectedValues("product").map((value) => ({ type: "product", label: "Product", icon: "bag", value })),
    ...selectedValues("market").map((value) => ({ type: "market", label: "Market", icon: "globe", value })),
    ...selectedValues("technology").map((value) => ({ type: "technology", label: "Technology", icon: "devices", value })),
  ]

  const icons = {
    bag: '<rect x="4" y="5" width="16" height="16" rx="2" /><path d="m4 5 2-3h12l2 3M8 9a4 4 0 0 0 8 0" />',
    globe: '<circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />',
    devices: '<rect x="3" y="4" width="13" height="10" rx="1" /><path d="M7 20h5m-2.5-6v6m7-12h5v12h-5z" />',
  }
  selections.forEach(({ type, label, icon, value }) => {
    const chip = document.createElement("span")
    chip.className = `filter-chip ${type}`
    const category = document.createElement("span")
    category.className = "filter-category-icon"
    category.setAttribute("role", "img")
    category.setAttribute("aria-label", label)
    category.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[icon]}</svg>`
    const name = document.createElement("span")
    name.textContent = value
    chip.append(category, name)

    const removeButton = document.createElement("button")
    removeButton.type = "button"
    removeButton.setAttribute("aria-label", `Remove ${label.toLowerCase()} filter ${value}`)
    removeButton.dataset.filterName = type
    removeButton.dataset.filterValue = value
    removeButton.innerHTML = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 4 8 8m0-8-8 8" /></svg>'
    chip.append(removeButton)

    fragment.append(chip)
  })

  filterChipList.replaceChildren(fragment)
}

function render() {
  const markets = selectedValues("market")
  const technologies = selectedValues("technology")
  const series = selectedValues("product").length && markets.length && technologies.length ? selectedSeries() : []

  renderFilterChips()
  renderChart(series)
  renderLegend(series)
  exportButton.disabled = !series.length
  yourDataButton.disabled = !series.length
}

function showToast(message) {
  toast.textContent = message
  toast.classList.add("visible")
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 3200)
}

document.querySelectorAll('input[name="product"], input[name="market"], input[name="technology"]').forEach((input) => {
  input.addEventListener("change", render)
})

filterButton.addEventListener("click", () => {
  const expanded = filterButton.getAttribute("aria-expanded") !== "true"
  filterButton.setAttribute("aria-expanded", String(expanded))
  filterPanel.setAttribute("aria-hidden", String(!expanded))
  filterPanel.classList.toggle("open", expanded)
  filterArea.classList.toggle("open", expanded)
  filterButton.classList.toggle("active", expanded)
})
filterChipList.addEventListener("click", (event) => {
  const removeButton = event.target.closest("button[data-filter-name]")
  if (!removeButton) return
  const input = [...document.querySelectorAll(`input[name="${removeButton.dataset.filterName}"]`)]
    .find((option) => option.value === removeButton.dataset.filterValue)
  if (input) {
    input.checked = false
    render()
    filterButton.focus()
  }
})

exportButton.addEventListener("click", () => {
  const markets = selectedValues("market")
  const series = selectedSeries()
  const rows = [
    ["Data status", "Illustrative prototype values", "", ""],
    ["Markets", markets.join("; "), "", ""],
    ["Technology", "Year", "Period", "Penetration (%)"],
    ...series.flatMap((item) => item.values.map((value, index) => [
      item.technology,
      years[index],
      years[index] < 2026 ? "Actual" : "Forecast",
      value,
    ])),
  ]
  const csv = rows.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\r\n")
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }))
  const link = document.createElement("a")
  link.href = url
  link.download = "forecasting-preview.csv"
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
})

yourDataButton.addEventListener("click", () => {
  showToast("Prototype only: adding forecasts to YourData is not connected.")
})

helpButton.addEventListener("click", () => {
  const expanded = helpButton.getAttribute("aria-expanded") === "true"
  helpButton.setAttribute("aria-expanded", String(!expanded))
  helpPanel.hidden = expanded
})

function positionChartDisplay() {
  if (!chartDisplayPanel.matches(":popover-open")) return
  const anchor = chartDisplayButton.getBoundingClientRect()
  const panel = chartDisplayPanel.getBoundingClientRect()
  const margin = parseFloat(getComputedStyle(analysisPanel).paddingRight)
  const headerBottom = document.querySelector(".topbar").getBoundingClientRect().bottom
  const footerTop = document.querySelector(".analysis-footer").getBoundingClientRect().top
  chartDisplayPanel.style.left = `${Math.max(margin, anchor.right - panel.width)}px`
  chartDisplayPanel.style.top = `${Math.max(headerBottom + 8, Math.min(anchor.bottom + 8, footerTop - panel.height - 8))}px`
}

chartDisplayPanel.addEventListener("toggle", (event) => {
  chartDisplayButton.setAttribute("aria-expanded", String(event.newState === "open"))
  positionChartDisplay()
})
new ResizeObserver(positionChartDisplay).observe(chartDisplayPanel)
window.addEventListener("resize", positionChartDisplay)
chartDisplayPanel.addEventListener("change", (event) => {
  if (event.target.name === "legend-placement") {
    if (event.target.value === "bottom") chartScroll.after(legend)
    else chartToolbar.prepend(legend)
  }
  if (forecastChart) {
    const pointStyle = selectedValues("point-shape")[0]
    forecastChart.data.datasets.forEach((dataset) => { dataset.pointStyle = pointStyle })
    forecastChart.update()
  }
  positionChartDisplay()
})

document.addEventListener("pointerdown", (event) => {
  if (!event.target.closest(".help-wrap") && !helpPanel.hidden) {
    helpPanel.hidden = true
    helpButton.setAttribute("aria-expanded", "false")
  }
})

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && chartDisplayPanel.matches(":popover-open")) {
    event.preventDefault()
    chartDisplayPanel.hidePopover()
    chartDisplayButton.focus()
    return
  }
  if (event.key === "Escape" && helpPanel.hidden && filterButton.getAttribute("aria-expanded") === "true") {
    filterButton.setAttribute("aria-expanded", "false")
    filterPanel.setAttribute("aria-hidden", "true")
    filterPanel.classList.remove("open")
    filterArea.classList.remove("open")
    filterButton.classList.remove("active")
    filterButton.focus()
  }
  if (event.key === "Escape" && !helpPanel.hidden) {
    helpPanel.hidden = true
    helpButton.setAttribute("aria-expanded", "false")
    helpButton.focus()
  }
})

function toggleNav() {
  const expanded = forecastShell.classList.toggle("nav-open")
  document.querySelector("#collapse-button").setAttribute("aria-expanded", String(expanded))
  document.querySelector("#collapse-button").setAttribute("aria-label", `${expanded ? "Collapse" : "Expand"} navigation`)
  document.querySelector("#mobile-menu").setAttribute("aria-expanded", String(expanded))
  document.querySelector("#mobile-menu").setAttribute("aria-label", `${expanded ? "Close" : "Open"} navigation`)
}
document.querySelector("#collapse-button").addEventListener("click", toggleNav)
document.querySelector("#mobile-menu").addEventListener("click", toggleNav)

function setProfileMenu(open) {
  document.querySelector("#profile-card").classList.toggle("open", open)
  document.querySelector("#profile-button").setAttribute("aria-expanded", String(open))
}
document.querySelector("#profile-button").addEventListener("click", () => {
  setProfileMenu(!document.querySelector("#profile-card").classList.contains("open"))
})
document.querySelector("#logout-button").addEventListener("click", () => setProfileMenu(false))
document.addEventListener("click", (event) => {
  if (!event.target.closest("#profile-card")) setProfileMenu(false)
})

document.querySelector("#grid-toggle").addEventListener("click", (event) => {
  const visible = event.currentTarget.getAttribute("aria-pressed") !== "true"
  event.currentTarget.setAttribute("aria-pressed", String(visible))
  event.currentTarget.classList.toggle("active", visible)
  document.querySelector("#grid-overlay").setAttribute("aria-hidden", String(!visible))
  document.querySelector("#grid-overlay").classList.toggle("visible", visible)
})

render()
