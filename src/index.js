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

    // -- Player -- //

    // Sprite

    const player = await Assets.load('images/zombie.svg');
    const playerSprite = Sprite.from(player);
    playerSprite.position.set(app.canvas.width / 2, app.canvas.height / 2, 0.5);
    playerSprite.scale.set(0.1, 0.1);
    app.stage.addChild(playerSprite);

    // Basic Keyboard Control

    const speed = 5;
    const keys = {};

    window.addEventListener("keydown", (e) => { // 
        keys[e.code] = true;
    });

    window.addEventListener("keyup", (e) => {
        keys[e.code] = false;
    });

    app.ticker.add(() => {

        // Basic Control

        if (keys["KeyW"] || keys["ArrowUp"]) playerSprite.y -= speed;
        if (keys["KeyS"] || keys["ArrowDown"]) playerSprite.y += speed;
        if (keys["KeyA"] || keys["ArrowLeft"]) playerSprite.x -= speed;
        if (keys["KeyD"] || keys["ArrowRight"]) playerSprite.x += speed;

        // Screen Boundaries

        if (playerSprite.x < 0) playerSprite.x = 0;
        if (playerSprite.y < 0) playerSprite.y = 0;
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