import { Renderer } from "./Renderer.js";
import { Cube } from "./Cube.js";

const canvas = document.getElementById('canvas');

canvas.width = window.innerHeight
canvas.height = window.innerHeight

let renderer = new Renderer(canvas);
let cube = new Cube();

// Performance monitoring
const start = performance.now();
let lastTime = performance.now();
let numFrames = 0

function mainLoop() {
    const currentTime = performance.now();
    const deltaTime = (currentTime - lastTime) / 1000; // Time elapsed since last frame in seconds
    lastTime = currentTime;

    renderer.render(cube);

    const rotationSpeed = .5; // Rotations per second
    cube.rotate(rotationSpeed * deltaTime,rotationSpeed * deltaTime,rotationSpeed * deltaTime);
    
    // Performance monitoring
    numFrames += 1
    const end = performance.now();
    console.log(`FPS: ${numFrames/((end - start)/1000)}`);

    requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);