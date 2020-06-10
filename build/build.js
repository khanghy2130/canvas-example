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
        p.strokeWeight(1);
        p.textFont("Cursive", 85);
    };
    const UMBRELLA_APPEAR_Y = CANVAS_HEIGHT / 2 + 100;
    const UMBRELLA_SIZE = 120;
    let umbrellaAlpha = 0;
    const clouds = [
        [350, -200],
        [230, -210],
        [180, -180],
        [0, -220],
        [-150, -200],
        [-250, -160]
    ];
    let rainDropsList = [];
    const RAIN_WAVE_DELAY = 15;
    let spawnRainWaveTimer = 0;
    function renderRainDrop(rainDrop) {
        p.line(rainDrop.x, rainDrop.y, rainDrop.x + 5, rainDrop.y - 15);
        rainDrop.y += 13;
        rainDrop.x -= 3;
        const hitUmbrella = p.mouseY < UMBRELLA_APPEAR_Y &&
            p.dist(rainDrop.x, rainDrop.y, p.mouseX - CANVAS_WIDTH / 2, p.mouseY - CANVAS_HEIGHT / 2) < UMBRELLA_SIZE / 2;
        if (hitUmbrella || rainDrop.y > rainDrop.groundLevel) {
            return false;
        }
        else
            return true;
    }
    function getX(amplifier) {
        const mouseXFromCenter = p.constrain(p.mouseX - CANVAS_WIDTH / 2, -CANVAS_WIDTH / 2, CANVAS_WIDTH / 2);
        return mouseXFromCenter * amplifier;
    }
    p.draw = () => {
        p.background(100);
        p.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
        p.noStroke();
        p.image(mountain, 0, -CANVAS_HEIGHT / 4, CANVAS_WIDTH, CANVAS_HEIGHT / 2);
        p.image(moon, 150, -CANVAS_HEIGHT / 2.5, 70, 70);
        p.fill(250, 250, 250, 120);
        clouds.forEach((cloudPos, index) => {
            p.rect(cloudPos[0], cloudPos[1], 100, 30, 10);
            if (cloudPos[0] < -CANVAS_WIDTH / 2 - 100)
                cloudPos[0] = CANVAS_WIDTH / 2 + 100;
            else
                cloudPos[0]--;
        });
        p.image(trees2, getX(0.04), -50, 650, 250);
        p.image(trees1, getX(0.09), -90, 700, 350);
        p.image(water, getX(0.3), 110, 800, 100);
        p.fill(250);
        p.text("CANVAS", getX(0.2) - 100, 25);
        p.image(firstLayer, getX(0.65), 0, CANVAS_HEIGHT * 2, CANVAS_HEIGHT);
        if (++spawnRainWaveTimer >= RAIN_WAVE_DELAY) {
            spawnRainWaveTimer = 0;
            for (let i = 0; i < 10; i++) {
                rainDropsList.push({
                    x: i * CANVAS_WIDTH / 9 + p.random(30, 80) - CANVAS_WIDTH / 2,
                    y: -CANVAS_HEIGHT / 2 - p.random(10, 120),
                    groundLevel: CANVAS_HEIGHT / 2 - p.random(20, 50)
                });
            }
        }
        p.stroke(250);
        rainDropsList = rainDropsList.filter(renderRainDrop);
        p.push();
        if (umbrellaAlpha > 0) {
            p.tint(255, umbrellaAlpha);
            p.image(umbrella, p.mouseX - CANVAS_WIDTH / 2, p.mouseY - CANVAS_HEIGHT / 2, UMBRELLA_SIZE, UMBRELLA_SIZE);
        }
        if (p.mouseY < UMBRELLA_APPEAR_Y)
            umbrellaAlpha += 15;
        else
            umbrellaAlpha -= 15;
        umbrellaAlpha = p.constrain(umbrellaAlpha, 0, 255);
        p.pop();
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