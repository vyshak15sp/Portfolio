# Vyshak S P Portfolio Website

A multi-page personal portfolio website built with HTML, CSS, and JavaScript.

## Pages

- `index.html`: Main portfolio homepage
- `project-biomedical-waste.html`: Automatic Bio-medical Waste Segregation Bin project page
- `project-single-window-portal.html`: Single Window Portal study project page

## Styling and Scripts

- `index.css` + `index.js`: Homepage styles and interactions
- `project-biomedical-waste.css` + `project-biomedical-waste.js`: Biomedical project page styles and interactions
- `project-single-window-portal.css` + `project-single-window-portal.js`: Single window project page styles and interactions

## Assets

- Profile and favicon assets: `profile.png`, `favicon.png`, `favicon.svg`
- Resume: `resume.pdf`
- Biomedical gallery images: `img1.png` to `img7.png`
- Biomedical diagrams: `flowchart.png`, `blockdiagram.png`
- Reports:
  - `biomedical-report.pdf`
  - `swp-report.pdf`

## Features

- Dark/light theme toggle
- Responsive navbar with mobile menu
- Active section highlight on homepage navigation
- Project detail pages with report download buttons
- Biomedical image carousel with auto-slide
- Click-to-preview modal for biomedical diagrams and gallery images

## Run Locally

Open `index.html` directly in a browser.

For better behavior (recommended), run a local static server from this folder:

```bash
python3 -m http.server 8000
```

Then open: `http://localhost:8000`

## Customize

- Update personal content in `index.html`
- Update project content in:
  - `project-biomedical-waste.html`
  - `project-single-window-portal.html`
- Adjust design in page-specific CSS files
- Replace assets in the root folder and update corresponding `src`/`href` paths
