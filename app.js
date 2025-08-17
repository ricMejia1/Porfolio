// ------- Utilities -------
const $  = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

const state = {
  theme: localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'),
  projects: window.PROJECTS || []
};

// Apply theme from saved state
if (state.theme === 'light') document.documentElement.classList.add('light');

// Clock (Local Date & Time with Timezone, auto-adapts)
const clk = () => {
  const now = new Date();

  // Short date (Mon, Aug 19, 2025)
  const date = now.toLocaleDateString([], {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  });

  // Time (07:42:09 PM)
  const time = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  // Timezone abbreviation (e.g. CDT, PST)
  const parts = Intl.DateTimeFormat(undefined, { timeZoneName: 'short' })
    .formatToParts(now);
  const tz = parts.find(p => p.type === 'timeZoneName')?.value || '';

  // Update your element
  $('#statusClock').textContent = `${date} ${time} ${tz}`;
};

clk();
setInterval(clk, 1000);

// Projects render
const renderProjects = (filter='all') => {
  const root = $('#projectGrid');
  root.innerHTML = '';
  const list = state.projects.filter(p => filter==='all' || p.badges.includes(filter));
  for (const p of list) {
    const card = document.createElement('article');
    card.className = 'card';
    const safeImg = p.img || '';
    const onerr = `this.onerror=null; this.src='data:image/svg+xml,${encodeURIComponent("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 225\"><rect width=\"100%\" height=\"100%\" fill=\"#12141a\"/><text x=\"50%\" y=\"52%\" dominant-baseline=\"middle\" text-anchor=\"middle\" fill=\"#999\" font-family=\"Inter\" font-size=\"16\">Image not found</text></svg>")}'`;
    card.innerHTML = `
      <img loading="lazy" src="${safeImg}" alt="${p.title} cover" class="thumb" onerror="${onerr}">
      <h3 style="margin-top:10px">${p.title}</h3>
      <p class="muted">${p.summary}</p>
      <div>${p.badges.map(b=>`<span class='tag'>${b}</span>`).join('')}</div>
      <div style="display:flex;gap:10px;margin-top:10px" class="no-print">
        <a class="btn" href="${p.links.live}" target="_blank" rel="noreferrer">🔗 Live</a>
        <a class="btn" href="${p.links.code}" target="_blank" rel="noreferrer">💻 Code</a>
        <button class="btn primary" data-open="${p.id}">Details</button>
      </div>`;
    root.appendChild(card);
  }
  $$('[data-open]').forEach(btn=>btn.addEventListener('click', e=>{
    const id = e.currentTarget.getAttribute('data-open');
    const proj = state.projects.find(p=>p.id===id);
    $('#modalTitle').textContent = proj.title;
    $('#modalBody').innerHTML = proj.details;
    $('#projectModal').showModal();
  }));
}
renderProjects();
$$('[data-filter]').forEach(b=>b.addEventListener('click',()=>renderProjects(b.dataset.filter)));
$('#modalClose')?.addEventListener('click',()=>$('#projectModal').close());

// Contact (mailto)
$('#contactForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  const name = encodeURIComponent(fd.get('name'));
  const email = encodeURIComponent(fd.get('email'));
  const msg = encodeURIComponent(fd.get('message'));
  const subject = `Portfolio Contact — ${name}`;
  const body = `From: ${name} (%3C${email}%3E)%0D%0A%0D%0A${msg}`;
  location.href = `mailto:richmejia210@gmail.com?subject=${subject}&body=${body}`;
});

// Theme toggle (button + keyboard) — sync desktop & mobile buttons
const toggleTheme = ()=>{
  const root = document.documentElement;
  const light = root.classList.toggle('light');
  state.theme = light ? 'light':'dark';
  localStorage.setItem('theme', state.theme);
};
$('#themeToggle').addEventListener('click', toggleTheme);
$('#themeToggleMobile').addEventListener('click', toggleTheme);

// Mobile menu controls
const bodyEl = document.body;
const openBtn = $('#menuOpen'), closeBtn = $('#menuClose');
const panel = $('#menuPanel'), backdrop = $('#menuBackdrop');
function openMenu(){
  bodyEl.classList.add('menu-open','no-scroll');
  backdrop.hidden = false;
  panel.setAttribute('aria-hidden','false');
  openBtn.setAttribute('aria-expanded','true');
  closeBtn.focus();
}
function closeMenu(){
  bodyEl.classList.remove('menu-open','no-scroll');
  panel.setAttribute('aria-hidden','true');
  openBtn.setAttribute('aria-expanded','false');
  setTimeout(()=>{ backdrop.hidden = true; }, 200);
  openBtn.focus();
}
openBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
backdrop.addEventListener('click', closeMenu);
panel.addEventListener('keydown', e=>{ if(e.key==='Escape') closeMenu(); });
$$('[data-close]').forEach(a=>a.addEventListener('click', closeMenu));

// Quick-Nav helpers
function openQuickNav(){ const dlg = $('#quickNav'); dlg.showModal(); const input = $('#qsearch'); input.value=''; input.focus(); filterNav(''); }
function filterNav(q){ q=q.toLowerCase(); $$('#qresults li').forEach(li=>{ const t=li.textContent.trim().toLowerCase(); li.style.display = t.includes(q)?'':'none'; }); }
$('#qclose').addEventListener('click', ()=>$('#quickNav').close());
$('#qsearch').addEventListener('input', e=>filterNav(e.target.value));
$$('#qresults a').forEach(a=>a.addEventListener('click', ()=>$('#quickNav').close()));

// Help dialog close button
$('#helpClose')?.addEventListener('click', ()=> $('#helpModal').close());

// Keyboard shortcuts
document.addEventListener('keydown', (e)=>{
  const tag = (e.target.tagName||'').toLowerCase();
  const typing = tag==='input' || tag==='textarea' || e.target.isContentEditable;
  const k = e.key;
  if (k==='?' || (e.shiftKey && k==='/')) { e.preventDefault(); $('#helpModal')?.showModal(); return; }
  if (k==='Escape') { $('#helpModal')?.close(); $('#quickNav')?.close(); return; }
  if (!typing && (k.toLowerCase()==='g' || k==='/')) { e.preventDefault(); openQuickNav(); return; }
  if (!typing && k.toLowerCase()==='t') { toggleTheme(); return; }
});

// Year
$('#year').textContent = new Date().getFullYear();

// JSON-LD
$('#jsonld').textContent = JSON.stringify({
  "@context":"https://schema.org","@type":"Person",name:"Ricardo Mejia",jobTitle:"Engineering Student",url: location.href,
  sameAs:["https://github.com/ricMejia1","https://www.linkedin.com/in/ricardo-mejia-a64929251/"],
  knowsAbout:["STM32","Embedded","IoT","CAD","Robotics"],
  affiliation:{"@type":"CollegeOrUniversity","name":"Texas A&M University"}
});
