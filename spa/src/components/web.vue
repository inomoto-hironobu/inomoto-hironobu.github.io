<template>
<main class="col-md-10">
<h1>Webに関する技術</h1>
<p>Web技術の基本であるHTML、CSS、JavaScriptとサーバとプロトコルについての概要</p>
<p>HTTP、HTTPS/TCP/IPとサーバとUser Agent</p>
<article>
<section>
<h2>Webサイト製作の流れと解説</h2>
<p>Web技術の基本であるHTML、CSS、JavaScriptの総合的な学習を行うためのページ</p>
<p>JavaScript jQueryで数学と物理jQueryをライブラリとしてSVGの要素にアクセスし数学と物理の応用を行うJavaScriptを練習するためのファイルです。</p>
</section>
<section>
<h2>HTML</h2>
<p>HTMLとは</p>
<section>
<h3>HTMLの種類</h3>
<ul>
    <li>HTML4.01<a href="https://www.w3.org/TR/html4/">W3C</a></li>
    <li>XHTML1.0<a href="https://www.w3.org/TR/xhtml1/">W3C</a></li>
    <li>XHTML1.1<a href="https://www.w3.org/TR/xhtml11/">W3C</a></li>
    <li>HTML5<a href="https://www.w3.org/TR/html5/">W3C</a><a href="https://html.spec.whatwg.org/multipage/">WHATWG</a></li>
</ul>
<blockquote>
<p>現在、HTML5 の仕様は、WHATWG と W3C という2つのグループで策定が行われています。</p>
<p><strong>WHATWG</strong> と <strong>W3C</strong> で公開している HTML5 の仕様書は、以下の場所から入手可能です：</p>
<ul>
<li>WHATWG：「<a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/">HTML Living Standard</a>」</li>
<li>W3C：「<a href="http://www.w3.org/TR/html5/">HTML5 A vocabulary and associated APIs for HTML and XHTML</a>」</li>
</ul>
<p>HTML5と関連仕様を日本語で読む – 読み解くHTML5 http://html.yomitoku.net/</p>
</blockquote>
<blockquote cite="http://www.html5.jp/trans/w3c_differences.html">
<p>HTML5が、これまで利用されてきたHTML4とどのような違いがあるのかを、分かりやすく解説したものです。HTML5では、どんな要素・属性がなぜ追加・変更・削除されたかが、一通り説明されています。</p>
<p>HTML5では、要素からプレゼンテーション的な意味を取り除き、さらに、HTML4では定義されていなかった語義を新規の要素として追加しています。プレゼンテーションはCSSに任せ、HTML要素に明確なセマンティクスを与えることで、タグスープを避けようとう考え方がはっきりと表れています。</p>
<p>なお、HTML5そのものがまだ策定中でどんどん変更・改良が行われていますので、このドキュメントも時とともに情報が古くなり、最新のHTML5を正確に表さなくなってしまう点にご注意ください。</p>
<p><cite><a href="http://www.html5.jp/trans/w3c_differences.html">W3C - 『HTML 5 differences from HTML 4』日本語訳 - HTML5.JP</a></cite></p>
</blockquote>
</section>
<section>
<h3 id="section-テキスト">テキスト</h3>
<div id="htmlApp">
<div id="resultd"></div>
<div id="result"></div>
<textarea v-model="html"></textarea>
<button v-on:click="innerHtml">innerHtml</button>
</div>
<p>a要素はリンクをつける場合に使います。また、href属性が無い場合はリンクになりません。q要素、cite要素は引用文と引用元を表します。<cite>徹底解説　ＨＴＭＬ５　マークアップガイド</cite>では、<quote cite="">cite要素は、引用元のタイトルや作品名を表します</quote>、とあります。<dfn>dfn</dfn></p>
<p><mark></mark><a href="#">a</a>em要素は文章の中で<em>特定の部分</em>を<span>強調する場合に</span>使い、strong要素は強い重要性、意味を持っている場合に使います。HTML4では特に違いがありませんでしたが、<strong>HTML5では明確にem要素とは役割が違います。</strong></p>
<p><time datetime="1989-01-08">平成元年・西暦1989年1月8日</time><small>small</small><sub>sub</sub><sup></sup><del>del</del><ins>ins</ins><f i="i">text</f><f b="b">text</f><bdo>text</bdo></p>
</section>
<!-- /section-テキスト-->
<section>
<h3 section="section-リスト">リスト</h3>
<p>リストを表現する要素には基本となる</p>
<ul id="リスト要素のリスト">
<li href="リスト要素のリスト">ol</li>
<li>ul</li>
<li>dl</li>
</ul>
<p>の３つがあり、</p>
<dl id="dl">
<dt>ol</dt><dd></dd>
<dt>ul</dt><dd></dd>
<dt>dl</dt><dd></dd>
<dt>li</dt><dd></dd>
<dt>dt</dt><dd></dd>
<dt>dd</dt><dd></dd>
</dl>
<ol>
<li>基本となるリスト要素</li>
<li>従属する項目要素</li>
<li>項目の中身</li>
</ol>
</section>
<section>
<h3 id="section-テーブル">表／テーブル</h3>
<table>
<caption>要素</caption>
<summary></summary>
<thead><tr><th>要素</th><th>スタイル</th><th></th></tr></thead>
<tbody>
<tr><td>1</td><td>table</td><td>caption,summary,thead,tbody,tfoot,tr,colgroup,col</td></tr>
<tr><td>2</td><td>tr</td><td>th,td</td></tr>
<tr><td>3</td><td>th</td><td>フロージングコンテンツ</td></tr>
<tr><td>4</td><td>td</td><td>フロージングコンテンツ</td></tr>
<tr><td>5</td><td>thead</td><td>tr</td></tr>
<tr><td>6</td><td>tbody</td><td>tr</td></tr>
<tr><td>7</td><td>tfoot</td><td>tr</td></tr>
<tr><td>8</td><td>caption</td><td></td></tr>
<tr><td>9</td><td>colgroup</td><td>col</td></tr>
<tr><td>10</td><td>col</td><td>#empty</td></tr>
</tbody>
</table>

<table>
<caption></caption>
<thead><tr></tr></thead>
<tbody id="tbody-テキスト">
<tr><th colspan="2">テキスト</th></tr>
<tr><td>a</td><td><a>text</a></td></tr>
<tr><td>em</td><td></td></tr>
<tr><td>strong</td><td><strong>text</strong></td></tr>
<tr><td>cite</td><td><cite>text</cite></td></tr>
<tr><td>q</td><td><q>text</q></td></tr>
<tr><td>dfn</td><td><dfn>text</dfn></td></tr>
<tr><td>samp</td><td><samp>text</samp></td></tr>
<tr><td>kbd</td><td></td></tr>
<tr><td>var</td><td></td></tr>
<tr><td>abbr</td><td><abbr>text</abbr></td></tr>
</tbody>
<tbody>
<tr><td>html</td><td></td></tr>
<tr><td>head</td><td></td></tr>
<tr><td>body</td><td></td></tr>
</tbody>
</table>
</section>
<section>
<h3 id="メディア">メディア</h3>
<p><video width="800" src="susuki01_720.mp4"></video></p>
<p><img alt="" src="svg/sample.svg"/></p>
<p><audio src=""></audio></p>
<p><iframe width="420" height="315" src="https://www.youtube.com/embed/jNQXAC9IVRw" frameborder="0"></iframe></p>
<p>
<a href="http://xn--hhro09bn9j8uh.com/movie111susuki.html">実写素材 ススキ 動画素材（ハイビジョン）1280×720 を無料ダウンロード111/動画素材.com</a>
<object type="video/mp4" width="800" height="400" data="susuki01_720.mp4"></object></p>
</section>
</section>
<section>
<h2>CSS</h2>
<p><abbr title="Cascading Style Sheet">CSS</abbr>とは<abbr title="Hyper Text Markup Language">HTML</abbr>に色や大きさなど、主に視覚的な情報を付加するための形式としてできたテキストです。<br/></p>
<h3>CSSフレームワーク</h3>
<ul>
<li>Bulma</li>
<li>Bootstrap</li>
<li>Tailwind CSS</li>
<li>UIkit</li>
<li>Materialize</li>
<li>Foundation</li>
<li>Semantic UI</li>
<li>Pure</li>
<li>SkyBlue</li>
<li>Skeleton</li>
</ul>
</section>
<section>
<h2>JavaScript</h2>
<p>JavaScriptとはプログラミング言語の一種でウェブクライアントで実行されるほぼ唯一の言語として人気がある。</p>
<h3>ES5</h3>
<h3>ES6(ES2015)以降</h3>
<dl>
    <dt>jQuery</dt>
    <dd></dd>
    <dt>Vue.js</dt>
    <dd></dd>
    <dt>D3.js</dt>
    <dd></dd>
    <dt>Underscore</dt>
    <dd></dd>
    <dt></dt>
    <dd></dd>
    <dt></dt>
    <dd></dd>
</dl>
</section>
<section>
<p>HTMLとJavaScriptの組み合わせ</p>
<fieldset>
<legend>HTMLの入力</legend>
<div id="html">
<p><meter value="2" min="1" max="5" onchange=""></meter></p>
<table>
<tbody>
<tr><td>text:</td><td><input maxlength="15" minlength="3" required="required" value="" type="text"/></td></tr>
<tr><td>email:</td><td><input type="email"/></td></tr>
<tr><td>password:</td><td><input type="password"/></td></tr>
<tr><td>date:</td><td><input type="date"/></td></tr>
<tr><td>time:</td><td><input type="time"/></td></tr>
<tr><td>file:</td><td><input type="file"/></td></tr>
<tr><td>button</td><td><input type="button"/></td></tr>
<tr><td>url:</td><td><input type="url"/></td></tr>
<tr><td>checkbox</td><td><input type="checkbox"/></td></tr>
</tbody>
</table>
<textarea rows="9" cols="64"></textarea><br/>
<button type="button" onclick="">send</button>
<div></div>

<progress value=""></progress>
<datalist>
<option />
</datalist>
<select>
<optgroup label="">
<option value="HTML"/>
<option value="CSS"/>
</optgroup>
</select>
</div>
</fieldset>

<details><summary>詳細</summary><div>詳細を表示する</div></details>
</section>
<section>
<h2>製作</h2>
<p></p>
<ol>
<li>企画</li>
<li>要件定義</li>
<li>ワイヤーフレーム</li>
<li>デザインカンプ</li>
<li></li>
<li>製作</li>
</ol>
<ul>
<li><a href="isbn:9784844363989">現場のプロが教えるWeb製作の最新常識</a></li>
</ul>
</section>
<section>
<h2>SVG</h2>
<p><svg id="sample" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
<circle cx="50" cy="50" r="100" ></circle>
<path d="M 200,0 200,400 z" stroke="black" stroke-width="1"/>
<path d="M 0,200 400,200 z" stroke="black" stroke-width="1"/>
</svg></p>
<p><img src="svg/wireframe.svg" width="400" height="100" /></p>
<p><object data="svg/icon.svg" type="image/svg+xml" width="100" height="100">sample</object></p>
<p><button onclick="loadXml(this.parentNode,'svg/sample.svg');">xml</button></p>
</section>
<section>
<h2>MathML</h2>
<p>MathMLとは。</p>
<p><button onclick="loadXml(this.parentNode, 'mml/消費税.xml');">消費税</button></p>
</section>
</article>
</main>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
function store() {
    localStorage.setItem("stored", this.stored);
}
function cookies() {
    document.cookie;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
