function test1(){
    let array = [1,"2",[3]];

    let obj = {
        test:array
    };

    let xpath = "array:filter(.,function($a){$a='2'})";

    //
    let result = SaxonJS.XPath.evaluate(xpath,array);

    console.log(result);
}

try {
    test1();
} catch(e){
    console.error(e);
}


function test2(){
    let array = [1];
    
    let xpath = ".=1";
    //
    let result = SaxonJS.XPath.evaluate(xpath,array);
    
    console.log(result);
}
try {
    test2();
} catch(e){
    console.error(e);
}

function test3(){
let array = [[1,2]];

let obj = {
    test:array
};

let xpath = ".[1]=>array:filter(function($a){$a=2})";

//
let result = SaxonJS.XPath.evaluate(xpath,array);

console.log(result);
}

try {
    test3();
} catch(e){
    console.error(e);
}

function test4(){

let obj = {
    test:[[1],[2]]
};

let xpath = ".?test=>tail()=>array:get(1)";

//
let result = SaxonJS.XPath.evaluate(xpath,obj);

console.log(result);
}

try {
    test4();
} catch(e){
    console.error(e);
}