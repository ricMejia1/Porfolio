// ------- Utilities -------
const $  = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

const state = {
  projects: window.PROJECTS || []
};

const PROJECT_ORDER = [
  'cruisecontrolcar',
  'mxet400-mini-project-2',
  'SCUTTLEROBOT',
  'smartglow',
  'capacitorcar',
  'k2639',
  'linetracker',
  'frc4063',
  'expandlet',
  'petfeeder',
  'gradecalculator',
  'PBE',
  'SOG',
  'OPW'
];

document.documentElement.classList.add('light');
localStorage.setItem('theme', 'light');

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

  const clockEl = $('#statusClock');
  if (clockEl) clockEl.textContent = `${date} ${time} ${tz}`;
};

if ($('#statusClock')) {
  clk();
  setInterval(clk, 1000);
}

// Projects render
// Reusable fallback thumbnail.
const IMG_FALLBACK = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225">' +
    '<rect width="100%" height="100%" fill="#12141a"/>' +
    '<text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" ' +
    'fill="#999" font-family="Inter" font-size="16">Project visual coming soon</text>' +
  '</svg>'
);

const renderProjects = (filter = 'all') => {
  const root = $('#projectGrid');
  if (!root) return;
  root.innerHTML = '';

  const all = Array.isArray(state.projects) ? state.projects : [];
  const list = all
    .filter(p => filter === 'all' || (p.badges || []).includes(filter))
    .sort((a, b) => {
      const aRank = PROJECT_ORDER.includes(a.id) ? PROJECT_ORDER.indexOf(a.id) : PROJECT_ORDER.length;
      const bRank = PROJECT_ORDER.includes(b.id) ? PROJECT_ORDER.indexOf(b.id) : PROJECT_ORDER.length;
      return aRank - bRank;
    });

  function buildButtonsRow(p) {
    const out = [];
    const addBtn = (html) => out.push(html);
    const hasDetails = !!p.details;

    function renderCustomButton(btn) {
      if (btn && btn.action === 'game') {
        const which = btn.game || 'menu';
        return `<button class="btn primary play-game" data-game="${which}">${btn.label || 'Play'}</button>`;
      }

      const ok = btn && btn.url && btn.url !== '#';
      return ok
        ? `<a class="btn" href="${btn.url}" target="_blank" rel="noreferrer">${btn.label || 'Link'}</a>`
        : `<span class="btn" aria-disabled="true">${(btn && btn.label) || 'Link'}</span>`;
    }

    if (Array.isArray(p.customButtons) && p.customButtons.length) {
      p.customButtons.forEach(btn => addBtn(renderCustomButton(btn)));
      if (hasDetails) addBtn(`<button class="btn primary" data-open="${p.id}">Details</button>`);
    } else {
      const liveOk = p.links && p.links.live && p.links.live !== '#';
      const codeOk = p.links && p.links.code && p.links.code !== '#';

      if (liveOk) addBtn(`<a class="btn" href="${p.links.live}" target="_blank" rel="noreferrer">Live</a>`);
      if (codeOk) addBtn(`<a class="btn" href="${p.links.code}" target="_blank" rel="noreferrer">Code</a>`);
      if (hasDetails) addBtn(`<button class="btn primary" data-open="${p.id}">Details</button>`);
    }

    return out.join('');
  }


  for (let i = 0; i < list.length; i++) {
    const p = list[i];
    const card = document.createElement('article');
    card.className = 'card project-card';

    const onerr = "this.onerror=null; this.src='" + IMG_FALLBACK + "'";

    card.innerHTML =
      '<div class="thumb-frame ' + (p.imageFit === 'contain' ? 'fit-contain' : 'fit-cover') + '">' +
      '<img loading="lazy" src="' + (p.img || IMG_FALLBACK) + '" alt="' + (p.title || 'Project') +
      ' cover" class="thumb" onerror="' + onerr + '">' +
      '</div>' +
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

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.play-game');
  if (!btn) return;
  const which = btn.dataset.game || 'menu'; // 'menu', 'snake', 'tictactoe', 'math'
  if (window.SOG && typeof window.SOG.open === 'function') {
    window.SOG.open(which);
  } else {
    alert('Games module not loaded.');
  }
});

// ------- Formspree submit (with graceful fallback) -------
(() => {
  const form  = document.getElementById('contactForm');
  const btn   = document.getElementById('contactSubmit');
  const status= document.getElementById('formStatus');
  if (!form) return;

  const FORMSPREE_ID = 'meoznrnz';
  const ENDPOINT = `https://formspree.io/f/${FORMSPREE_ID}`;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    status.textContent = '';
    const fd = new FormData(form);

    // basic validation
    const name = (fd.get('name') || '').toString().trim();
    const email= (fd.get('email')|| '').toString().trim();
    const msg  = (fd.get('message')|| '').toString().trim();
    const trap = (fd.get('_gotcha')|| '').toString().trim();
    if (!name || !email || !msg) { status.textContent = 'Please fill out all fields.'; return; }
    if (trap) { status.textContent = 'Spam blocked.'; return; }

    try {
      btn.disabled = true; btn.textContent = 'Sending...';

      // Send as multipart/form-data (preferred by Formspree)
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: fd
      });

      if (res.ok) {
        status.textContent = 'Thanks! Your message was sent.';
        form.reset();
      } else {
        // Try to surface Formspree's error
        let err = 'Submission failed. Please try again or email me directly.';
        try {
          const data = await res.json();
          if (data && data.errors && data.errors[0]?.message) err = data.errors[0].message;
        } catch {}
        status.textContent = err;
      }
    } catch (err) {
      // Network problem: fall back to the form's native submit (no-JS path)
      status.textContent = 'Network issue detected. Trying fallback...';
      form.submit(); // uses the action/method attributes
    } finally {
      btn.disabled = false; btn.textContent = 'Send';
    }
  });
})();


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
});

// Year
$('#year').textContent = new Date().getFullYear();

// JSON-LD
$('#jsonld').textContent = JSON.stringify({
  "@context":"https://schema.org","@type":"Person",name:"Ricardo Mejia",jobTitle:"Engineering Student",url: location.href,
  sameAs:["https://github.com/ricMejia1","https://www.linkedin.com/in/ricardo-mejia-a64929251/"],
  knowsAbout:["ROS 2","Universal Robots UR3e","Yaskawa Motoman","PLC/HMI","Manufacturing Automation","Controls","Embedded Systems","STM32","IoT","CAD"],
  affiliation:{"@type":"CollegeOrUniversity","name":"Texas A&M University"}
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

  // Mobile button arrow, return top
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


