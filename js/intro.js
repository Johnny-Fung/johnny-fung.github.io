// Initialize canvas scene
var canvas = document.querySelector("#scene"),
		ctx = canvas.getContext("2d"),
		particles = [],
		amount = 0,
		mouse = {x:0,y:0},
		radius = 1;

// Color palettes:
// [Original, Dark, Colourful, Winter/Blue, Green, Multicolor]
var colorpalettes = [
    ["#468966","#FFF0A5","#FFB03B","#B64926","#8E2800"],
    ["#83142c","#263859","#414141","#263859","#6b778d"],
    ["#1E3888","#47A8BD","#F5E663","#FFAD69","#9C3848"],
    ["#CFFCFF","#AAEFDF","#9EE37D","#63C132","#358600"], 
    ["#114B5F", "#028090","#E4FDE1","#456990","#F45B69"],
    ["#E7ECEF","#274C77","#6096BA","#A3CEF1","#8B8C89"],
    ["#d6d3de","#c4e4d6","#f5e391","#eae8e3","#b72c39"],
    ["#FCDEBE","#D4D2A5", "#928779","#5E5768", "#3A445D"]
]
var colors = colorpalettes[Math.floor(Math.random()*8)];

//Get height and width of section
var elmnt = document.getElementById("intro-area");

var copy = document.querySelector("#input-text");
// Automatically resize canvas element to fit div container
var ww = canvas.width = elmnt.clientWidth;
var wh = canvas.height = elmnt.clientHeight;

function Particle(x,y){
    this.x =  Math.random()*ww;
    this.y =  Math.random()*wh;
    this.dest = {
        x : x,
        y: y
    };

    // Random particle size
    // this.r =  Math.random()*5 + 2;
    // Random pixel size
    // this.r =  Math.random()*8 + 2;
    // Defined pixel size
    this.r = 7;

    // Particle speed
    this.vx = (Math.random()-0.5)*25;
    this.vy = (Math.random()-0.5)*25;
    this.accX = 0;
    this.accY = 0;
    // Particle bounce friction
    this.friction = Math.random()*0.05 + 0.923;
    //Randomly pick 1 of 5 colours
    this.color = colors[Math.floor(Math.random()*6)];
}

// Specify the Particle function to assign it's prototype to:
Particle.prototype.render = function() {
    // Particle acceleration
    this.accX = (this.dest.x - this.x)/650;
    this.accY = (this.dest.y - this.y)/650;
    this.vx += this.accX;
    this.vy += this.accY;
    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx;
    this.y +=  this.vy;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    // Draw circle particles
    // ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
    // Draw pixel particles
    ctx.rect(this.x, this.y, this.r, this.r);
    ctx.fill();

    var a = this.x - mouse.x;
    var b = this.y - mouse.y;

    var distance = Math.sqrt( a*a + b*b );
    //Friction speed
    if(distance<(radius*45)){
        this.accX = (this.x - mouse.x)/100;
        this.accY = (this.y - mouse.y)/100;
        this.vx += this.accX;
        this.vy += this.accY;
    }

}

function onMouseMove(e){
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}

function onTouchMove(e){
if(e.touches.length > 0 ){
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
}
}

function onTouchEnd(e){
mouse.x = -9999;
mouse.y = -9999;
}

function initScene(){
    ww = canvas.width = elmnt.clientWidth;
    wh = canvas.height = elmnt.clientHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "bold "+(ww/10)+"px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(copy.value, ww/2, wh/2);

    var data  = ctx.getImageData(0, 0, ww, wh).data;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "screen";
    
    //For pixels that are non-transparent in the text, push them into the particles array
    particles = [];
    for(var i=0;i<ww;i+=Math.round(ww/150)){
        for(var j=0;j<wh;j+=Math.round(ww/150)){
            if(data[ ((i + j*ww)*4) + 3] > 150){
                particles.push(new Particle(i,j));
            }
        }
    }
    amount = particles.length;

}

function onMouseClick(){
    radius++;
    if(radius ===4){
        radius = 0;
    }
}

function render(a) {
    requestAnimationFrame(render);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < amount; i++) {
        particles[i].render();
    }
};

copy.addEventListener("keyup", initScene);
window.addEventListener("resize", initScene);
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("touchmove", onTouchMove);
window.addEventListener("click", onMouseClick);
window.addEventListener("touchend", onTouchEnd);
initScene();
requestAnimationFrame(render);