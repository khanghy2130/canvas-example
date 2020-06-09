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
  };

  p.draw = () => {
    p.background(100);
    p.translate(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
    
    // laster layer
    p.image(mountain, 0, -CANVAS_HEIGHT/4, CANVAS_WIDTH, CANVAS_HEIGHT/2);
    p.image(moon, 150, -CANVAS_HEIGHT/2.5, 70, 70);
    
  };
};

window.onload = () => {
  const canvasDiv: HTMLElement = document.getElementById("canvas-program-container");
  canvasDiv.oncontextmenu = function (e) {
      e.preventDefault(); // disable right-click menu on canvas
  };

  new p5(sketch, canvasDiv);
};

