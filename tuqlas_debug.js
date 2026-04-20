(function () {
  var ICONS = {
    MessageCircle: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    MessageSquare: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="14" rx="2"/><path d="M3 21l4-4"/></svg>',
    Bot: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>',
    Headphones: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>',
    HelpCircle: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    LifeBuoy: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/></svg>',
    Zap: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    Sparkles: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/><path d="M5 3l.75 2.25L8 6l-2.25.75L5 9l-.75-2.25L2 6l2.25-.75z"/><path d="M19 15l.75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75z"/></svg>',
    Star: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    Heart: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    ShoppingBag: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
    ShoppingCart: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
    Package: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    Truck: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
    Tag: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
    BookOpen: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
    FileText: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
    Search: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    Info: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    Phone: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  };

  var iconClose = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  var iconSend = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';

  var isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  function init() {
    var script = document.querySelector('script[data-key]');
    if (!script) return console.warn('[Tuqlas] No script tag with data-key found.');

    var embedKey = script.getAttribute('data-key');
    if (!embedKey) return console.warn('[Tuqlas] Missing data-key attribute.');

    var API_BASE = (script.getAttribute('data-api') || script.src.replace('/chatbot.js', '')).replace(/\/$/, '');
    var sessionId = (crypto && crypto.randomUUID) ? crypto.randomUUID() : Math.random().toString(36).slice(2) + Date.now().toString(36);

    fetch(API_BASE + '/api/config?key=' + encodeURIComponent(embedKey))
      .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
      .then(function (cfg) { render(API_BASE, embedKey, sessionId, cfg); })
      .catch(function (e) { console.error('[Tuqlas] Failed to load config:', e); });
  }

  function render(API_BASE, embedKey, sessionId, cfg) {
    var open = false;
    var fullscreen = false;
    var savedScrollY = 0;
    var scrollLockHandler = null;
    var iconOpen = ICONS[cfg.bubbleIcon] || ICONS.MessageCircle;

    function iconCloseHeader(color) {
      return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="' + color + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
    }

    var style = document.createElement('style');
    style.textContent = [
      '#tuqlas-btn{position:fixed;bottom:24px;right:24px;z-index:9999;width:56px;height:56px;border-radius:50%;border:none;cursor:pointer;background:' + cfg.bubbleColor + ';display:flex;align-items:center;justify-content:center;box-shadow:0 4px 24px rgba(0,0,0,.3);transition:transform .15s}',
      '#tuqlas-btn:hover{transform:scale(1.07)}',
      '#tuqlas-win{position:fixed;bottom:92px;right:24px;z-index:9998;width:320px;max-width:calc(100vw - 48px);height:420px;border-radius:16px;overflow:hidden;background:' + cfg.windowBg + ';border:1px solid rgba(255,255,255,.1);box-shadow:0 8px 40px rgba(0,0,0,.6);display:flex;flex-direction:column}',
      '#tuqlas-win.tuqlas-fs{position:fixed!important;left:0!important;right:0!important;width:100%!important;max-width:100%!important;bottom:auto!important;border-radius:0;z-index:10000;overscroll-behavior:none}',
      '#tuqlas-header{padding:12px 16px;border-bottom:1px solid rgba(255,255,255,.1);background:' + cfg.headerBg + ';color:' + cfg.headerTextColor + ';font-family:sans-serif;font-size:14px;font-weight:500;display:flex;align-items:center;gap:8px;flex-shrink:0}',
      '#tuqlas-header-title{flex:1}',
      '#tuqlas-header-close{display:none;background:none;border:none;cursor:pointer;padding:4px;line-height:0}',
      '#tuqlas-win.tuqlas-fs #tuqlas-header-close{display:block}',
      '#tuqlas-dot{width:8px;height:8px;border-radius:50%;background:#22d3ee;flex-shrink:0}',
      '#tuqlas-msgs{flex:1;overflow-y:scroll;padding:12px;display:flex;flex-direction:column;gap:8px;font-family:sans-serif;font-size:13px;-webkit-overflow-scrolling:touch}',
      '.tql-bot{align-self:flex-start;background:' + cfg.botBubbleBg + ';color:' + cfg.botBubbleColor + ';padding:8px 12px;border-radius:12px 12px 12px 2px;max-width:80%;word-break:break-word;white-space:pre-wrap}',
      '.tql-user{align-self:flex-end;background:' + cfg.userBubbleBg + ';color:' + cfg.userBubbleColor + ';padding:8px 12px;border-radius:12px 12px 2px 12px;max-width:80%;word-break:break-word;white-space:pre-wrap}',
      '#tuqlas-footer{flex-shrink:0;border-top:1px solid rgba(255,255,255,.1)}',
      '#tuqlas-form{display:flex;gap:8px;padding:10px 12px;align-items:center}',
      '#tuqlas-input{flex:1;min-width:0;background:' + cfg.inputBg + ';border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:8px 12px;color:' + cfg.inputTextColor + ';font-size:16px;outline:none;font-family:sans-serif}',
      '#tuqlas-send{width:34px;height:34px;border-radius:10px;border:none;cursor:pointer;background:' + cfg.sendButtonColor + ';display:flex;align-items:center;justify-content:center;flex-shrink:0}',
      '#tuqlas-brand{text-align:center;padding:6px 0;font-size:11px;font-family:sans-serif}',
      '#tuqlas-brand a{color:rgba(255,255,255,.5);text-decoration:none}',
      '#tuqlas-brand a:hover{text-decoration:underline;color:rgba(255,255,255,.7)}',
      '@keyframes tql-blink{0%,100%{opacity:1}50%{opacity:.2}}',
      '.tql-dots span{display:inline-block;width:6px;height:6px;border-radius:50%;background:currentColor;margin:0 2px;animation:tql-blink 1.2s ease-in-out infinite}',
      '.tql-dots span:nth-child(2){animation-delay:.2s}',
      '.tql-dots span:nth-child(3){animation-delay:.4s}',
    ].join('');
    document.head.appendChild(style);

    var btn = document.createElement('button');
    btn.id = 'tuqlas-btn';
    btn.setAttribute('aria-label', 'Toggle chat');
    btn.innerHTML = iconOpen;

    var win = document.createElement('div');
    win.id = 'tuqlas-win';
    win.style.display = 'none';
    win.innerHTML =
      '<div id="tuqlas-header"><div id="tuqlas-dot"></div><span id="tuqlas-header-title">' + cfg.headerTitle + '</span><button id="tuqlas-header-close" aria-label="Exit fullscreen">' + iconCloseHeader(cfg.headerTextColor) + '</button></div>' +
      '<div id="tuqlas-msgs"><div class="tql-bot">' + cfg.greeting + '</div></div>' +
      '<div id="tuqlas-footer">' +
      '<form id="tuqlas-form">' +
      '<input id="tuqlas-input" type="text" placeholder="' + cfg.inputPlaceholder + '" autocomplete="off"/>' +
      '<button id="tuqlas-send" type="submit" aria-label="Send">' + iconSend + '</button>' +
      '</form>' +
      (cfg.showBranding ? '<div id="tuqlas-brand"><a href="https://tuqlas.com" target="_blank" rel="noopener">Powered by Tuqlas</a></div>' : '') +
      '</div>';

    document.body.appendChild(btn);
    document.body.appendChild(win);

    var msgs = document.getElementById('tuqlas-msgs');
    var form = document.getElementById('tuqlas-form');
    var input = document.getElementById('tuqlas-input');
    var headerClose = document.getElementById('tuqlas-header-close');

    function getVisibleHeight() {
      return window.visualViewport ? window.visualViewport.height : window.innerHeight;
    }

    function getVisibleTop() {
      return window.visualViewport ? window.visualViewport.offsetTop : 0;
    }

    var vpRAF = 0;
    var vpPoll = 0;
    function updateViewportHeight() {
      var h = getVisibleHeight();
      var t = getVisibleTop();
      win.style.top = t + 'px';
      win.style.height = h + 'px';

      cancelAnimationFrame(vpRAF);
      vpRAF = requestAnimationFrame(function () {
        var h2 = getVisibleHeight();
        var t2 = getVisibleTop();
        if (h2 !== h || t2 !== t) {
          win.style.top = t2 + 'px';
          win.style.height = h2 + 'px';
        }
      });
    }

    function enterFullscreen() {
      if (fullscreen) return;
      fullscreen = true;

      // Capture scroll position for restore — doesn't matter if momentum
      // shifts it slightly, we just need a reasonable restore point
      savedScrollY = window.scrollY;

      // Block touch scrolling immediately to kill momentum
      scrollLockHandler = function (e) {
        // Allow scrolling inside messages area, but only when not at a boundary
        // to prevent iOS scroll chaining to the body
        if (msgs.contains(e.target)) {
          var atTop = msgs.scrollTop <= 0;
          var atBottom = msgs.scrollTop + msgs.clientHeight >= msgs.scrollHeight - 1;
          // If there's room to scroll in the touch direction, allow it
          if (!atTop && !atBottom) return;
          // At a boundary — check touch direction
          if (e.touches && e.touches.length > 0) {
            if (!scrollLockHandler._lastY) { scrollLockHandler._lastY = e.touches[0].clientY; return; }
            var dy = e.touches[0].clientY - scrollLockHandler._lastY;
            scrollLockHandler._lastY = e.touches[0].clientY;
            // Scrolling down (finger up) and not at bottom, or scrolling up (finger down) and not at top
            if ((dy < 0 && !atBottom) || (dy > 0 && !atTop)) return;
          }
        }
        e.preventDefault();
      };
      scrollLockHandler._lastY = 0;
      document.addEventListener('touchmove', scrollLockHandler, { passive: false });

      // Reset touch tracking on new touch
      scrollLockHandler._touchStartHandler = function () { scrollLockHandler._lastY = 0; };
      document.addEventListener('touchstart', scrollLockHandler._touchStartHandler, { passive: true });

      // Lock body — use top:0 instead of -scrollY because the fullscreen
      // chatbox covers everything anyway, so the page position doesn't matter.
      // This avoids the momentum scroll race condition entirely.
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = '0';
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.height = '100%';

      win.classList.add('tuqlas-fs');
      updateViewportHeight();

      if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', updateViewportHeight);
        window.visualViewport.addEventListener('scroll', updateViewportHeight);
      }

      // Fallback: poll position for browsers that don't fire viewport events reliably
      vpPoll = setInterval(function () {
        if (!fullscreen) return;
        var t = getVisibleTop();
        var h = getVisibleHeight();
        if (win.style.top !== t + 'px' || win.style.height !== h + 'px') {
          win.style.top = t + 'px';
          win.style.height = h + 'px';
        }
      }, 150);
    }

    function exitFullscreen() {
      if (!fullscreen) return;
      fullscreen = false;
      win.classList.remove('tuqlas-fs');
      win.style.height = '';
      win.style.top = '';

      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';

      // Restore scroll to where user was before fullscreen
      window.scrollTo(0, savedScrollY);

      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateViewportHeight);
        window.visualViewport.removeEventListener('scroll', updateViewportHeight);
      }
      clearInterval(vpPoll);
      cancelAnimationFrame(vpRAF);

      if (scrollLockHandler) {
        document.removeEventListener('touchmove', scrollLockHandler);
        if (scrollLockHandler._touchStartHandler) {
          document.removeEventListener('touchstart', scrollLockHandler._touchStartHandler);
        }
        scrollLockHandler = null;
      }
    }

    function toggleChat(state) {
      open = state;
      if (open) {
        win.style.display = 'flex';
        btn.innerHTML = iconClose;
        if (!isTouch) input.focus();
      } else {
        exitFullscreen();
        win.style.display = 'none';
        btn.innerHTML = iconOpen;
        input.blur();
      }
    }

    btn.addEventListener('click', function (e) { e.stopPropagation(); toggleChat(!open); });

    // Close chatbox when tapping outside (mobile, non-fullscreen only)
    document.addEventListener('click', function (e) {
      if (!open || fullscreen) return;
      if (win.contains(e.target) || btn.contains(e.target)) return;
      toggleChat(false);
    });

    headerClose.addEventListener('click', function () {
      exitFullscreen();
      input.blur();
    });

    input.addEventListener('focus', function () {
      if (isTouch) enterFullscreen();
    });

    function addMsg(text, cls) {
      var el = document.createElement('div');
      el.className = cls;
      el.textContent = text;
      msgs.appendChild(el);
      msgs.scrollTop = msgs.scrollHeight;
      return el;
    }

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      var text = input.value.trim();
      if (!text) return;
      input.value = '';
      input.disabled = true;

      addMsg(text, 'tql-user');
      var botEl = addMsg('', 'tql-bot');
      botEl.innerHTML = '<span class="tql-dots"><span></span><span></span><span></span></span>';
      var reply = '';

      try {
        var res = await fetch(API_BASE + '/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, embedKey: embedKey, sessionId: sessionId }),
        });

        if (!res.ok || !res.body) {
          var err = !res.ok ? await res.json().catch(function () { return {}; }) : {};
          botEl.textContent = err.error || 'Something went wrong. Please try again.';
          return;
        }

        var reader = res.body.getReader();
        var decoder = new TextDecoder();

        while (true) {
          var result = await reader.read();
          if (result.done) break;
          var chunk = decoder.decode(result.value, { stream: true });
          chunk.split('\n').forEach(function (line) {
            if (!line.startsWith('data: ')) return;
            var data = line.slice(6).trim();
            if (data === '[DONE]') return;
            try {
              var parsed = JSON.parse(data);
              if (parsed.token) {
                if (!reply) botEl.textContent = '';
                reply += parsed.token;
                botEl.textContent = reply;
                msgs.scrollTop = msgs.scrollHeight;
              }
            } catch { /* skip */ }
          });
        }
      } catch (e) {
        botEl.textContent = 'Unable to connect. Please check your internet and try again.';
        console.error('[Tuqlas]', e);
      } finally {
        input.disabled = false;
        input.focus();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

