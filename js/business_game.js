// basic clock
    function timeFmt(d){return d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});}
    setInterval(()=>document.getElementById('time').textContent = timeFmt(new Date()),1000);

    const desktop = document.getElementById('desktop');
    const tbIcons = document.getElementById('tbIcons');
    const startBtn = document.getElementById('startBtn');
    const startMenu = document.getElementById('startMenu');

    const windows = {}; let z=50;

    // openers
    document.querySelectorAll('[data-app]').forEach(el=> el.addEventListener('dblclick', ()=> openApp(el.dataset.app)));
    document.querySelectorAll('.ql').forEach(el=> el.addEventListener('click', ()=> openApp(el.dataset.app)));
    startBtn.addEventListener('click', ()=> startMenu.classList.toggle('show'));
    document.addEventListener('click', (e)=>{ if(!startMenu.contains(e.target) && !startBtn.contains(e.target)) startMenu.classList.remove('show'); });

    function createWindow(id, title, html, x=140,y=100){
      if(windows[id]) return focus(id);
      const w = document.createElement('div'); w.className='window'; w.dataset.winId=id; w.style.left = x+'px'; w.style.top = y+'px'; w.style.zIndex = ++z;
      w.innerHTML = `<div class="titlebar"><div class="title"><strong>${title}</strong></div><div class="controls"><button class="btn" data-act="min">—</button><button class="btn" data-act="max">◻</button><button class="btn" data-act="close">✕</button></div></div><div class="content">${html}</div><div class="resizer"></div>`;
      desktop.appendChild(w);
      windows[id] = {el:w,min:false}; addTbIcon(id,title);
      makeDrag(w); makeResize(w); focus(id);
    }
    function focus(id){const o=windows[id]; if(!o) return; o.el.classList.add('focus'); o.el.style.zIndex=++z; setTimeout(()=>{o.el.classList.remove('focus')},1200);}
    function closeWin(id){ if(!windows[id]) return; const el = windows[id].el; const tb = document.querySelector(`[data-task='${id}']`); if(tb) tb.remove(); el.remove(); delete windows[id]; }
    function minWin(id){ const o=windows[id]; if(!o) return; o.el.style.display = 'none'; o.min = true; }
    function toggleMin(id){ const o=windows[id]; if(!o) return; if(o.min){ o.el.style.display='block'; o.min=false; focus(id);} else minWin(id); }

    function addTbIcon(id,title){ const b = document.createElement('div'); b.className='tb-icon'; b.textContent = title[0]||'G'; b.dataset.task=id; b.title=title; b.addEventListener('click', ()=> toggleMin(id)); tbIcons.appendChild(b); }

    desktop.addEventListener('click',(e)=>{ const action = e.target.dataset.act; if(!action) return; const win = e.target.closest('.window'); const id = win && win.dataset.winId; if(action==='close'){closeWin(id);} if(action==='min'){minWin(id);} if(action==='max'){ if(win.classList.contains('max')){win.classList.remove('max');win.style.left='';win.style.top='';win.style.width='';win.style.height='';} else {win.classList.add('max');win.style.left='20px';win.style.top='20px';win.style.width=(window.innerWidth-160)+'px';win.style.height=(window.innerHeight-160)+'px';}} });

    // drag
    function makeDrag(el){ const title = el.querySelector('.titlebar'); let down=false,sx=0,sy=0,ox=0,oy=0; title.addEventListener('mousedown', (e)=>{ down=true; sx=e.clientX; sy=e.clientY; const r=el.getBoundingClientRect(); ox = r.left; oy = r.top; el.style.zIndex = ++z; e.preventDefault(); }); document.addEventListener('mousemove', (e)=>{ if(!down) return; let nx = ox + (e.clientX - sx); let ny = oy + (e.clientY - sy); nx = Math.max(8, Math.min(nx, window.innerWidth - el.offsetWidth - 8)); ny = Math.max(8, Math.min(ny, window.innerHeight - el.offsetHeight - 80)); el.style.left = nx+'px'; el.style.top = ny+'px'; }); document.addEventListener('mouseup', ()=> down=false); }
    // resize
    function makeResize(el){ const r = el.querySelector('.resizer'); if(!r) return; let resizing=false, sx=0, sy=0, sw=0, sh=0; r.addEventListener('mousedown', (e)=>{ resizing=true; sx=e.clientX; sy=e.clientY; sw=el.offsetWidth; sh=el.offsetHeight; e.preventDefault(); }); document.addEventListener('mousemove', (e)=>{ if(!resizing) return; el.style.width = Math.max(300, sw + (e.clientX - sx)) + 'px'; el.style.height = Math.max(180, sh + (e.clientY - sy)) + 'px'; }); document.addEventListener('mouseup', ()=> resizing=false); }

    // templates
    function launcherTpl(){ return `<div style="padding:8px"><div style="display:flex;gap:10px;flex-wrap:wrap"><div style="width:140px;padding:8px;border-radius:8px;background:linear-gradient(135deg,var(--neon-pink),var(--neon-cyan));text-align:center;cursor:pointer">Play Riftblade</div><div style="width:140px;padding:8px;border-radius:8px;background:linear-gradient(135deg,var(--neon-pink),var(--neon-cyan));text-align:center;cursor:pointer">Play Neon Drift</div><div style="width:140px;padding:8px;border-radius:8px;background:linear-gradient(135deg,var(--neon-pink),var(--neon-cyan));text-align:center;cursor:pointer">Play AstroCraft</div></div></div>`; }
    function statsTpl(){ return `<div style="padding:8px"><div><small style="color:var(--muted)">CPU</small><div class="bar"><div id="cpu2" class="bar-inner" style="width:26%"></div></div></div><div style="margin-top:8px"><small style="color:var(--muted)">RAM</small><div class="bar"><div id="ram2" class="bar-inner" style="width:45%"></div></div></div><div style="margin-top:8px"><small style="color:var(--muted)">FPS</small><div style="font-size:18px;font-weight:700;"><span id="fps">60</span> <small style="color:var(--muted)">fps</small></div></div></div>`; }
    function chatTpl(){ return `<div style="padding:8px;display:flex;flex-direction:column;height:360px"><div id="chatBox" style="flex:1;overflow:auto;border-radius:8px;padding:8px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.02)"></div><div style="display:flex;gap:8px;margin-top:8px"><input id="chatIn" style="flex:1;padding:8px;border-radius:8px;border:1px solid rgba(255,255,255,0.03);background:transparent;color:inherit" placeholder="Say something..."/><button id="sendChat" class="btn">Send</button></div></div>`; }
    function musicTpl(){ return `<div style="padding:8px"><div style="display:flex;gap:10px;align-items:center"><div style="width:56px;height:56px;border-radius:8px;background:linear-gradient(135deg,var(--neon-pink),var(--neon-cyan));display:flex;align-items:center;justify-content:center">♪</div><div><strong id="track2">No song</strong><div style="color:var(--muted);font-size:13px">Artist</div></div></div></div>`; }

    function openApp(name){ if(name==='launcher') createWindow('win-launcher','Game Launcher', launcherTpl(), 160,110); if(name==='stats') createWindow('win-stats','System Stats', statsTpl(), 200,140); if(name==='chat') createWindow('win-chat','Chat', chatTpl(), 240,170); if(name==='music') createWindow('win-music','Music', musicTpl(), 260,200); if(name==='settings') createWindow('win-settings','Settings','<div style="padding:12px">Settings go here</div>',300,220);
      setTimeout(()=>{ attachBehaviors(); },60);
    }

    // attach behaviors like chat
    function attachBehaviors(){ const chatWin = document.querySelector('[data-win-id="win-chat"]'); if(chatWin){ const chatBox = chatWin.querySelector('#chatBox'); const inpt = chatWin.querySelector('#chatIn'); const btn = chatWin.querySelector('#sendChat'); btn.addEventListener('click', ()=>{ if(!inpt.value) return; const p = document.createElement('div'); p.textContent = 'You: '+inpt.value; p.style.margin='6px 0'; chatBox.appendChild(p); chatBox.scrollTop = chatBox.scrollHeight; inpt.value=''; }); }
      // fake dynamic CPU/RAM values
      const cpuBar = document.getElementById('cpu2'); const ramBar = document.getElementById('ram2'); const fps = document.getElementById('fps'); if(cpuBar && ramBar && fps){ setInterval(()=>{ const c = Math.floor(20 + Math.random()*65); const r = Math.floor(20 + Math.random()*70); cpuBar.style.width = c+'%'; ramBar.style.width = r+'%'; fps.textContent = Math.round(40 + Math.random()*40); },1200);} }

    // open launcher on load
    window.addEventListener('load', ()=>{ openApp('launcher'); openApp('stats'); });

    // keyboard
    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape'){ document.querySelectorAll('.window').forEach(w=> w.remove()); } if(e.altKey && e.code==='Space'){ e.preventDefault(); startMenu.classList.toggle('show'); } });
