import { useEffect, useMemo, useRef, useState } from "react"

const asset = (name: string) => `/assets/${name}`

type Report = {
  id: number
  title: string
  product: "Junior" | "MTM 18+"
  image: string
}

type DrawerMode = "executive" | "full"

type ActivePreview = {
  report: Report
  mode: DrawerMode
}

const reports: Report[] = [
  { id: 1, title: "Teens & AI", product: "Junior", image: "9a19f.png" },
  {
    id: 2,
    title: "Kids and their Reliance on the media and their portable devices",
    product: "MTM 18+",
    image: "f276c.png",
  },
  {
    id: 3,
    title: "Kids and their Reliance on the media and their portable devices",
    product: "MTM 18+",
    image: "f276c.png",
  },
  {
    id: 4,
    title: "Kids and their Reliance on the media and their portable devices",
    product: "MTM 18+",
    image: "f276c.png",
  },
  {
    id: 5,
    title: "The next generation of digital communities",
    product: "Junior",
    image: "9a19f.png",
  },
  {
    id: 6,
    title: "How young audiences discover and share culture",
    product: "MTM 18+",
    image: "f276c.png",
  },
]

const navItems = [
  ["Dashboard", "1f0f6.svg"],
  ["Reports", "9386a.svg"],
  ["Data", "6ad05.svg"],
  ["Trends", "3d8b9.svg"],
  ["Forecasts", "55fac.svg"],
  ["Your data", "32fa6.svg"],
  ["Census", "de3ff.svg"],
]

const filterGroups = {
  Product: ["MTM 18+", "Junior", "Newcomers"],
  Genre: [
    "TV/Video",
    "Radio/Audio",
    "Internet",
    "Mobile",
    "Demographic",
    "Market",
  ],
  Type: ["Report", "Infographic", "Adoption", "Sneak Peek"],
}

function IconButton({
  label,
  icon,
  active,
}: {
  label: string
  icon: string
  active?: boolean
}) {
  return (
    <button
      className={`nav-item ${active ? "active" : ""}`}
      aria-label={label}
      title={label}
    >
      <span className="nav-icon">
        <img src={asset(icon)} alt="" />
      </span>
      <span className="nav-label">{label}</span>
    </button>
  )
}

function ReportCard({
  report,
  activeMode,
  onOpenPreview,
  onExecSummary,
}: {
  report: Report
  activeMode: DrawerMode | null
  onOpenPreview: (mode: DrawerMode) => void
  onExecSummary: () => void
}) {
  return (
    <article className={`report-card ${activeMode ? "selected" : ""}`}>
      <button
        className="report-image"
        onClick={() => onOpenPreview("executive")}
        aria-label={`Open ${report.title}`}
      >
        <img src={asset(report.image)} alt="" />
      </button>
      <div className="card-copy">
        <div className="card-meta">
          <span
            className={`pill ${report.product === "Junior" ? "junior" : ""}`}
          >
            {report.product}
          </span>
          <span className="date">Dec 11, 2025</span>
        </div>
        <h2>{report.title}</h2>
        <div className="card-actions">
          <button
            className={activeMode === "full" ? "primary" : ""}
            onClick={() => onOpenPreview("full")}
          >
            Full report
            <img
              src={asset(activeMode === "full" ? "5a09a.svg" : "3109a.svg")}
              alt=""
            />
          </button>
          <button
            className={activeMode === "executive" ? "primary" : ""}
            onClick={onExecSummary}
          >
            Exec summary
            <img
              src={asset(
                activeMode === "executive" ? "5a09a.svg" : "3109a.svg",
              )}
              alt=""
            />
          </button>
        </div>
      </div>
    </article>
  )
}

function PreviewDrawer({
  preview,
  onClose,
}: {
  preview: ActivePreview | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!preview) return
    const onKeyDown = (event: KeyboardEvent) =>
      event.key === "Escape" && onClose()
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [preview, onClose])

  return (
    <>
      <button
        className={`drawer-scrim ${preview ? "open" : ""}`}
        onClick={onClose}
        aria-label="Close report preview"
        tabIndex={preview ? 0 : -1}
      />
      <aside
        className={`preview-drawer ${preview ? "open" : ""}`}
        aria-hidden={!preview}
      >
        <div className="drawer-header">
          <div>
            <h2>{preview?.report.title ?? "Report"}</h2>
            <span>
              {preview?.mode === "full" ? "Full report" : "Executive summary"}
            </span>
          </div>
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close report preview"
          >
            <span />
            <span />
          </button>
        </div>
        <div className="preview-pages">
          <img
            src={asset("93537.png")}
            alt="Teens and AI executive summary cover"
          />
          <img
            src={asset("68726.png")}
            alt="Executive summary introduction page"
          />
          <img src={asset("1e0b6.png")} alt="Executive summary page" />
        </div>
      </aside>
    </>
  )
}

export default function App() {
  const [navOpen, setNavOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [filters, setFilters] = useState<Record<string, string[]>>({
    Product: ["MTM 18+"],
    Genre: ["TV/Video", "Radio/Audio", "Mobile"],
    Type: ["Report"],
  })
  const [activePreview, setActivePreview] = useState<ActivePreview | null>(null)
  const filterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setFilterOpen(false)
      }
    }
    document.addEventListener("pointerdown", close)
    return () => document.removeEventListener("pointerdown", close)
  }, [])

  const filteredReports = useMemo(
    () =>
      reports.filter(
        (report) =>
          report.title.toLowerCase().includes(query.toLowerCase()) &&
          (!filters.Product.length || filters.Product.includes(report.product)),
      ),
    [filters.Product, query],
  )

  const toggleFilter = (group: string, option: string) => {
    setFilters((current) => ({
      ...current,
      [group]: current[group].includes(option)
        ? current[group].filter((item) => item !== option)
        : [...current[group], option],
    }))
  }

  const openPreview = (report: Report, mode: DrawerMode) => {
    setActivePreview({ report, mode })
  }

  const downloadExecutiveSummary = (report: Report) => {
    const link = document.createElement("a")
    link.href = asset("93537.png")
    link.download = `${report.title.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}-executive-summary.png`
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  const handleExecSummary = (report: Report) => {
    if (
      activePreview?.report.id === report.id &&
      activePreview.mode === "executive"
    ) {
      downloadExecutiveSummary(report)
      return
    }
    openPreview(report, "executive")
  }

  return (
    <div className={`app-shell ${navOpen ? "nav-open" : ""}`}>
      <aside className="sidebar">
        <div>
          <div className="brand">
            <img src={asset("ac7fa.svg")} alt="MTM" />
            <span>MTM</span>
          </div>
          <nav aria-label="Main navigation">
            {navItems.map(([label, icon]) => (
              <IconButton
                key={label}
                label={label}
                icon={icon}
                active={label === "Reports"}
              />
            ))}
          </nav>
        </div>
        <div className="sidebar-bottom">
          <IconButton label="Resources" icon="89426.svg" />
          <IconButton label="Contact" icon="6329b.svg" />
          <button className="profile" aria-label="Profile">
            <img src={asset("55083.svg")} alt="" />
            <span>Profile</span>
          </button>
          <button
            className="collapse-button"
            onClick={() => setNavOpen((open) => !open)}
            aria-label={navOpen ? "Collapse navigation" : "Expand navigation"}
            aria-expanded={navOpen}
          >
            <span>→</span>
          </button>
        </div>
      </aside>

      <header className="topbar">
        <button
          className="mobile-menu"
          onClick={() => setNavOpen((open) => !open)}
          aria-label={navOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={navOpen}
        >
          <span />
          <span />
          <span />
        </button>
        <h1>Reports</h1>
        <div className="language-switch" aria-label="Language">
          <button>
            <img src={asset("c265a.svg")} alt="" /> FR
          </button>
          <button className="active">
            <img src={asset("d2a77.svg")} alt="" /> EN
          </button>
        </div>
      </header>

      <main>
        <div className="search-wrap" ref={filterRef}>
          <div className="search-bar">
            <span className="search-mark">
              <img src={asset("af962.svg")} alt="" />
            </span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search reports"
              aria-label="Search reports"
            />
            <button
              className={`filter-button ${filterOpen ? "active" : ""}`}
              onClick={() => setFilterOpen((open) => !open)}
              aria-label="Filter reports"
              aria-expanded={filterOpen}
            >
              <img src={asset(filterOpen ? "ffb94.svg" : "de382.svg")} alt="" />
            </button>
          </div>

          <div className={`filter-panel ${filterOpen ? "open" : ""}`}>
            <div className="filter-panel-title">Filters</div>
            <div className="filter-groups">
              {Object.entries(filterGroups).map(([group, options]) => (
                <fieldset
                  key={group}
                  className={`filter-group ${group.toLowerCase()}`}
                >
                  <legend>{group}</legend>
                  <div className="filter-options">
                    {options.map((option) => {
                      const checked = filters[group].includes(option)
                      return (
                        <label key={option}>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleFilter(group, option)}
                          />
                          <span
                            className={`design-check ${
                              checked ? "checked" : ""
                            }`}
                          >
                            {checked && <img src={asset("57301.svg")} alt="" />}
                          </span>
                          <span>{option}</span>
                        </label>
                      )
                    })}
                  </div>
                </fieldset>
              ))}
            </div>
          </div>
        </div>

        <section className="report-grid" aria-live="polite">
          {filteredReports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              activeMode={
                activePreview?.report.id === report.id
                  ? activePreview.mode
                  : null
              }
              onOpenPreview={(mode) => openPreview(report, mode)}
              onExecSummary={() => handleExecSummary(report)}
            />
          ))}
          {!filteredReports.length && (
            <div className="empty-state">
              <h2>No reports found</h2>
              <p>Try another search or clear your filters.</p>
            </div>
          )}
        </section>
      </main>

      <PreviewDrawer
        preview={activePreview}
        onClose={() => setActivePreview(null)}
      />
    </div>
  )
}
