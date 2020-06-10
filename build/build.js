const sketch = (p) => {
    const CANVAS_WIDTH = 600;
    const CANVAS_HEIGHT = 500;
    let firstLayer;
    let water;
    let trees1;
    let trees2;
    let mountain;
    let moon;
    let umbrella;
    p.preload = () => {
        firstLayer = p.loadImage("build/assets/firstLayer.png");
        water = p.loadImage("build/assets/water.png");
        trees1 = p.loadImage("build/assets/trees1.png");
        trees2 = p.loadImage("build/assets/trees2.png");
        mountain = p.loadImage("build/assets/mountain.png");
        moon = p.loadImage("build/assets/moon.png");
        umbrella = p.loadImage("build/assets/umbrella.png");
    };
    p.setup = () => {
        p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
        p.imageMode(p.CENTER);
        p.rectMode(p.CENTER);
        p.textAlign(p.CENTER, p.CENTER);
        p.textFont("Cursive", 85);
    };
    function getX(amplifier) {
        const mouseXFromCenter = p.constrain(p.mouseX - CANVAS_WIDTH / 2, -CANVAS_WIDTH / 2, CANVAS_WIDTH / 2);
        return mouseXFromCenter * amplifier;
    }
    p.draw = () => {
        p.background(100);
        p.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
        p.image(mountain, 0, -CANVAS_HEIGHT / 4, CANVAS_WIDTH, CANVAS_HEIGHT / 2);
        p.image(moon, 150, -CANVAS_HEIGHT / 2.5, 70, 70);
        p.image(trees2, getX(0.04), -50, 650, 250);
        p.image(trees1, getX(0.09), -90, 700, 350);
        p.image(water, getX(0.3), 110, 800, 100);
        p.fill(250);
        p.text("CANVAS", getX(0.2) - 100, 25);
        p.image(firstLayer, getX(0.65), 0, CANVAS_HEIGHT * 2, CANVAS_HEIGHT);
    };
};
window.onload = () => {
    const canvasDiv = document.getElementById("canvas-program-container");
    canvasDiv.oncontextmenu = function (e) {
        e.preventDefault();
    };
    new p5(sketch, canvasDiv);
};
const SQUARE_SIZE = 120;
//# sourceMappingURL=build.js.map