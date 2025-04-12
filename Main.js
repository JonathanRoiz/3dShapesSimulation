import { Renderer } from "./Renderer.js";
import { Cube } from "./Cube.js";

const canvas = document.getElementById('canvas');

canvas.width = window.innerHeight
canvas.height = window.innerHeight

let renderer = new Renderer(canvas);
let cube = new Cube();

setInterval(function() {
    renderer.render(cube);
    cube.rotate(.01,.01,.01);
}, 10);