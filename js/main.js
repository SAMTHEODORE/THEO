function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

// Save Category
function saveCategory() {
  const data = {
    name: document.getElementById('catName').value,
    short: document.getElementById('catShort').value,
    active: document.getElementById('catActive').checked
  };

  fetch('/api/category', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => alert("Category saved!"));
}

// Save Group
function saveGroup() {
  const data = {
    name: document.getElementById('groupName').value,
    short: document.getElementById('groupShort').value,
    active: document.getElementById('groupActive').checked
  };

  fetch('/api/group', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => alert("Group saved!"));
}

// Save Product
function saveProduct() {
  const data = {
    name: document.getElementById('prodName').value,
    short: document.getElementById('prodShort').value,
    groupId: document.getElementById('groupList').value,
    gst: document.getElementById('gst').value,
    cost: document.getElementById('cost').value,
    mrp: document.getElementById('mrp').value,
    selling: document.getElementById('selling').value
  };

  fetch('/api/product', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => alert("Product saved!"));
}

// Save Sale
function createSale() {
  const data = {
    productId: document.getElementById('productList').value,
    qty: document.getElementById('qty').value,
    cost: document.getElementById('saleCost').value,
    gst: document.getElementById('saleGst').value,
    mrp: document.getElementById('saleMrp').value,
    selling: document.getElementById('saleSelling').value
  };

  fetch('/api/sale', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => alert("Sale saved!"));
}
