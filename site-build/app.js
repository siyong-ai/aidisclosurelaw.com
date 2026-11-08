/* AI Disclosure Law — interactions
   Kept intentionally small: theme, reading progress, TOC spy, citation copy. */

(function () {
  'use strict';

  /* ---------------------------------------------------------------- theme */

  var root = document.documentElement;

  function currentTheme() {
    return root.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  function syncToggle() {
    var btn = document.querySelector('[data-theme-toggle]');
    if (!btn) return;
    var isDark = currentTheme() === 'dark';
    btn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    btn.setAttribute('aria-pressed', String(isDark));
  }

  function applyTheme(mode) {
    if (mode !== 'dark' && mode !== 'light') return;
    root.setAttribute('data-theme', mode);
    try {
      localStorage.setItem('theme', mode);
    } catch (e) {}
    syncToggle();
  }

  syncToggle();

  var toggle = document.querySelector('[data-theme-toggle]');
  if (toggle) {
    toggle.addEventListener('click', function () {
      applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
    });
  }

  /* ------------------------------------------------------------- progress */

  var bar = document.querySelector('.progress span');
  if (bar) {
    var ticking = false;
    var update = function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var pct = max > 0 ? (h.scrollTop || document.body.scrollTop) / max : 0;
      bar.style.width = Math.min(100, Math.max(0, pct * 100)) + '%';
      ticking = false;
    };
    window.addEventListener(
      'scroll',
      function () {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
    update();
  }

  /* ------------------------------------------------------------- toc spy */

  var tocLinks = Array.prototype.slice.call(document.querySelectorAll('[data-toc]'));
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    tocLinks.forEach(function (a) {
      byId[a.getAttribute('href').slice(1)] = a;
    });

    var headings = Array.prototype.slice
      .call(document.querySelectorAll('.prose h2[id]'))
      .filter(function (h) {
        return byId[h.id];
      });

    var visible = new Set();

    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        });

        var active = null;
        for (var i = 0; i < headings.length; i++) {
          if (visible.has(headings[i].id)) {
            active = headings[i].id;
            break;
          }
        }
        if (!active && headings.length) {
          var top = window.scrollY + 120;
          for (var j = 0; j < headings.length; j++) {
            if (headings[j].getBoundingClientRect().top + window.scrollY <= top) active = headings[j].id;
          }
        }
        tocLinks.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + active);
        });
      },
      { rootMargin: '-88px 0px -62% 0px', threshold: 0 }
    );

    headings.forEach(function (h) {
      obs.observe(h);
    });
  }

  /* --------------------------------------------------------- copy citation */

  var copyBtns = document.querySelectorAll('[data-copy]');
  Array.prototype.forEach.call(copyBtns, function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      var done = function () {
        var old = btn.textContent;
        btn.textContent = 'Copied';
        btn.classList.add('done');
        setTimeout(function () {
          btn.textContent = old;
          btn.classList.remove('done');
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {});
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand('copy');
          done();
        } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  });

  /* --------------------------------------------------------------- share */

  var shareBtns = document.querySelectorAll('[data-share]');
  Array.prototype.forEach.call(shareBtns, function (btn) {
    btn.addEventListener('click', function () {
      var flash = function (label) {
        var old = btn.textContent;
        btn.textContent = label;
        btn.classList.add('done');
        setTimeout(function () {
          btn.textContent = old;
          btn.classList.remove('done');
        }, 1600);
      };

      var descEl = document.querySelector('meta[name="description"]');
      var payload = {
        title: document.title,
        text: descEl ? descEl.content : '',
        url: location.href,
      };

      if (navigator.share) {
        navigator.share(payload).catch(function () {});
        return;
      }

      // Desktop fallback: copy the URL the reader is actually on. Using
      // location.href rather than canonical keeps the link working on preview
      // and vercel.app deployments where the custom domain is not live yet.
      var link = location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(link).then(function () {
          flash('Link copied');
        }, function () {});
      } else {
        var ta = document.createElement('textarea');
        ta.value = link;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand('copy');
          flash('Link copied');
        } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  });

  /* --------------------------------------------- open FAQ if deep-linked */

  if (location.hash) {
    var target = document.querySelector(location.hash);
    if (target && target.tagName === 'DETAILS') target.open = true;
  }
})();
