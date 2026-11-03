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
let selectedId = null
let activeTab = "overview"
const readingList = new Set()
const archivedList = new Set()
let libraryTab = "active"
const searchSuggestions = [...new Set(reports.flatMap((report) => [report.title, ...report.tags]))]

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

const tocItems = ["Executive Summary", "Introduction", "Key Findings", "Methodology", "Detailed Analysis", "Demographic Breakdown", "Conclusions", "Appendix"]
const pillClassFor = (product) => product === "Junior" ? "pill junior" : product === "Newcomers" ? "pill newcomers" : "pill"

function reportListItem(report, selected) {
  return `<button type="button" class="report-row ${selected ? "selected" : ""}" draggable="true" data-drag-id="${report.id}" data-action="select" data-id="${report.id}" aria-pressed="${selected}">
    <span class="report-dot"></span><span class="report-thumb"><img src="${asset(report.image)}" alt=""></span>
    <span class="report-row-copy"><span>${report.date}</span><strong>${report.title}</strong></span></button>`
}

// Placeholder insights, picked per report id, until real executive summary content is available.
function insightFor(report) {
  const topic = (report.tags[0] || report.product).toLowerCase()
  const insights = [
    `Audiences who follow ${topic} are among the earliest to adopt new platforms and formats.`,
    `Interest in ${topic} is strongest among younger audiences, with usage growing year over year.`,
    `Most people discover ${topic} content through social media and word of mouth rather than search.`,
    `Regional differences in ${topic} are small, but language preference shapes how content is consumed.`,
    `Frequent users of ${topic} are significantly more likely to subscribe to paid services.`,
  ]
  return insights[report.id % insights.length]
}

// Real executive summary insights by report id; other reports fall back to placeholders below.
const execInsights = {
  1: {
    stats: [
      { value: 56, text: "of online Canadians say they go online to follow breaking news stories." },
      { value: 71, text: "of Canadians say they read online news." },
    ],
    insight: "69% of those who use Facebook or Instagram for news say they are aware that Meta blocks news in Canada. This includes people who say they get news on these platforms, either based on a looser definition of news, or considering news that doesn't appear to be covered in the ban.",
  },
}
// Slim donut per the Figma design: 9.1 ring on a 100 viewBox, arcs with small rounded corners and a gap between them.
function donutSvg(value) {
  const corner = 2
  const outer = 50 - corner
  const inner = 50 - 9.1 + corner
  const gapAngle = 0.088 // about 4px at the ring's mid radius
  const inset = corner / 45.45
  const point = (radius, angle) => `${(50 + radius * Math.cos(angle)).toFixed(2)} ${(50 + radius * Math.sin(angle)).toFixed(2)}`
  const sector = (from, to, className) => {
    const start = from + inset
    const end = to - inset
    if (end <= start) return ""
    const large = end - start > Math.PI ? 1 : 0
    return `<path class="${className}" d="M${point(outer, start)} A${outer} ${outer} 0 ${large} 1 ${point(outer, end)} L${point(inner, end)} A${inner} ${inner} 0 ${large} 0 ${point(inner, start)}Z"/>`
  }
  const split = (value / 100) * 2 * Math.PI
  return `<svg viewBox="0 0 100 100" aria-hidden="true">${sector(split + gapAngle / 2, 2 * Math.PI - gapAngle / 2, "donut-track")}${sector(gapAngle / 2, split - gapAngle / 2, "donut-value")}</svg>`
}

function detailBody(report) {
  if (activeTab === "toc") return `<ol class="detail-toc">${tocItems.map((title) => `<li>${title}</li>`).join("")}</ol>`
  if (activeTab === "exec") {
    // Placeholder figures derived from the report id until real summary metrics are available.
    const real = execInsights[report.id]
    const stats = real?.stats ?? [
      { value: 40 + (report.id * 7) % 45, text: "of the audience engaged with this topic in the past month." },
      { value: 25 + (report.id * 11) % 50, text: "report increased usage compared with the previous year." },
    ]
    return `<div class="donut-row">${stats.map((stat, index) => `<div class="donut-stat"><h3 class="insight-label">Insight ${index + 1}</h3><div class="donut" role="img" aria-label="${stat.value}%">${donutSvg(stat.value)}<span>${stat.value}%</span></div><p>${stat.text}</p></div>`).join("")}</div>
    <div class="insight-block"><h3 class="insight-label">Insight 3</h3><p class="detail-description">${real?.insight ?? insightFor(report)}</p></div>`
  }
  return `<p class="detail-description">${report.description}</p>
    <div class="detail-tags">${report.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>`
}

function reportDetails(report) {
  return `<div class="detail-content">
    <div class="panel-title"><h2>Report Details</h2></div>
    <div class="detail-tabs" role="tablist">${[["overview", "Overview"], ["exec", "Exec Summary"], ["toc", "Table of Contents"]].map(([key, label]) => `<button type="button" role="tab" class="${activeTab === key ? "active" : ""}" aria-selected="${activeTab === key}" data-action="tab" data-tab="${key}" data-id="${report.id}">${label}</button>`).join("")}</div>
    <div class="detail-meta"><span class="${pillClassFor(report.product)}">${report.product}</span><span class="detail-date">${report.date}</span></div>
    <h2 class="detail-title">${report.title}</h2>
    ${detailBody(report)}
  </div>
  <div class="detail-actions">
    <button type="button" class="detail-exec ${readingList.has(report.id) ? "saved" : ""}" data-action="reading-list" data-id="${report.id}" aria-pressed="${readingList.has(report.id)}">${readingList.has(report.id) ? "In library" : "Add to library"} <i data-lucide="${readingList.has(report.id) ? "bookmark-check" : "bookmark-plus"}" aria-hidden="true"></i></button>
    <button type="button" class="detail-full" data-action="download" data-id="${report.id}">Download Report <img src="${asset("5a09a.svg")}" alt=""></button>
  </div>`
}

function renderReadingList() {
  const inLibrary = reports.filter((report) => readingList.has(report.id))
  const lists = { active: inLibrary.filter((report) => !archivedList.has(report.id)), archived: inLibrary.filter((report) => archivedList.has(report.id)) }
  const items = lists[libraryTab]
  const tabs = [["active", "In use"], ["archived", "Archived"]].map(([key, label]) => `<button type="button" role="tab" class="${libraryTab === key ? "active" : ""}" aria-selected="${libraryTab === key}" data-action="library-tab" data-tab="${key}">${label} (${lists[key].length})</button>`).join("")
  const download = items.length ? `<button type="button" class="reading-download" data-action="download-all">Download all <img src="${asset("5a09a.svg")}" alt=""></button>` : ""
  const [toggleAction, toggleLabel] = libraryTab === "active" ? ["archive-saved", "Archive"] : ["restore-saved", "Restore"]
  const empty = libraryTab === "active" ? "Reports you add will appear here." : "Archived reports will appear here."
  const header = `<div class="panel-title reading-header"><h2>Your Library</h2>${download}</div>`
  $("#reading-panel").innerHTML = header + `<div class="detail-tabs reading-tabs" role="tablist">${tabs}</div>` + (items.length
    ? `<ul class="reading-items">${items.map((report) => `<li><button type="button" class="reading-item" draggable="true" data-drag-id="${report.id}" data-action="open-saved" data-id="${report.id}"><strong>${report.title}</strong><span>${report.date}</span></button><button type="button" class="reading-action" data-action="${toggleAction}" data-id="${report.id}">${toggleLabel}</button><button type="button" class="reading-remove" data-action="remove-saved" data-id="${report.id}" aria-label="Remove from library" title="Remove">&times;</button></li>`).join("")}</ul>`
    : `<p class="reading-empty">${empty}</p>`)
}

function renderReports() {
  const visible = reports
    .filter((report) => [report.title, ...report.tags].some((text) => text.toLowerCase().includes(query.toLowerCase())) && (!filters.Product.length || filters.Product.includes(report.product)))
    .sort((first, second) => Date.parse(second.date) - Date.parse(first.date))
  if (!visible.length) {
    $("#report-browser").innerHTML = '<div class="empty-state"><h2>No reports found</h2><p>Try another search or clear your filters.</p></div>'
    return
  }
  const selected = visible.find((report) => report.id === selectedId) || visible[0]
  selectedId = selected.id
  const list = $("#report-browser .report-list")
  const scrollTop = list ? list.scrollTop : 0
  $("#report-browser").innerHTML = `<div class="report-list">${visible.map((report) => reportListItem(report, report.id === selected.id)).join("")}</div><div class="report-details">${reportDetails(selected)}</div>`
  $("#report-browser .report-list").scrollTop = scrollTop
  refreshIcons()
  if (!$("#chat-panel").hidden) renderChat()
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
  $("#drawer-title").textContent = report.title
  $("#drawer-mode").textContent = mode === "full" ? "Full report" : "Executive summary"
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

function downloadReport(report) {
  const link = document.createElement("a")
  link.href = asset("93537.png")
  link.download = `${report.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-report.png`
  document.body.appendChild(link)
  link.click()
  link.remove()
}

$("#report-browser").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]")
  if (!button) return
  const report = reports.find((item) => item.id === Number(button.dataset.id))
  if (!report) return
  if (button.dataset.action === "select") { selectedId = report.id; return renderReports() }
  if (button.dataset.action === "tab") { activeTab = button.dataset.tab; return renderReports() }
  if (button.dataset.action === "reading-list") {
    if (!readingList.delete(report.id)) readingList.add(report.id)
    else archivedList.delete(report.id)
    renderReadingList()
    return renderReports()
  }
  if (button.dataset.action === "download") return downloadReport(report)
  const mode = button.dataset.mode || "executive"
  openPreview(report, mode)
})

$("#reading-panel").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]")
  if (!button) return
  const action = button.dataset.action
  const id = Number(button.dataset.id)
  if (action === "library-tab") libraryTab = button.dataset.tab
  else if (action === "download-all") return reports.filter((item) => readingList.has(item.id) && archivedList.has(item.id) === (libraryTab === "archived")).forEach(downloadReport)
  else if (action === "archive-saved") archivedList.add(id)
  else if (action === "restore-saved") archivedList.delete(id)
  else if (action === "remove-saved") { readingList.delete(id); archivedList.delete(id) }
  else selectedId = id
  renderReadingList()
  renderReports()
})

$("#search-input").addEventListener("input", (event) => { query = event.target.value; renderReports(); renderSearchSuggestions() })
$("#search-input").addEventListener("focus", renderSearchSuggestions)
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
document.addEventListener("keydown", (event) => { if (event.key === "Escape") { closePreview(); setChatOpen(false) } })

const chatPrompts = ["Summarize this report", "Key topics", "When was it published?"]
const chatMessages = []
const escapeHtml = (text) => text.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char])
const currentReport = () => reports.find((report) => report.id === selectedId) || reports[0]

const chatRefs = new Set()
const chatReports = () => chatRefs.size ? reports.filter((report) => chatRefs.has(report.id)) : [currentReport()]

// Placeholder answers built from report data until a real assistant is connected.
function chatReply(text) {
  const refs = chatReports()
  const lower = text.toLowerCase()
  if (refs.length > 1 && /compare|common|differ|both|shared/.test(lower)) {
    const shared = refs[0].tags.filter((tag) => refs.every((report) => report.tags.includes(tag)))
    return shared.length ? `The referenced reports share these topics: ${shared.join(", ")}.` : "The referenced reports have no topics in common."
  }
  const answer = (report) => {
    if (/when|date|publish|releas/.test(lower)) return `Published on ${report.date}.`
    if (/topic|tag|theme|cover/.test(lower)) return `Key topics: ${report.tags.join(", ")}.`
    if (/summar|about|what|overview|insight/.test(lower)) return report.description
    return null
  }
  const answers = refs.map((report) => [report, answer(report)])
  if (answers.every(([, text]) => !text)) return `I can answer questions about ${refs.map((report) => `"${report.title}"`).join(" and ")}, such as its summary, key topics and publish date. Try one of the suggestions below.`
  return answers.map(([report, text]) => refs.length > 1 ? `${report.title}: ${text}` : text).join("\n")
}

function renderChat() {
  const refs = chatReports()
  $("#chat-context").textContent = chatRefs.size ? `${refs.length} report${refs.length > 1 ? "s" : ""} referenced` : currentReport().title
  const chips = chatRefs.size ? refs.map((report) => `<span class="chat-ref"><span>${escapeHtml(report.title)}</span><button type="button" data-ref-remove="${report.id}" aria-label="Remove ${escapeHtml(report.title)} from chat">&times;</button></span>`).join("") : '<span class="chat-ref-hint">Drag a report here to ask about it</span>'
  const addCurrent = chatRefs.has(currentReport().id) ? "" : '<button type="button" class="chat-ref-add" data-ref-add>+ Add current</button>'
  $("#chat-refs").innerHTML = chips + addCurrent
  $("#chat-messages").innerHTML = chatMessages.length
    ? chatMessages.map((message) => `<div class="chat-message ${message.role}">${escapeHtml(message.text)}</div>`).join("")
    : '<div class="chat-message bot">Hi, I can help you find insights in your reports. What would you like to know?</div>'
  $("#chat-messages").scrollTop = $("#chat-messages").scrollHeight
  $("#chat-suggestions").innerHTML = chatPrompts.map((prompt) => `<button type="button" data-prompt="${prompt}">${prompt}</button>`).join("")
}

const reportDragType = "application/x-mtm-report"

function addChatRef(id) {
  if (!reports.some((report) => report.id === id)) return
  chatRefs.add(id)
  setChatOpen(true)
}

document.addEventListener("dragstart", (event) => {
  const source = event.target.closest?.("[data-drag-id]")
  if (!source) return
  event.dataTransfer.setData(reportDragType, source.dataset.dragId)
  event.dataTransfer.effectAllowed = "copy"
  $("#ask-mtm").classList.add("drop-ready")
})
document.addEventListener("dragend", () => $("#ask-mtm").classList.remove("drop-ready"))
for (const target of [$("#chat-panel"), $("#ask-mtm")]) {
  target.addEventListener("dragover", (event) => {
    if (!event.dataTransfer.types.includes(reportDragType)) return
    event.preventDefault()
    target.classList.add("drag-over")
  })
  target.addEventListener("dragleave", (event) => { if (!target.contains(event.relatedTarget)) target.classList.remove("drag-over") })
  target.addEventListener("drop", (event) => {
    event.preventDefault()
    target.classList.remove("drag-over")
    $("#ask-mtm").classList.remove("drop-ready")
    addChatRef(Number(event.dataTransfer.getData(reportDragType)))
  })
}
$("#chat-refs").addEventListener("click", (event) => {
  const remove = event.target.closest("button[data-ref-remove]")
  if (remove) chatRefs.delete(Number(remove.dataset.refRemove))
  else if (event.target.closest("button[data-ref-add]")) chatRefs.add(currentReport().id)
  else return
  renderChat()
})

function askMtm(text) {
  const question = text.trim()
  if (!question) return
  chatMessages.push({ role: "user", text: question }, { role: "bot", text: chatReply(question) })
  renderChat()
}

function setChatOpen(open) {
  $("#chat-panel").hidden = !open
  $("#ask-mtm").setAttribute("aria-expanded", String(open))
  $("#ask-mtm").classList.toggle("active", open)
  if (open) { renderChat(); $("#chat-input").focus() }
}

$("#ask-mtm").addEventListener("click", () => setChatOpen($("#chat-panel").hidden))
$("#chat-close").addEventListener("click", () => setChatOpen(false))
$("#chat-suggestions").addEventListener("click", (event) => {
  const prompt = event.target.closest("button[data-prompt]")
  if (prompt) askMtm(prompt.dataset.prompt)
})
$("#chat-form").addEventListener("submit", (event) => {
  event.preventDefault()
  askMtm($("#chat-input").value)
  $("#chat-input").value = ""
})

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
renderReadingList()
setPage(initialPage, false)