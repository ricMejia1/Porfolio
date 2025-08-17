// ------- Red Particles Background (no libs) -------
(function(){
  const canvas = document.getElementById('bg-net');
  const ctx = canvas.getContext('2d');
  let DPR = Math.max(1, devicePixelRatio || 1);
  let w=0,h=0, nodes=[], raf, mouse={x:-9999,y:-9999};
  const N_BASE = 70, SPEED = 0.25, LINK_DIST = 120, MOUSE_PULL = 70; const RED = 'rgba(239,68,68,';
  const rand=(a,b)=>a + Math.random()*(b-a);

  function resize(){
    if(!canvas) return;
    w = canvas.width = innerWidth * DPR;
    h = canvas.height = innerHeight * DPR;
    nodes = [];
    const count = Math.round(N_BASE * Math.sqrt((innerWidth*innerHeight)/(1440*900)));
    for(let i=0;i<count;i++) nodes.push({ x:rand(0,w), y:rand(0,h), vx:rand(-SPEED,SPEED)*DPR, vy:rand(-SPEED,SPEED)*DPR, r:rand(1.5,3.2)*DPR });
  }

  function step(){
    ctx.clearRect(0,0,w,h);
    for(let i=0;i<nodes.length;i++){
      const a = nodes[i]; a.x+=a.vx; a.y+=a.vy; if(a.x<0||a.x>w) a.vx*=-1; if(a.y<0||a.y>h) a.vy*=-1;
      const dxm=a.x-mouse.x*DPR, dym=a.y-mouse.y*DPR, dm2=dxm*dxm+dym*dym;
      if(dm2 < (MOUSE_PULL*DPR)*(MOUSE_PULL*DPR)){ a.vx += dxm*0.00002; a.vy += dym*0.00002; }
      ctx.beginPath(); ctx.fillStyle = RED+'0.55)'; ctx.arc(a.x,a.y,a.r,0,Math.PI*2); ctx.fill();
      for(let j=i+1;j<nodes.length;j++){
        const b=nodes[j]; const dx=a.x-b.x, dy=a.y-b.y; const d2=dx*dx+dy*dy; const max=(LINK_DIST*DPR)*(LINK_DIST*DPR);
        if(d2<max){ const alpha = 1 - d2/max; ctx.strokeStyle = RED + (0.22*alpha) + ')'; ctx.lineWidth=DPR; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke(); }
      }
    }
    raf = requestAnimationFrame(step);
  }

  addEventListener('resize', resize);
  addEventListener('mousemove', e=>{ mouse.x=e.clientX; mouse.y=e.clientY; });
  addEventListener('mouseleave', ()=>{ mouse.x=-9999; mouse.y=-9999; });

  const media = matchMedia('(prefers-reduced-motion: reduce)');
  function start(){ cancelAnimationFrame(raf); resize(); if(!media.matches) step(); }
  media.addEventListener?.('change', start); start();
})();
