// sample product data
  const PRODUCTS = [
    { id: 'hw-01', title: 'POS Desktop Terminal', category:'Hardware', price:24999, img:'https://images.unsplash.com/photo-1587825140708-2a0c27d95c06?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=9e17c8b4f0d91e1ef5a9c5a8f0a7b9d4', desc:'Reliable POS desktop with integrated receipt printer and touch display.' },
    { id: 'hw-02', title: 'Thermal Receipt Printer', category:'Hardware', price:7499, img:'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=1b5a2b1f6f8a6f4f2bcc7f8d3b076b82', desc:'Fast thermal printing for receipts, 80mm width.' },
    { id: 'acc-01', title: 'Barcode Scanner (Wireless)', category:'Accessories', price:3199, img:'https://images.unsplash.com/photo-1606166329405-3b2f6f1a7d60?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=7b3e4beef5f5e9ae9408d6af3b8b1a0a', desc:'Ergonomic wireless barcode scanner with 2-year battery life.' },
    { id: 'acc-02', title: 'Cash Drawer', category:'Hardware', price:2499, img:'https://images.unsplash.com/photo-1563720221435-3c59a0fb4b09?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=2b8c3a6d3eec8a2b9b3a5e7c5c1f2d6b', desc:'Durable steel cash drawer compatible with standard POS printers.' },
    { id: 'cbl-01', title: 'USB to Serial Cable', category:'Cables', price:499, img:'https://images.unsplash.com/photo-1585386959984-a4155224a8a1?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=3c0e9b2b1b4f9b6c9d0d0f2d8b3e1abc', desc:'High-quality cable for legacy printer connectivity.' },
    { id: 'acc-03', title: 'Customer Display', category:'Accessories', price:8999, img:'https://images.unsplash.com/photo-1600180758890-9da5f6f0d5ea?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=bd5a7b3c6c3a7b9a4c3d1a2e1b6f5c7d', desc:'Dual-line customer-facing display for showing totals and messages.' },
  ];

  // state
  let cart = {};

  // render products
  function renderProducts(){
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';
    const q = document.getElementById('searchInput').value.toLowerCase();
    const cat = document.getElementById('categoryFilter').value;
    const maxPrice = +document.getElementById('priceRange').value;
    const sort = document.getElementById('sort').value;

    let filtered = PRODUCTS.filter(p=>{
      const matchQ = p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
      const matchCat = cat ? p.category === cat : true;
      const matchPrice = p.price <= maxPrice;
      return matchQ && matchCat && matchPrice;
    });

    if(sort === 'price-asc') filtered.sort((a,b)=>a.price-b.price);
    if(sort === 'price-desc') filtered.sort((a,b)=>b.price-a.price);

    filtered.forEach(p=>{
      const card = document.createElement('div'); card.className='card';
      card.innerHTML = `
        <img class="thumb" src="${p.img}" alt="${p.title}" />
        <div class="meta"><div>
          <div class="title">${p.title}</div>
          <div class="cat">${p.category} • ${p.id}</div>
        </div><div class="price">₹${p.price.toLocaleString()}</div></div>
        <div class="card-actions">
          <button class="btn btn-outline" onclick="openModal('${p.id}')">Quick view</button>
          <button class="btn btn-primary" onclick="addToCart('${p.id}')">Add to cart</button>
        </div>`;
      grid.appendChild(card);
    });

    if(filtered.length === 0) grid.innerHTML = '<div style="color:white;padding:30px;border-radius:10px;background:rgba(0,0,0,0.12);grid-column:1/-1;text-align:center">No products found</div>';
  }

  // modal
  function openModal(id){
    const p = PRODUCTS.find(x=>x.id===id);
    document.getElementById('modalImg').src = p.img;
    document.getElementById('modalTitle').textContent = p.title + ' — ₹' + p.price.toLocaleString();
    document.getElementById('modalDesc').textContent = p.desc;
    document.getElementById('modalBackdrop').style.display = 'flex';
    document.getElementById('modalAddBtn').onclick = ()=>{ addToCart(id); closeModal(); };
  }
  function closeModal(){ document.getElementById('modalBackdrop').style.display = 'none'; }

  // cart functions
  function addToCart(id){
    cart[id] = cart[id] ? cart[id]+1 : 1;
    renderCart();
  }
  function removeFromCart(id){
    delete cart[id];
    renderCart();
  }
  function changeQty(id, delta){
    cart[id] = (cart[id]||0) + delta;
    if(cart[id] <= 0) removeFromCart(id);
    renderCart();
  }
  function clearCart(){ cart={}; renderCart(); }

  function renderCart(){
    const list = document.getElementById('cartList');
    list.innerHTML = '';
    const keys = Object.keys(cart);
    document.getElementById('cartCount').textContent = keys.reduce((s,k)=>s+cart[k],0);
    if(keys.length === 0){ list.innerHTML = '<div class="empty">Your cart is empty — add items to begin</div>'; document.getElementById('cartTotal').textContent = '₹0'; return; }

    let total = 0;
    keys.forEach(id=>{
      const p = PRODUCTS.find(x=>x.id===id);
      const qty = cart[id];
      const row = document.createElement('div'); row.className='cart-row';
      row.innerHTML = `
        <div class="meta">
          <img src="${p.img}" style="width:44px;height:34px;object-fit:cover;border-radius:6px" />
          <div>
            <div style="font-weight:700">${p.title}</div>
            <div style="font-size:12px;color:#7b8aa5">${p.id}</div>
          </div>
        </div>
        <div style="text-align:right">
          <div style="font-weight:700">₹${(p.price*qty).toLocaleString()}</div>
          <div style="margin-top:8px;display:flex;gap:6px;align-items:center;justify-content:flex-end">
            <button class="btn btn-outline" style="padding:6px 8px" onclick="changeQty('${id}',-1)">-</button>
            <div style="min-width:26px;text-align:center">${qty}</div>
            <button class="btn btn-outline" style="padding:6px 8px" onclick="changeQty('${id}',1)">+</button>
            <button class="btn" style="background:#f4f6fb;color:#10263b;margin-left:8px;padding:6px 8px" onclick="removeFromCart('${id}')">Remove</button>
          </div>
        </div>
      `;
      list.appendChild(row);
      total += p.price*qty;
    });
    document.getElementById('cartTotal').textContent = '₹' + total.toLocaleString();
  }

  // checkout (print invoice)
  function checkout(){
    const keys = Object.keys(cart);
    if(keys.length===0){ alert('Cart is empty'); return; }
    let html = `<div style="font-family:Arial;width:400px;padding:12px"><h2>Bros One Tech</h2><hr>`;
    html += `<table style="width:100%;font-size:14px">`;
    let total = 0;
    keys.forEach(id=>{
      const p = PRODUCTS.find(x=>x.id===id);
      const qty = cart[id];
      html += `<tr><td>${p.title} x ${qty}</td><td style="text-align:right">₹${(p.price*qty).toLocaleString()}</td></tr>`;
      total += p.price*qty;
    });
    html += `</table><hr><h3 style="text-align:right">Total: ₹${total.toLocaleString()}</h3></div>`;
    const w = window.open('','_blank','width=600,height=700');
    w.document.write(html);
    w.document.close();
    w.print();
    clearCart();
  }

  // filters & events
  document.getElementById('searchInput').addEventListener('input', renderProducts);
  document.getElementById('categoryFilter').addEventListener('change', renderProducts);
  document.getElementById('priceRange').addEventListener('input', e=>{
    document.getElementById('priceVal').textContent = e.target.value;
    renderProducts();
  });
  document.getElementById('sort').addEventListener('change', renderProducts);

  // quick top search connects to main search
  document.getElementById('quickSearchTop').addEventListener('input', e=>{
    document.getElementById('searchInput').value = e.target.value;
    renderProducts();
  });

  // init
  renderProducts();
  renderCart();