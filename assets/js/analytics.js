// Custom GA4 events. gtag is defined by google_analytics.html; with Consent
// Mode these are cookieless pings until the reader accepts.
(function () {
  function send(name, params) {
    if (window.gtag) window.gtag('event', name, params || {});
  }

  // Article read depth, measured against the article body (not the page).
  var body = document.querySelector('.post-content');
  if (body) {
    var marks = [25, 50, 75, 100], fired = {}, start = Date.now(), ticking = false;
    var check = function () {
      ticking = false;
      var r = body.getBoundingClientRect();
      var pct = Math.min(100, Math.max(0, ((window.innerHeight - r.top) / r.height) * 100));
      marks.forEach(function (m) {
        if (!fired[m] && pct >= m) {
          fired[m] = true;
          send('read_progress', { percent: m });
          // Reaching the end in under 30s is skimming, not reading.
          if (m === 100 && Date.now() - start > 30000) {
            send('read_complete', { seconds: Math.round((Date.now() - start) / 1000) });
          }
        }
      });
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(check); }
    }, { passive: true });
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('a, button');
    if (!el) return;
    if (el.classList.contains('copy-code')) return send('copy_code');
    if (el.closest('.toc')) return send('toc_click', { link_text: el.textContent.trim() });
    if (el.closest('.share-buttons')) return send('share_click', { link_url: el.href });
    if (el.closest('.paginav')) return send('post_nav_click', { link_url: el.href });
    if (el.tagName !== 'A' || !el.hostname || el.hostname === location.hostname) return;
    if (el.closest('.social-icons')) {
      send('social_click', { network: el.getAttribute('title') || el.hostname, link_url: el.href });
    } else {
      send('outbound_click', { link_url: el.href, link_domain: el.hostname });
    }
  });
})();
