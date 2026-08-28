/* ==========================================================================
   NOKA stay — Plate artwork
   写真スロットの中身。実写が入るまでの「暫定の絵」ではなく、
   線画＋階調という一貫したアートディレクションとして設計している。
   実写が入る場合は .plate に --photo を指定するだけで、線画は自動的に外れる。
   ========================================================================== */
(function () {
  const S = (id, body) =>
    `<symbol id="${id}" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">${body}</symbol>`;

  const A = 'fill="none" stroke="currentColor" stroke-width="1.3" vector-effect="non-scaling-stroke" stroke-linecap="round"';
  const T = 'fill="none" stroke="currentColor" stroke-width="0.7" vector-effect="non-scaling-stroke" opacity=".62"';
  const F = 'fill="currentColor" opacity=".14"';

  const sprite = [

    /* 朝の住宅街 — 電柱・家並み・自転車 */
    S('p-street', `
      <g ${A}>
        <path d="M0 372h400"/>
        <path d="M96 372V214h58v158M154 214l30-24 28 24v158"/>
        <path d="M212 372V236h74v136M286 236l26-20 24 20v136"/>
        <path d="M0 372V262h50v110"/>
        <path d="M96 214l-33-26 33 26"/>
        <path d="M124 266h18v22h-18zM236 268h20v24h-20zM322 270h16v20h-16z"/>
        <path d="M110 316h30v56h-30zM250 320h26v52h-26z"/>
        <path d="M62 132v240"/><path d="M44 158h36M48 178h28"/>
        <path d="M62 160C132 168 246 176 400 178"/><path d="M62 180C140 190 250 198 400 202"/>
        <circle cx="196" cy="352" r="19"/><circle cx="262" cy="352" r="19"/>
        <path d="M196 352l24-42h30M220 310l42 42M212 330h40M250 310v-8h16"/>
        <path d="M0 398h400M0 420h400" opacity=".4"/>
      </g>
      <g ${F}><rect x="96" y="214" width="58" height="158"/><rect x="212" y="236" width="74" height="136"/></g>`),

    /* 台所 — 窓・やかん・湯気 */
    S('p-kitchen', `
      <g ${A}>
        <rect x="72" y="70" width="256" height="200"/>
        <path d="M200 70v200M72 170h256"/>
        <path d="M56 330h300M56 330v130"/>
        <path d="M132 296c0-22 16-34 40-34s40 12 40 34"/>
        <path d="M118 296h108v10c0 16-14 24-32 24h-44c-18 0-32-8-32-24z"/>
        <path d="M226 300l34-14v20l-34 8M160 262v-14h24v14"/>
        <path d="M262 330v-42h44v42"/>
        <circle cx="284" cy="266" r="10"/>
        <path d="M96 356h64v52H96zM176 356h56v52h-56z"/>
      </g>
      <g ${T}>
        <path d="M154 250c-10-16 8-22 0-38M176 250c-10-16 8-22 0-38M198 250c-10-16 8-22 0-38"/>
        <path d="M96 108h88M96 130h56"/>
      </g>
      <g ${F}><rect x="72" y="70" width="128" height="100"/><rect x="200" y="170" width="128" height="100"/></g>`),

    /* パン屋 — ひさし・トレー・看板 */
    S('p-bakery', `
      <g ${A}>
        <path d="M40 250h320M40 250v210M360 250v210"/>
        <path d="M40 250l-14-52h348l-14 52"/>
        <path d="M62 198l-6 52M104 198l-4 52M146 198l-2 52M188 198v52M230 198l2 52M272 198l4 52M314 198l6 52"/>
        <rect x="84" y="292" width="112" height="126"/>
        <path d="M84 330h112M84 368h112"/>
        <rect x="232" y="292" width="86" height="168"/>
        <path d="M232 372h86"/>
        <path d="M110 306c14-8 32-8 46 0M110 344c14-8 32-8 46 0M110 382c14-8 32-8 46 0"/>
        <rect x="150" y="120" width="100" height="46"/>
        <path d="M200 166v32"/>
        <path d="M0 460h400"/>
      </g>
      <g ${T}><path d="M170 138h60M170 150h40"/></g>
      <g ${F}><path d="M40 250l-14-52h348l-14 52z"/></g>`),

    /* コインランドリー — ドラム3つ・ベンチ */
    S('p-laundry', `
      <g ${A}>
        <path d="M30 60h340v300H30zM30 360v100"/>
        <rect x="58" y="96" width="90" height="118"/><circle cx="103" cy="150" r="32"/><circle cx="103" cy="150" r="20"/>
        <rect x="158" y="96" width="90" height="118"/><circle cx="203" cy="150" r="32"/><circle cx="203" cy="150" r="20"/>
        <rect x="258" y="96" width="90" height="118"/><circle cx="303" cy="150" r="32"/><circle cx="303" cy="150" r="20"/>
        <path d="M58 96V78M158 96V78M258 96V78"/>
        <path d="M70 288h260M70 288v52M330 288v52M96 340v34M304 340v34"/>
        <path d="M0 452h400"/>
      </g>
      <g ${T}><path d="M58 240h90M158 240h60M258 240h90"/></g>
      <g ${F}><circle cx="103" cy="150" r="20"/><circle cx="203" cy="150" r="20"/><circle cx="303" cy="150" r="20"/></g>`),

    /* 電車の窓 — つり革・流れる風景 */
    S('p-train', `
      <g ${A}>
        <rect x="44" y="120" width="312" height="196" rx="14"/>
        <path d="M44 246h312"/>
        <path d="M0 56h400"/>
        <path d="M104 56v40M200 56v40M296 56v40"/>
        <ellipse cx="104" cy="112" rx="17" ry="20"/><ellipse cx="200" cy="112" rx="17" ry="20"/><ellipse cx="296" cy="112" rx="17" ry="20"/>
        <path d="M20 372h360M20 372v88M380 372v88M20 416h360"/>
      </g>
      <g ${T}>
        <path d="M60 226h44v20H60zM128 214h34v32h-34zM186 232h52v14h-52zM262 208h40v38h-40zM322 228h26v18h-26z"/>
        <path d="M44 200h312"/>
        <path d="M74 120v126M254 120v126" opacity=".4"/>
      </g>
      <g ${F}><rect x="44" y="246" width="312" height="70"/></g>`),

    /* 公園 — ベンチ・木・鉄棒 */
    S('p-park', `
      <g ${A}>
        <path d="M0 386h400"/>
        <path d="M124 386V246"/>
        <path d="M124 254c-52 0-76-28-76-58s28-52 60-46c4-30 30-46 58-40 26-32 78-16 78 26 30 2 44 26 40 50-4 28-36 68-92 68z" transform="translate(-14 -12)"/>
        <path d="M240 344h122M240 344v42M362 344v42M252 386v-22M350 386v-22"/>
        <path d="M240 322h122M246 322v22M356 322v22"/>
        <path d="M40 386V300h6v86M40 300h56M96 300v86" opacity=".8"/>
        <path d="M0 424h400" opacity=".4"/>
      </g>
      <g ${T}><path d="M96 300h-56M52 314h34"/><path d="M300 250c0-20 14-30 14-30"/></g>
      <g ${F}><path d="M110 242c-52 0-76-28-76-58s28-52 60-46c4-30 30-46 58-40 26-32 78-16 78 26 30 2 44 26 40 50-4 28-36 68-92 68z"/></g>`),

    /* スーパー — 棚とかご */
    S('p-market', `
      <g ${A}>
        <path d="M28 84h344M28 84v292M372 84v292"/>
        <path d="M28 156h344M28 224h344M28 292h344M28 360h344"/>
        <path d="M112 84v292M204 84v292M292 84v292"/>
        <path d="M46 120h48M46 134h30M126 120h56M126 134h34M220 120h50M310 120h44M310 134h26"/>
        <path d="M46 188h44M126 188h60M220 188h40M310 188h48"/>
        <path d="M46 256h58M126 256h42M220 256h56M310 256h32"/>
        <path d="M120 416h140l14-40h-168z"/>
        <path d="M134 416v26M250 416v26"/>
        <circle cx="140" cy="452" r="9"/><circle cx="244" cy="452" r="9"/>
        <path d="M106 376l-14-24h-22"/>
      </g>
      <g ${T}><path d="M232 130h30M232 200h26M232 268h34"/></g>
      <g ${F}><rect x="28" y="84" width="84" height="72"/><rect x="204" y="224" width="88" height="68"/></g>`),

    /* 窓辺の机 — 仕事をする室内 */
    S('p-desk', `
      <g ${A}>
        <rect x="120" y="46" width="230" height="196"/>
        <path d="M235 46v196M120 144h230"/>
        <path d="M40 300h330M40 300v14h330v-14"/>
        <path d="M76 314v146M334 314v146"/>
        <path d="M168 300l14-70h100l16 70"/>
        <path d="M182 230h100"/>
        <path d="M196 246h72M196 262h52"/>
        <rect x="308" y="256" width="34" height="44" rx="4"/><path d="M342 268h12v14h-12"/>
        <path d="M96 262h44v38H96z"/>
      </g>
      <g ${T}>
        <path d="M120 46l60 196M180 46l60 196M240 46l60 196M300 46l50 164" opacity=".3"/>
        <path d="M104 274h28M104 284h18"/>
      </g>
      <g ${F}><rect x="235" y="46" width="115" height="98"/><rect x="120" y="144" width="115" height="98"/></g>`),

    /* 夕方の帰り道 — 街灯と長い影 */
    S('p-evening', `
      <g ${A}>
        <path d="M0 366h400"/>
        <path d="M74 366V128M74 128h34a16 16 0 0 1 0 32H92"/>
        <path d="M262 366V186M262 186h26a12 12 0 0 1 0 24h-16"/>
        <path d="M0 300h130v66H0zM160 316h96v50h-96zM290 292h110v74H290z"/>
        <path d="M28 322h22v20H28zM188 334h22v18h-22zM320 314h26v22h-26z"/>
        <path d="M204 302c0-14 8-22 18-22s18 8 18 22v50h-36z"/>
        <path d="M214 352v34M230 352v34"/>
        <circle cx="222" cy="270" r="12"/>
      </g>
      <g ${T}>
        <path d="M92 160l-52 206M108 160l40 206" opacity=".45"/>
        <path d="M240 386l64 30M204 386l-56 30" opacity=".5"/>
        <path d="M0 400h400M0 424h400" opacity=".35"/>
      </g>
      <g ${F}><path d="M92 160l-52 206h116l-40-206z"/></g>`),

    /* 川沿い — 新中川の土手 */
    S('p-river', `
      <g ${A}>
        <path d="M0 214C90 200 160 232 240 226s110-30 160-38"/>
        <path d="M0 268C96 254 168 288 248 282s108-32 152-40"/>
        <path d="M0 330h400"/>
        <path d="M112 214v-52M112 162h72M184 162v52"/>
        <path d="M112 178h72M124 162v16M148 162v16M172 162v16"/>
        <path d="M0 372h400M0 404h400" opacity=".4"/>
        <circle cx="308" cy="356" r="12"/><path d="M308 368v22M300 380h16M296 402l12-12 12 12"/>
      </g>
      <g ${T}>
        <path d="M20 238h56M96 244h44M180 236h64M282 244h50"/>
        <path d="M40 292h60M132 296h40M214 290h72M310 296h48"/>
        <path d="M0 140h400M0 116h400" opacity=".5"/>
      </g>
      <g ${F}><path d="M0 214C90 200 160 232 240 226s110-30 160-38v94C310 262 250 292 168 296S60 268 0 268z"/></g>`),

    /* 銭湯 — のれんと入口 */
    S('p-sento', `
      <g ${A}>
        <path d="M52 172h296M52 172v288M348 172v288"/>
        <path d="M52 172l-22-46h340l-22 46"/>
        <path d="M124 236h152v70H124z"/>
        <path d="M162 236v70M200 236v70M238 236v70"/>
        <path d="M124 236v-16h152v16"/>
        <path d="M124 306v154M276 306v154"/>
        <rect x="82" y="352" width="26" height="60"/><rect x="292" y="352" width="26" height="60"/>
        <path d="M170 76h60v46h-60zM200 122v4"/>
        <path d="M0 460h400"/>
      </g>
      <g ${T}>
        <path d="M144 262h16M182 262h16M220 262h16M258 262h12"/>
        <path d="M182 94h36M186 106h28"/>
      </g>
      <g ${F}><rect x="124" y="236" width="152" height="70"/><path d="M52 172l-22-46h340l-22 46z"/></g>`)

  ].join('');

  const el = document.createElement('div');
  el.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg">${sprite}</svg>`;
  document.addEventListener('DOMContentLoaded', () => document.body.prepend(el));
  if (document.body) document.body.prepend(el);
})();
