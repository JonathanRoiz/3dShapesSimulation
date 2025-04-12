import { Shape } from "./Shape.js";

export class Cube extends Shape {
    constructor({x = 0,y = 0,z = 0,xRotation = 0,yRotation = 0,zRotation = 0,scale = 1} = {}) {
        super({x: x, y: y, z: z,xRotation: xRotation,yRotation: yRotation,zRotation: zRotation, width: scale, height: scale, depth: scale});
        this.generateShape()
    }

    generateShape() {
        this.points = []
        for (let x = -12; x < 13; x++) {
            for (let y = -12; y < 13; y++) {
                for (let z = -12; z < 13; z++) {
                    if (x == -12 || x == 12 || y == -12 || y == 12 || z == -12 || z == 12) {
                        let coords = [x,y,z,1]
                        this.points.push(coords)
                    }
                }
            }
        }
    }
}