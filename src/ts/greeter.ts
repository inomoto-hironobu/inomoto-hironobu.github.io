class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");
let input = document.createElement('input');
input.setAttribute("type", "text");
let button = document.createElement('button');
button.textContent = "Say Hello";
button.onclick = function () {
    greeter.greeting = input.value;
    alert(greeter.greet());
}

document.body.appendChild(input);
document.body.appendChild(button);