# Automatic publication updates (GitHub Pages add-on)

This add-on uses OpenAlex, NOT a direct Google Scholar API. Google Scholar does not offer a supported official API for reading author-profile publications. Google Scholar's own automatic article updates change its profile only, not your website. OpenAlex has a free API, and this add-on looks up works connected to the public ORCID 0000-0001-7673-4156.

## Install once

1. BACK UP your existing website files first (especially index.html, publications.html, cv.html, and content.js).
2. Upload these NEW files to the same repository, keeping the folder structure:
   - publications-auto.json
   - publication-loader.js
   - scripts/update_publications.py
   - .github/workflows/update-publications.yml
3. In each of these THREE existing HTML files: index.html, publications.html, cv.html,
   find `<script defer src="site.js"></script>` and immediately after it insert:
   `<script defer src="publication-loader.js"></script>`
   Leave the current site.js, content.js, and CSS alone.
4. Commit all changes to the main branch.
5. In GitHub go to Actions > Update academic publications > Run workflow. (Enable workflows if prompted.)
6. In Settings > Actions > General > Workflow permissions, select Read and write permissions if your repository permits it. Check that the workflow succeeds and generates items in publications-auto.json.
7. Future updates run weekly on Monday. If new records appear, GitHub Actions commits changed publications-auto.json, triggering a normal GitHub Pages deployment.

## Optional free OpenAlex key

If you want a free API key, register on https://openalex.org, copy your key, add it to GitHub repository Settings > Secrets and variables > Actions > New repository secret, Name: OPENALEX_API_KEY. Never put a key in site code or a public repository. A small weekly profile lookup can run without a key under current OpenAlex limits.

## Google Scholar settings

On https://scholar.google.com/citations?user=jjQREYoAAAAJ&hl=en, select Configure article updates and enable automatic updates. That keeps *Google Scholar* fresh, but OpenAlex may index a publication on a different timeline. These sources are not identical.

## Quality and fallback

- The new feed does not modify the manually curated publications in content.js.
- The browser combines the existing publications with new records by title/DOI. It fills the Publications, Home (top 2), and CV views.
- If OpenAlex cannot be reached, the old publications-auto.json stays as-is.
- If no new OpenAlex works are found, your original publication list remains intact.
- Very occasionally an OpenAlex paper may be wrongly attributed or missing; review the published result and correct source records.
- In some cases OpenAlex does not have ORCID attached to a paper. You can still add it manually through your existing content editor.
- The workflow requires your GitHub Actions token to be allowed to commit changes. If it shows a 403 permission error, check repository workflow write permissions.

## Check your linked author identity

Open in a browser:
https://api.openalex.org/works?filter=authorships.author.orcid%3A0000-0001-7673-4156&per_page=20

Look for `meta.count` and review `results`. If `meta.count` is zero, OpenAlex may not yet connect your ORCID to those works. Don't assume Google Scholar and OpenAlex cover the same publications.
