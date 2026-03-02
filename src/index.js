import { Application, Graphics, Text, TextStyle, Sprite, Assets, Container } from "pixi.js";
import { Keyboard } from "pixi.js-keyboard";

import { initDevtools } from "@pixi/devtools";

(async () => {

    // App Declaration & Canvas

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

    // Player

    const player = new Sprite(Assets.load('/images/zombie.svg'));
    player.anchor.set(0.5, 0.5);
    player.scale.set(0.1, 0.1);
    app.stage.addChild(player);

    // Add Canvas To DOM

    document.body.appendChild(app.canvas);

})();