import { Shape } from "./Shape.js";

export class Torus extends Shape {
    constructor({x = 0,y = 0,z = 0,xRotation = 0,yRotation = 0,zRotation = 0,width = 1,height = 1,depth = 1} = {}) {
        super({x: x, y: y, z: z,xRotation: xRotation,yRotation: yRotation,zRotation: zRotation, width: width, height: height, depth: depth});
        this.generateShape()
    }

    generateShape() {
        this.points = [];
        const resolution = 150;
        const outerRadius = 40;
        const innerRadius = 20;

        for (let i = 0; i < resolution; i++) {
            const phi = (2 * Math.PI * i) / resolution; // Angle for the main ring
    
            for (let j = 0; j < resolution; j++) {
                const theta = (2 * Math.PI * j) / resolution; // Angle for the cross-section
                const x = (outerRadius + innerRadius * Math.cos(theta)) * Math.cos(phi);
                const y = (outerRadius + innerRadius * Math.cos(theta)) * Math.sin(phi);
                const z = innerRadius * Math.sin(theta);
    
                this.points.push([x, y, z, 1]);
            }
        }

        this.points = new Int16Array(this.points.flat());
    }
}