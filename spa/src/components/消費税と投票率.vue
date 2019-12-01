<template>
<main class="col-md-10">
<h1>消費税と投票率</h1>
<p>消費税の税収を選挙時の投票者にまわすアイデアをまとめる。</p>
<article>
<section>
<h2>金銭の配布</h2>
<p>新しい経済と保障の制度としてベーシックインカムというものがある。この発想を<strong>弱く</strong>借りる。<br/>
1年間での金銭の配布については、以下の条件によって変わるものとする。
</p>
<ol>
<li>日本の住民であるものにはn万円を配布する</li>
<li>第一の条件を満たし、かつ、選挙などの投票に1年間においてすべて参加した場合はn+m万円を配布する</li>
<li>第二の条件に国政選挙が含まれていたならn+m+l万円を配布する</li>
</ol>
<p>もし仮に地方参政権は外国人に付与されるが国政選挙の参政権は日本国民のみの場合、こうするとn+m+l万円は日本国民のみに配布されることになる。これを<dfn>弱いBI</dfn>と呼ぶことにする。</p>
<p>1億人の有権者がいたとしたら支給額がn,m,lが1万円なら最大で配布金額は4兆円程度だ。そのうちは購入にあてられ消費税収としてある程度回収される。</p>
<p>また投票権があっても選挙に参加する機会が全く無かった場合は投票したとみなす。</p>
<p>日本の一人当たりの年間の消費税の対象となる額（<dfn>消費額</dfn>）は<dfn>年収</dfn>および<dfn>資産額</dfn>で決まると予想する。
例を挙げると年収100万円資産100万円の人:A、年収1000万円資産100万円の人:B、年収100万円資産1000万円の人:C、年収1000万円資産1000万円の人:Dがいたとする。
ここでz:消費額、x:年収、ｙ:資産額とすると、</p>
<p>z=f(x,y)</p>
<p>が成り立つ。またzA&lt;zB、zA&lt;zC、zC&lt;zD、zB&lt;zDとなる。</p>
<table>
<tr><th>金額</th></tr>
<tr><td></td></tr>
</table>
</section>
<section>
<h2>投票率</h2>
<p><a href="http://www.soumu.go.jp/senkyo/senkyo_s/data/index.html#chapter1">国政選挙</a>時に<a href="http://www.soumu.go.jp/main_content/000365958.pdf">投票率</a>を上げるために金銭を支給した場合の効果についての考察を行う。</p>
<ul>
<li><a href="data/投票率.csv">投票率のCSV</a></li>
</ul>
</section>
<section>
<h2>消費税</h2>
<p>消費税の税収は2017年度だと17兆円程度だ。まず株式などの有価証券の売買にも消費税を掛けるようにする。</p>
<p>また、名称も購買税と変えた方がいいかもしれない。あるいは、消費税を廃止して証券売買税を導入するというのもいいかもしれない。</p>
<h3>軽減税率</h3>
<p>しかし問題は軽減税率だ。確かに低所得者向けには助かる面もあるかもしれないが、社会の仕組みが複雑になる。<br/>
少子高齢化と人手不足の時代で余計な手間を割さける余力などあるのだろうか。</p>
<ul>
<li><a href="https://www.mof.go.jp/tax_policy/summary/condition/010.pdf">財務省の税収の推移のPDF</a></li>
<li><a href="data/税収.csv">主要税収のCSV</a></li>
</ul>
</section>
<section>
<h2>式と単位</h2>
<dl>
<dt>人口</dt>
<dd><a href="https://www.stat.go.jp/data/jinsui/2018np/index.html">統計局</a></dd>
<dt>有権者率</dt>
<dd></dd>
</dl>
<table id="式表">
<tr><th>式</th><th>MathML</th></tr>
<tr><td>[有権者数]=[人口]*[有権者率]</td></tr>
<tr><td>[投票率]=f([支給額])</td><td>投票率.xml</td></tr>
<tr><td>d[消費税分]/d[年収]=[年収]*[計率]</td><td></td></tr>
<tr><td>F([消費税収])=f([消費税分])g([年収])</td><td></td></tr>
<tr><td>[支給総額]=[有権者数]*[投票率]*[支給額]</td><td></td></tr>
<tr><td>[支給準備金]=[有権者数]*[支給額]</td><td></td></tr>
</table>
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