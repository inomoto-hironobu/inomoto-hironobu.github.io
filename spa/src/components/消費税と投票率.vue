<template>
<main class="col-md-10">
<h2>消費税と投票率</h1>
<p>消費税の税収を選挙時の投票者にまわすアイデアをまとめる。</p>
<section>
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
<ul>
<li><a href="data/投票率.csv">投票率のCSV</a></li>
<li><a href="data/税収.csv">主要税収のCSV</a></li>
</ul>
</section>
<section>
<h2>式と単位</h2>
<dl>
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
</main>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
var l = 'data/投票率.csv';

function 投票率() {
	jQuery.get(l, function(d) {
		console.log(d);
		var t = d3.csvParseRows(d);
		console.log(t);
	});
}


var z = d3.csvParse('data/税収.csv');

console.log(z);

document.addEventListener('WebContentLoaded', function(e) {
	var table = document.getElementById('式表');
	$(table).filter('tr > td:nth-child(2)');
});
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