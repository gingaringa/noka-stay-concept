/* ==========================================================================
   NOKA stay — 生活圏マップ
   Google Maps の埋め込みではない。NOKA stay 固有の図としてブランド資産化する。
   拠点が増えるときは LOCATIONS に住所・座標・地点リストを足すだけでよい。
   ＝「住所が増える」ことがそのままブランドの拡張になる。
   ========================================================================== */
(function () {
  const VB = { w: 700, h: 620 };
  const HOME = { x: 348, y: 322 };

  const LOCATIONS = {
    mizue: {
      key: 'MIZUE', ward: 'EDOGAWA-KU', city: 'TOKYO', postal: '',
      coords: '',
      line: 'TOEI SHINJUKU LINE', lineJp: '都営新宿線',
      hub: 'SHINJUKU', hubMin: '30 MIN',
      note: 'Everything below is within a ten-minute walk of the front door.',
      pois: [
        { id: 'bakery',  n: 'Bakery',            jp: 'パン屋',        min: 3,  x: 296, y: 258 },
        { id: 'conbini', n: 'Convenience store', jp: 'コンビニ',      min: 2,  x: 406, y: 288 },
        { id: 'market',  n: 'Supermarket',       jp: 'スーパー',      min: 4,  x: 448, y: 232 },
        { id: 'laundry', n: 'Laundromat',        jp: 'コインランドリー', min: 5, x: 418, y: 398 },
        { id: 'park',    n: 'Park',              jp: '公園',          min: 6,  x: 256, y: 414 },
        { id: 'station', n: 'Mizue Station',     jp: '瑞江駅',        min: 7,  x: 222, y: 199, rail: true },
        { id: 'shoten',  n: 'Shopping street',   jp: '商店街',        min: 8,  x: 166, y: 256 },
        { id: 'sento',   n: 'Public bath',       jp: '銭湯',          min: 9,  x: 514, y: 374 },
        { id: 'river',   n: 'Riverbank',         jp: '新中川の土手',   min: 12, x: 606, y: 306 }
      ]
    },
    /* 将来の拠点。同じ体系で描ける、という提案そのものを画面に出す */
    koenji:   { key: 'KOENJI',   ward: 'SUGINAMI-KU', city: 'TOKYO', soon: true },
    kamakura: { key: 'KAMAKURA', ward: 'KANAGAWA',    city: 'JAPAN', soon: true },
    kyoto:    { key: 'KYOTO',    ward: 'NAKAGYO-KU',  city: 'KYOTO', soon: true }
  };

  const RINGS = [
    { r: 78,  label: '3 MIN' },
    { r: 128, label: '5 MIN' },
    { r: 228, label: '10 MIN' }
  ];

  /* 徒歩の経路：直線ではなく街路に沿った L 字で描く */
  const walkPath = p => {
    const midX = p.x, midY = HOME.y;
    const r = 14, dx = Math.sign(p.x - HOME.x), dy = Math.sign(p.y - HOME.y);
    return `M${HOME.x} ${HOME.y} H${midX - dx * r} Q${midX} ${midY} ${midX} ${midY + dy * r} V${p.y}`;
  };

  function draw(loc) {
    const p = loc.pois;
    return `
<svg class="map__svg" viewBox="0 0 ${VB.w} ${VB.h}" role="img"
     aria-label="Walking-distance map around NOKA stay ${loc.key}">
  <!-- 街区 -->
  <g>
    <rect class="mp-block" x="60"  y="250" width="128" height="96"  rx="2"/>
    <rect class="mp-block" x="60"  y="366" width="128" height="120" rx="2"/>
    <rect class="mp-block" x="212" y="250" width="104" height="96"  rx="2"/>
    <rect class="mp-block" x="212" y="366" width="104" height="120" rx="2"/>
    <rect class="mp-block" x="382" y="212" width="120" height="86"  rx="2"/>
    <rect class="mp-block" x="382" y="330" width="120" height="96"  rx="2"/>
    <rect class="mp-block" x="524" y="212" width="96"  height="214" rx="2"/>
    <rect class="mp-green" x="212" y="366" width="104" height="120" rx="2"/>
    <rect class="mp-green" x="470" y="470" width="150" height="90"  rx="2"/>
  </g>
  <!-- 街路 -->
  <g>
    <path class="mp-road mp-road--main" d="M0 322H700"/>
    <path class="mp-road mp-road--main" d="M348 0V620"/>
    <path class="mp-road" d="M0 240H700M0 358H700M0 452H700M0 540H700"/>
    <path class="mp-road" d="M200 0V620M470 0V620M556 0V620M112 0V620"/>
  </g>
  <!-- 新中川 -->
  <path class="mp-river" d="M672 0C650 120 636 210 640 300s16 190 4 320"/>
  <!-- 都営新宿線 -->
  <g>
    <path class="mp-rail" d="M0 236 L700 120"/>
    ${Array.from({ length: 26 }, (_, i) => {
      const x = i * 28 + 6, y = 236 - (x / 700) * 116;
      return `<line class="mp-rail-tie" x1="${x}" y1="${y - 6}" x2="${x}" y2="${y + 6}"/>`;
    }).join('')}
    <text class="mp-ring-l" x="586" y="132" transform="rotate(-9.4 586 132)">${loc.line}</text>
  </g>
  <!-- 徒歩圏の等時線 -->
  <g>
    ${RINGS.map(r => `<circle class="mp-ring" cx="${HOME.x}" cy="${HOME.y}" r="${r.r}"/>`).join('')}
    ${RINGS.map(r => `<text class="mp-ring-l" x="${HOME.x + 5}" y="${HOME.y - r.r + 12}">${r.label}</text>`).join('')}
  </g>
  <!-- 地点 -->
  <g>
    ${p.map(o => `
    <g class="mp-poi" data-poi="${o.id}" tabindex="0" role="button"
       aria-label="${o.n}, ${o.min} minutes on foot">
      <path class="mp-walkline" d="${walkPath(o)}"/>
      <circle class="mp-halo" cx="${o.x}" cy="${o.y}" r="6"/>
      <circle class="hit" cx="${o.x}" cy="${o.y}" r="26"/>
      <circle class="dot" cx="${o.x}" cy="${o.y}" r="3.4"/>
      <text class="lab" x="${o.x + (o.x > HOME.x ? 11 : -11)}" y="${o.y + 3.4}"
            text-anchor="${o.x > HOME.x ? 'start' : 'end'}">${o.n.toUpperCase()}</text>
      <text class="min" x="${o.x + (o.x > HOME.x ? 11 : -11)}" y="${o.y + 15}"
            text-anchor="${o.x > HOME.x ? 'start' : 'end'}">${o.min} MIN ON FOOT</text>
    </g>`).join('')}
  </g>
  <!-- NOKA stay -->
  <g class="mp-poi mp-home" data-poi="home">
    <rect x="${HOME.x - 6}" y="${HOME.y - 6}" width="12" height="12"/>
    <text class="lab" x="${HOME.x + 15}" y="${HOME.y - 12}">NOKA STAY ${loc.key}</text>
    <text class="min" x="${HOME.x + 15}" y="${HOME.y + 2}" style="opacity:1">YOUR ADDRESS</text>
  </g>
</svg>`;
  }

  function list(loc) {
    return `
      <li class="poi poi--home" data-poi="home">
        <span class="poi__n"><i></i>NOKA stay ${loc.key}</span>
        <span class="poi__m">00 MIN</span>
      </li>` +
      loc.pois.map(o => `
      <li class="poi" data-poi="${o.id}" tabindex="0">
        <span class="poi__n"><i></i>${o.n}<em class="jp" style="font-style:normal;color:var(--ink-4);margin-left:8px;font-size:12px">${o.jp}</em></span>
        <span class="poi__m">${String(o.min).padStart(2, '0')} MIN</span>
      </li>`).join('');
  }

  function render(key) {
    const loc = LOCATIONS[key];
    const frame = document.querySelector('[data-map-frame]');
    const side = document.querySelector('[data-map-list]');
    const meta = document.querySelector('[data-map-meta]');
    if (!frame || !loc || loc.soon) return;

    frame.querySelector('.map__svg')?.remove();
    frame.insertAdjacentHTML('afterbegin', draw(loc));
    side.innerHTML = list(loc);
    if (meta) {
      meta.querySelector('[data-m-addr]').textContent = `${loc.key}, ${loc.ward} — ${loc.city}`;
      meta.querySelector('[data-m-note]').textContent = loc.note;
    }
    wire();
  }

  function wire() {
    const all = document.querySelectorAll('[data-poi]');
    const set = (id, on) => all.forEach(el => {
      if (el.dataset.poi === id) el.classList.toggle('is-on', on);
    });
    const clear = () => all.forEach(el => el.classList.remove('is-on'));

    all.forEach(el => {
      const id = el.dataset.poi;
      ['mouseenter', 'focus'].forEach(ev => el.addEventListener(ev, () => { clear(); set(id, true); }));
      ['mouseleave', 'blur'].forEach(ev => el.addEventListener(ev, clear));
      el.addEventListener('click', () => { clear(); set(id, true); });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('[data-map-frame]')) return;
    render('mizue');

    document.querySelectorAll('[data-loc]').forEach(btn => {
      btn.addEventListener('click', () => {
        const k = btn.dataset.loc;
        if (LOCATIONS[k]?.soon) return;
        document.querySelectorAll('[data-loc]').forEach(b => b.classList.remove('is-on'));
        btn.classList.add('is-on');
        render(k);
      });
    });
  });
})();
