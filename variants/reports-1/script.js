const reports = [
  { id: 1, title: "Canadians and the News", product: "MTM 18+", date: "Oct 29, 2026", image: "Report-images/mtm-18 01.png", description: "Canadians are very engaged with the news, via a variety of media options. But what people consider to be news can be varied as the options they have to find them. This report looks at platforms used, types of news consumed, and where people go for breaking news.", tags: ["Internet", "News"], type: "Press release", link: "https://mtm-otm.ca/api/insights/files/5422" },
  { id: 2, title: "Online Audio Overview (2026)", product: "MTM 18+", date: "Sep 3, 2026", image: "Report-images/mtm-18 02.png", description: "This report examines the broader state of online audio usage in Canada, before taking a deeper look into audio streaming services, podcasts, streaming AM/FM radio and audiobooks.", tags: ["Online audio content", "Subscriptions", "Streaming", "Podcast"], type: "Press release", link: "https://mtm-otm.ca/api/insights/files/5362" },
  { id: 3, title: "Betting, gambling, and lottery among Canadians", product: "MTM 18+", date: "Aug 25, 2026", image: "Report-images/mtm-18 03.png", description: "With the introduction of legalized online sports betting in 2021 along with the recent introduction of prediction markets, Canadians have more gambling options than ever before. This report explores betting, gambling and lotto across different demographics.", tags: ["Public perception", "Online casinos", "Sports Betting", "Advertising"], type: "Press release", link: "https://mtm-otm.ca/api/insights/files/5352" },
  { id: 4, title: "Spring 2026 Adoption Report", product: "MTM 18+", date: "Jul 21, 2026", image: "Report-images/mtm-18 04.png", description: "Our flagship report covering the very latest data on key media and technology adoption among adult Canadians.", tags: ["Sports Betting", "Advertising", "Social", "Streaming"], type: "Press release", link: "https://mtm-otm.ca/api/insights/files/5320" },
  { id: 5, title: "MTM Newcomers Top Trends Report 2026", product: "Newcomers", date: "Oct 14, 2026", image: "Report-images/mtm-nc 01.png", description: "The Newcomers - Top Trends report provides clients with a first look at the findings from this year's study with more in-depth reports to come throughout the year.", tags: ["Online video content", "Social Media", "Cellphone", "Shopping", "AI Tools"], type: "Free report", link: "https://mtm-otm.ca/en/insights/report-download-2/?reportId=1417" },
  { id: 6, title: "Newcomers Overview Report 2026", product: "Newcomers", date: "Oct 14, 2026", image: "Report-images/mtm-nc 02.png", description: "With the launch of MTM Newcomers 2026, this brand-new report provides a high-level look at usage and adoption of key technologies and forms of media, among both the newcomer and Canadian-born population.", tags: ["Demographics", "Internet", "Audio", "Video"], type: "Press release", link: "https://mtm-otm.ca/api/insights/files/5412" },
  { id: 7, title: "Newcomers TV/Video (2026)", product: "Newcomers", date: "Aug 6, 2026", image: "Report-images/mtm-nc 03.png", description: "This report examines recent immigrants' viewing habits across platforms. It explores total viewing time, language preferences, traditional television, subscription streaming, ad-supported video and free ad-supported streaming.", tags: ["FAST Channel", "Linear TV", "AVOD", "SVOD"], type: "Press release", link: "https://mtm-otm.ca/api/insights/files/5342" },
  { id: 8, title: "Newcomers Who Send Money Abroad", product: "Newcomers", date: "Jul 2, 2026", image: "Report-images/mtm-nc 04.png", description: "For many newcomers, a paycheck is about more than just paying local bills; it is a way to look after the people they love back home. It is a quiet but powerful way of staying connected to family and community across the world.", tags: ["Cryptocurrency", "Digitalization", "Remittance", "Fintech"], type: "Free infographic", link: "https://mtm-otm.ca/en/insights/report-download-2/?reportId=1404" },
  { id: 9, title: "Teens & AI", product: "Junior", date: "Sep 28, 2026", image: "Report-images/mtm-jr 01.png", description: "Every generation grows up with a new technology that shifts how they learn, create, and search for information - from home internet and smartphones to social media and now, artificial intelligence.", tags: ["Artificial Intelligence", "Search habits", "AI Tools"], type: "Press release", link: "https://mtm-otm.ca/api/insights/files/5392" },
  { id: 10, title: "Kids and Traditional TV (2026)", product: "Junior", date: "Sep 11, 2026", image: "Report-images/mtm-jr 02.png", description: "This report presents and analyzes viewing habits for this medium, major trends, and examines viewership of key channels and programs among youth in Canada.", tags: ["Language Consumption", "Linear TV", "Discovery methods", "SVOD"], type: "Press release", link: "https://mtm-otm.ca/api/insights/files/5372" },
  { id: 11, title: "FAST Channels 2026 - MTM JR", product: "Junior", date: "Jun 23, 2026", image: "Report-images/mtm-jr 03.png", description: "Free Ad-supported Streaming TV (FAST) channels are emerging as a growing player in the online video landscape. Offering free, scheduled programming supported by ads, these services are reshaping how young audiences discover and consume content.", tags: ["Online video content", "FAST Channel", "SVOD"], type: "Press release", link: "https://mtm-otm.ca/api/insights/files/5272" },
  { id: 12, title: "MTM JR: The Futures Report 2026", product: "Junior", date: "Apr 28, 2026", image: "Report-images/mtm-jr 04.png", description: "Find actionable insights on the newest trends for Canadian kids with the Futures Report.", tags: ["Discoverability", "Podcast", "AI Tools", "Gaming"], type: "Press release", link: "https://mtm-otm.ca/api/insights/files/5228" },
]

const filterGroups = {
  Product: ["MTM 18+", "Junior", "Newcomers"],
  Genre: ["TV/Video", "Radio/Audio", "Internet", "Mobile", "Demographic", "Market"],
  Type: ["Report", "Infographic", "Adoption", "Sneak Peek"],
}
const filters = { Product: [], Genre: ["TV/Video", "Radio/Audio", "Mobile"], Type: ["Report"] }
let query = ""
let activePreview = null
const searchSuggestions = [...new Set(reports.map((report) => report.title))]

const asset = (name) => `/assets/${name}`
const $ = (selector) => document.querySelector(selector)
const refreshIcons = () => window.lucide?.createIcons()
const urlParams = new URLSearchParams(window.location.search)
const reportVariant = ["1", "2", "3"].includes(urlParams.get("variant")) ? urlParams.get("variant") : "1"
const initialPage = urlParams.get("page") === "dashboard" ? "dashboard" : "reports"

$("#app-shell").dataset.variant = reportVariant

function setPage(page, updateUrl = true) {
  const isReports = page === "reports"
  $("#dashboard-page").hidden = isReports
  $("#reports-page").hidden = !isReports
  $("#page-title").textContent = isReports ? "Reports" : "Dashboard"
  document.querySelectorAll("[data-page]").forEach((item) => item.classList.toggle("active", item.dataset.page === page))
  if (updateUrl) window.history.replaceState({}, "", `?page=${page}&variant=${reportVariant}`)
  if (!isReports) closePreview()
}

function renderFilters() {
  document.querySelectorAll("[data-filter-group]").forEach((container) => {
    const group = container.dataset.filterGroup
    container.innerHTML = filterGroups[group].map((option) => {
      const checked = filters[group].includes(option)
      return `<label><input type="checkbox" data-group="${group}" data-option="${option}" ${checked ? "checked" : ""}><span class="design-check ${checked ? "checked" : ""}">${checked ? '<img src="/assets/57301.svg" alt="">' : ""}</span><span>${option}</span></label>`
    }).join("")
  })
}

function reportCard(report) {
  const activeMode = activePreview?.report.id === report.id ? activePreview.mode : null
  const pillClass = report.product === "Junior" ? "pill junior" : report.product === "Newcomers" ? "pill newcomers" : "pill"
  const buttonClass = (mode) => mode === activeMode ? "primary" : ""
  return `<article class="report-card ${activeMode ? "selected" : ""}">
    <button class="report-image" data-action="preview" data-id="${report.id}" aria-label="Open ${report.title}"><img src="${asset(report.image)}" alt=""></button>
    <div class="card-copy"><div class="card-meta"><span class="${pillClass}">${report.product}</span><span class="date">${report.date}</span></div>
      <h2>${report.title}</h2><div class="report-tags">${report.tags.map((tag) => `<span>${tag}</span>`).join("")}</div><div class="card-actions">
        <div class="report-action-group">
          <button class="preview-action" data-action="preview" data-mode="full" data-id="${report.id}">Report <img src="${asset("eye.svg")}" alt=""></button>
          <button class="download-action ${buttonClass("full")}" data-action="download" data-mode="full" data-id="${report.id}" aria-label="Download report" title="Download report"><img src="${asset("5a09a.svg")}" alt=""></button>
        </div>
        <div class="report-action-group">
          <button class="preview-action" data-action="preview" data-mode="executive" data-id="${report.id}">Summary <img src="${asset("eye.svg")}" alt=""></button>
          <button class="download-action ${buttonClass("executive")}" data-action="download" data-mode="executive" data-id="${report.id}" aria-label="Download summary" title="Download summary"><img src="${asset("5a09a.svg")}" alt=""></button>
        </div>
      </div></div></article>`
}

function renderReports() {
  const visible = reports
    .filter((report) => report.title.toLowerCase().includes(query.toLowerCase()) && (!filters.Product.length || filters.Product.includes(report.product)))
    .sort((first, second) => Date.parse(second.date) - Date.parse(first.date))
  $("#report-grid").innerHTML = visible.length ? visible.map(reportCard).join("") : '<div class="empty-state"><h2>No reports found</h2><p>Try another search or clear your filters.</p></div>'
}

function renderSearchSuggestions() {
  const searchSuggestionsElement = $("#search-suggestions")
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) {
    searchSuggestionsElement.innerHTML = ""
    searchSuggestionsElement.classList.remove("open")
    $("#search-wrap").classList.remove("suggestions-open")
    return
  }
  const matches = searchSuggestions.filter((title) => !normalizedQuery || title.toLowerCase().includes(normalizedQuery)).slice(0, 5)
  searchSuggestionsElement.innerHTML = matches.map((title) => `<button type="button" data-suggestion="${title}">${title}</button>`).join("")
  const open = document.activeElement === $("#search-input") && matches.length > 0
  searchSuggestionsElement.classList.toggle("open", open)
  $("#search-wrap").classList.toggle("suggestions-open", open)
}

function renderSelectedFilters() {
  const selected = Object.entries(filters).flatMap(([group, options]) => options.map((option) => ({ group, option })))
  $("#filter-chip-list").innerHTML = selected.map(({ group, option }) => {
    const productKey = option === "MTM 18+" ? "mtm" : option.toLowerCase()
    const chipClasses = group === "Product" ? `product product-${productKey}` : group.toLowerCase()
    const iconName = group === "Product" ? "shopping-bag" : group === "Genre" ? "tags" : "file-text"
    if (group === "Product") return `<span class="filter-chip ${chipClasses}"><i class="filter-category-icon product" data-lucide="${iconName}" aria-label="Product"></i><span>${option}</span><button type="button" data-remove-filter="${group}" data-option="${option}" aria-label="Remove ${option} filter">×</button></span>`
    return `<span class="filter-chip ${chipClasses}"><i class="filter-category-icon ${group.toLowerCase()}" data-lucide="${iconName}" aria-label="${group}"></i><span>${option}</span><button type="button" data-remove-filter="${group}" data-option="${option}" aria-label="Remove ${option} filter">×</button></span>`
  }).join("")
  refreshIcons()
}

function openPreview(report, mode) {
  activePreview = { report, mode }
  $("#drawer-mode").textContent = mode === "full" ? "Full report" : "Executive summary"
  document.querySelectorAll(".drawer-actions .download-action").forEach((button) => {
    button.classList.toggle("primary", button.dataset.mode === mode)
  })
  $("#preview-drawer").classList.add("open")
  $("#drawer-scrim").classList.add("open")
  $("#preview-drawer").setAttribute("aria-hidden", "false")
  $("#app-shell").classList.add("drawer-open")
  renderReports()
}

function closePreview() {
  activePreview = null
  $("#preview-drawer").classList.remove("open")
  $("#drawer-scrim").classList.remove("open")
  $("#preview-drawer").setAttribute("aria-hidden", "true")
  $("#app-shell").classList.remove("drawer-open")
  renderReports()
}

function downloadReport(report, mode) {
  const link = document.createElement("a")
  link.href = asset("93537.png")
  const suffix = mode === "full" ? "report" : "summary"
  link.download = `${report.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${suffix}.png`
  document.body.appendChild(link)
  link.click()
  link.remove()
}

$("#report-grid").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]")
  if (!button) return
  const report = reports.find((item) => item.id === Number(button.dataset.id))
  if (!report) return
  const mode = button.dataset.mode || "executive"
  if (button.dataset.action === "download") return downloadReport(report, mode)
  openPreview(report, mode)
})

$("#search-input").addEventListener("input", (event) => { query = event.target.value; renderReports(); renderSearchSuggestions() })
$("#search-input").addEventListener("focus", renderSearchSuggestions)
document.querySelector(".view-toggle").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-view]")
  if (!button) return
  const view = button.dataset.view
  $("#reports-page").classList.toggle("list-view", view === "list")
  $("#reports-page").classList.toggle("grid-view", view === "grid")
  $("#app-shell").classList.toggle("list-view-open", view === "list")
  document.querySelectorAll(".view-toggle-button").forEach((item) => {
    const active = item === button
    item.classList.toggle("active", active)
    item.setAttribute("aria-pressed", String(active))
  })
})
$("#search-suggestions").addEventListener("click", (event) => {
  const suggestion = event.target.closest("button[data-suggestion]")
  if (!suggestion) return
  query = suggestion.dataset.suggestion
  $("#search-input").value = query
  renderReports()
  $("#search-suggestions").classList.remove("open")
  $("#search-wrap").classList.remove("suggestions-open")
})
$("#filter-button").addEventListener("click", () => { const open = $("#filter-panel").classList.toggle("open"); $("#filter-area").classList.toggle("open", open); $("#filter-button").classList.toggle("active", open); $("#filter-button").setAttribute("aria-expanded", String(open)) })
$("#filter-panel").addEventListener("change", (event) => {
  if (!event.target.matches("input[data-group]")) return
  const { group, option } = event.target.dataset
  filters[group] = event.target.checked ? [...filters[group], option] : filters[group].filter((item) => item !== option)
  renderFilters(); renderSelectedFilters(); renderReports()
})
$("#selected-filters").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-remove-filter]")
  if (!button) return
  const { removeFilter: group, option } = button.dataset
  filters[group] = filters[group].filter((item) => item !== option)
  renderFilters(); renderSelectedFilters(); renderReports()
})
document.addEventListener("pointerdown", (event) => { if (!$("#search-wrap").contains(event.target) && !$("#filter-area").contains(event.target)) { $("#filter-panel").classList.remove("open"); $("#filter-area").classList.remove("open"); $("#filter-button").classList.remove("active"); $("#search-suggestions").classList.remove("open"); $("#search-wrap").classList.remove("suggestions-open") } })
$("#drawer-scrim").addEventListener("click", closePreview)
$("#close-button").addEventListener("click", closePreview)
$(".drawer-actions").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]")
  if (!button || !activePreview) return
  if (button.dataset.action === "download") return downloadReport(activePreview.report, button.dataset.mode)
  openPreview(activePreview.report, button.dataset.mode)
})
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closePreview() })

// Two-step log out: the profile tab expands to reveal the Log out link; there is no real sign-out in this prototype.
function setProfileMenu(open) {
  $("#profile-card").classList.toggle("open", open)
  $("#profile-button").setAttribute("aria-expanded", String(open))
}
$("#profile-button").addEventListener("click", () => setProfileMenu(!$("#profile-card").classList.contains("open")))
$("#logout-button").addEventListener("click", () => setProfileMenu(false))
document.addEventListener("click", (event) => { if (!event.target.closest("#profile-card")) setProfileMenu(false) })

function toggleNav() {
  const open = $("#app-shell").classList.toggle("nav-open")
  $("#collapse-button").setAttribute("aria-expanded", String(open))
  $("#collapse-button").setAttribute("aria-label", open ? "Collapse navigation" : "Expand navigation")
  $("#mobile-menu").setAttribute("aria-expanded", String(open))
}
$("#collapse-button").addEventListener("click", toggleNav)
$("#mobile-menu").addEventListener("click", toggleNav)
document.querySelectorAll("[data-page]").forEach((item) => item.addEventListener("click", () => setPage(item.dataset.page)))

renderFilters()
renderSelectedFilters()
renderReports()
setPage(initialPage, false)