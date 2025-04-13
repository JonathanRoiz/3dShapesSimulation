export class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')
    }

    render(shape) {
        const points = shape.getTransformedPoints();
        
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)

        
        for (let i = 0; i < points.length; i+=4) {
            const x = points[i];
            const y = points[i + 1];
            const z = points[i + 2];

            let greyness = Math.clamp(z * .8,0,180);
            this.ctx.fillStyle = "rgb(" + greyness + "," + greyness + "," + greyness + ")";
            this.ctx.fillRect(x+this.canvas.width/2,y+this.canvas.height/2,shape.scale.x*2,shape.scale.y*2);
        }
    }
}