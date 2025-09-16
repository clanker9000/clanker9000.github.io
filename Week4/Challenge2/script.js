// Task 1
// Add an event listner to the button (the user drags his mouse over the button)
function mouseOver() {

    document.getElementById("result").style.backgroundColor = "pink";
    document.getElementById("result").style.color = "blue";
    document.getElementById("result").textContent = "Welcome to My Heart";
}

document.getElementById("justin-btn").addEventListener("mouseover", mouseOver);



// Task 2
// Add an event listner to the button (the user drags his mouse out of the button)
function mouseOut() {

    document.getElementById("result").style.backgroundColor = "black";
    document.getElementById("result").style.color = "red";
    document.getElementById("result").textContent = "Don't Leave Me Please";
}

document.getElementById("justin-btn").addEventListener("mouseout", mouseOut);
