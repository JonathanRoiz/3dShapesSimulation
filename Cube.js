import { Shape } from "./Shape.js";

export class Cube extends Shape {
    constructor({x = 0,y = 0,z = 0,xRotation = 0,yRotation = 0,zRotation = 0,scale = 1} = {}) {
        super({x: x, y: y, z: z,xRotation: xRotation,yRotation: yRotation,zRotation: zRotation, width: scale, height: scale, depth: scale});
        this.generateShape()
    }

    generateShape() {
        this.points = []
        for (let x = -24; x < 25; x++) {
            for (let y = -24; y < 25; y++) {
                for (let z = -24; z < 25; z++) {
                    if (x == -24 || x == 24 || y == -24 || y == 24 || z == -24 || z == 24) {
                        let coords = [x,y,z,1]
                        this.points.push(coords)
                    }
                }
            }
        }

        this.points = new Int8Array(this.points.flat());
    }
}