# Kshitiz Agarwal — visual portfolio redesign (October 2026)

A lightweight, multi-page, visually led static website for GitHub Pages. It uses **your uploaded Himalaya panorama**, **your portrait**, **your river/urban-resilience illustration**, and **your Centrio Mall photograph**. The Bhagirathi resort project links to the supplied official website; images from that site are **not** copied.

## Main changes

- Homepage has a scenic Himalaya hero, short introduction, four illustrated work-area cards, three featured projects, two publication previews, and contact.
- Full text moves to separate pages: `work.html`, `publications.html`, `about.html`, and `cv.html`.
- Header portrait is a direct `<img>` tag, rather than relying on the previous header-photo JavaScript mechanism.
- All nine existing projects and three publications remain in the editable `content.js` data file; unfinished editorial remarks have been removed from visitor-facing text.
- Work filters link to `work.html?focus=water`, `planning`, `architecture`, or `delivery`.
- Content editor remains available at `editor.html`. It exports a replacement `content.js`. The hero title and work-area layout are fixed in HTML and must be edited in HTML/CSS if you want to change them.
- A CV-style page can be printed to PDF using the browser Print button. No private phone number or uploaded original CV is included.

## Publish to your existing GitHub Pages site

Repository: https://github.com/ar-kshitizagarwal/ar-kshitizagarwal.github.io

1. **Back up** your existing website files, especially `content.js` if you have made new edits since our last exchange. You can download the repo ZIP via **Code → Download ZIP**.
2. Unzip the new portfolio ZIP on your computer.
3. In your GitHub repository, click **Add file → Upload files** and upload the **contents** of this ZIP to the repository root (`main` branch, `/(root)`). You may drag the extracted folders/files so GitHub preserves the `assets/images` subfolder. Do **not** upload the ZIP as a single file or nest the whole package inside a new folder.
4. Commit the upload. Select replacement for existing `index.html`, `content.js`, `styles.css`, `README.md` if GitHub asks.
5. Allow GitHub Pages deployment to complete under **Actions**, then hard-refresh https://ar-kshitizagarwal.github.io/ (Ctrl+F5).
6. Test pages: `/work.html`, `/publications.html`, `/about.html`, `/cv.html`, and `/editor.html`.

### Files newly added
`site.js`, `work.html`, `publications.html`, `about.html`, `cv.html`, `assets/favicon.svg`, `assets/images/*`.

### Existing files replaced
`index.html`, `styles.css`, `content.js`, and this `README.md`.

The old `app.js` can remain in the repository unused; the new pages only load `site.js` and `content.js`. Your `portrait.jpg` may also remain unused; the new header/photo loads `assets/images/portrait.webp` directly.

If your website has newer content edits, do **not** blindly overwrite them: merge any new projects/publications into the new `content.js` first.

## Add new projects or edit text

1. Open `editor.html` from your local extracted website folder or at `https://ar-kshitizagarwal.github.io/editor.html`.
2. Select Profile, Projects, Publications, Education, Experience, Credentials, Engagements, or Skills.
3. Make changes, click **Save entry**, then **Download content.js**.
4. Replace `content.js` in the GitHub repository root and commit.

### Project images

Upload your image under `assets/images/` or `assets/projects/`, then set the project `image` property in the editor, e.g. `assets/projects/bindal-map.webp`. Use lightweight web-optimized images. Both pages read projects from `content.js`; a new project will appear on the Work page automatically. The homepage's **three featured projects** are set by the `featuredProjects` IDs in `content.js`; to change which appear there, update that array.

The four domain illustrations on the homepage are HTML image references and can be changed by editing `index.html`. Hero background is set in `.hero-photo` within `styles.css`.

## Important checks before publishing

- Confirm you have permission to display the uploaded river illustration and Centrio Mall photograph publicly (or replace as needed).
- Review project descriptions and precise roles, particularly the hospitality projects. Do not imply responsibility for work you did not personally undertake.
- Bhagirathi resort: linked to https://www.avatarabybhagirathi.com/ as a reference; project scope has deliberately not been specified.
- The Himalaya panoramic photo is only about 1201 × 300 px; it works well as a soft scenic background, but a higher-resolution image would improve sharpness on very large monitors.

## Technical details

No frameworks, dependencies, trackers, database, paid hosting, or server build. Files can also be opened offline by double-clicking `index.html` (some browsers may restrict local file scripts). All links are relative and work at the GitHub Pages user-site root. The website supports mobile, reduced motion, keyboard focus, and printing the CV.
