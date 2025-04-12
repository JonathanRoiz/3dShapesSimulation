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
        const transformedPoints = new Int8Array(this.points.length);

        for (let i = 0; i < this.points.length; i+=4) {
            const x = this.points[i];
            const y = this.points[i + 1];
            const z = this.points[i + 2];
            const w = this.points[i + 3];

            let transformedx = (x * matrix[0][0]) + (y * matrix[0][1]) + (z * matrix[0][2]) + (w * matrix[0][3]);
            let transformedy = (x * matrix[1][0]) + (y * matrix[1][1]) + (z * matrix[1][2]) + (w * matrix[1][3]);
            let transformedz = (x * matrix[2][0]) + (y * matrix[2][1]) + (z * matrix[2][2]) + (w * matrix[2][3]);
            let transformedw = (x * matrix[3][0]) + (y * matrix[3][1]) + (z * matrix[3][2]) + (w * matrix[3][3]);
            
            transformedPoints[i] = transformedx;
            transformedPoints[i + 1] = transformedy;
            transformedPoints[i + 2] = transformedz;
            transformedPoints[i + 3] = transformedw;
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
            
            const transformedPoints = this.applyTransformation(combinedTransformations);

            // Start Chatgpt code
            const pointCount = transformedPoints.length / 4;
            const sortedPoints = new Int8Array(transformedPoints.length);

            const indices = Array.from({ length: pointCount }, (_, i) => ({
                z: transformedPoints[i * 4 + 2],
                index: i * 4,
            })).sort((a, b) => a.z - b.z);

            indices.forEach((entry, sortedIndex) => {
                const baseIndex = entry.index;
                sortedPoints.set(transformedPoints.slice(baseIndex, baseIndex + 4), sortedIndex * 4);
            });
            // End Chatgpt code
            
            this.cachedTransformedPoints = sortedPoints;
            this.needsUpdate = false;
        }
        return this.cachedTransformedPoints;
    }

    generateShape() {
        throw new Error('You have to implement the method generateShape!');
    }
}