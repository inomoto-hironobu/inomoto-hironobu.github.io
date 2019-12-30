<template>
  <div id="app">
    <dl>
      <dt><router-link to="/クラウドソーシング">クラウドソーシングについて</router-link></dt>
      <dd>ランサーズとクラウドワークスを中心にクラウドソーシングについての考察をまとめる。</dd>
      <dt><router-link to="/消費税と投票率">消費税と投票率</router-link></dt>
      <dd>消費税の税収を投票率上昇のために選挙時の金銭配布にまわしたらどうかというアイデアをまとめる。</dd>
      <dt></dt>
    </dl>
    <router-view></router-view>
  </div>
</template>
