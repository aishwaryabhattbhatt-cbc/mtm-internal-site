# Typography guide

The approved Reports homepage is the reference for this system. All roles use
locally hosted **Roboto**, with regular (400), medium (500), and bold (700) faces.
Do not introduce Inter, remote font services, or a new type scale for each page.

## Choosing a style

Use the **semantic role**, not just a similarly sized font token. Each
`--type-<role>` recipe includes weight, size, line height, and family.
Pair it with its tracking token. Action roles and filter headings also define
capitalization. These tokens are global in [tokens.css](tokens.css); the homepage
uses them in [reports.css](reports.css). Variant layouts have not been restyled.

Sizes and line heights below are in `rem`. Line height means the height of one
line of text, **not** the control's height or padding. Similar small-label styles
have been standardized; distinct title, action, and multiline treatments remain.

Tracking below is also in `rem`. All faces are normal/upright, not italic.
For casing, **preserve** means display the approved name or supplied content
unchanged; **sentence** and **title** describe how to write the source text.
Only **uppercase** is a CSS transformation.

| Role (`--type-…`) | Font | Size / line height | Weight | Tracking | Casing | Use when |
| --- | --- | --- | --- | --- | --- | --- |
| `page-title` | Roboto | 1.25 / 1.375 | 400 | -0.03125 | Preserve page name | Top-bar page name, such as Reports |
| `body-large` | Roboto | 1 / 1.2 | 400 | -0.03125 | Sentence headings; preserve names/dates | Filter/chat section headings and grid-view report dates |
| `card-title` | Roboto | 0.9375 / 1.125 | 400 | -0.03125 | Preserve report title | Report title in both grid and list views |
| `preview-title` | Roboto | 0.9375 / 1.3125 | 400 | -0.03125 | Preserve report title | Same report title in the preview panel |
| `search` | Roboto | 1 / 1.4 | 400 | -0.03125 | Sentence placeholder; preserve input/results | Search input and suggestion rows |
| `navigation` | Roboto | 0.875 / 0.875 | 500 | 0 | Preserve approved labels, including title case | Sidebar destinations such as Data Analysis Tool; collapse label |
| `control` | Roboto | 0.875 / 1 | 400 | 0 | Preserve language code/taxonomy label | FR/EN controls and checkbox option labels |
| `account-name` | Roboto | 0.875 / 1.25 | 500 | -0.009375 | Preserve name | Sidebar account name |
| `filter-heading` | Roboto | 0.89375 / 0.983125 | 500 | 0.017875 | Uppercase | PRODUCT, GENRE, TYPE category headings |
| `body-small` | Roboto | 0.8125 / 0.975 | 400 | 0 | Sentence UI copy; preserve labels/input | Base removable chips, chat input, and account-menu links |
| `caption` | Roboto | 0.75 / 0.9 | 400 | 0 | Sentence prompts/hints; preserve names, labels, and dates | Product pills, taxonomy chips, topic tags, chat references, list dates, organization text, and supporting chat text |
| `action` | Roboto | 0.6875 / 0.75625 | 500 | 0.01875 | Uppercase | SUMMARY, REPORT, SEND buttons |
| `action-compact` | Roboto | 0.625 / 0.6875 | 500 | 0.0125 | Uppercase | Preview toolbar actions such as HIDE PREVIEW |
| `action-large` | Roboto | 0.75 / 0.825 | 500 | 0.01875 action; 0.015 overline | Uppercase | ASK MTM action; EXECUTIVE SUMMARY preview mode |
| `toolbar` | Roboto | 0.75 / 0.75 | 500 | 0 | Sentence | Temporary Grid toggle |
| `message` | Roboto | 0.8125 / 1.178125 | 400 | -0.0125 | Sentence for app copy; preserve user text | Multiline chat messages |
| `helper` | Roboto | 0.875 / 1.225 | 400 | 0 | Sentence | Preview empty-state helper text |

## Consolidation decisions

The original 25 recipes are now **17 shared styles**. A component's purpose does
not require its own recipe when it can use an existing visual treatment.

| Former roles | Shared style | Reason |
| --- | --- | --- |
| `section-title`, `metadata` | `body-large` | Identical family, size, weight, line height, and tracking |
| `account-detail`, `badge`, `tag`, `caption`, `metadata-compact` | `caption` | Same regular 0.75rem text; standardized line height to 0.9rem and tracking to 0 |
| `menu-detail`, `chip`, `input-small` | `body-small` | Same regular 0.8125rem text and zero tracking; standardized line height to 0.975rem |
| `control`, `filter-option` | `control` | Similar regular labels; standardized size to 0.875rem, line height to 1rem, and tracking to 0 |

These are real recipe and call-site merges, not extra aliases. The former names
are removed. Keep component-specific colors, padding, shapes, and content casing
separate from the shared font treatment.

Not every similar size was merged:

- Card and preview titles retain different leading: 1.125rem versus 1.3125rem.
- Search uses more leading than `body-large`; multiline messages and helper copy
  also need more breathing room than short labels.
- Navigation and account names retain different line boxes and tracking.
- Action sizes retain their compact-toolbar, standard-button, and prominent-action
  hierarchy. Filter headings retain their larger uppercase treatment.
- The temporary Grid toggle remains a distinct tight toolbar style, rather than
  changing permanent button styles around a temporary control.

## Font family and casing rules

- **Font family:** recipes use `--font-body` or `--font-heading`, both currently
  `'Roboto', Arial, sans-serif`. Heading is a semantic alias, not permission to
  use another font. Faces are served from `public/assets/fonts/`; do not use
  external font URLs.
- **Sentence case:** capitalize the first word and preserve proper nouns/acronyms,
  for example `Search reports`, `Hide preview`, and `Ask about this report`.
  Write this in HTML, JavaScript strings, or localized content. Use
  `text-transform: none` when an inherited transform needs to be reset.
- **Title case:** preserve approved navigation names such as `Data Analysis Tool`
  and report titles such as `Canadians and the News`. Do not automatically
  title-case every heading or rewrite a report's supplied title.
- **Uppercase:** write readable source labels such as `Summary` and
  `Executive summary`, then use the action/filter case token to display
  `SUMMARY` and `EXECUTIVE SUMMARY`. Do not store all-uppercase strings just to
  achieve the visual style.
- **Preserve:** never transform names, report titles, taxonomy values, language
  codes, dates, or user input. This protects spellings such as `MTM 18+`,
  `TV/Video`, `AI`, `FR`, and `EN`.
- CSS has no true sentence-case or editorial title-case transform.
  **Do not use `text-transform: capitalize`** as a substitute: it would turn
  `Canadians and the News` into `Canadians And The News`.
- **Tracking** is separate from the `font` shorthand; apply the role's
  `letter-spacing` token too. A value of `0` means no added tracking.
- **Decoration** (such as link underlining), alignment, wrapping, and truncation
  belong to the component's interaction/layout rules. Do not remove link or
  focus affordances merely to match a typography role.

## Applying a role

```css
.feature-card-title {
  font: var(--type-card-title);
  letter-spacing: var(--type-card-title-tracking);
  text-transform: none;
}

.feature-action {
  font: var(--type-action);
  letter-spacing: var(--type-action-tracking);
  text-transform: var(--type-action-case);
}
```

For the first example, supply the report's original title unchanged. For the
second, supply readable button copy such as `Summary`; the case token handles
its uppercase display.

- Use `--type-action-case` for all three action sizes. Compact actions use
  `--type-action-compact-tracking`; large actions use `--type-action-tracking`.
- Preview mode overlines use `--type-action-large` with
  `--type-overline-tracking` and `--type-action-case`.
- Filter headings use `--type-filter-heading-case`.
- Grid-view dates use `--type-body-large`; list-view dates use `--type-caption`.
  Preserve the formatted date in both cases.
- Choose semantic HTML (`h1`, `h2`, `p`, `button`) independently of visual size.
  Do not select a heading element solely to obtain its browser-default font.
- Do not substitute compact label styles for paragraph text. Match existing
  message/helper copy by purpose; propose a dedicated body-copy role if a new
  long-form content area needs one.
- Reuse a complete role before composing primitive `--font-size-*`,
  `--font-weight-*`, or `--line-height-*` tokens. Bold is available for deliberate
  emphasis, not as the default heading weight.
- Keep icon/glyph sizing separate from text roles. Do not copy close-button or
  arrow font sizes into content typography.
- Do not add a different mobile font size unless the design requires it; the
  current Reports page uses the same text roles across breakpoints.
