# Aya Cafe

架空のテイクアウトカフェのポートフォリオサイト。Astro + CSS + JavaScriptで制作。GitHub Pages向けの静的サイトです。

## 起動

Node.jsとCorepackがある環境で、このフォルダから実行します。

```sh
corepack pnpm install
corepack pnpm dev
```

本番用: `corepack pnpm build`。生成先は `dist/`。ビルド後は `corepack pnpm preview`。
依存固定用の `pnpm-lock.yaml` を保持しています。

## 編集箇所

- `src/pages/index.astro`: メニュー配列、ギャラリー配列、全セクションの内容、SEO。
- `src/styles/style.css`: ブランドカラー、文字、レイアウト、レスポンシブ、動き軽減。
- `src/scripts/script.js`: ナビ、商品選択、カスタマイズ、アニメーション。
- `astro.config.mjs`: 静的出力設定。

## 画像について

2026-10-25に、元寸法・構図のまま品質85で13枚をWebP化しました。Chocolate Sparkを含む9枚のギャラリーを表示します。すべての画像参照（動的切替を含む）はWebPです。

画像は `public/img/` のWebP 13枚を使用します。変換済みの未使用PNGは、依頼に基づき整理済みです。

カスタマイザーは写真にトッピングを合成せず、選択名を表示します。写真に含まれるホイップ等は選択によって消えません。将来の透過素材追加に向け、script.jsのtoppingsデータにlayer拡張箇所を設けています。実際の注文・決済・送信はありません。

## 表示設計と検証

PCのヘッダーは72px、装飾帯は62px。ヒーローは `min-height: calc(100svh - var(--header-height) - 62px)` で表示領域に合わせます。見出し・写真の上限にもviewport高さを使用し、本文の切断・一律縮小はしていません。スマホは高さを自然成り行きにし、写真と本文を縦配置します。

Chrome（headless、CSS viewport、倍率相当100%）で次を確認しました。

- 1920×1080 / 1440×900 / 1366×768 / 1280×800 / 1366×650: 装飾帯まで1画面内、横スクロールなし。
- 375×812 / 390×844 / 430×932: 横スクロールなし。
- 商品切り替え・選択状態、MY DRINKベースと複数トッピング・完成・解除・リセット。
- モバイルナビの開閉・Escape・アンカー選択後の閉鎖。
- アニメーション停止、prefers-reduced-motion、画像全件読込、JavaScript実行エラーなし。
- JavaScript無効時: 全3商品・ナビ・主要コンテンツ表示。カスタマイザーは無効化と説明を表示。
- `corepack pnpm build` 成功（2026-10-25）。

スクリーンショットは `docs/previews/`。Safari・Firefox・実機タッチ操作・スクリーンリーダーは未検証です。公開URL未定のためcanonicalなし。Google Fontsには代替フォントを設定。

## 2026-10-25 セクション移動修正

ヘッダーはsticky（PC 72px / モバイル64px）。htmlのscroll-padding-topとsectionのscroll-margin-topの二重適用を、htmlのscroll-padding-topだけに統一しました。HERO・セクション内部余白・写真の表示サイズ・アニメーションは変更していません。

指定PC4サイズ・モバイル3サイズで、ABOUT / MENU / CUSTOMIZE / ACCESSへのクリック・ハッシュ直接アクセス・再読み込みを確認。開始位置はヘッダー直下（端数誤差1px未満）です。

変更記録・容量一覧・修正前後のスクリーンショット: [今回の検証記録](docs/optimization-2026-10-25/report.md)。

## GitHub Pages

公開先: https://aya-nyanko.github.io/aya-cafe/

`main`へのpushで `.github/workflows/deploy.yml` がAstroをビルドし、GitHub Pagesへデプロイします。リポジトリの Settings → Pages → Source は GitHub Actions を選択します。

ローカルプレビューも `/aya-cafe/` 配下です。画像パスは `import.meta.env.BASE_URL` に対応しています。検証用の `docs/` はローカル専用でGit管理対象外です。
