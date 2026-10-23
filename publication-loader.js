/* Optional OpenAlex publication feed; preserves the site's curated entries.
   Loaded AFTER content.js and site.js as a deferred script. */
(async () => {
  'use strict';
  const root = window.PORTFOLIO_DATA;
  if (!root) return;

  function normalize(s) {
    return String(s || '').normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
  }
  function doi(s) {
    const m = String(s || '').match(/10\.\d{4,9}\/[\w.()/:;-]+/i);
    return m ? m[0].toLowerCase().replace(/[),;.]+$/, '') : '';
  }
  function safeLink(raw) {
    try {
      const u = new URL(raw);
      return u.protocol === 'https:' ? u.href : '';
    } catch { return ''; }
  }
  function el(tag, cls, text) {
    const out = document.createElement(tag);
    if (cls) out.className = cls;
    if (text !== undefined) out.textContent = String(text);
    return out;
  }
  function renderPublication(pub, compact) {
    const row = el('article', compact ? 'publication-compact' : 'publication-item');
    row.append(el('span','pub-year',pub.year || ''));
    const info = el('div', 'publication-info');
    info.append(el(compact ? 'h3' : 'h2', '', pub.title || 'Untitled publication'));
    if (!compact) {
      info.append(el('p','pub-authors',pub.authors || ''));
      info.append(el('p','pub-venue',pub.venue || ''));
    }
    const url = safeLink(pub.url);
    if (url) {
      const a = el('a', 'inline-open', 'Read ↗');
      a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
      info.append(a);
    }
    row.append(info);
    return row;
  }
  function renderCvPublication(pub) {
    const row = el('div','cv-item'), body = el('div');
    body.append(el('h4','',pub.title || 'Untitled publication'));
    if (pub.authors) body.append(el('p','',pub.authors));
    row.append(body, el('span','cv-date',pub.year || ''));
    return row;
  }
  try {
    const response = await fetch('publications-auto.json', {cache:'no-store'});
    if (!response.ok) return;
    const incoming = await response.json();
    if (!Array.isArray(incoming.publications) || !incoming.publications.length) return;
    const manuallyCurated = Array.isArray(root.publications) ? root.publications : [];
    const seenTitles = new Set(manuallyCurated.map(p => normalize(p.title)));
    const seenDois = new Set(manuallyCurated.map(p => doi(p.doi || p.url)).filter(Boolean));
    const newRecords = [];
    for (const p of incoming.publications) {
      const titleKey = normalize(p.title), doiKey = doi(p.doi || p.url);
      if (!titleKey || seenTitles.has(titleKey) || (doiKey && seenDois.has(doiKey))) continue;
      if (typeof p.year !== 'string' || !safeLink(p.url)) continue;
      seenTitles.add(titleKey); if (doiKey) seenDois.add(doiKey);
      newRecords.push(p);
    }
    if (!newRecords.length) return;
    const combined = [...manuallyCurated, ...newRecords];
    combined.sort((a,b) => Number(b.year || 0) - Number(a.year || 0) ||
      String(a.title).localeCompare(String(b.title)));
    const page = document.body.dataset.page;
    const list = page === 'publications' ? document.getElementById('all-publications') : null;
    if (list) list.replaceChildren(...combined.map(p => renderPublication(p, false)));
    const home = page === 'index' ? document.getElementById('publication-preview-items') : null;
    if (home) home.replaceChildren(...combined.slice(0, 2).map(p => renderPublication(p, true)));
    const cv = page === 'cv' ? document.getElementById('cv-publications') : null;
    if (cv) cv.replaceChildren(...combined.map(renderCvPublication));
  } catch(err) {
    console.warn('Automatic publications not loaded. Manually curated publications remain visible.', err);
  }
})();
