import { Shape } from "./Shape.js";

export class Cylinder extends Shape {
    constructor({x = 0,y = 0,z = 0,xRotation = 0,yRotation = 0,zRotation = 0,width = 1,height = 1,depth = 1} = {}) {
        super({x: x, y: y, z: z,xRotation: xRotation,yRotation: yRotation,zRotation: zRotation, width: width, height: height, depth: depth});
        this.generateShape()
    }

    generateShape() {
        this.points = [];

        const height = 80;
        const resolution = 130;
        const radius = 40;
        const halfHeight = height / 2;

        for (let h = -halfHeight; h <= halfHeight; h += height / resolution) {
            for (let angle = 0; angle < 2 * Math.PI; angle += (2 * Math.PI) / resolution) {
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);
                const z = h;
    
                this.points.push([x, y, z, 1]);
            }
        }
                
        // Add bottom end cap at -halfHeight
        for (let r = 0; r <= radius; r += radius / resolution) { // Concentric rings
            for (let angle = 0; angle < 2 * Math.PI; angle += (2 * Math.PI) / resolution) {
                const x = r * Math.cos(angle); // Scale by radius
                const y = r * Math.sin(angle);
                const z = -halfHeight;

                this.points.push([x, y, z, 1]); // Points for the bottom cap
            }
        }

        // Add top end cap at +halfHeight
        for (let r = 0; r <= radius; r += radius / resolution) { // Concentric rings
            for (let angle = 0; angle < 2 * Math.PI; angle += (2 * Math.PI) / resolution) {
                const x = r * Math.cos(angle); // Scale by radius
                const y = r * Math.sin(angle);
                const z = halfHeight;

                this.points.push([x, y, z, 1]); // Points for the top cap
            }
        }
    
        this.points = new Int16Array(this.points.flat());
    }
}