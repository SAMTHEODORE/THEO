// --- Utilities ---
    const desktop = document.getElementById('desktop');
    const taskIcons = document.getElementById('taskIcons');
    const startBtn = document.getElementById('startBtn');
    const startMenu = document.getElementById('startMenu');

    function formatTime(d) {
      return d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
    }
    setInterval(()=>{document.getElementById('time').textContent = formatTime(new Date())},1000);

    // Keep track of windows by id
    const windows = {};
    let zIndexCounter = 10;

    // open app when icon clicked
    document.querySelectorAll('.icon, .start-app').forEach(el=>{
      el.addEventListener('dblclick',()=>openApp(el.dataset.app));
      el.addEventListener('click',()=>{
        // single click selects; double click opens
      });
    });

    // Start menu toggle
    startBtn.addEventListener('click', ()=>{ startMenu.classList.toggle('show'); });
    document.addEventListener('click', (e)=>{ if(!startMenu.contains(e.target) && !startBtn.contains(e.target)) startMenu.classList.remove('show'); });

    // create a new window
    function createWindow(id, title, innerHTML, x=80, y=80){
      if(windows[id]) return focusWindow(id);
      const win = document.createElement('div');
      win.className='window';
      win.style.left = x+'px'; win.style.top = y+'px'; win.style.zIndex = ++zIndexCounter;
      win.dataset.winId = id;

      win.innerHTML = `
        <div class="titlebar">
          <div class="title"><div class="dot"></div><strong style="color:#e6eef6">${title}</strong></div>
          <div class="controls">
            <button class="btn" data-action="min">—</button>
            <button class="btn" data-action="max">◻</button>
            <button class="btn" data-action="close">✕</button>
          </div>
        </div>
        <div class="content">${innerHTML}</div>
        <div class="resizer"></div>
      `;

      desktop.appendChild(win);
      makeDraggable(win);
      makeResizable(win);
      windows[id] = {el:win, minimized:false};
      addTaskbarIcon(id, title);
      focusWindow(id);
    }

    function focusWindow(id){
      const w = windows[id];
      if(!w) return;
      w.el.style.zIndex = ++zIndexCounter;
      w.el.classList.remove('hidden');
      w.el.dataset.minimized = 'false';
      w.minimized = false;
    }

    function closeWindow(id){
      const w = windows[id];
      if(!w) return;
      // remove task icon
      const t = document.querySelector(`.task-icons [data-task='${id}']`);
      if(t) t.remove();
      w.el.remove();
      delete windows[id];
    }

    function minimizeWindow(id){
      const w = windows[id]; if(!w) return;
      w.el.dataset.minimized = 'true';
      w.minimized = true;
    }

    function toggleMinimize(id){
      const w = windows[id]; if(!w) return;
      if(w.minimized) focusWindow(id); else minimizeWindow(id);
    }

    function addTaskbarIcon(id, title){
      const btn = document.createElement('div');
      btn.className='ticon'; btn.title = title; btn.textContent = title[0] || 'A';
      btn.dataset.task = id;
      btn.addEventListener('click', ()=>toggleMinimize(id));
      taskIcons.appendChild(btn);
    }

    // wire controls
    desktop.addEventListener('click', (e)=>{
      const action = e.target.dataset.action;
      if(!action) return;
      const win = e.target.closest('.window');
      const id = win && win.dataset.winId;
      if(action==='close') closeWindow(id);
      if(action==='min') minimizeWindow(id);
      if(action==='max'){
        if(win.classList.contains('max')){win.classList.remove('max');win.style.width='';win.style.height='';win.style.left='';win.style.top='';}
        else {win.classList.add('max');win.style.left='12px';win.style.top='12px';win.style.right='12px';win.style.width = (window.innerWidth-48)+'px';win.style.height = (window.innerHeight-120)+'px';}
      }
    });

    // Draggable
    function makeDraggable(el){
      const title = el.querySelector('.titlebar');
      let isDown=false, startX=0, startY=0, origX=0, origY=0;
      title.addEventListener('mousedown',(e)=>{
        isDown=true; startX = e.clientX; startY = e.clientY; const rect = el.getBoundingClientRect(); origX = rect.left; origY = rect.top;
        el.style.zIndex = ++zIndexCounter;
        e.preventDefault();
      });
      document.addEventListener('mousemove',(e)=>{
        if(!isDown) return;
        let nx = origX + (e.clientX - startX);
        let ny = origY + (e.clientY - startY);
        // keep inside desktop
        nx = Math.max(8, Math.min(nx, window.innerWidth - el.offsetWidth - 8));
        ny = Math.max(8, Math.min(ny, window.innerHeight - el.offsetHeight - 80));
        el.style.left = nx + 'px'; el.style.top = ny + 'px';
      });
      document.addEventListener('mouseup',()=>{isDown=false});

      // focus when clicked
      el.addEventListener('mousedown', ()=>{ el.style.zIndex = ++zIndexCounter; });
    }

    // Resizable
    function makeResizable(el){
      const res = el.querySelector('.resizer');
      if(!res) return;
      let isRes=false, startX=0, startY=0, startW=0, startH=0;
      res.addEventListener('mousedown',(e)=>{isRes=true; startX=e.clientX; startY=e.clientY; startW=el.offsetWidth; startH=el.offsetHeight; e.preventDefault();});
      document.addEventListener('mousemove',(e)=>{ if(!isRes) return; const dw = e.clientX - startX; const dh = e.clientY - startY; el.style.width = Math.max(300, startW + dw)+'px'; el.style.height = Math.max(180, startH + dh)+'px';});
      document.addEventListener('mouseup',()=>{isRes=false});
    }

    // App templates
    function posTemplate(){
      return `
      <div class="pos-grid">
        <div class="items">
          <div class="search"><input placeholder="Search product" style="flex:1;padding:8px;border-radius:8px;border:1px solid rgba(255,255,255,0.04);background:transparent;color:inherit" id="prodSearch"/><button class="btn" id="addProdBtn">+ Add</button></div>
          <div class="product-list" id="productList"></div>
        </div>
        <div class="checkout">
          <div class="cart" id="cartArea"></div>
          <div class="total">Total: ₹<span id="totalAmt">0.00</span></div>
          <div class="pay"><button class="primary" id="payBtn">Pay</button><button class="btn" id="clearBtn">Clear</button></div>
        </div>
      </div>
      `;
    }

    function invoicesTemplate(){
      return `<div style="min-height:260px">This is a simple Invoices demo. You can paste invoice HTML here or wire a backend.</div>`;
    }
    function customersTemplate(){
      return `<div style="min-height:260px">Customers list (demo) — add your interface here.</div>`;
    }
    function reportsTemplate(){
      return `<div style="min-height:260px">Reports dashboard (demo) — charts and filters can be added.</div>`;
    }

    // openApp
    function openApp(name){
      if(name==='pos') createWindow('app-pos','POS', posTemplate(), 120, 90);
      if(name==='invoices') createWindow('app-invoices','Invoices', invoicesTemplate(), 160, 140);
      if(name==='customers') createWindow('app-customers','Customers', customersTemplate(), 180, 160);
      if(name==='reports') createWindow('app-reports','Reports', reportsTemplate(), 200, 180);

      // when POS created, attach behavior after next tick
      setTimeout(()=>{
        const win = document.querySelector('[data-win-id="app-pos"]');
        if(!win) return;
        // populate products
        const products = [
          {id:1,name:'Tea (Cup)',price:15}, {id:2,name:'Coffee',price:25}, {id:3,name:'Sandwich',price:80}, {id:4,name:'Notebook',price:120}, {id:5,name:'Pen',price:20}, {id:6,name:'Bottle',price:60}
        ];
        const productList = win.querySelector('#productList'); productList.innerHTML='';
        products.forEach(p=>{ const el = document.createElement('div'); el.className='product'; el.textContent = `${p.name} — ₹${p.price}`; el.dataset.pid = p.id; el.dataset.price = p.price; el.addEventListener('click', ()=> addToCart(win, p)); productList.appendChild(el); });

        // cart logic
        if(!win._cart) win._cart = [];
        function renderCart(){
          const cartArea = win.querySelector('#cartArea'); cartArea.innerHTML=''; let total=0;
          win._cart.forEach((it,i)=>{ const row = document.createElement('div'); row.className='cart-item'; row.innerHTML = `<div>${it.name} <small>×${it.qty}</small></div><div>₹${(it.price*it.qty).toFixed(2)}</div>`; cartArea.appendChild(row); total += it.price*it.qty;});
          win.querySelector('#totalAmt').textContent = total.toFixed(2);
        }
        function addToCart(win, p){
          const exist = win._cart.find(x=>x.id===p.id);
          if(exist) exist.qty++; else win._cart.push({id:p.id,name:p.name,price:p.price,qty:1});
          renderCart();
        }
        win.querySelector('#payBtn').addEventListener('click', ()=>{ alert('Paid ₹'+win.querySelector('#totalAmt').textContent); win._cart=[]; renderCart(); });
        win.querySelector('#clearBtn').addEventListener('click', ()=>{ win._cart=[]; renderCart(); });

      },50);
    }

    // double-click icons to open
    document.querySelectorAll('.icon').forEach(ic=> ic.addEventListener('dblclick', ()=> openApp(ic.dataset.app)));

    // start menu apps click
    document.querySelectorAll('.start-app').forEach(s=> s.addEventListener('click', (e)=>{ openApp(s.dataset.app); startMenu.classList.remove('show'); }));

    // handy: open POS on first load
    window.addEventListener('load', ()=>{ openApp('pos'); });

    // keyboard: Alt+Space to toggle start menu
    document.addEventListener('keydown', (e)=>{ if(e.altKey && e.code==='Space'){ e.preventDefault(); startMenu.classList.toggle('show'); } });
