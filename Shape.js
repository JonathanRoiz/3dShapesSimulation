export class Shape {
    constructor({ x = 0,y = 0,z = 0,xRotation = 0,yRotation = 0,zRotation = 0,width = 1,height = 1,depth = 1 } = {}) {
        this.position = { x: x, y: y, z: z };
        this.rotation = { x: xRotation, y: yRotation, z: zRotation };
        this.scale = { x: width, y: height, z: depth };
        this.points = []; // List of vectors
        this.cachedTransformedPoints = null;
        this.needsUpdate = true;
    }

    applyTransformation(matrix) {
        let transformedPoints = [];
        for (let i = 0; i < this.points.length; i++) {
            let transformedx = (this.points[i][0] * matrix[0][0]) + (this.points[i][1] * matrix[0][1]) + (this.points[i][2] * matrix[0][2]) + (this.points[i][3] * matrix[0][3]);
            let transformedy = (this.points[i][0] * matrix[1][0]) + (this.points[i][1] * matrix[1][1]) + (this.points[i][2] * matrix[1][2]) + (this.points[i][3] * matrix[1][3]);
            let transformedz = (this.points[i][0] * matrix[2][0]) + (this.points[i][1] * matrix[2][1]) + (this.points[i][2] * matrix[2][2]) + (this.points[i][3] * matrix[2][3]);
            let transformedw = (this.points[i][0] * matrix[3][0]) + (this.points[i][1] * matrix[3][1]) + (this.points[i][2] * matrix[3][2]) + (this.points[i][3] * matrix[3][3]);
            transformedPoints[i] = [transformedx,transformedy,transformedz,transformedw];
        }
        return transformedPoints;
    }

    move(x,y,z) {
        this.needsUpdate = true;
    }

    rotate(rotationX,rotationY,rotationZ) {
        this.rotation.x += rotationX;
        this.rotation.y += rotationY;
        this.rotation.z += rotationZ;
        this.needsUpdate = true;
    }

    setRotation(rotationX,rotationY,rotationZ) {
        this.rotation.x = rotationX;
        this.rotation.y = rotationY;
        this.rotation.z = rotationZ;
        this.needsUpdate = true;
    }

    scale(x,y,z) {
        this.needsUpdate = true;
    }

    getTransformedPoints() {
        if (!this.cachedTransformedPoints || this.needsUpdate) {
            const xRotation = Math.createXRotationMatrix(this.rotation.x);
            const yRotation = Math.createYRotationMatrix(this.rotation.y);
            const zRotation = Math.createZRotationMatrix(this.rotation.z);
            const translation = Math.createTranslationMatrix(this.position.x,this.position.y,this.position.z);

            const combinedTransformations = Math.combineTransformations([translation,zRotation,yRotation,xRotation]); // Apply scaling -> Rotation -> Translation. Written in the order of standard matrix math
            
            let transformedPoints = this.applyTransformation(combinedTransformations);

            transformedPoints.sort((a,b) => a[2]-b[2]);

            return transformedPoints;
        }
        return this.cachedTransformedPoints;
    }

    generateShape() {
        throw new Error('You have to implement the method generateShape!');
    }
}