// console.log("home.js hello");

let greeting = document.getElementById('greeting')
// console.log(greeting.innerText)
// console.log(greeting.innerHTML)
// console.log(greeting.textContent)

let paras = document.getElementsByTagName("p");

for (let i = 0; i < paras.length; i++) {
    console.log(paras[i].innerText);
}