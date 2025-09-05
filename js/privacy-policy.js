// Init
  const today = new Date();
  document.getElementById('year').textContent = today.getFullYear();

  // Acknowledge checkbox
  const tick = document.getElementById('tick');
  const ackKey = 'brosonetech_privacy_ack_v1';
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
  setChecked(Boolean(localStorage.getItem(ackKey)));

  tick.addEventListener('click', ()=> {
    setChecked(tick.getAttribute('aria-checked') !== 'true');
  });
  tick.addEventListener('keydown', (e)=> {
    if(e.key===' '|| e.key==='Enter'){ e.preventDefault(); tick.click(); }
  });

  // Contact button
  document.getElementById('contactBtn').addEventListener('click', ()=> {
    window.location.href = 'mailto:privacy@brosonetech.com?subject=Privacy%20Request';
  });

  // Print & download
  document.getElementById('printBtn').addEventListener('click', ()=> window.print());

  document.getElementById('downloadBtn').addEventListener('click', ()=> {
    const text = buildPlainText();
    const blob = new Blob([text], {type:'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'BROS_ONE_TECH_Privacy_Policy.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  function buildPlainText(){
    const lines = [];
    lines.push('Privacy Policy - BROS ONE TECH');
    lines.push('Last updated: August 10, 2025');
    lines.push('');
    lines.push('1. Data We Collect');
    lines.push('- Account data: Name, business name, email, phone, billing address, GSTIN.');
    lines.push('- Transactional data: Invoices, payments, GST details.');
    lines.push('- Usage data & logs: IP, device, activity logs.');
    lines.push('');
    lines.push('2. How We Use Your Data');
    lines.push('- Provide services, security, analytics, and legal compliance.');
    lines.push('');
    lines.push('3. Sharing & Third Parties');
    lines.push('- Payment processors, hosting, analytics providers, and legal disclosures when required.');
    lines.push('');
    lines.push('4. Security Measures');
    lines.push('- Encryption, access controls, backups, incident response.');
    lines.push('');
    lines.push('5. Data Retention');
    lines.push('- Data retained during active subscription; 90 days post-cancellation unless law requires longer retention.');
    lines.push('');
    lines.push('6. Your Rights');
    lines.push('- Access, portability, correction, deletion (subject to legal obligations). Contact privacy@brosonetech.com');
    lines.push('');
    lines.push('7. Cookies & Tracking');
    lines.push('- Cookies for auth, analytics; third parties may set their own cookies.');
    lines.push('');
    lines.push('Contact: privacy@brosonetech.com');
    return lines.join('\n');
  }