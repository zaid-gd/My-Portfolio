# Scroll-Animated Portfolio

A modern, responsive portfolio with parallax hero, scroll-reveal animations, active nav highlighting, and a scroll progress bar. Built with plain HTML/CSS/JS.

## Live
- GitHub Pages: enable in Settings → Pages (Deploy from branch → main → /(root)).
- URL: https://<your-username>.github.io/My-Portfolio/

## Run locally
```bash
# Open the file directly
# Windows: double-click index.html
# Or serve with a simple static server
# Python 3
python -m http.server 5173
# Node (if you have serve)
npx serve -l 5173
```
Then open http://localhost:5173

## Customize
- Content: edit `index.html` (hero text, About, Projects, Skills, Contact).
- Colors/spacing: edit CSS variables in `styles.css` under `:root`.
- Animations: tune thresholds/delays in `script.js` (IntersectionObserver, parallax).

## Features
- Parallax hero layers reacting to scroll
- Scroll progress indicator
- Section-based nav highlight + smooth scrolling
- IntersectionObserver reveal animations
- Responsive grid/cards

## Deploy to GitHub Pages
1. Push to GitHub: `main` branch.
2. Repo → Settings → Pages → Source: Deploy from a branch → Branch: `main` → Folder: `/(root)` → Save.
3. Wait ~1–2 minutes for the site to go live.

## Custom domain (optional)
- Add a CNAME record in your DNS pointing to `<your-username>.github.io`.
- In repository Settings → Pages → Custom domain → enter your domain.
- Commit a `CNAME` file containing your domain for persistence.

## License
MIT
