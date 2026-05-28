/* SLIDE */
let currentSlide = 1;
const slides = document.querySelectorAll(".slide");

function showSlide(n){
  slides.forEach(s => s.classList.remove("active"));
  slides[n-1].classList.add("active");
  currentSlide = n;

  restartTypewriter(); // ⬅ WAJIB
}

function nextSlide(){
  if(currentSlide < slides.length) showSlide(currentSlide + 1);
}

function prevSlide(){
  if(currentSlide > 1) showSlide(currentSlide - 1);
}


/* PIN */
function checkPin(){

  const inputs = document.querySelectorAll("#slide1 input");
  const pin = [...inputs].map(i => i.value).join("");
  const errorMsg = document.getElementById("errorMsg");

  if(pin === "3005"){

    errorMsg.classList.remove("show");
    errorMsg.innerText = "";

    showSlide(2);

  } else {

    errorMsg.innerText = "PIN salah 💔";
    errorMsg.classList.add("show");

    inputs.forEach(i => i.value = "");
  }
}

function pressNum(n){
  const inputs = document.querySelectorAll("#slide1 input");
  for(let i=0;i<inputs.length;i++){
    if(inputs[i].value===""){
      inputs[i].value=n;
      break;
    }
  }
}

function deleteNum(){
  const inputs = document.querySelectorAll("#slide1 input");
  for(let i=inputs.length-1;i>=0;i--){
    if(inputs[i].value!==""){
      inputs[i].value="";
      break;
    }
  }
}

function clearPin(){
  document.querySelectorAll("#slide1 input").forEach(i => i.value = "");
}

clearPin();

/* MUSIC */
const music = document.getElementById("bgMusic");
const btn = document.getElementById("musicToggle");

btn.addEventListener("click", () => {

  if (music.paused) {
    music.play();
    btn.classList.add("playing");
  } else {
    music.pause();
    btn.classList.remove("playing");
  }

});

/* sinkron jika user pause dari sistem */
music.onplay = () => btn.classList.add("playing");
music.onpause = () => btn.classList.remove("playing");

/* CANVAS HEART + STAR */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
  const dpr = window.devicePixelRatio || 1;

  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;

  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  ctx.setTransform(dpr,0,0,dpr,0,0);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* STAR */
class Star {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.speed = Math.random() * 0.3 + 0.1;
    this.size = Math.random() * 16 + 10;
    this.char = Math.random() > 0.5 ? "✦" : "✧";
    this.opacity = Math.random();
  }

  update() {
    this.y += this.speed;
    if (this.y > canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
    }

    ctx.font = `${this.size}px Arial`;
    ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
    ctx.fillText(this.char, this.x, this.y);
  }
}

/* HEART */
class ShootingStar {
  constructor() {
    this.reset();
  }

  reset(){
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height / 2;
    this.speedX = Math.random() * 5 + 4;
    this.speedY = Math.random() * 5 + 4;
    this.char = ["💜","💗"][Math.floor(Math.random()*2)];
    this.size = Math.random() * 26 + 18;
    this.opacity = 1;
  }

  update(){
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity -= 0.01;

    if(this.opacity <= 0 || this.x > canvas.width || this.y > canvas.height){
      this.reset();
    }

    ctx.font = `${this.size}px Arial`;
    ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
    ctx.fillText(this.char, this.x, this.y);
  }
}

let stars = Array.from({length:80}, () => new Star());
let hearts = Array.from({length:15}, () => new ShootingStar());

function animate(){
  ctx.fillStyle = "rgba(10,10,30,0.35)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  stars.forEach(s => s.update());
  hearts.forEach(h => h.update());

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function restartTypewriter() {
  document.querySelectorAll(".typewriter").forEach(el => {
    el.style.animation = "none";
    void el.offsetWidth; // paksa reset
    el.style.animation = "";
  });
}

/* CUSTOM CURSOR */

const cursor = document.querySelector(".custom-cursor");
const trail = document.querySelector(".cursor-trail");

let mouseX = 0;
let mouseY = 0;

let trailX = 0;
let trailY = 0;

document.addEventListener("mousemove",(e)=>{

  mouseX = e.clientX;
  mouseY = e.clientY;

  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});

function animateTrail(){

  trailX += (mouseX - trailX) * 0.15;
  trailY += (mouseY - trailY) * 0.15;

  trail.style.left = trailX + "px";
  trail.style.top = trailY + "px";

  requestAnimationFrame(animateTrail);
}

animateTrail();

/* CLICK EFFECT */
document.addEventListener("click",()=>{

  cursor.animate([
    { transform:"translate(-50%,-50%) scale(1)" },
    { transform:"translate(-50%,-50%) scale(1.8)" },
    { transform:"translate(-50%,-50%) scale(1)" }
  ],{
    duration:300
  });

});

/* CURSOR HOVER EFFECT */

const hoverItems = document.querySelectorAll(
  "button, a, .btn"
);

hoverItems.forEach(item=>{

  item.addEventListener("mouseenter",()=>{

    cursor.style.transform =
      "translate(-50%,-50%) scale(1.8)";
  });

  item.addEventListener("mouseleave",()=>{

    cursor.style.transform =
      "translate(-50%,-50%) scale(1)";
  });

});


