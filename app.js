(() => {
  'use strict';
  const d = window.PORTFOLIO_DATA;
  if (!d) { document.body.insertAdjacentHTML('afterbegin','<p style="padding:20px;color:#a22">Content unavailable: ensure content.js exists.</p>'); return; }
  const $ = (id) => document.getElementById(id);
  const node = (tag, className, value) => { const n=document.createElement(tag); if(className)n.className=className; if(value!==undefined)n.textContent=String(value); return n; };
  const put = (id, value) => {const n=$(id); if(n)n.textContent=value||'';};
  const safeURL = (raw) => { try { const u=new URL(raw); return ['https:','http:','mailto:'].includes(u.protocol)?u.href:''; } catch { return ''; }};
  const anchor = (label, raw, className='') => { const a=node('a',className,label); const url=safeURL(raw); if(!url)return null; a.href=url; if(!url.startsWith('mailto:')) {a.target='_blank';a.rel='noopener noreferrer';} return a; };
  const p=d.profile||{};
  put('profile-headline',p.headline);put('profile-intro',p.intro);put('profile-role',p.role);put('profile-affiliation',p.affiliation);put('profile-bio',p.bio);put('print-name',p.name);put('print-role',`${p.role||''}  |  ${p.affiliation||''}`);put('footer-name',p.name);put('current-year',new Date().getFullYear());document.title=`${p.name||'Portfolio'} | Research & Practice`;
  // Keep hero typography dynamic while safely inserting the italicized final sentence.
  const headline=$('profile-headline');const raw=p.headline||'';const phrases=raw.split(/(?<=\.)\s+/);if(phrases.length>1){headline.replaceChildren(document.createTextNode(phrases[0]+' '),node('em','',phrases.slice(1).join(' ')));}
  (d.focusAreas||[]).forEach(v=>$('focus-list').append(node('span','',v)));
  const projects=d.projects||[];const grid=$('project-grid'), filters=$('project-filters');
  const categories=['All',...new Set(projects.map(x=>x.category).filter(Boolean))]; let selected='All';
  const artClass=(c)=>({'Research':'art-research','Urban planning':'art-planning','Architecture':'art-architecture','Project delivery':'art-delivery'})[c]||'art-research';
  const renderProjects=()=>{
    grid.replaceChildren(); const visible=selected==='All'?projects:projects.filter(x=>x.category===selected);put('project-count',String(visible.length).padStart(2,'0'));
    if(!visible.length){grid.append(node('p','empty-results','No work in this category yet.'));return;}
    visible.forEach(item=>{
      const card=node('article','work-card');const visual=node('div',`work-visual ${artClass(item.category)}`);const image=safeURL(item.image);
      // Local relative image paths (e.g., assets/projects/map.webp) are also supported.
      const localImage=typeof item.image==='string'&&/^(assets\/|\.\/assets\/)[a-z0-9_./-]+\.(webp|png|jpg|jpeg|avif)$/i.test(item.image)?item.image:'';
      if(image||localImage){visual.classList.add('has-image');const pic=node('img');pic.src=localImage||image;pic.alt=`Illustration for ${item.title||'project'}`;pic.loading='lazy';visual.append(pic);}
      visual.append(node('span','visual-label',item.category||'Project'));card.append(visual);
      const body=node('div','card-content');const meta=node('div','card-meta');meta.append(node('span','',item.year||''),node('span','card-status',item.status||''));body.append(meta,node('h3','',item.title||''),node('p','',item.description||''));
      const tags=node('div','tag-list');(item.tags||[]).slice(0,4).forEach(t=>tags.append(node('span','',t)));body.append(tags);
      const link=anchor('Explore project ↗',item.url,'card-link');body.append(link||node('span','card-muted','Details and material to be added'));card.append(body);grid.append(card);
    });
  };
  categories.forEach(c=>{const b=node('button','filter-btn',c);b.type='button';b.setAttribute('aria-pressed',String(c===selected));b.addEventListener('click',()=>{selected=c;[...filters.children].forEach(x=>x.setAttribute('aria-pressed',String(x===b)));renderProjects();});filters.append(b);});renderProjects();
  (d.publications||[]).forEach(pub=>{const row=node('article','publication-row');row.append(node('span','pub-year',pub.year||''));const details=node('div');details.append(node('h3','pub-title',pub.title||''));const meta=node('p','pub-details');meta.append(document.createTextNode(pub.authors||''));if(pub.venue){meta.append(node('span','pub-venue',` · ${pub.venue}`));}details.append(meta);row.append(details);row.append(anchor('Read publication ↗',pub.url,'pub-link')||node('span','pub-year','Link coming soon'));$('publication-list').append(row);});
  const scholar=anchor('Google Scholar ↗',p.scholar,'inline-link');if(scholar){$('scholar-publications-link').replaceWith(scholar);}
  const externalLinks=[['LinkedIn',p.linkedin],['ORCID',p.orcid],['ResearchGate',p.researchgate],['Google Scholar',p.scholar]];
  externalLinks.forEach(([name,url])=>{const a=anchor(`${name} ↗`,url);if(a)$('about-links').append(a);});
  [['education','education-list','degree','institution'],['experience','experience-list','title','organization']].forEach(([key,id,main,sub])=>{(d[key]||[]).forEach(item=>{const block=node('div','timeline-item');block.append(node('strong','',item[main]||''),node('span','detail',item[sub]||''),node('span','period',item.period||''));$(id).append(block);});});
  (d.credentials||[]).forEach(x=>{const item=node('div','credential');item.append(document.createTextNode(x.title||''),node('span','',x.year||''));$('credential-list').append(item);});
  (d.engagements||[]).forEach(x=>{const row=node('div','short-item');row.append(node('strong','',x.title||''));if(x.detail)row.append(node('span','detail',x.detail));if(x.year)row.append(node('span','period',x.year));$('engagement-list').append(row);});
  (d.skills||[]).forEach(x=>{const row=node('div','short-item');row.append(node('strong','',x.title||''));if(x.detail)row.append(node('span','detail',x.detail));$('skills-list').append(row);});
  const links=[['Email',p.email?'mailto:'+p.email:''],['LinkedIn',p.linkedin],['ORCID',p.orcid],['Google Scholar',p.scholar]];
  links.forEach(([name,url])=>{const a=anchor(name,url);if(a){a.append(node('span','', '↗'));$('contact-links').append(a);}});
  if(!$('contact-links').children.length){$('contact-links').append(node('p','','Add your contact details in editor.html before publishing.'));}
  $('print-cv').addEventListener('click',()=>window.print());
})();
