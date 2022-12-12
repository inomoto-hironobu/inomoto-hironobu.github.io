function changeyear(e){
    const sample = document.getElementById("sample");
    let c;
    while(c=sample.firstChild){
        sample.removeChild(c);
    }
    sample.innerHTML = `<pie-chart csv="test.csv" col="年" row="`+ e.value+`" width="640" height="400">
    <attributes style="max-width:640px;width:100%"/>
    </pie-chart>`;
}