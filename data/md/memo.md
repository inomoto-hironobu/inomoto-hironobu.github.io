### XMLとDSVの比較

||XML|DSV|
|--|--|--|
|文字コードの比較|XML宣言|無し|
|スキーマ|DTD、XMLSchema、RELAX_NG、文書型宣言、名前空間|スキーマファイルなし、指定方法無し|
|仕様|スキーマに書くことができる|スキーマか仕様か|
|文字|"'<','>','&',"",',空白，タブ，CR，LF"特別な役割を持つ文字は固定化され，変更する事はできない,"|フィールドセパレータレコードセパレータ囲い文字"|
|API|DOM、SAX|無し|

CSV,SSV、TSV、K3
DSV自身にスキーマを持たせる方法

1,2001-01-01,hoge
2,2001-02-02,foo
3,2001-03-03,bar


### Googleブックマークを使っているが、不便だと思う所がある。これはGBに限ったものではないかもしれない。

タグ管理の特性を生かせるのにニュース記事やブログの記事などがある。様々な属性を含むことが多い。

好きなようにタグ(GBではラベル。ここではタグで)を付けることができる。そのタグの中でつけたいものとして日付がある。記事をマークするとき、その記事がいつのものかを

ビルトインタグ

- 日時（datetime）

- 国・地域（country）

- 言語（lang）

- ファイルタイプ（mimetype）


### table要素でcite属性を使う場合。
Aと言うリソースがCSV
動物

<table cite="">
<tr><th>番号</th><th>名前</th><th>門</th><th>科</th></tr>
<tr><td></td><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td><td></td></tr>
</table>

```xml
<table cite="">
<tr><th>番号</th><th>名前</th><th>門</th><th>科</th></tr>
<tr><td></td><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td><td></td></tr>
</table>
```

<cite href="http://webtech-walker.com/archive/2007/08/30113217.html">定義リストより見出しでマークアップする理由 - Webtech Walker</cite>

<blockquote cite="http://webtech-walker.com/archive/2007/08/30113217.html"><p>一番の理由としては、見出しでマークアップすると音声ブラウザで閲覧した際に見出しジャンプができるという点です。音声ブラウザのユーザーは結構見出しジャンプの機能を使ってブラウジングするらしいので、アクセシビリティの面で定義リストより見出しのほうがよいと思います。</p></blockquote>
<li href="http://www.marguerite.jp/Nihongo/WWW/RefHTML/dl.html#OTHER_USE">&lt;dl&gt;要素のその他の使い方</li>

### rel
dtの内容とddの内容が何であるか、それらの関係が何であるかをURIで表す。
例えば、FAQなどの質問と答えのペアであることを"http://definition-list/faq"で表す。あるいは"faq"と言う単語で、いくつかのあらかじめ用意された中で選ぶ。
title属性でdtとddの内容がそれぞれ何を表すかの情報を書く。しかし、実用上問題が多少あると思われる。カーソルを合わせるとチップが出てしまい、画面がうるさく見える。


この記法はHTMLにも応用できるとは思うが，HTMLのことはよく知らないし調べる気もないのであくまでXHTMLの簡略記法として定義している。

SXML
SOX
PYX

RELRELAX_NG Compact Syntax
RELAX_NG　CompactSyntax

XMLの簡易記法に。


構造化された文章

構造化された文書とは表やリスト、引用などがマークアップされ、明示的にどこがどんな意味を持ち、どんな構成になっているかが分かる文章の異である。
それは人に対して明示的であるだけでなくコンピュータに対しても明示的である。
構造化されていない文書とはどのテキストが文書上どんな意味を持ち、全体的な視点から見てどんな構成要素であるかが不明である文書である。

>引用文を書くとき

data1-1 data1-2 data1-3
data2-1 data2-2 data2-3