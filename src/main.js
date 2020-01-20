const WIDTH = 500;
const HEIGHT = 500;
const APP_FPS = 30;

// init
let app = new PIXI.Application({
  width: WIDTH,
  height: HEIGHT
});
let canvas = document.getElementById("canvas");
canvas.appendChild(app.view);
app.renderer.backgroundColor = 0x000000;
app.stage.interactive = true;
app.ticker.remove(app.render, app);
const fpsDelta = 60 / APP_FPS;

let elapsedTime = 0;
let cat;
let isCatDragging = false;

let container = new PIXI.Container();
container.width = 480;
container.height = 480;
container.x = 0;
container.y = 0;
container.pivot.x = 0;
container.pivot.y = 0;
container.interactive = true;
container.interactiveChildren = true;
app.stage.addChild(container);

// asset property
const ASSET_CAT = "images/photo_cat.jpg";

PIXI.loader.add("cat_data", ASSET_CAT);
PIXI.loader.load(onAssetsLoaded);

/**
 * Asset load Complete
 * @param { object } loader object
 * @param { object } res asset data
 */
function onAssetsLoaded(loader, res) {
  // CAT
  cat = new PIXI.Sprite(res.cat_data.texture);
  container.addChild(cat);
  cat.x = WIDTH / 2;
  cat.y = HEIGHT / 2;
  cat.interactive = true;
  cat.buttonMode = true;
  cat.anchor.set(0.5);
  cat.scale.set(1);

  // Get shader code as a string
  var shaderCode = document.getElementById("shader").innerHTML;
  // Create our Pixi filter using our custom shader code
  var simpleShader = new PIXI.AbstractFilter("", shaderCode);
  // Apply it to our object
  cat.filters = [simpleShader];

  // Text
  let text = new PIXI.Text("Shader Test\n(PixiJS 4.5.5)", {
    fontFamily: "Arial",
    fontSize: 30,
    fill: 0xf0fff0,
    align: "center",
    fontWeight: "bold",
    stroke: "#000000",
    strokeThickness: 4,
    dropShadow: false,
    dropShadowColor: "#666666",
    lineJoin: "round"
  });
  container.addChild(text);
  text.x = WIDTH / 2 - text.width / 2;
  text.y = 20;

  // Ticker
  let ticker = PIXI.ticker.shared;
  ticker.autoStart = false;
  ticker.stop();
  PIXI.settings.TARGET_FPMS = 0.06;
  app.ticker.add(tick);
}

/**
 * adjust fps
 * @param { number } delta time
 */
const tick = delta => {
  // console.log(delta);
  elapsedTime += delta;

  if (elapsedTime >= fpsDelta) {
    //enough time passed, update app
    update(elapsedTime);
    //reset
    elapsedTime = 0;
  }
};

/**
 * app rendering
 * @param { number } delta time
 */
const update = delta => app.render();
