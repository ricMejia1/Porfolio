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
// Reusable fallback thumbnail (keeps it simple—no nested backticks)
const IMG_FALLBACK = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225">' +
    '<rect width="100%" height="100%" fill="#12141a"/>' +
    '<text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" ' +
    'fill="#999" font-family="Inter" font-size="16">Image not found</text>' +
  '</svg>'
);

const renderProjects = (filter = 'all') => {
  const root = $('#projectGrid');
  if (!root) return;
  root.innerHTML = '';

  const all = Array.isArray(state.projects) ? state.projects : [];
  const list = all.filter(p => filter === 'all' || (p.badges || []).includes(filter));

  function buildButtonsRow(p) {
    const out = [];
    const addBtn = (html) => out.push(html);

    const hasDetails = !!p.details;

    if (Array.isArray(p.customButtons) && p.customButtons.length) {
      // Prefer up to two custom buttons, then Details (if available) as the 3rd
      const firstTwo = p.customButtons.slice(0, 2);  // reserve slot #3 for Details
      firstTwo.forEach(btn => {
        const hasUrl = btn && btn.url && btn.url !== '#';
        if (hasUrl) {
          addBtn(`<a class="btn" href="${btn.url}" target="_blank" rel="noreferrer">${btn.label || 'Link'}</a>`);
        } else {
          addBtn(`<span class="btn" aria-disabled="true">${btn.label || 'Link'}</span>`);
        }
      });

      if (hasDetails) {
        addBtn(`<button class="btn primary" data-open="${p.id}">Details</button>`);
      } else if (p.customButtons.length >= 3) {
        // If no details, let a 3rd custom occupy the last slot
        const b3 = p.customButtons[2];
        const ok = b3 && b3.url && b3.url !== '#';
        addBtn(ok
          ? `<a class="btn" href="${b3.url}" target="_blank" rel="noreferrer">${b3.label || 'Link'}</a>`
          : `<span class="btn" aria-disabled="true">${(b3 && b3.label) || 'Link'}</span>`
        );
      }
    } else {
      // Default: Live / Code / Details
      const liveOk = p.links && p.links.live && p.links.live !== '#';
      const codeOk = p.links && p.links.code && p.links.code !== '#';

      addBtn(liveOk
        ? `<a class="btn" href="${p.links.live}" target="_blank" rel="noreferrer">Live</a>`
        : `<span class="btn" aria-disabled="true">Live</span>`
      );
      addBtn(codeOk
        ? `<a class="btn" href="${p.links.code}" target="_blank" rel="noreferrer">Code</a>`
        : `<span class="btn" aria-disabled="true">Code</span>`
      );
      addBtn(`<button class="btn primary" data-open="${p.id}">Details</button>`);
    }

    // pad to exactly 3 columns
    while (out.length < 3) out.push(`<span class="btn placeholder" aria-hidden="true">–</span>`);
    return out.join('');
  }

  for (let i = 0; i < list.length; i++) {
    const p = list[i];
    const card = document.createElement('article');
    card.className = 'card';

    const onerr = "this.onerror=null; this.src='" + IMG_FALLBACK + "'";

    card.innerHTML =
      '<img loading="lazy" src="' + (p.img || '') + '" alt="' + (p.title || 'Project') +
      ' cover" class="thumb" onerror="' + onerr + '">' +
      '<h3 style="margin-top:10px">' + (p.title || '') + '</h3>' +
      '<p class="muted">' + (p.summary || '') + '</p>' +
      '<div>' + ((p.badges || []).map(function(b){ return "<span class=\'tag\'>" + b + "</span>"; }).join('')) + '</div>' +
      '<div class="actions no-print">' + buildButtonsRow(p) + '</div>';

    root.appendChild(card);
  }

  // Details modal hooks (with graceful fallback if details missing)
  $$('[data-open]').forEach(function(btn){
    btn.addEventListener('click', function(e){
      const id = e.currentTarget.getAttribute('data-open');
      const proj = all.find(function(x){ return x.id === id; });
      if (!proj) return;
      $('#modalTitle').textContent = proj.title || 'Project';
      const fallback = '<p>' + (proj.summary || 'More details coming soon.') + '</p>';
      $('#modalBody').innerHTML = proj.details || fallback;
      $('#projectModal').showModal();
    });
  });
};

// re-render and filter bindings (leave as you had them)
renderProjects();
$$('[data-filter]').forEach(function(b){
  b.addEventListener('click', function(){ renderProjects(b.dataset.filter); });
});
$('#modalClose')?.addEventListener('click', function(){ $('#projectModal').close(); });

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

// Move Resume under Contact inside the mobile menu
document.addEventListener("DOMContentLoaded", () => {
  const contactLink = document.querySelector(".menu-list a[href='#contact']");
  const resumeLink = document.querySelector(".menu-list a[href='#resume']");
  if (contactLink && resumeLink) {
    contactLink.insertAdjacentElement("afterend", resumeLink);
  }
});

// ------- Image Lightbox (works for all project thumbnails) -------
(function(){
  const dlg = document.getElementById('imgLightbox');
  const imgEl = document.getElementById('lightImg');
  const captionEl = document.getElementById('lightCaption');
  const closeBtn = document.getElementById('lightClose');

  // Event delegation: click any .thumb (even after re-render)
  document.addEventListener('click', (e) => {
    const img = e.target.closest('img.thumb');
    if (!img) return;
    const full = img.getAttribute('data-full') || img.src;
    imgEl.src = full;
    imgEl.alt = img.alt || 'Preview';
    captionEl.textContent = img.alt || 'Preview';
    dlg.showModal();
  });

  // Close via button
  closeBtn.addEventListener('click', () => dlg.close());

  // Close when clicking outside the image area
  dlg.addEventListener('click', (e) => {
    // If click is outside the inner content, close
    const dialogRect = dlg.getBoundingClientRect();
    if (
      e.clientX < dialogRect.left || e.clientX > dialogRect.right ||
      e.clientY < dialogRect.top  || e.clientY > dialogRect.bottom
    ) dlg.close();
  });

  // Esc key works automatically for <dialog>, but this ensures focus safety
  dlg.addEventListener('cancel', (e) => { e.preventDefault(); dlg.close(); });
  })();

  // Mobil button Arrow, return top
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
