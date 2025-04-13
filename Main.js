import { Renderer } from "./Renderer.js";
import { Cube } from "./Cube.js";

const canvas = document.getElementById('canvas');

canvas.width = window.innerHeight;
canvas.height = window.innerHeight;

let renderer = new Renderer(canvas);
let cube = new Cube();

inputX.addEventListener('input', function(event) {
    rotationX = event.target.value * (Math.PI/180);
})

inputY.addEventListener('input', function(event) {
    rotationY = event.target.value * (Math.PI/180);
})

inputZ.addEventListener('input', function(event) {
    rotationZ = event.target.value * (Math.PI/180);
})

translateX.addEventListener('input', function(event) {
    xTranslation = Number(event.target.value);
})

translateY.addEventListener('input', function(event) {
    yTranslation = -Number(event.target.value);
})

translateZ.addEventListener('input', function(event) {
    zTranslation = Number(event.target.value);
})

scaleSlider.addEventListener('input', function(event) {
    scaleFactor = Number(event.target.value);
})

let scaleFactor = 1
let rotationX = 0
let rotationY = 0
let rotationZ = 0
let xTranslation = 0;
let yTranslation = 0;
let zTranslation = 60;

// Performance monitoring
const start = performance.now();
let lastTime = performance.now();
let numFrames = 0

function mainLoop() {
    const currentTime = performance.now();
    const deltaTime = (currentTime - lastTime) / 1000; // Time elapsed since last frame in seconds
    lastTime = currentTime;

    renderer.render(cube);

    //const rotationSpeed = .5; // Rotations per second
    //cube.rotate(rotationSpeed * deltaTime,rotationSpeed * deltaTime,rotationSpeed * deltaTime);
    cube.setRotation(rotationX,rotationY,rotationZ);
    cube.setPosition(xTranslation,yTranslation,zTranslation);
    cube.setSize(scaleFactor);

    
    // Performance monitoring
    numFrames += 1
    const end = performance.now();
    console.log(`FPS: ${numFrames/((end - start)/1000)}`);

    requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);