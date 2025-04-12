export class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')
    }

    render(shape) {
        const points = shape.getTransformedPoints();
        
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        for (let i = 0; i < points.length; i++) {
            let greyness = Math.clamp(points[i][2] * .8,0,180);
            this.ctx.fillStyle = "rgb(" + greyness + "," + greyness + "," + greyness + ")";
            this.ctx.fillRect(points[i][0]+this.canvas.width/2-50,points[i][1]+this.canvas.height/2-50,1,1);
        }
    }
}