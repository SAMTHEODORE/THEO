 let billItems = [];
    let total = 0;

    function addItem() {
      const name = document.getElementById("itemName").value.trim();
      const price = parseFloat(document.getElementById("itemPrice").value);

      if (!name || isNaN(price) || price <= 0) {
        alert("Please enter a valid item name and positive price.");
        return;
      }

      billItems.push({ name, price });
      total += price;

      document.getElementById("itemName").value = "";
      document.getElementById("itemPrice").value = "";

      renderBill();
    }

    function renderBill() {
      if (billItems.length === 0) {
        document.getElementById("billOutput").innerHTML = "No items added yet.";
        return;
      }

      let html = `<table>
        <tr><th>Item</th><th>Price (₹)</th></tr>`;
      billItems.forEach(item => {
        html += `<tr><td>${item.name}</td><td>${item.price.toFixed(2)}</td></tr>`;
      });
      html += `</table><strong>Total: ₹${total.toFixed(2)}</strong>`;

      document.getElementById("billOutput").innerHTML = html;
    }