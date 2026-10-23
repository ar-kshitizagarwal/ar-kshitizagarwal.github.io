# Personal Portfolio / Academic CV Starter

A clean, responsive, lightweight personal website for an interdisciplinary researcher and design professional. **No frameworks, build commands, paid services, databases, cookies, or tracking.** The website works directly as static files.

## Preview locally

Open `index.html` by double-clicking it. Open `editor.html` to edit content. Both work without installing anything or using a local server. The included content is a **starter draft** and requires your review before public publishing.

## Quickest content updates (under a few minutes)

1. Open `editor.html` in your browser (locally or from the published site).
2. Choose **Projects**, **Publications**, **Education**, **Experience**, **Credentials**, or **Profile**.
3. Add or revise an entry and click **Save entry**.
4. Click **Download content.js** to save all changes.
5. In your GitHub repository, open `content.js`, click the edit (pencil) icon, replace the file's contents with those of the downloaded `content.js`, and commit.
6. GitHub Pages publishes the new version. The editor itself is not connected to GitHub; it cannot publish changes automatically.

You can also edit `content.js` directly in GitHub. The data is readable and logically grouped.

## Publish for free using GitHub Pages

1. Create or log into a free GitHub account.
2. Create a **public** repository named `<your-github-username>.github.io` (exact username, not your actual name unless they match).
3. Upload **all** starter files into the repository's root (preserving folders), and commit.
4. In the repository, go to **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**. Choose `main` and `/(root)`, then save.
5. Visit `https://<your-github-username>.github.io/` after GitHub Pages deploys. Check deployment details in the repository's Pages settings or Actions tab.

`.nojekyll` disables unnecessary Jekyll processing. You do not have to install Jekyll or Node.js.

**Cost:** Free on GitHub Pages when hosted from a public GitHub Free repository with a `github.io` address. A custom domain, if you choose one later, is purchased separately. Website source and published material are public, so do not upload private details.

## How to add a project image

1. Compress the photo, diagram, visual abstract, map or project thumbnail. Prefer WebP around 1200 pixels wide and, when possible, below ~250 KB.
2. Upload it to `assets/projects/` on GitHub.
3. In the editor, choose the project and set **Image path** to `assets/projects/your-image.webp`.
4. Download and commit `content.js`.

Only publish visuals you own or have permission to publish. If no image is added, the design uses a lightweight abstract CSS background.

## Content included in the updated October 2026 edition

The supplied three-page CV is the primary source for education, experience, skills, certifications, workshops and academic engagements. LinkedIn supplied a small sample of professional project names; some project-specific scopes and image permissions remain to be verified. The supplied Google Scholar and ResearchGate links have been added. The provided Google Scholar URL is treated as the intended profile URL but its contents could not be independently inspected. The contact section uses the institutional email; the phone number is deliberately omitted.

## What has been prefilled

This edition uses the latest October 2026 CV for the main biography and timeline, public LinkedIn project listings for selected historic cards, and the JST LOTUS proposal for the collaborative project description and ORCID. Check all details and dates before publishing.

Items requiring your input:

- **Current complete resume PDF**: Used for the main CV content. For public PDF download, prepare a redacted/public version before uploading; it is NOT included in this ZIP.
- **Google Scholar**: Linked to the URL you supplied; remove `authuser=1` from the public link. Confirm that the profile is public and its publication list is accurate.
- **Project descriptions and imagery**: Replace generic prior-project descriptions with precise contributions, credits and approved visuals.
- **Contact email**: The institutional IIT Roorkee email from the CV is prefilled; change or remove it in the editor if you prefer.
- **Work-specific pages**: Current version features one card per project; detail pages can be added in a later iteration if needed.

## Input sources and synchronization

- **Resume PDF:** best treated as a one-time import / source for the editable CV and portfolio content; upload the latest PDF to ChatGPT for extraction and review.
- **LinkedIn:** linked directly from the website. Public details can be used for a **one-time curated import** after review; ongoing automatic synchronization is not assumed or required.
- **Google Scholar:** link to the public profile and maintain a curated list of selected publications. Google Scholar has no dependable official public profile API; automated scraping is fragile and rate-limited. For an automated bibliography later, consider an ORCID-based import (with DOI validation) or a DOI list.

## Site files

- `index.html` — website layout
- `styles.css` — colours, typography, responsive layouts, print-to-PDF CV
- `content.js` — **all portfolio data**
- `app.js` — reads the data, renders the site, filters projects
- `editor.html` + `editor.js` — offline browser editor; exports updated data
- `assets/projects/` — optional images
- `.nojekyll` — GitHub Pages deployment compatibility

## Privacy and publication checks

Do not add private addresses, phone numbers, confidential project drawings, proprietary client work, internal documents, or unpublished results without approval. Use source citations and explain personal contribution where several people worked on a project. Review URLs, affiliations, dates and publication status before making the repository public.

## Website launch checklist

- Check Google Scholar visibility in an incognito window.
- Verify the bibliographic type and DOI of the 2023 district disaster management plan work: the CV has a duplicated `10.7770/10.7770` prefix, so the website links to ResearchGate while this is clarified.
- Check exact title/year/project roles on professional cards, and replace cautious placeholder descriptions with approved contributions and images.
- Review the planned/ongoing status of all research entries prior to publishing.
- Add a suitable professional headshot and selected portfolio visuals in a subsequent iteration.
- If including a downloadable CV PDF, publish a reviewed public-facing copy (consider omitting phone number).
- Keep sources and individual contributions clear and avoid confidential drawings or unpublished results.
