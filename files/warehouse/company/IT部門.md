# IT部
システムの作製と運営を行う部署である。
## 作製システム
<dl>
<dt>Aシステム</dt>
<dd>ニュース配信特化型システムのニュースハブ</dd>
<dt>Bシステム</dt>
<dd>社内向けニュースハブ管理システム</dd>
<dt>Cシステム</dt>
<dd>メディア向けニュースハブ管理システム</dd>
<dt>Dアプリ</dt>
<dd>PWAのニュース購読アプリ</dd>
<dt>Eデータベースシステム</dt>
<dd></dd>
</dl>

これらシステムは同じデータベースにアクセスする。
## 職種
<dl>
<dt>フロントエンドエンジニア</dt>
<dd>HTML,CSS,JavaScript</dd>
<dt>プログラマ</dt>
<dd>Java,JavaScript</dd>
<dt>DBエンジニア</dt>
<dd>MySQL? NoSQL?  
もしかしたらRDBエンジニアとNoSQLエンジニアに分かれるかもしれない</dd>
<dt>インフラエンジニア</dt>
<dd>GCP?Docker,Kubernetes</dd>
<dt>SE</dt>
<dd>Linuxの管理ができる人</dd>
<dt>SRE</dt>
<dd></dd>
<dt>プロジェクトマネージャー</dt>
<dd></dd>
<dt>ウェブデザイナー</dt>
<dd></dd>
<dt>ITコンサルタント</dt>
<dd>基本情報と応用情報を持っている</dd>
<dt>テスター</dt>
<dd></dd>
</dl>
## Aシステム
ニュースハブというのは日本で言えばヤフージャパンのポータルサイトのようにいくつものメディアの記事を買い集め、統合してニュースを配信するようなウェブサイトだ。

まず恒久的なURLの記事にするということ。そして、広告のみに頼らないようにしたい。うまく組み合わせることを考える。

まず記事の価値に3段階を設ける。bronze、silver、goldの３つだ。そして、ユーザーの階級に3段階を設ける。free、basic、premiumの3つ。  
これは料金によって違いがあるようにする。そしてこれらの組み合わせでどう記事を読めるかどう表示されるかを決める。

例をいくつか挙げる。  
freeユーザーはbronzeの記事を制限無しで読めるがgoldの記事は1年間の閲覧制限を受け期間後は広告が表示される。  
premiumユーザーはgoldの記事を制限無しにまた広告無しで閲覧できる。

Dアプリに対応した公開APIを持つ。

購読するための登録する仕組みを持つ。

* 恒久的URL
* 日本語韓国語同時対応
* ユーザータイプと記事階級色で広告の有無と閲覧制限
* 閲覧制限の基準は記事配布日
* コメント欄有でコメントできるのは課金ユーザーのみ
* 課金のフローを持つ
* OpenIDでログイン可能
* freeユーザーからの検索はGoogleに委譲する

ユーザークラス/階級色|bronze|silver|gold
---|---|---|---
free|制限無し広告有|1か月制限広告有|1年間制限広告有り
basic|制限無し広告無し|制限無し広告有|1か月制限広告有
premium|制限無し広告無し|制限無し広告無し|制限無し広告無し

### 料金プラン
* basic1月プラン1万円
* basic1年プラン11万円
* basic10年プラン100万円
* premium1月プラン100万円
* premium1年プラン1100万円
* premium10年プラン1億円
### 開発
言語 Java 11

フロント言語 JavaScript ES5

HTML HTML5

スタイル言語 CSS2

アプリケーションフレームワーク Jakarta EE

JavaScriptフレームワーク Vue.js(jQuery)

CSSフレームワーク Bootstrap

HTTPサーバー Nginx

アプリケーションサーバー Payara?

ビルドツール Maven? Gradle?
### 対応ブラウザ
IE9以降には少なくとも対応
###　開発手法
アジャイル、ウォーターフォール、テストファースト
### その他

* Google広告
* twitterボタンの改良

## Bシステム
メディア審査部の社員向けの記事管理システムである。

記事の追加を行う。

公開申請された記事の合否を判断する。

* 日本語韓国語同時対応

### 開発
言語 Java 11 JavaScript ES6以降

フレームワーク Jakarta EE

JavaScriptフレームワーク Vue.js(jQuery)

CSSフレームワーク Bootstrap

HTTPサーバー Nginx? Apache?

アプリケーションサーバー Payara?

ビルドツール Maven? Gradle?
### 対応ブラウザ
最新Chrome,Firefox,Edge
###　開発手法
アジャイル、ウォーターフォール、テストファースト
## Cシステム
メディア部および社外メディア向けの記事管理と情報収集システム。

記事の申請を書き込める。

* 日本語韓国語同時対応
* OpenIDでログイン可能

### 開発
言語 Java 11 JavaScript ES5

フレームワーク Jakarta EE

JavaScriptフレームワーク Vue.js(jQuery)

CSSフレームワーク Bootstrap

HTTPサーバー Nginx? Apache?

アプリケーションサーバー Payara?

ビルドツール Maven? Gradle?
### 対応ブラウザ
IE9
###　開発手法
アジャイル、ウォーターフォール、テストファースト
## 共通開発
インフラ GCP?Kubernetes?

RDBMS MySQL?

NoSQL memcached その他

CIツール Jenkins?

ITSBTS Redmine? Backlog?

SCM Git

コードホスティング GitHub
## Dアプリ
AシステムのAPIを使ってアクセスするPWAアプリ。
最新ECMAScriptで開発。

* まず韓国語対応

## データベース
RDBMSを基本にmemcachedなどのNoSQLも適宜用意する。

どのようなデータを扱うかは[RDB](https://github.com/inomoto-hironobu/kaisya/blob/master/RDB.md)を参照。
## 開発環境
PC Windows 10 Home,Windows 10 Pro,Linux(Fedora,CentOS)

IDE Eclipse,NetBeans,IntelliJ IDEAなど任意、ただし有料は要相談で前向きに検討

SNS twitter自由
## 書籍
会社で購入するもの

* WEB+DB
* Software Design
* オライリー