/*!
 * Clyde B. Jones Funeral Home website: DESIGN PREVIEW
 * Design, layout and code (c) 2026 Tech Nova Barbados Limited. All rights reserved.
 * Built by Tech Nova Barbados Limited, https://technovabb.com
 * This preview is not licensed for use, copying or publication by anyone,
 * including the client, until Tech Nova hands the site over in writing.
 * Client text, logo and photos remain the property of Clyde B. Jones Funeral Home Co. Ltd.
 */
/* Clyde B. Jones Funeral Home: small helpers for the design preview.
   Everything works without this file; it only adds convenience. */
(function () {
  'use strict';

  // Tech Nova watermark in the browser console
  if (window.console) {
    console.log('%cTech Nova Barbados Limited', 'color:#7a0f2e;font-size:16px;font-weight:bold');
    console.log('Design preview. Design and code (c) 2026 Tech Nova Barbados Limited. All rights reserved. Not licensed for reuse. https://technovabb.com');
  }

  // ---------- Phone menu ----------
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('main-nav');
  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
    };
    toggle.addEventListener('click', function () { setOpen(!nav.classList.contains('is-open')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
    });
  }

  // ---------- Footer year ----------
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // ---------- Forms: the preview has no server yet ----------
  document.querySelectorAll('form[data-preview-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('.form-status');
      if (status) {
        status.textContent = 'Thank you. This is a design preview, so nothing was sent. On the live website, this goes straight to the Clyde B. Jones team.';
        status.classList.add('is-shown');
      }
    });
  });

  // ---------- Share, copy link, print ----------
  function absolute(url) { return new URL(url, window.location.href).href; }

  function flash(btn, text) {
    var old = btn.innerHTML;
    btn.textContent = text;
    setTimeout(function () { btn.innerHTML = old; }, 2000);
  }

  function copy(text, btn) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { flash(btn, 'Link copied'); }, function () { window.prompt('Copy this link:', text); });
    } else {
      window.prompt('Copy this link:', text);
    }
  }

  document.addEventListener('click', function (e) {
    var shareBtn = e.target.closest('[data-share]');
    if (shareBtn) {
      var url = absolute(shareBtn.getAttribute('data-share'));
      var title = shareBtn.getAttribute('data-share-title') || document.title;
      if (navigator.share) {
        navigator.share({ title: title, url: url }).catch(function () {});
      } else {
        copy(url, shareBtn);
      }
      return;
    }
    var copyBtn = e.target.closest('[data-copy-link]');
    if (copyBtn) { copy(window.location.href.split('#')[0], copyBtn); return; }
    if (e.target.closest('[data-print]')) { window.print(); return; }
    var icsBtn = e.target.closest('[data-ics]');
    if (icsBtn) { downloadIcs(icsBtn); }
  });

  // Point tribute share links at the page the visitor is actually on
  var here = encodeURIComponent(window.location.href.split('#')[0]);
  document.querySelectorAll('[data-share-whatsapp]').forEach(function (a) { a.href = 'https://wa.me/?text=' + here; });
  document.querySelectorAll('[data-share-facebook]').forEach(function (a) { a.href = 'https://www.facebook.com/sharer/sharer.php?u=' + here; });

  // ---------- Add to calendar (.ics file) ----------
  function icsEscape(s) { return String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,'); }
  function downloadIcs(btn) {
    var d = btn.dataset;
    var stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    var lines = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Clyde B. Jones Funeral Home//Tributes//EN',
      'BEGIN:VEVENT',
      'UID:' + d.icsStart + '-' + Math.random().toString(36).slice(2) + '@clydebjonesfuneralhome',
      'DTSTAMP:' + stamp,
      'DTSTART:' + d.icsStart,
      'DTEND:' + d.icsEnd,
      'SUMMARY:' + icsEscape(d.icsTitle),
      'LOCATION:' + icsEscape(d.icsLocation),
      'DESCRIPTION:' + icsEscape(window.location.href.split('#')[0]),
      'END:VEVENT', 'END:VCALENDAR'
    ];
    var blob = new Blob([lines.join('\r\n')], { type: 'text/calendar' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'funeral-service.ics';
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  // ---------- Casket and urn filter ----------
  var filterRow = document.querySelector('.filter-row');
  var grid = document.getElementById('product-grid');
  if (filterRow && grid) {
    filterRow.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-filter]');
      if (!btn) return;
      var kind = btn.getAttribute('data-filter');
      filterRow.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      grid.querySelectorAll('li[data-kind]').forEach(function (li) {
        li.hidden = !(kind === 'all' || li.getAttribute('data-kind') === kind);
      });
    });
  }

  // ---------- Tributes: search by name, browse by month ----------
  var list = document.getElementById('tribute-list');
  if (list && Array.isArray(window.CBJ_TRIBUTES)) {
    var data = window.CBJ_TRIBUTES;
    var q = document.getElementById('tq');
    var month = document.getElementById('tmonth');
    var count = document.getElementById('tribute-count');
    var empty = document.getElementById('tribute-empty');
    var root = new URL('../', window.location.origin + window.location.pathname.replace(/[^/]*$/, '')).href; // site root, one level up from /tributes/
    var tributeUrl = root + 'tributes/name-of-loved-one/';
    var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var parseDate = function (iso) { var p = iso.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); };
    var today = new Date(); today.setHours(0, 0, 0, 0);

    // Month options, newest first
    var seen = {};
    data.forEach(function (t) {
      var key = t.date.slice(0, 7);
      if (seen[key]) return;
      seen[key] = true;
      var dt = parseDate(t.date);
      var opt = document.createElement('option');
      opt.value = key;
      opt.textContent = MONTHS[dt.getMonth()] + ' ' + dt.getFullYear();
      month.appendChild(opt);
    });

    var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

    var card = function (t) {
      var dt = parseDate(t.date);
      var when = DAYS[dt.getDay()] + ' ' + dt.getDate() + ' ' + MONTHS[dt.getMonth()];
      var past = dt < today;
      var isToday = dt.getTime() === today.getTime();
      var tag = '';
      if (isToday && t.livestream) tag = '<span class="tag is-live">Live today</span>';
      else if (!past && t.livestream) tag = '<span class="tag is-live">Livestream</span>';
      else if (past && t.livestream) tag = '<span class="tag">Recording available</span>';
      var service = past ? 'Funeral held ' + when : 'Funeral: ' + when + ', ' + t.time;
      var watch = t.livestream
        ? '<a class="chip-btn" href="' + tributeUrl + '#livestream"><svg class="icon" aria-hidden="true"><use href="#' + (past ? 'i-play' : 'i-video') + '"/></svg> ' + (past ? 'Replay' : 'Watch') + '</a>'
        : '';
      var second = past
        ? '<a class="chip-btn" href="' + tributeUrl + '#condolences"><svg class="icon" aria-hidden="true"><use href="#i-book"/></svg> Condolences</a>'
        : '<a class="chip-btn" href="' + tributeUrl + '#flowers"><svg class="icon" aria-hidden="true"><use href="#i-flower"/></svg> Flowers</a>';
      return '<li><article class="tribute-card">' +
        '<div class="tribute-photo">' + tag + '<svg aria-hidden="true"><use href="#i-dove"/></svg></div>' +
        '<div class="tribute-body">' +
        '<h3><a href="' + tributeUrl + '">' + esc(t.name) + '</a></h3>' +
        '<p class="tribute-meta">' + esc(t.born) + ' – ' + esc(t.died) + ' · ' + esc(t.parish) + '</p>' +
        '<p class="tribute-service">' + service + '</p>' +
        '<div class="tribute-actions">' + watch + second +
        '<button class="chip-btn" type="button" data-share="' + tributeUrl + '" data-share-title="' + esc(t.name) + '"><svg class="icon" aria-hidden="true"><use href="#i-share"/></svg> Share</button>' +
        '</div></div></article></li>';
    };

    var render = function () {
      var term = q.value.trim().toLowerCase();
      var m = month.value;
      var rows = data.filter(function (t) {
        return (!term || t.name.toLowerCase().indexOf(term) !== -1) && (!m || t.date.slice(0, 7) === m);
      });
      list.innerHTML = rows.map(card).join('');
      empty.hidden = rows.length > 0;
      count.textContent = rows.length === 1 ? '1 tribute' : rows.length + ' tributes';
    };

    var params = new URLSearchParams(window.location.search);
    if (params.get('q')) q.value = params.get('q');
    q.addEventListener('input', render);
    month.addEventListener('change', render);
    document.getElementById('tribute-filter').addEventListener('submit', function (e) { e.preventDefault(); render(); });
    render();
  }
})();
