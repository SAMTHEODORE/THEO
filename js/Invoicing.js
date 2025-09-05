function openModal() {
        document.getElementById("invoiceModal").style.display = "flex";
    }

    function closeModal() {
        document.getElementById("invoiceModal").style.display = "none";
    }

    function addInvoice() {
        const number = document.getElementById("invoiceNumber").value;
        const client = document.getElementById("clientName").value;
        const date = document.getElementById("invoiceDate").value;
        const amount = document.getElementById("invoiceAmount").value;
        const status = document.getElementById("invoiceStatus").value;

        if (!number || !client || !date || !amount) {
            alert("Please fill all fields!");
            return;
        }

        let statusClass = status === "paid" ? "paid" : status === "pending" ? "pending" : "overdue";

        const table = document.getElementById("invoiceTable").getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();
        newRow.innerHTML = `
            <td>${number}</td>
            <td>${client}</td>
            <td>${date}</td>
            <td>₹${parseFloat(amount).toLocaleString()}</td>
            <td><span class="status ${statusClass}">${status.charAt(0).toUpperCase() + status.slice(1)}</span></td>
        `;

        closeModal();
        document.getElementById("invoiceNumber").value = "";
        document.getElementById("clientName").value = "";
        document.getElementById("invoiceDate").value = "";
        document.getElementById("invoiceAmount").value = "";
        document.getElementById("invoiceStatus").value = "paid";
    }