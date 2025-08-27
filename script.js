// Typing effect
const text = "Welcome to JB's fanpage 💜 Refresh for a new song! 🎶";
let i = 0;
function typing() {
    if (i < text.length) {
    document.getElementById("subtitle-text").innerHTML += text.charAt(i);
    i++;
    setTimeout(typing, 70);
    }
}
typing();

// Particles.js
particlesJS("particles-js", {
    "particles": {
    "number": { "value": 80 },
    "size": {
        "value": 20,
        "random": true
    },
    "color": { "value": "#ffffff" },
    "move": { "speed": 2 },
    "shape": {
        "type": "image",
        "image": {
        "src": "jb.png",
        "width": 32,
        "height": 32
        }
    }
    }
});

// GSAP Header Animation
gsap.from("#title", {duration: 1.8, y: -100, opacity: 0, ease: "bounce"});

// Emoji floating clicks
document.body.addEventListener("click", (e) => {
    const emoji = document.createElement("div");
    emoji.className = "floating-emoji";
    emoji.innerText = ["💜", "✨", "🎶", "😍", "🔥"][Math.floor(Math.random()*5)];
    document.body.appendChild(emoji);
    emoji.style.left = e.pageX + "px";
    emoji.style.top = e.pageY + "px";
    setTimeout(()=>emoji.remove(), 2000);
});

// Slideshow logic
let slideIndex = 0;
let slides = document.getElementsByClassName("slides");
let dots = document.getElementsByClassName("dot");

function showSlide(n) {
    slideIndex = n;
    for (let i=0;i<slides.length;i++) slides[i].style.display="none";
    for (let i=0;i<dots.length;i++) dots[i].classList.remove("active");
    slides[n].style.display="block";
    dots[n].classList.add("active");
}

function autoSlide() {
    slideIndex++;
    if(slideIndex>=slides.length) slideIndex=0;
    showSlide(slideIndex);
    setTimeout(autoSlide,4000);
}

showSlide(0);
setTimeout(autoSlide,4000);

// Music player
function playMusic() {
    document.getElementById("bg-music").play();
}

const audio = document.getElementById("bg-music");
const playPauseBtn = document.getElementById("play-pause");
const seekbar = document.getElementById("seekbar");
const volumeSlider = document.getElementById("volume");
const muteBtn = document.getElementById("mute-btn");
const currentTimeSpan = document.getElementById("current-time");
const durationSpan = document.getElementById("duration");
const playBtn = document.getElementById("play-music-btn");
const playerDiv = document.getElementById("custom-player");
const songTitleDiv = document.getElementById("song-title");

const songs = [
    { title: "Baby", src: "./music/baby.mp3" },
    { title: "Beauty and a Beat", src: "./music/beauty.mp3" },
    { title: "Sorry", src: "./music/sorry.mp3" }
];

function loadNextSong() {
    let lastIndex = parseInt(localStorage.getItem('lastSongIndex'));
    if (isNaN(lastIndex)) lastIndex = -1;
    const nextIndex = (lastIndex + 1) % songs.length;
    localStorage.setItem('lastSongIndex', nextIndex);
    audio.src = songs[nextIndex].src;
    songTitleDiv.textContent = songs[nextIndex].title;
    audio.load();
}


// Utility: Format seconds as M:SS
function fmtTime(s) {
    let m = Math.floor(s/60);
    let z = Math.floor(s%60);
    return `${m}:${z<10?'0':''}${z}`;
}

// Initialize: update duration once metadata is loaded
audio.addEventListener('loadedmetadata',()=> {
    durationSpan.textContent = fmtTime(audio.duration);
    seekbar.max = Math.floor(audio.duration)||100;
});

// Play/pause toggle
playPauseBtn.onclick = function(){
    if(audio.paused){ 
    audio.play();
    }else{
    audio.pause();
    }
};
audio.onplay = ()=>{
    playPauseBtn.textContent = "⏸️";
};
audio.onpause = ()=>{
    playPauseBtn.textContent = "▶️";
};

// Show/hide player UI
function togglePlayer(show){
    if(show){
    playBtn.style.display = "none";
    playerDiv.style.display = "flex";
    audio.play();
    }else{
    playerDiv.style.display = "none";
    playBtn.style.display = "inline-block";
    }
}

// Seek control
seekbar.addEventListener('input',()=> audio.currentTime = seekbar.value );
audio.addEventListener('timeupdate',()=>{
    seekbar.value = Math.floor(audio.currentTime);
    currentTimeSpan.textContent = fmtTime(audio.currentTime);
});

// Volume/mute controls
volumeSlider.oninput = ()=> audio.volume = volumeSlider.value;
muteBtn.onclick = function(){
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? "🔇" : "🔊";
};
audio.addEventListener('volumechange',()=>{
    muteBtn.textContent = audio.muted ? "🔇" : "🔊";
    volumeSlider.value = audio.volume;
});

// Chatbot
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");

function appendMessage(content, sender) {
    const message = document.createElement("div");
    message.classList.add("chat-message", sender);
    message.textContent = content;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function fetchJoke() {
    const response = await fetch("https://icanhazdadjoke.com/", {
    headers: { "Accept": "application/json" }
    });
    const data = await response.json();
    return data.joke;
}

async function handleUserInput() {
    const userText = chatInput.value.trim();
    if (!userText) return;
    appendMessage(userText, "user");
    chatInput.value = "";
    appendMessage("Justin is typing...", "bot");
    const botJoke = await fetchJoke();
    // Remove the "..." message and show the joke
    chatMessages.lastChild.remove();
    appendMessage(botJoke, "bot");
}

chatSend.addEventListener("click", handleUserInput);
chatInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") handleUserInput();
});

function addMessage(content, sender) {
    const messagesContainer = document.getElementById("chat-messages");

    // Create a new message element
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message", sender);
    messageElement.textContent = content;

    // Append the message to the chat container
    messagesContainer.appendChild(messageElement);

    // Scroll to the latest message
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

window.onload = () => {
    loadNextSong();
    togglePlayer(false);
    addMessage("Hey baby girl, it's JB! Want me to tell you a joke? 😜", "bot");
};
