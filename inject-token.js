
(function() {

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('discordtoken');
  
  if (token) {
    function injectToken() {
      try {
        localStorage.setItem('token', `"${token}"`);
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        try {
          iframe.contentWindow.localStorage.setItem('token', `"${token}"`);
        } catch(e) {}
        setTimeout(() => {
          try { document.body.removeChild(iframe); } catch(e) {}
        }, 100);
      } catch(e) {}
    }
    injectToken();
    setTimeout(injectToken, 100);
    setTimeout(injectToken, 300);
    setTimeout(injectToken, 500);
    setTimeout(injectToken, 1000);
    setTimeout(() => {
      window.history.replaceState({}, document.title, window.location.origin + window.location.pathname);
      window.location.reload();
    }, 2000);
  }
  chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
    if (request.action === 'injectToken') {
      try {
        localStorage.setItem('token', `"${request.token}"`);
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        iframe.contentWindow.localStorage.setItem('token', `"${request.token}"`);
        setTimeout(() => location.reload(), 1000);
        sendResponse({ success: true });
      } catch(e) {
        sendResponse({ success: false, error: e.message });
      }
    }
    return true;
  });
})();
