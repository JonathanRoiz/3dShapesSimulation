import { Shape } from "./Shape.js";

export class Pyramid extends Shape {
    constructor({x = 0,y = 0,z = 0,xRotation = 0,yRotation = 0,zRotation = 0,width = 1,height = 1,depth = 1} = {}) {
        super({x: x, y: y, z: z,xRotation: xRotation,yRotation: yRotation,zRotation: zRotation, width: width, height: height, depth: depth});
        this.generateShape()
    }

    generateShape() {
        this.points = [];
        const baseSize = 80;
        const height = 80;
        const resolution = 75;
    
        // Base corners (square)
        const halfBase = baseSize / 2;
        const baseVertices = [
            [-halfBase, -halfBase, -height / 2, 1], // Bottom-left corner
            [halfBase, -halfBase, -height / 2, 1],  // Bottom-right corner
            [halfBase, halfBase, -height / 2, 1],   // Top-right corner
            [-halfBase, halfBase, -height / 2, 1]   // Top-left corner
        ];
        this.points.push(...baseVertices);
    
        // Apex point
        const apex = [0, 0, height / 2, 1]; // Single apex point
        this.points.push(apex);
    
        // Generate points on the triangular faces (apex + two base vertices)
        for (let i = 0; i < baseVertices.length; i++) {
            const v1 = baseVertices[i];
            const v2 = baseVertices[(i + 1) % baseVertices.length]; // Wrap around to first vertex
            const v3 = apex;
    
            // Subdivide the triangle
            for (let u = 0; u <= resolution; u++) {
                for (let v = 0; v <= resolution - u; v++) {
                    const w = resolution - u - v; // Third barycentric coordinate
    
                    // Interpolate point within the triangle
                    const x = (u * v1[0] + v * v2[0] + w * v3[0]) / resolution;
                    const y = (u * v1[1] + v * v2[1] + w * v3[1]) / resolution;
                    const z = (u * v1[2] + v * v2[2] + w * v3[2]) / resolution;
    
                    this.points.push([x, y, z, 1]);
                }
            }
        }
    
        // Generate points on the base plane (subdivide the square base)
        for (let x = -halfBase; x <= halfBase; x += baseSize / resolution) {
            for (let y = -halfBase; y <= halfBase; y += baseSize / resolution) {
                const z = -height / 2; // Base is flat at z = 0
                this.points.push([x, y, z, 1]);
            }
        }

        this.points = new Int16Array(this.points.flat());
    }
}