// DO NOT MODIFY THIS
const show_box = document.getElementById('show-box');

// DO NOT MODIFY THIS
const photos = [ 'justin1.jpg', 'justin2.jpg', 'justin3.jpg', 'justin4.jpg' ];

// DO NOT MODIFY THIS
var current_photo_index = 0;


function start_the_show() {
    // (1) Name of the keyframe (styles.css)
    // (2) Duration of each iteration (seconds)
    // (3) Total # of animation iterations

    // YOU WILL MODIFY THIS
    show_box.style.animation = "";
}


// DO NOT MODIFY THE FOLLOWING 3 LINES
show_box.addEventListener('animationstart', justin_start_function);
show_box.addEventListener('animationiteration', justin_repeat_function);
show_box.addEventListener('animationend', justin_end_function);


// This will be called once
function justin_start_function() {
    // YOU WILL MODIFY THIS
    this.innerHTML = `
        The animation has started... say 'Hello Babe'... <br>`;

    this.style.backgroundColor = "pink";
}


// This will be called 3 times
function justin_repeat_function() {
    // YOU WILL MODIFY THIS
    this.innerHTML = `
        The animation is playing again... say 'Come into my heart'... <br>`;
        
    this.style.backgroundColor = "lightblue";
}


// This will be called once
function justin_end_function() {
    this.innerHTML = "The animation has completed";
    this.style.backgroundColor = "lightgray";
}