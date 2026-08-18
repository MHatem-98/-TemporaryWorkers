# TAMAM Temporary Workforce

Frontend starter for the temporary-workforce module. It is intentionally separate from the legacy Techsup-Tamam repository.

## Stack

- HTML5
- Bootstrap 5.3
- Bootstrap Icons
- Vanilla JavaScript
- English, LTR

## Run locally

Open the project folder in VS Code and use the **Live Server** extension on `index.html`.

## Structure

- `assets/css/app.css` — design tokens, shared layout, components, and responsive rules.
- `assets/js/layout.js` — mobile sidebar behavior only.
- `assets/js/app.js` — shared interactive behavior such as tooltips.
- `pages/` — one HTML file per screen.
- `docs/SCREEN-MAP.md` — implementation order and source requirements.
- `docs/design-reference/` — the three supplied reference images.

## Working rule

Implement one screen at a time and reuse the shared CSS rules. All visible content, navigation labels, headings, tables, tabs, and form fields must be written directly in the HTML files. JavaScript is reserved for interaction only and must not generate page content.
