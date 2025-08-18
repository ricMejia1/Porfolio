// games.js
(function () {
  // Create the modal once if it's missing
  function ensureModal() {
    let dlg = document.getElementById('gameModal');
    if (!dlg) {
      dlg = document.createElement('dialog');
      dlg.id = 'gameModal';
      dlg.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid color-mix(in srgb,var(--text) 10%, transparent)">
          <strong id="gameTitle">Sack O' Games</strong>
          <div style="display:flex;gap:8px">
            <button class="btn" id="gameBack" style="display:none">Back</button>
            <button class="btn" id="gameClose" aria-label="Close">✕</button>
          </div>
        </div>
        <div id="gameScreen" style="padding:12px 14px"></div>
      `;
      document.body.appendChild(dlg);
    }
    return dlg;
  }

  function showMenu(dlg) {
    const screen = dlg.querySelector('#gameScreen');
    dlg.querySelector('#gameTitle').textContent = "Sack O' Games mini JavaScrip Version";
    dlg.querySelector('#gameBack').style.display = 'none';
    screen.innerHTML = `
      <div style="display:grid;gap:12px;max-width:420px">
        <p class="muted">Pick a mini game. These are pure JS and run in the browser.</p>
        <button class="btn primary" data-play="snake">Play Snake (mini)</button>
        <button class="btn primary" data-play="tictactoe">Play Tic-Tac-Toe (2P)</button>
        <button class="btn primary" data-play="math">Quick Math (10Qs)</button>
      </div>
    `;
  }

  // --- Simple games ---

  // Tiny Snake (canvas)
  function runSnake(dlg) {
    const screen = dlg.querySelector('#gameScreen');
    dlg.querySelector('#gameTitle').textContent = 'Snake';
    dlg.querySelector('#gameBack').style.display = '';
    screen.innerHTML = `
        <div style="display:grid;gap:10px;justify-items:center">
        <canvas id="snakeCanvas" width="320" height="320"
            style="border:1px solid color-mix(in srgb,var(--text) 20%, transparent);display:block"></canvas>
        <p class="muted" style="text-align:center">Use arrow keys (desktop) or tap the D-pad (mobile).</p>

        <!-- D-pad (hidden via CSS on larger screens) -->
        <div class="dpad" id="dpad">
            <button data-dir="up"    aria-label="Up">▲</button>
            <div class="middle-row">
            <button data-dir="left"  aria-label="Left">◀</button>
            <button data-dir="right" aria-label="Right">▶</button>
            </div>
            <button data-dir="down"  aria-label="Down">▼</button>
        </div>
        </div>
    `;

    const c = screen.querySelector('#snakeCanvas');
    const ctx = c.getContext('2d');
    const N = 16, cell = c.width / N;
    let dir = {x:1, y:0};
    let snake = [{x:8,y:8}];
    let food = spawn();
    let alive = true;
    const dpad = screen.querySelector('#dpad');

    function spawn(){ return { x: Math.floor(Math.random()*N), y: Math.floor(Math.random()*N) }; }
    function step(){
        if (!alive) return;
        const head = { x: (snake[0].x + dir.x + N) % N, y: (snake[0].y + dir.y + N) % N };
        if (snake.some(s => s.x===head.x && s.y===head.y)) { alive = false; draw(true); return; }
        snake.unshift(head);
        if (head.x===food.x && head.y===food.y) food = spawn(); else snake.pop();
        draw(false);
    }
    function draw(dead){
        ctx.clearRect(0,0,c.width,c.height);
        ctx.globalAlpha = 0.2;
        for(let i=0;i<N;i++){ ctx.fillRect(i*cell,0,1,c.height); ctx.fillRect(0,i*cell,c.width,1); }
        ctx.globalAlpha = 1;
        ctx.fillStyle = dead ? '#a00' : '#ef4444';  ctx.fillRect(food.x*cell, food.y*cell, cell, cell);
        ctx.fillStyle = dead ? '#555' : '#22c55e';  snake.forEach(s => ctx.fillRect(s.x*cell, s.y*cell, cell, cell));
        if (dead) { ctx.fillStyle = '#999'; ctx.font = '16px Inter, sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('Game over — press Back', c.width/2, c.height/2); }
    }
    function onKey(e){
        if (e.key==='ArrowUp'   && dir.y!== 1) dir={x:0,y:-1};
        if (e.key==='ArrowDown' && dir.y!==-1) dir={x:0,y: 1};
        if (e.key==='ArrowLeft' && dir.x!== 1) dir={x:-1,y:0};
        if (e.key==='ArrowRight'&& dir.x!==-1) dir={x: 1,y:0};
    }
    document.addEventListener('keydown', onKey);

    const setDir = (d)=>{
        if (d==='up'    && dir.y!== 1) dir={x:0,y:-1};
        if (d==='down'  && dir.y!==-1) dir={x:0,y: 1};
        if (d==='left'  && dir.x!== 1) dir={x:-1,y:0};
        if (d==='right' && dir.x!==-1) dir={x: 1,y:0};
    };
    const onTap = (e)=>{
        const btn = e.target.closest('button[data-dir]');
        if (!btn) return;
        setDir(btn.dataset.dir);
    };
    dpad.addEventListener('click', onTap);
    dpad.addEventListener('touchstart', (e)=>{ onTap(e); e.preventDefault(); }, {passive:false});

    const timer = setInterval(step, 120);
    draw(false);

    // cleanup when leaving this screen
    return () => { clearInterval(timer); document.removeEventListener('keydown', onKey); };
  }


  // Tic-Tac-Toe (2 players, buttons)
  function runTTT(dlg){
    const screen = dlg.querySelector('#gameScreen');
    dlg.querySelector('#gameTitle').textContent = 'Tic-Tac-Toe';
    dlg.querySelector('#gameBack').style.display = '';
    screen.innerHTML = `
      <div style="display:grid;gap:10px;justify-items:center">
        <div id="tttBoard" style="display:grid;grid-template-columns:repeat(3,80px);gap:8px"></div>
        <div id="tttMsg" class="muted">Turn: X</div>
      </div>
    `;
    const boardEl = screen.querySelector('#tttBoard');
    const msg = screen.querySelector('#tttMsg');
    let turn = 'X', done = false;
    const cells = Array.from({length:9}, (_,i)=>{
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = '';
      b.style.height='80px'; b.style.width='80px';
      b.addEventListener('click', ()=>{
        if (done || b.textContent) return;
        b.textContent = turn;
        if (win()) { msg.textContent = `Winner: ${turn}`; done = true; return; }
        if ([...boardEl.children].every(x=>x.textContent)) { msg.textContent = 'Draw'; done=true; return; }
        turn = (turn==='X')?'O':'X';
        msg.textContent = `Turn: ${turn}`;
      });
      boardEl.appendChild(b);
      return b;
    });
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    function win(){
      return lines.some(([a,b,c])=>{
        const v = cells[a].textContent;
        return v && v===cells[b].textContent && v===cells[c].textContent;
      });
    }
    return () => {}; // nothing to clean
  }

  // Quick Math (10 Qs)
  function runMath(dlg){
    const screen = dlg.querySelector('#gameScreen');
    dlg.querySelector('#gameTitle').textContent = 'Quick Math';
    dlg.querySelector('#gameBack').style.display = '';
    screen.innerHTML = `
      <div style="display:grid;gap:12px;max-width:420px">
        <div id="q" style="font-size:20px"></div>
        <input id="ans" class="btn" placeholder="Your answer">
        <div class="muted" id="prog"></div>
      </div>
    `;
    const qEl = screen.querySelector('#q');
    const aEl = screen.querySelector('#ans');
    const pEl = screen.querySelector('#prog');
    let i = 0, score = 0, curAns = 0;

    function next(){
      if (i>=10){ qEl.textContent = `Done! Score: ${score}/10`; aEl.disabled = true; return; }
      const a = Math.floor(Math.random()*10)+1;
      const b = Math.floor(Math.random()*10)+1;
      const ops = ['+','-','×'];
      const op = ops[Math.floor(Math.random()*ops.length)];
      curAns = op==='+'? a+b : op==='-'? a-b : a*b;
      qEl.textContent = `${i+1})  ${a} ${op} ${b} = ?`;
      pEl.textContent = `Question ${i+1} of 10`;
      aEl.value=''; aEl.focus();
    }
    aEl.addEventListener('keydown', (e)=>{
      if (e.key==='Enter'){
        const v = Number(aEl.value.trim());
        if (!Number.isNaN(v) && v===curAns) score++;
        i++; next();
      }
    });
    next();
    return () => {}; // nothing to clean
  }

  // Global module
  let cleanup = null;
  window.SOG = {
    open(which = 'menu') {
      const dlg = ensureModal();
      const screen = dlg.querySelector('#gameScreen');
      const back = dlg.querySelector('#gameBack');
      const closeBtn = dlg.querySelector('#gameClose');

      // close handlers (rebound each open)
      closeBtn.onclick = () => dlg.close();
      back.onclick = () => {
        if (cleanup) { cleanup(); cleanup = null; }
        showMenu(dlg);
        bindMenu(dlg);
      };

      dlg.addEventListener('cancel', (e) => { e.preventDefault(); dlg.close(); });

      // show modal
      dlg.showModal();

      // switch
      if (cleanup) { cleanup(); cleanup = null; }
      if (which === 'snake') cleanup = runSnake(dlg);
      else if (which === 'tictactoe') cleanup = runTTT(dlg);
      else if (which === 'math') cleanup = runMath(dlg);
      else {
        showMenu(dlg);
        bindMenu(dlg);
      }

      function bindMenu(d) {
        d.querySelectorAll('[data-play]').forEach(btn=>{
          btn.onclick = () => {
            const w = btn.getAttribute('data-play');
            if (cleanup) { cleanup(); cleanup=null; }
            if (w==='snake') cleanup = runSnake(d);
            if (w==='tictactoe') cleanup = runTTT(d);
            if (w==='math') cleanup = runMath(d);
          };
        });
      }
    }
  };
})();


