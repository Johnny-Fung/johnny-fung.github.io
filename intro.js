var colors = ["#468966","#FFF0A5", "#FFB03B","#B64926", "#8E2800"];

var canvas = document.querySelector("#particles"),
    ctx = canvas.getContext("2d"),
    particles = [],
    amount = 0,
    mouse = {x:0, y:0},
    radius = 1;

var text = document.querySelector("#input-text");

// Automatically resize canvas element to fit page
var ww = canvas.width = window.innerWidth;
var wh = canvas.height = window.innerHeight;