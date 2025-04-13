import { Shape } from "./Shape.js";

export class Cube extends Shape {
    constructor({x = 0,y = 0,z = 0,xRotation = 0,yRotation = 0,zRotation = 0,scale = 1} = {}) {
        super({x: x, y: y, z: z,xRotation: xRotation,yRotation: yRotation,zRotation: zRotation, width: scale, height: scale, depth: scale});
        this.generateShape()
    }

    generateShape() {
        this.points = []
        const resolution = 40

        for (let x = -resolution; x <= resolution; x++) {
            for (let y = -resolution; y <= resolution; y++) {
                for (let z = -resolution; z <= resolution; z++) {
                    if (x == -resolution || x == resolution || y == -resolution || y == resolution || z == -resolution || z == resolution) {
                        let coords = [x,y,z,1]
                        this.points.push(coords)
                    }
                }
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