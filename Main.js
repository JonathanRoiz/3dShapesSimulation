import { Renderer } from "./Renderer.js";
import { Cube } from "./Cube.js";

const canvas = document.getElementById('canvas');

canvas.width = window.innerHeight
canvas.height = window.innerHeight

let renderer = new Renderer(canvas);
let cube = new Cube();

// Performance monitoring
const start = performance.now();
let numFrames = 0

function mainLoop() {
    renderer.render(cube);
    cube.rotate(.01,.01,.01);
    
    // Performance monitoring
    numFrames += 1
    const end = performance.now();
    console.log(`FPS: ${numFrames/((end - start)/1000)}`);

    requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);