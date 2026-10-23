(() => {
'use strict';
if(!window.PORTFOLIO_DATA){document.body.textContent='Missing content.js file.';return;}
const data=JSON.parse(JSON.stringify(window.PORTFOLIO_DATA));
const $=id=>document.getElementById(id);
const fields={
 profile:[['name','Name'],['photo','Portrait image path (e.g. portrait.jpg)'],['role','Professional description'],['affiliation','Affiliation'],['location','Location'],['headline','Main headline'],['intro','Hero introduction','large'],['bio','Full biography','large'],['email','Contact email'],['linkedin','LinkedIn URL'],['scholar','Google Scholar public profile URL'],['orcid','ORCID URL'],['researchgate','ResearchGate URL']],
 projects:[['title','Project title'],['category','Category (e.g. Research, Architecture, Urban planning)'],['status','Status'],['year','Year or date range'],['description','Project description','large'],['tags','Tags separated by commas','tags'],['url','Project link (optional)'],['image','Image path (optional, e.g. assets/projects/photo.webp)']],
 publications:[['title','Publication title','large'],['authors','Author names'],['venue','Journal / book / conference'],['year','Year'],['url','DOI / publication link']],
 education:[['degree','Degree'],['institution','Institution'],['period','Period']],
 experience:[['title','Position'],['organization','Organization'],['period','Period']],
 credentials:[['title','Credential'],['year','Year']],
 engagements:[['title','Activity / workshop'],['detail','Organizer / location'],['year','Date']],
 skills:[['title','Skill area'],['detail','Skills and tools','large']]
};
let section='profile',index=0;
const titles={profile:'Profile',projects:'Projects',publications:'Publications',education:'Education',experience:'Professional experience',credentials:'Credentials',engagements:'Engagements',skills:'Skills'};
const keyName=(x)=>x.title||x.degree||x.name||'Untitled entry';
function inform(s){$('status').textContent=s;}
function item(){return section==='profile'?data.profile:(data[section]||[])[index];}
function loadTabs(){const nav=$('tabs');nav.replaceChildren();Object.keys(fields).forEach(key=>{const b=document.createElement('button');b.className=`tab ${section===key?'active':''}`;b.type='button';b.textContent=titles[key];b.addEventListener('click',()=>{saveForm();section=key;index=0;render();inform('');});nav.append(b);});}
function render(){loadTabs();$('section-title').textContent=titles[section];const records=$('record-list');records.replaceChildren();const list=data[section]||[];
 if(section!=='profile')list.forEach((entry,i)=>{const b=document.createElement('button');b.type='button';b.className=`record ${i===index?'active':''}`;b.textContent=`${i+1}. ${keyName(entry)}`;b.title=keyName(entry);b.addEventListener('click',()=>{saveForm();index=i;render();});records.append(b);});
 const current=item();const form=$('form-fields');form.replaceChildren();$('save-record').disabled=!current;$('delete-record').style.display=section==='profile'?'none':'';$('add-record').style.display=section==='profile'?'none':'';
 if(!current){form.textContent='No entries yet. Select “Add new” to create one.';return;}
 fields[section].forEach(([name,label,type])=>{const div=document.createElement('div');div.className='field'+(type==='large'?' full':'');const lab=document.createElement('label');const id=`input-${name}`;lab.htmlFor=id;lab.textContent=label;div.append(lab);const input=document.createElement(type==='large'?'textarea':'input');input.id=id;input.dataset.field=name;input.value=type==='tags'?(current[name]||[]).join(', '):(current[name]||'');if(type!=='large')input.type='text';div.append(input);form.append(div);});
}
function saveForm(){const current=item();if(!current)return;document.querySelectorAll('[data-field]').forEach(input=>{const name=input.dataset.field;current[name]=name==='tags'?input.value.split(',').map(x=>x.trim()).filter(Boolean):input.value.trim();});}
$('save-record').addEventListener('click',()=>{saveForm();render();inform('Entry saved in this editing session. Download content.js to keep the changes.');});
$('add-record').addEventListener('click',()=>{saveForm();const blank={};fields[section].forEach(([name])=>{blank[name]=name==='tags'?[]:'';});if(section==='projects')blank.id='project-'+Date.now();data[section].unshift(blank);index=0;render();inform('New entry created. Fill in the fields, then save and download.');document.querySelector('[data-field]')?.focus();});
$('delete-record').addEventListener('click',()=>{const arr=data[section];if(!arr||!arr.length)return;if(!confirm('Remove this entry from the downloadable website data?'))return;arr.splice(index,1);index=Math.max(0,index-1);render();inform('Entry removed from this editing session. Download to retain the change.');});
$('download').addEventListener('click',()=>{saveForm();data.profile.updated=new Date().toISOString().slice(0,10);const source='/* Website content. Edit with editor.html. */\nwindow.PORTFOLIO_DATA = '+JSON.stringify(data,null,2)+';\n';const blob=new Blob([source],{type:'text/javascript;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='content.js';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);inform('Downloaded content.js. Replace the old file in your GitHub repository to publish your changes.');});
render();
})();
