 // Auto set today's date
    const today = new Date();
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    document.getElementById("invoice-date").textContent = today.toLocaleDateString('en-GB', options);

    function downloadInvoice() {
        let invoiceContent = document.getElementById("invoice").innerHTML;
        let originalContent = document.body.innerHTML;
        document.body.innerHTML = invoiceContent;
        window.print();
        document.body.innerHTML = originalContent;
    }