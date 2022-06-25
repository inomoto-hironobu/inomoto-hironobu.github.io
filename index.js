/**
 * /app.js
 */ 
// express モジュールのインスタンス作成
const express = require('express');
const app = express();
// パス指定用モジュール
const path = require('path');

// 8080番ポートで待ちうける
app.listen(8080, () => {
  console.log('Running at Port 8080...');
});

// 静的ファイルのルーティング
//Framexsテーマkumoriを使う。docsへのルーティングが必要
app.use(`/kumori`, express.static(path.join(__dirname, 'kumori/docs')));
app.use(express.static(path.join(__dirname, '')));

// その他のリクエストに対する404エラー
app.use((req, res) => {
  res.sendStatus(404);
});