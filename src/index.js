import { Application, Graphics, Text, TextStyle, Sprite, Assets, Container } from "pixi.js";
import { Keyboard } from "pixi.js-keyboard";

import { initDevtools } from "@pixi/devtools";

(async () => {

    // -- App Declaration & Canvas -- //

    const app = new Application();

    await app.init({
        // width: window.innerWidth,
        // height: window.innerHeight,
        resizeTo: window,
        backgroundAlpha: 0.8,
        backgroundColor: 0xfff499,
        // antialias: true,
    });

    initDevtools({ app });

    app.canvas.style.position = "absolute";

    // -- Header -- //

    const headerContainer = new Container();
    headerContainer.width = window.innerWidth;
    app.stage.addChild(headerContainer);

    const header = new Graphics()
        .rect(0, 0, window.innerWidth, 100) // should figure out how to control width (the 3rd variable) in a better way
        .fill ({
            color: 0x5e3202
        });
    headerContainer.addChild(header);

    let score = 0;

    const style = new TextStyle({
        fill: 0xffffff,
        fontSize: 24,
        fontFamily: "Ariel, sans-serif",
    });

    const scoreText = new Text({
        text: `Score: ${score}`,
        style
    });

    scoreText.anchor.set(0.5, 0.5);
    scoreText.position.set(100, 50);
    headerContainer.addChild(scoreText);

    // -- Footer -- // (WORK IN PROGRESS)

    //const footer = new Graphics()
    //    .rect(0, 0, window.innerWidth, 150) // should figure out how to control width (the 3rd variable) in a better way
    //    .fill ({
    //        color: 0x5e3202
    //    });
    //app.stage.addChild(footer);

    // -- Pickups -- //

    

    // -- Player -- //

    // Sprite

    const player = await Assets.load('images/zombie.svg');
    const playerSprite = Sprite.from(player);
    playerSprite.position.set(window.innerWidth / 2, window.innerHeight / 2, 0.5);
    playerSprite.scale.set(0.1, 0.1);
    app.stage.addChild(playerSprite);

    // Basic Keyboard Control

    const speed = 5; // speed of player movement
    const keys = {}; // declared so that it can be used in both event listeners and the ticker

    window.addEventListener("keydown", (e) => { // 
        keys[e.code] = true; // key pressed down set to true
    });

    window.addEventListener("keyup", (e) => {
        keys[e.code] = false; // key release set to false
    });

    app.ticker.add(() => {

        // Basic Control

        if (keys["KeyW"] || keys["ArrowUp"]) playerSprite.y -= speed; // if W or Up Arrow is true
        if (keys["KeyS"] || keys["ArrowDown"]) playerSprite.y += speed;
        if (keys["KeyA"] || keys["ArrowLeft"]) playerSprite.x -= speed;
        if (keys["KeyD"] || keys["ArrowRight"]) playerSprite.x += speed;

        // Screen Boundaries

        if (playerSprite.x < 0) playerSprite.x = 0;
        if (playerSprite.y < 100) playerSprite.y = 100;
        if (playerSprite.x + playerSprite.width > app.canvas.width) {
            playerSprite.x = app.canvas.width - playerSprite.width;
        }
        if (playerSprite.y + playerSprite.height > app.canvas.height) {
            playerSprite.y = app.canvas.height - playerSprite.height;
        }
    });

    // Add Canvas To DOM

    document.body.appendChild(app.canvas);

})();