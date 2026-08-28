/* ==========================================================================
   NOKA stay — interactions
   方針：静かだが印象に残る。動きは意味のあるところにだけ置く。
   すべて Wix Studio の標準アニメーション or 数行の Velo で再現できる範囲に収めている。
   ========================================================================== */
(function () {
  'use strict';
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- 01 ヘッダー：スクロールで紙面に乗る -------------------------------- */
  const hdr = $('.hdr');
  const onScroll = () => {
    if (hdr) hdr.classList.toggle('is-stuck', scrollY > 24);
    // モバイル：Hero を過ぎたら面談バーを出す
    const bar = $('.mbar');
    if (bar) bar.classList.toggle('is-on', scrollY > innerHeight * 0.72);
    // 04 の進行線
    const track = $('[data-days-track]');
    if (track) {
      const sec = track.closest('.section');
      const r = sec.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.85 - r.top) / (r.height * 0.8)));
      $('[data-days-prog]').style.width = (p * 100).toFixed(1) + '%';
    }
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- 02 現れ方 ---------------------------------------------------------- */
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver((es) => {
      es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.06 });
    $$('.rv, .rule-draw').forEach(el => io.observe(el));
  } else {
    $$('.rv, .rule-draw').forEach(el => el.classList.add('is-in'));
  }

  /* --- 03 いま瑞江で起きていること ----------------------------------------
     東京を「行き先」ではなく「いま人が暮らしている場所」に変える一行。
     Wix では Velo 数行、または静的な文言に置き換えても構造は壊れない。 */
  const MOMENTS = [
    [5,  'The bakery opens before the station does.'],
    [8,  'The platform is full. The street is empty.'],
    [10, 'Deliveries, and a vacuum cleaner somewhere upstairs.'],
    [12, 'Lunch smells reach the second floor.'],
    [14, 'Bicycles, and the long way home from school.'],
    [17, 'The supermarket starts putting yellow stickers on the fish.'],
    [19, 'Someone two doors down is running a bath.'],
    [22, 'The last train is still running.'],
    [0,  'The vending machine is the brightest thing on the street.']
  ];
  const clock = $('[data-clock]');
  if (clock) {
    const line = $('[data-moment]');
    const tick = () => {
      const now = new Date(Date.now() + (new Date().getTimezoneOffset() * 60000) + 9 * 3600000);
      const h = now.getHours();
      clock.innerHTML = `${String(h).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}<sup>JST</sup>`;
      if (line) {
        let m = MOMENTS[MOMENTS.length - 1][1];
        for (const [from, t] of MOMENTS) if (h >= from) m = t;
        if (h < 5) m = MOMENTS[MOMENTS.length - 1][1];
        line.textContent = m;
      }
    };
    tick(); setInterval(tick, 20000);
  }

  /* --- 04 SPIR：面談枠の選択 ----------------------------------------------
     実装時は Spir の埋め込み or 外部遷移に置き換わる。
     この枠は「埋め込みが入っても、ボタンだけでも成立する」ことの確認用。 */
  const cal = $('[data-cal]');
  if (cal) {
    cal.addEventListener('click', e => {
      const d = e.target.closest('.spir__d.is-free');
      if (!d) return;
      $$('.spir__d', cal).forEach(x => x.classList.remove('is-sel'));
      d.classList.add('is-sel');
      const out = $('[data-cal-out]');
      if (out) out.textContent = `SEP ${d.textContent.trim()}, 2026`;
    });
  }
  const slots = $('[data-slots]');
  if (slots) {
    slots.addEventListener('click', e => {
      const s = e.target.closest('.spir__slot');
      if (!s) return;
      $$('.spir__slot', slots).forEach(x => x.classList.remove('is-sel'));
      s.classList.add('is-sel');
      const out = $('[data-slot-out]');
      if (out) out.textContent = s.textContent.trim() + ' JST';
    });
  }

  /* --- 05 言語切替（表示のみ。実装は Wix Multilingual） -------------------- */
  $$('[data-lang]').forEach(b => b.addEventListener('click', () => {
    $$('[data-lang]').forEach(x => x.classList.remove('is-on'));
    b.classList.add('is-on');
  }));

  /* --- 06 メディアのカテゴリ ----------------------------------------------
     実装は Wix Blog のカテゴリ（Tags は Multilingual で翻訳不可のため使わない） */
  $$('[data-cat]').forEach(b => b.addEventListener('click', e => {
    e.preventDefault();
    $$('[data-cat]').forEach(x => x.classList.remove('is-on'));
    b.classList.add('is-on');
    const c = b.dataset.cat;
    $$('[data-row-cat]').forEach(r => {
      r.style.display = (c === 'all' || r.dataset.rowCat === c) ? '' : 'none';
    });
  }));
})();
