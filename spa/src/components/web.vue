<template>
<main class="col-md-10">
<section>
<h3 id="section-テキスト">テキスト</h3>
<div id="htmlApp">
<div id="resultd"></div>
<div id="result"></div>
<textarea v-model="html"></textarea>
<button v-on:click="innerHtml">innerHtml</button>
</div>
</section>
<!-- /section-テキスト-->
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
