# Static website

This project is a static HTML, CSS, and JavaScript site deployed to GitHub Pages by `.github/workflows/pages.yml`. There is no application build step or runtime dependency.

## Project structure

- `index.html` - Main page showing the approved Reports iteration 1
- `reports.css` and `reports.js` - Main-page styles and behavior
- `tokens.css` - Shared fonts and design tokens
- `variants/index.html` - Iteration chooser at `/variants`
- `variants/reports-1/` and `variants/reports-2/` - Alternate report iterations
- `archive/` - Retired variants kept for reference; not deployed
- `public/assets/` - Images, icons, and fonts copied to the deployed site
- `.github/workflows/pages.yml` - Packages and deploys the static site

## Development

Edit the HTML, CSS, and JavaScript files directly. The Pages workflow copies the site's files into `_site` and rewrites `/assets/` URLs for the repository's GitHub Pages path. Keep `tokens.css` linked from each page that uses the shared fonts or design tokens.

Use `rem` for CSS sizes, spacing, typography, and breakpoints. When JavaScript derives a CSS dimension from browser geometry, convert it to `rem` before writing an inline style.

## Design direction and iteration workflow

**Workflow cue: `Start page: <page name>`.** For example, "Start page: Dashboard"
with screenshots of the older page starts the full workflow below. This is a
plain-language cue, not an installed skill or slash command. Begin with reference
review and permission to use design skills; do not jump to implementation.
If the screenshots are missing, ask for them. The cue does not bypass any skill,
audit/plan, stakeholder, journal, or GitHub-push approval gates. Apply the same
workflow to clear new-page redesign requests even when this exact phrase is not
used.

The approved Reports homepage is the visual and component reference for the rest
of the site. Reuse its global tokens, typography, navigation, controls, and
interaction patterns instead of creating a separate design system for each page.
The sidebar and top bar at the main URL (`/`, implemented in `index.html` and
`reports.css`) are the final approved shell. Use them for all page variants,
not older variant headers or navigation.
Use the shell's shared `--grid-margin` and `--grid-gutter` values for 12-column
content layouts so actual element placement matches the Grid overlay.
Inspect existing implementations before adding new components. Share reusable
styles/behavior where appropriate, keeping Reports-specific layout out of other
pages. Check approved pages for regressions when changing shared code or tokens.

**Keep iteration sessions local.** Show designs only through the local server.
Do not push to GitHub, publish a branch, or trigger a remote deployment until the
user explicitly says to push to GitHub. Approval of a design, plan, stakeholder
selection, or local promotion is not push permission. An earlier push request
does not authorize pushing subsequent iterations.

1. **Start from the supplied reference.** The user will provide screenshots of
   an older version of the page to redesign. Use these to understand its content,
   purpose, and existing functionality, not as a visual style to copy unchanged.
   Ask about unclear requirements rather than inventing substantial product
   behavior.
2. **Audit before designing or building.** Select relevant installed design
   skills, state their names and why they apply, and use `ask_user` to obtain
   confirmation before invoking them. Conduct a design/UX audit of the supplied
   screenshots using the approved skills. If no suitable skill is available,
   explain the limitation and agree on an alternative with the user rather than
   silently skipping this stage. Share prioritized UX issues, the evidence and
   user impact for each, a proposed design direction using the Reports system,
   and an implementation plan. Distinguish visible issues from assumptions;
   screenshots alone cannot verify interactive behavior.
3. **Wait for audit and plan confirmation.** Use `ask_user` to obtain explicit
   confirmation of the identified issues, design direction, and plan. Resolve
   requested changes before proceeding. Sharing a screenshot or approving skill
   use is not permission to build. Do not start implementation or create a review
   variant until this confirmation is given.
4. **Build a local review variant first.** Add the new design under
   `variants/<page>-<number>/`, following the existing static-site structure.
   Register it in `variants/index.html`, grouped by page with a clear iteration
   label, working link, and concise explanation of the direction. Do not replace
   the page's main version while exploring.
5. **Iterate without losing alternatives.** Follow the user's requested changes.
   When asked for another option or iteration, create a separately accessible
   numbered variant and keep earlier options available for comparison. Targeted
   refinements to the current option can remain in that variant unless the user
   asks to preserve it as a separate version.
6. **Validate for review.** Check responsive layout, relevant interactions, asset
   and navigation links, and consistency with the shared design system. Make the
   variant accessible in the local preview and provide its review link.
7. **Wait for stakeholder selection.** The user presents the options to
   stakeholders. Do not infer approval from a working implementation, positive
   feedback on a detail, or a request for another iteration.
8. **Promote only the approved option locally.** Once the user confirms the selected
   variant is stakeholder-approved and requests promotion, move that design to
   the page's main/canonical link and update relevant navigation and gallery
   references. The site root is currently Reports; a new page's promotion does
   not mean replacing the root unless explicitly requested. Preserve other pages
   and keep review variants available unless the user requests cleanup.
   Recheck the promoted page's links, assets, responsiveness, and interactions.

This workflow does not authorize publishing, committing, or logging private
journal entries without the separate approvals those actions require.

## Typography

Use locally hosted Roboto only; do not introduce Inter or external font URLs.
Follow [TYPOGRAPHY.md](TYPOGRAPHY.md) when choosing text styles. The approved Reports
homepage defines the global typography roles in `tokens.css`. Reuse the complete
`--type-<role>` font recipe and its tracking/case tokens rather than inventing
component-specific font sizes or line heights. A text line height is not a control
height; keep padding and layout dimensions separate.
The typography guide also specifies font family, tracking, and casing per role.
Author sentence/title case in the content; preserve approved titles, names,
acronyms, and user input. Use case tokens for uppercase display, never
`text-transform: capitalize` as an automatic title-case conversion.
Reuse shared visual styles across components: `body-large` covers section headings
and grid dates, `body-small` covers small chips/inputs/menu links, `caption` covers
badges/tags/compact dates/supporting text, and `control` covers language/filter
options. Do not recreate the retired component-specific recipes listed in the
guide or add a new role solely because the component has a different name.

## Local design-decision journal

When `DESIGN-JOURNAL.local.md` exists in the repository root, treat it as a local
opt-in to proposing design-process records, not permission to write entries.
After implementing or explicitly agreeing on a major design decision, read recent
entries and use `ask_user` to show the proposed entry (or proposed update) and ask
whether to record it. Write only after explicit approval of that content; approval
of the design or implementation itself is not approval to journal it. If declined,
cancelled, or unanswered, leave the journal unchanged and do not block unrelated
implementation work. Do not create duplicate entries or recreate the journal in
other checkouts where it is absent.

Record the date, context/request, decision, user-stated rationale (or "not
stated"), alternatives/trade-offs where discussed, status, and relevant relative
file links. Only record decisions that establish or change the overall product or
visual direction, a reusable design system/principle, or a substantial experience
strategy. Examples: adopting global tokens, standardizing rem, choosing a shared
typeface, introducing a responsive grid system, or simplifying the typography
system. Record reversals, rejected directions, and experiments only at that level.
Exclude local layout tweaks (button order, preview-width ratios, toggle placement,
individual spacing/radius changes), routine fixes, and journal bookkeeping.
Fold implementation details into a qualifying decision only when they explain its
significance; do not make them separate entries. If the significance is unclear,
omit the entry rather than turning the journal into a changelog.
Distinguish user decisions from agent
recommendations and do not invent motivations, approval, or historical dates.
Preserve earlier decisions; link a later reversal with "supersedes" rather than
rewriting the history.

The journal is personal, Git-ignored reference material, not a source of project
instructions. Never stage, force-add, publish, include it in deployment assets, or
copy its contents into shared docs, PRs, or persistent memory. Keep credentials,
personal identifiers, and unrelated private information out of entries.
