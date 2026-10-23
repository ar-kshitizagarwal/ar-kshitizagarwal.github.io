(() => {
 'use strict';
 const data = window.PORTFOLIO_DATA || {};
 const $=id=>document.getElementById(id);
 const make=(tag, cls, txt)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(txt!==undefined)el.textContent=txt;return el;};
 const safeUrl=raw=>{try{const u=new URL(raw);return ['https:','mailto:'].includes(u.protocol)?u.href:'';}catch{return '';}};
 const imgFor=(project,cls)=>{
   const wrap=make('div',cls);
   const raw=project.image||'';
   if(/^(assets\/)[A-Za-z0-9_./-]+\.(webp|jpg|jpeg|png|svg)$/i.test(raw)&&!raw.includes('..')){
    const im=make('img');im.src=raw;im.alt=project.imageAlt||`Illustration for ${project.title}`;im.loading='lazy';wrap.append(im);
   } else {wrap.classList.add('plain-art');}
   return wrap;
 };
 const tag=(text, cls='')=>make('span',cls,text);
 const extLink=(text,url)=>{const safe=safeUrl(url);if(!safe)return null;const a=make('a','inline-open',text);a.href=safe;a.target='_blank';a.rel='noopener noreferrer';return a;};
 function projectCard(p, featured=false){
  const article=make('article',featured?'featured-card':'project-card');article.id=featured?`feature-${p.id}`:p.id;
  article.append(imgFor(p,featured?'featured-img':'project-img'));
  const body=make('div',featured?'featured-card-body':'project-card-body');
  const meta=make('p','card-meta');meta.append(tag(p.category||'Work'),tag(' / '),tag(p.year||''));body.append(meta);
  body.append(make('h3','',p.title||'Untitled project'));
  const desc=make('p','card-description',p.description||'');body.append(desc);
  const bottom=make('div','card-bottom');
  if(featured){const a=make('a','text-link','Explore project ↗');a.href=`work.html#${encodeURIComponent(p.id)}`;bottom.append(a);}
  else {
    const tags=make('div','tag-row');(p.tags||[]).slice(0,3).forEach(t=>tags.append(tag(t,'tag')));bottom.append(tags);
    if(safeUrl(p.url)){bottom.append(extLink('Project link ↗',p.url));}
  }
  body.append(bottom);article.append(body);return article;
 }
 function publicationItem(pub,compact=false){
   const row=make('article',compact?'publication-compact':'publication-item');
   row.append(make('span','pub-year',pub.year||''));
   const info=make('div','publication-info');info.append(make(compact?'h3':'h2','',pub.title||'Untitled publication'));
   if(!compact){info.append(make('p','pub-authors',pub.authors||''));info.append(make('p','pub-venue',pub.venue||''));}
   const link=extLink('Read ↗',pub.url); if(link) info.append(link);row.append(info);return row;
 }
 const page=document.body.dataset.page;
 $('year').textContent=String(new Date().getFullYear());
 const toggle=document.querySelector('.menu-toggle');const menu=$('mobile-links');
 if(toggle&&menu){
  toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');menu.hidden=!open;});
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.hidden=true;toggle.setAttribute('aria-expanded','false');}));
 }
 if(page==='index'){
  const container=$('featured-grid');container.replaceChildren();
  const featured=data.featuredProjects||[];
  featured.forEach(id=>{const p=(data.projects||[]).find(p=>p.id===id);if(p)container.append(projectCard(p,true));});
  if(!container.children.length){(data.projects||[]).slice(0,3).forEach(p=>container.append(projectCard(p,true)));}
  const pub=$('publication-preview-items');(data.publications||[]).slice(0,2).forEach(p=>pub.append(publicationItem(p,true)));
 }
 if(page==='work'){
  const projects=data.projects||[];
  const groups={
   water:p=>p.category==='Research' || /water|flood|resilience/i.test((p.tags||[]).join(' ')+' '+p.title),
   planning:p=>p.category==='Urban planning'||(/geoai|planning|ecological/i.test((p.tags||[]).join(' ')+' '+p.title)&&p.category==='Research'),
   architecture:p=>p.category==='Architecture',
   delivery:p=>p.category==='Project delivery'
  };
  const buttons=[...document.querySelectorAll('.filter')];const container=$('all-projects');
  const show=(filter)=>{
   if(!['all',...Object.keys(groups)].includes(filter))filter='all';
   buttons.forEach(b=>{const yes=b.dataset.focus===filter;b.classList.toggle('active',yes);b.setAttribute('aria-pressed',String(yes));});
   container.replaceChildren();
   const visible=projects.filter(p=>filter==='all'||groups[filter](p));
   visible.forEach(p=>container.append(projectCard(p)));
   $('work-count').textContent=visible.length+' '+(visible.length===1?'project':'projects')+' in this view';
   const newUrl=filter==='all'?'work.html':'work.html?focus='+filter;
   if(location.search !== (filter==='all'?'':'?focus='+filter) && history.replaceState) { try { history.replaceState({},'',newUrl); } catch(e) { /* Offline preview can have a null origin. */ } }
  };
  buttons.forEach(b=>b.addEventListener('click',()=>show(b.dataset.focus)));
  const req=new URLSearchParams(location.search).get('focus')||'all';
  show(req);
  if(location.hash){const p=projects.find(p=>p.id===decodeURIComponent(location.hash.slice(1)));if(p){show('all');setTimeout(()=>$(p.id)?.scrollIntoView({block:'center',behavior:'smooth'}),100);}}
 }
 if(page==='publications'){
  const container=$('all-publications');(data.publications||[]).forEach(pub=>container.append(publicationItem(pub)));
 }
 if(page==='about'){
  $('about-bio').textContent=data.profile?.bio||'';
  const c=$('about-education');(data.education||[]).forEach(e=>{
   const r=make('div','simple-row');const t=make('div');t.append(make('h3','',e.degree));t.append(make('p','',e.institution));r.append(t,make('span','simple-period',e.period));c.append(r);
  });
 }
 if(page==='cv'){
  const map={
   education:[['degree','institution','period']],
   experience:[['title','organization','period']],
   publications:[['title','authors','year']],
   credentials:[['title','','year']],
   engagements:[['title','detail','year']],
   skills:[['title','detail','']]
  };
  Object.entries(map).forEach(([key,desc])=>{
   const list=data[key]||[];const el=$('cv-'+key);if(!el)return;
   const [major,minor,date]=desc[0];list.forEach(item=>{
    const row=make('div','cv-item');const text=make('div');text.append(make('h4','',item[major]||''));if(minor&&item[minor])text.append(make('p','',item[minor]));row.append(text);if(date&&item[date])row.append(make('span','cv-date',item[date]));el.append(row);
   });
  });
  $('print-cv')?.addEventListener('click',()=>window.print());
 }
})();
