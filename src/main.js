import { Application, Graphics, Text, TextStyle, Sprite, Assets } from "pixi.js";

(async () => {

    const app = new Application();

    await app.init({
        // width: window.innerWidth,
        // height: window.innerHeight,
        resizeTo: window,
        // backgroundAlpha: 0.2,
        backgroundColor: 0x000000,
        // antialias: true,
    });

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

    const star = new Graphics()
        .star(1000, 250, 12, 80, 2) // .star(x, y, points, radius, innerRadius)
        .fill({ color: 0xffffff })

    app.stage.addChild(star);
    
    const style = new TextStyle({
        fill: 0xffffff,
        fontSize: 72,
        fontFamily: 'Montserrat Medium',
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

    document.body.appendChild(app.canvas);

})();

