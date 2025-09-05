// Basic interactions
  const today = new Date();
  document.getElementById('year').textContent = today.getFullYear();

  // Acknowledge checkbox
  const tick = document.getElementById('tick');
  const ackKey = 'brosonetech_refund_ack_v1';
  function setChecked(v){
    if(v){
      tick.classList.add('checked');
      tick.setAttribute('aria-checked','true');
      localStorage.setItem(ackKey, new Date().toISOString());
    }else{
      tick.classList.remove('checked');
      tick.setAttribute('aria-checked','false');
      localStorage.removeItem(ackKey);
    }
  }
  // init
  setChecked(Boolean(localStorage.getItem(ackKey)));

  tick.addEventListener('click', ()=> {
    setChecked(tick.getAttribute('aria-checked') !== 'true');
  });
  tick.addEventListener('keydown', (e)=> {
    if(e.key===' '|| e.key==='Enter'){ e.preventDefault(); tick.click(); }
  });

  // Contact button
  document.getElementById('contactBtn').addEventListener('click', ()=> {
    window.location.href = 'mailto:support@brosonetech.com?subject=Refund%20/ %20Cancellation%20Request';
  });

  // Print & download
  document.getElementById('printBtn').addEventListener('click', ()=> window.print());

  document.getElementById('downloadBtn').addEventListener('click', ()=> {
    const text = buildPlainText();
    const blob = new Blob([text], {type:'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'BROS_ONE_TECH_Refund_Cancellation_Policy.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  function buildPlainText(){
    const lines = [];
    lines.push('Refund & Cancellation Policy - BROS ONE TECH');
    lines.push('Last updated: August 10, 2025');
    lines.push('');
    lines.push('1. Refund Eligibility');
    lines.push('- Refunds available within 7 days of first-time annual subscription activation if service not used for commercial invoicing.');
    lines.push('- Monthly subscriptions are generally non-refundable after billing starts.');
    lines.push('');
    lines.push('2. Cancellation Process');
    lines.push('- Self-service: Account → Billing → Cancel Subscription. Cancellation effective end of billing cycle.');
    lines.push('- Support-assisted: Email support@brosonetech.com to request immediate cancellation.');
    lines.push('');
    lines.push('3. Data Retention & Deletion');
    lines.push('- Post-cancellation retention: 90 days for export or reactivation.');
    lines.push('- GST records retained if required by law.');
    lines.push('');
    lines.push('4. Disputes & Chargebacks');
    lines.push('- Contact support first to resolve disputes. Chargebacks may result in service suspension.');
    lines.push('');
    lines.push('5. Exceptions & Special Cases');
    lines.push('- Enterprise contracts follow contract terms. Fraudulent accounts are not eligible for refunds.');
    lines.push('');
    lines.push('Contact: support@brosonetech.com');
    return lines.join('\n');
  }