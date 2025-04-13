Math.clamp = function(val, min, max) {
    return Math.min(Math.max(val, min), max);
};

Math.createXRotationMatrix = function(rotationX) {
    const xRotation = [
        [1,0,0,0],
        [0,Math.cos(rotationX),-Math.sin(rotationX),0],
        [0,Math.sin(rotationX),Math.cos(rotationX),0],
        [0,0,0,1]
    ];
    return xRotation;
};

Math.createYRotationMatrix = function(rotationY) {
    const yRotation = [
        [Math.cos(rotationY),0,Math.sin(rotationY),0],
        [0,1,0,0],
        [-Math.sin(rotationY),0,Math.cos(rotationY),0],
        [0,0,0,1]
    ];
    return yRotation;
};

Math.createZRotationMatrix = function(rotationZ) {
    const zRotation = [
        [Math.cos(rotationZ),-Math.sin(rotationZ),0,0],
        [Math.sin(rotationZ),Math.cos(rotationZ),0,0],
        [0,0,1,0],
        [0,0,0,1]
    ];
    return zRotation;
};

Math.createScalingMatrix = function(scale) {
    const scaleMatrix = [
        [scale.x,0,0,0],
        [0,scale.y,0,0],
        [0,0,scale.z,0],
        [0,0,0,1]
    ];
    return scaleMatrix;
}

Math.createTranslationMatrix = function(x,y,z) {
    const translation = [
        [1,0,0,x],
        [0,1,0,y],
        [0,0,1,z],
        [0,0,0,1]
    ];
    return translation;
};

Math.multiplyMatrices = function(matrixA, matrixB) {
    const result = Array(matrixA.length)
        .fill(null)
        .map(() => Array(matrixB[0].length).fill(0));

    for (let i = 0; i < matrixA.length; i++) {
        for (let j = 0; j < matrixB[0].length; j++) {
            for (let k = 0; k < matrixB.length; k++) {
                result[i][j] += matrixA[i][k] * matrixB[k][j];
            }
        }
    }
    return result;
};

Math.combineTransformations = function(matrices) {
    return matrices.reduce((acc, matrix) => Math.multiplyMatrices(acc, matrix));
};