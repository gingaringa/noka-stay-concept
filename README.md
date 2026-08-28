# NOKA stay — 応募用モック

コンセプト **AN ADDRESS IN TOKYO ／ 東京に、住所を持つ**（案C）のローカルプロトタイプ。

## 動かし方

```bash
cd noka-stay-proposal/mock
python3 -m http.server 8765
```

→ http://localhost:8765/index.html

`file://` で直接開いても動くが、Google Fonts の読み込みのため
**ローカルサーバー経由を推奨**（フォントが当たらないと印象が大きく変わる）。

| ファイル | 内容 |
|---|---|
| `index.html` | LP（01 ADDRESS 〜 08 TALK） |
| `stories.html` | オウンドメディア 記事一覧（索引型） |
| `story.html` | オウンドメディア 記事詳細 |
| `css/tokens.css` | デザイントークン（色・書体・寸法・モーション） |
| `css/app.css` | レイアウトとコンポーネント |
| `js/plates.js` | 写真スロットの線画（SVGスプライト） |
| `js/map.js` | 生活圏マップ（データ駆動・拠点追加可能） |
| `js/app.js` | ヘッダー／スクロール表示／時計／SPIR／言語・カテゴリ切替 |

## 確認できること

- **レスポンシブ** — 1440 / 1180 / 900 / 640 の4段階。モバイルは縮小版ではなく組み直し
- **ホバー** — ナビ、CTA、記事一覧（小さな図版が出る）、地図の地点
- **スクロール表示** — 各要素が静かに現れる。`prefers-reduced-motion` を尊重
- **地図のインタラクション** — 地点にホバーすると、徒歩経路が引かれ、分数が出て、右の一覧が連動
- **拠点タブ** — MIZUE / KOENJI / KAMAKURA / KYOTO。将来拠点は `soon` で無効
- **いまの瑞江の時刻** — JSTの現在時刻と、時間帯で変わる一行
- **SPIR** — 日付と時間枠の選択（本番は埋め込み or 外部遷移に置換）

## 写真について

現在、写真スロット（`.plate`）は**線画＋階調**で構成している。
実写が用意できたら、HTML側で1行足すだけで差し替わり、**レイアウトは1pxも動かない**。

```html
<figure class="plate plate--tall t-morning" style="--photo:url(assets/street.jpg)">
```

`--photo` が入ると線画（`.plate__art`）は自動的に非表示になる。
