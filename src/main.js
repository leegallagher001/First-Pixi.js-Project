import { Application, Graphics, Text, TextStyle, Sprite, Assets, Container } from "pixi.js";

import { initDevtools } from "@pixi/devtools";

(async () => {

    const app = new Application();

    await app.init({
        // width: window.innerWidth,
        // height: window.innerHeight,
        resizeTo: window,
        backgroundAlpha: 0.8,
        backgroundColor: 0x000000,
        // antialias: true,
    });

    initDevtools({ app });

    // app.renderer.background.alpha = 0.3;

    app.canvas.style.position = "absolute";

    const rectangle = new Graphics() // below methods are chained together make code more concise and readable
        .rect(200, 200, 100, 150) // .rect(x, y, width, height)
        .fill ({ // fill the rectangle with a color
            color: 0xffea00,
            alpha: 0.9,
        })
        .stroke({ // add a border to the rectangle
            width: 8,
            color: 0x00ff00,
        });

    app.stage.addChild(rectangle);

    rectangle.eventMode = 'static'; // enables interactivity for the rectangle

    rectangle.cursor = 'pointer'; // changes the cursor to a pointer when hovering over the rectangle

    rectangle.on('mousedown', moveRect);

    function moveRect() {
        rectangle.x -= 5;
        rectangle.y += 5;
    }

    const star = new Graphics()
        .star(1000, 250, 12, 80, 2) // .star(x, y, points, radius, innerRadius)
        .fill({ color: 0xffffff })

    app.stage.addChild(star);
    
    const font = await Assets.load('/fonts/static/DMSans-Regular.ttf');

    const style = new TextStyle({
        fill: 0xffffff,
        fontSize: 72,
        fontFamily: font.family,
    });

    const text = new Text({
        text: 'Hello, PixiJS!',
        style,
    });

    app.stage.addChild(text);

    const texture = await Assets.load('/images/logo.svg');

    // const sprite = Sprite.from(texture);

    const sprite = new Sprite(texture);

    app.stage.addChild(sprite);

    // sprite.width = 100;
    // sprite.height = 100;
    // sprite.position.set(200, 80); // sets position of sprite to (x, y)

    // sprite.scale.x = 0.5;
    // sprite.scale.y = 2;
    // sprite.scale.set(0.5, 2);

    // text.position.x = 1000;
    // text.position.y = 100;
    // text.position.set(1000, 100);  // sets position of text to (x, y)

    // sprite.skew.x = Math.PI / 4; // skews the sprite along the x-axis by 45 degrees

    sprite.rotation = Math.PI / 4; // rotates the sprite by 45 degrees

    // sprite.pivot.x = sprite.width / 2; // sets the pivot point to the center of the sprite
    // sprite.pivot.y = sprite.height / 2; 

    // sprite.anchor.x = 0.5; // sets the anchor point to the center of the sprite
    // sprite.anchor.y = 0.5;
    sprite.anchor.set(0.5, 0.5);

    const circle = new Graphics();

    app.ticker.add(() => {
        circle.circle(
            Math.random() * app.screen.width,
            Math.random() * app.screen.height,
            1 // radius of the circles generated randomly across the screen
        )
        .fill({
            color: 0xffffff,
        });

        app.stage.addChild(circle);
    });

    document.body.appendChild(app.canvas);

    const jetsContainer = new Container();
    app.stage.addChild(jetsContainer);
    jetsContainer.position.set(400, 300); // sets container position to (x, y) on whole screen

    const jetTexture1 = await Assets.load('/images/F-16.svg');
    const jetSprite1 = Sprite.from(jetTexture1);
    jetSprite1.scale.set(0.15, 0.15);

    jetsContainer.addChild(jetSprite1);

    const jetTexture2 = await Assets.load('/images/F-16.svg');
    const jetSprite2 = Sprite.from(jetTexture2);
    jetSprite2.scale.set(0.15, 0.15);

    jetsContainer.addChild(jetSprite2);

    const jetTexture3 = await Assets.load('/images/F-16.svg');
    const jetSprite3 = Sprite.from(jetTexture3);
    jetSprite3.scale.set(0.15, 0.15);

    jetsContainer.addChild(jetSprite3);

    jetSprite2.position.set(100, 0); // sets position of jetSprite2 to (x, y) relative to the container's position
    jetSprite3.position.set(200, 0); // can use 'getGlobalPosition()' to get the global position of the sprite relative to the whole screen

    const texturePromise = Assets.load('/images/zombie.svg');
    texturePromise.then((resolvedTexture) => {
        const sprite = Sprite.from(resolvedTexture);
        sprite.scale.set(0.1, 0.1);
        app.stage.addChild(sprite);
    });
})();

