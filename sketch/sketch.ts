const sketch = (p: p5) => {

  const CANVAS_WIDTH : number = 600;
  const CANVAS_HEIGHT : number = 500;

  let firstLayer : p5.Image;
  let water : p5.Image;
  let trees1 : p5.Image;
  let trees2 : p5.Image;
  let mountain : p5.Image;
  let moon : p5.Image;
  let umbrella : p5.Image;

  p.preload = () => {
    // preloading all assets
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
    p.strokeWeight(1); // rain drop
    p.textFont("Cursive", 85);
  };

  // umbrella vars
  const UMBRELLA_APPEAR_Y: number = CANVAS_HEIGHT/2 + 100;
  const UMBRELLA_SIZE: number = 120;
  let umbrellaAlpha: number = 0;

  const clouds: [number, number][] = [
    [350, -200],
    [230, -210],
    [180, -180],
    [0, -220],
    [-150, -200],
    [-250, -160]
  ];

  interface RainDrop {
    x: number,
    y: number,
    groundLevel: number
  }

  let rainDropsList: RainDrop[] = [];
  const RAIN_WAVE_DELAY: number = 15;
  let spawnRainWaveTimer: number = 0;

  // renders a rain drop and return false if it hits something
  function renderRainDrop(rainDrop: RainDrop): boolean {
    // render
    p.line(rainDrop.x, rainDrop.y, rainDrop.x + 5, rainDrop.y - 15);
    // update position
    rainDrop.y += 13;
    rainDrop.x -= 3;

    // umbrella is appearing && hit umbrella?
    const hitUmbrella: boolean = p.mouseY < UMBRELLA_APPEAR_Y &&
    p.dist(
      rainDrop.x,
      rainDrop.y,
      p.mouseX - CANVAS_WIDTH/2,
      p.mouseY - CANVAS_HEIGHT/2
    ) < UMBRELLA_SIZE/2;

    // hit umbrella or ground
    if (hitUmbrella || rainDrop.y > rainDrop.groundLevel){
      // spawn water particles

      return false;
    }
    else return true;
  }

  function getX(amplifier: number): number {
    // mouse X from center (contrains to on screen only)
    const mouseXFromCenter: number = p.constrain(
      p.mouseX - CANVAS_WIDTH/2,
      -CANVAS_WIDTH/2, 
      CANVAS_WIDTH/2
    );
    return mouseXFromCenter * amplifier;
  }

  p.draw = () => {
    p.background(100);
    p.translate(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
    
    p.noStroke();

    // last layer
    p.image(mountain, 0, -CANVAS_HEIGHT/4, CANVAS_WIDTH, CANVAS_HEIGHT/2);
    p.image(moon, 150, -CANVAS_HEIGHT/2.5, 70, 70);

    // clouds layer
    p.fill(250, 250, 250, 120);
    clouds.forEach((cloudPos: [number, number], index: number) => {
      // render
      p.rect(cloudPos[0], cloudPos[1], 100, 30, 10);
      // update x position
      if (cloudPos[0] < -CANVAS_WIDTH/2 -100) cloudPos[0] = CANVAS_WIDTH/2 + 100;
      else cloudPos[0]--;
    });

    // trees 2 layer
    p.image(trees2, getX(0.04), -50, 650, 250);

    // trees 1 layer
    p.image(trees1, getX(0.09), -90, 700, 350);

    // lake layer
    p.image(water, getX(0.3), 110, 800, 100);

    // CANVAS text layer
    p.fill(250);
    p.text("CANVAS", getX(0.2) - 100, 25);

    // first layer
    p.image(firstLayer, getX(0.65), 0, CANVAS_HEIGHT*2, CANVAS_HEIGHT);

    // spawn rain drops
    if (++spawnRainWaveTimer >= RAIN_WAVE_DELAY) {
      spawnRainWaveTimer = 0;
      for (let i=0; i < 10; i++){
        rainDropsList.push({
          x: i * CANVAS_WIDTH/9 + p.random(30, 80) - CANVAS_WIDTH/2,
          y: -CANVAS_HEIGHT/2 - p.random(10, 120),
          groundLevel: CANVAS_HEIGHT/2 - p.random(20, 50)
        });
      }
    }

    // render rain drops (also filter out the ones that exploded)
    p.stroke(250);
    rainDropsList = rainDropsList.filter(renderRainDrop);

    // umbrella
    p.push();
    if (umbrellaAlpha > 0){
      p.tint(255, umbrellaAlpha);
      p.image(umbrella, 
        p.mouseX - CANVAS_WIDTH/2, p.mouseY - CANVAS_HEIGHT/2, 
        UMBRELLA_SIZE, 
        UMBRELLA_SIZE
      );
    }

    // update alpha
    if (p.mouseY < UMBRELLA_APPEAR_Y) umbrellaAlpha += 15;
    else umbrellaAlpha -= 15;
    umbrellaAlpha = p.constrain(umbrellaAlpha, 0, 255);
    p.pop();
  };
};

window.onload = () => {
  const canvasDiv: HTMLElement = document.getElementById("canvas-program-container");
  canvasDiv.oncontextmenu = function (e) {
      e.preventDefault(); // disable right-click menu on canvas
  };

  new p5(sketch, canvasDiv);
};

