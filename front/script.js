let vault = {};
const STORAGE_KEY = "password_manager_vault";

function loadVault(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    vault = raw ? JSON.parse(raw) : {};
  }catch(e){
    vault = {};
  }
  renderView();
}

function persistVault(){
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vault));
  }catch(e){
    showToast("save-toast", "Could not save — storage error", "err");
  }
}

function showToast(id, msg, type){
  const el = document.getElementById(id);
  el.textContent = msg;
  el.className = "toast show " + type;
  setTimeout(()=>{ el.classList.remove("show"); }, 2200);
}

// tab switching
document.querySelectorAll(".tab-btn").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll(".tab-btn").forEach(b=>b.classList.remove("active"));
    document.querySelectorAll("section").forEach(s=>s.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
    if(btn.dataset.tab === "view") renderView();
     if(btn.dataset.tab === "exit") tryExit();
  });
});

// show/hide password
document.getElementById("toggle-pwd").addEventListener("click", ()=>{
  const input = document.getElementById("pwd-input");
  const btn = document.getElementById("toggle-pwd");
  if(input.type === "password"){ input.type = "text"; btn.textContent = "hide"; }
  else{ input.type = "password"; btn.textContent = "show"; }
});

// save password
document.getElementById("save-btn").addEventListener("click", ()=>{
  const site = document.getElementById("site-input").value.trim();
  const pwd = document.getElementById("pwd-input").value;
  if(!site || !pwd){
    showToast("save-toast", "Enter both a website and a password", "err");
    return;
  }
  vault[site] = pwd;
  persistVault();
  document.getElementById("site-input").value = "";
  document.getElementById("pwd-input").value = "";
  showToast("save-toast", "Saved!", "ok");
});

// render view list
function renderView(){
  const container = document.getElementById("view-content");
  const sites = Object.keys(vault);
  if(sites.length === 0){
    container.innerHTML = '<div class="empty">No entries yet — save a password to see it here.</div>';
    return;
  }
  let html = '<table><thead><tr><th>Website</th><th>Password</th><th></th></tr></thead><tbody>';
  sites.forEach(site=>{
    html += `<tr>
      <td class="site">${escapeHtml(site)}</td>
      <td class="pwd">••••••••</td>
      <td class="row-actions">
        <button onclick="revealRow(this)" data-pwd="${escapeHtml(vault[site])}">reveal</button>
        <button onclick="deleteEntry('${escapeHtml(site).replace(/'/g,"\\'")}')">delete</button>
      </td>
    </tr>`;
  });
  html += '</tbody></table>';
  container.innerHTML = html;
}

function revealRow(btn){
  const td = btn.closest("tr").querySelector("td.pwd");
  const isHidden = td.textContent.includes("•");
  td.textContent = isHidden ? btn.dataset.pwd : "••••••••";
  btn.textContent = isHidden ? "hide" : "reveal";
}

function deleteEntry(site){
  delete vault[site];
  persistVault();
  renderView();
}

function escapeHtml(str){
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}
function tryExit(){
  // Browsers only allow window.close() on tabs opened by script,
  // so this closes the tab when possible and just shows the goodbye message otherwise.
  setTimeout(()=>{
    window.close();
  }, 400);
}

// generate password
function generatePassword(len){
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";
  let out = "";
  const arr = new Uint32Array(len);
  crypto.getRandomValues(arr);
  for(let i=0;i<len;i++){ out += chars[arr[i] % chars.length]; }
  return out;
}

document.getElementById("gen-btn").addEventListener("click", ()=>{
  let len = parseInt(document.getElementById("len-input").value, 10);
  if(isNaN(len) || len < 4) len = 8;
  if(len > 64) len = 64;
  const pwd = generatePassword(len);
  document.getElementById("gen-val").textContent = pwd;
  document.getElementById("gen-out").style.display = "block";
});

document.getElementById("gen-copy").addEventListener("click", async ()=>{
  const val = document.getElementById("gen-val").textContent;
  try{
    await navigator.clipboard.writeText(val);
    const btn = document.getElementById("gen-copy");
    const old = btn.textContent;
    btn.textContent = "copied";
    setTimeout(()=>{ btn.textContent = old; }, 1200);
  }catch(e){}
});

document.getElementById("gen-use").addEventListener("click", ()=>{
  const val = document.getElementById("gen-val").textContent;
  document.querySelectorAll(".tab-btn").forEach(b=>b.classList.remove("active"));
  document.querySelectorAll("section").forEach(s=>s.classList.remove("active"));
  document.querySelector('[data-tab="save"]').classList.add("active");
  document.getElementById("save").classList.add("active");
  document.getElementById("pwd-input").value = val;
  document.getElementById("pwd-input").type = "text";
  document.getElementById("toggle-pwd").textContent = "hide";
  document.getElementById("site-input").focus();
});

loadVault();