import { Renderer } from "./Renderer.js";
import { Cube } from "./Cube.js";
import { Sphere } from "./Sphere.js";
import { Torus } from "./Torus.js";
import { Cylinder } from "./Cylinder.js";
import { Pyramid } from "./Pyramid.js";

const canvas = document.getElementById('canvas');

canvas.width = window.innerHeight;
canvas.height = window.innerHeight;

let renderer = new Renderer(canvas);

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

const torus = new Torus();
const cube = new Cube();
const cylinder = new Cylinder();
const pyramid = new Pyramid();

const shapes = [torus,cube,cylinder,pyramid];

function mainLoop() {
    const currentTime = performance.now();
    lastTime = currentTime;

    renderer.clear();
    let xOffset = -125;
    let yOffset = -125;

    for (let i = 0; i < shapes.length; i++) {
        renderer.render(shapes[i]);
        shapes[i].setRotation(rotationX,rotationY,rotationZ);
        shapes[i].setPosition(xTranslation + xOffset,yTranslation + yOffset,zTranslation);
        shapes[i].setSize(scaleFactor,scaleFactor,scaleFactor);

        if (xOffset == -125) {
            xOffset = 125;
        } else {
            xOffset = -125;
            yOffset = 125;
        }
    };
    
    // Performance monitoring
    numFrames += 1
    const end = performance.now();
    console.log(`FPS: ${numFrames/((end - start)/1000)}`);

    requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);