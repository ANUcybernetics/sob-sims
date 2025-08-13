import p5 from 'p5';

const sketch = (p) => {
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(0);
        
        for (let i = 0; i < 100; i++) {
            const x = p.random(p.width);
            const y = p.random(p.height);
            const radius = p.random(5, 50);
            const r = p.random(255);
            const g = p.random(255);
            const b = p.random(255);
            const alpha = p.random(50, 200);
            
            p.fill(r, g, b, alpha);
            p.noStroke();
            p.circle(x, y, radius * 2);
        }
    };
    
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
};

new p5(sketch);