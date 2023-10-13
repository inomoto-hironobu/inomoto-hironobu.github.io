const xpath = `
let $data := 1 to 100
return 
for $i in $data
return
if(($i mod 3 = 0) and ($i mod 5 = 0))
then "fizzbuzz"
else if($i mod 3 = 0) then "fizz"
else if($i mod 5 = 0) then "buzz"
else $i
`;

console.log(xpath);
dataset = SaxonJS.XPath.evaluate(xpath, null);
console.log(dataset);
