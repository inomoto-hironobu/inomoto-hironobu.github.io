const def = {
    data() {
        return {
            市場価値:100,
            要望金:50,
            かけ倍数:4,
            手数料率:30,
            返済回数:10
        };
    },
    computed:{
        貸付(){
            return this.要望金 * this.かけ倍数;
        },
        利子() {
            return - this.要望金 / this.貸付 * 100;
        },
        仲介手数料(){
            return this.要望金 * this.手数料率 / 100;
        },
        支払い(){
            return this.仲介手数料 + this.要望金;
        },
        銀行利益率(){
            return this.仲介手数料 / this.貸付 * 100;
        },
        返済金額(){
            return this.貸付 - this.要望金;
        },
        月当たり返済金額(){
            return this.返済金額 / this.返済回数;
        }
    },
    mounted() {

    },
    methods:{
        計算(){

        }
    }
};
let app;
window.addEventListener('DOMContentLoaded',()=>{
    app = Vue.createApp(def);
    app.mount("#app");
    console.log('test');
});

function draw() {
    const contents = d3.select('#chart--wrapper');
    const svg = contents.append("svg");
    const padding = 10;
    width = contents.node().clientWidth - padding;
    height = contents.node().clientHeight - padding;
    
    // svg要素にg要素を追加しクラスを付与しxに代入
    x = svg.append("g")
    .attr("class", "axis axis-x")
     
    // svg要素にg要素を追加しクラスを付与しyに代入
    y = svg.append("g")
    .attr("class", "axis axis-y")
    // x軸の目盛りの量
    let xTicks = (window.innerWidth < 768) ? 6: 12;
    let timeparser = d3.timeParse("%Y/%m/%d");
// x軸の目盛りの表示フォーマット
let format = d3.timeFormat("%Y/%m");
// データをパースします
app.計算結果 = app.計算結果.map(function(d){
    // 日付のデータをパース
    return  { date: timeparser(d.date), value:d.value } ;
});
    // X軸を時間のスケールに設定する
    xScale = d3.scaleTime()
    // 最小値と最大値を指定しX軸の領域を設定する
    .domain([
        // データ内の日付の最小値を取得
        d3.min(app.計算結果, function(d){return d.date;}),
        // データ内の日付の最大値を取得
        d3.max(app.計算結果, function(d){return d.date;})
    ])
    // SVG内でのX軸の位置の開始位置と終了位置を指定しX軸の幅を設定する
    .range([padding, width]);
    // Y軸を値のスケールに設定する
    yScale = d3.scaleLinear()
    // 最小値と最大値を指定しX軸の領域を設定する
    .domain([
        // 0を最小値として設定
        0,
        // データ内のvalueの最大値を取得
        d3.max(dataset, function(d){return d.value;})
    ])
    // SVG内でのY軸の位置の開始位置と終了位置を指定しY軸の幅を設定する
    .range([height, padding]);
    let color = d3.rgb("#85a7cc");
    // パス要素を追加
path = svg.append("path");
//lineを生成
line = d3.line()
// lineのX軸をセット
.x(function(d) { return xScale(d.date); })
// lineのY軸をセット
.y(function(d) { return yScale(d.value); })
path
// dataをセット
.datum(dataset)
// 塗りつぶしをなしに
.attr("fill", "none")
// strokeカラーを設定
.attr("stroke", color)
// d属性を設定
.attr("d", line)
}
