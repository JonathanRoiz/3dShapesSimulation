import { Shape } from "./Shape.js";

export class Sphere extends Shape {
    constructor({x = 0,y = 0,z = 0,xRotation = 0,yRotation = 0,zRotation = 0,scale = 1} = {}) {
        super({x: x, y: y, z: z,xRotation: xRotation,yRotation: yRotation,zRotation: zRotation, width: scale, height: scale, depth: scale});
        this.generateShape()
    }

    generateShape() {
        this.points = [];
        const resolution = 69;
        const radius = 40;

        for (let i = 0; i <= resolution; i++) {
            const phi = Math.PI * i / resolution; // Latitude angle
            for (let j = 0; j <= resolution * 2; j++) {
                const theta = (2 * Math.PI * j) / (resolution * 2); // Longitude angle
    
                const x = radius * Math.sin(phi) * Math.cos(theta);
                const y = radius * Math.sin(phi) * Math.sin(theta);
                const z = radius * Math.cos(phi);
    
                this.points.push([x, y, z, 1]); // Homogeneous coordinates
            }
        }

        this.points = new Int16Array(this.points.flat());
    }

    setSize(scale) {
        if (scale != this.scale.x || scale != this.rotation.y || scale != this.rotation.z) {
            this.scale.x = scale;
            this.scale.y = scale;
            this.scale.z = scale;
            this.needsUpdate = true;
        }
    }
}