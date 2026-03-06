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
        .rect(0, 0, window.innerWidth, 100)
        .fill ({
            color: 0x5e3202
        });
    headerContainer.addChild(header);

    // Score Counter

    var score = 0;

    const style = new TextStyle({
        fill: 0xffffff,
        fontSize: 24,
        fontFamily: "Ariel, sans-serif",
    });

    var scoreText = new Text({
        text: `Score: ${score}`,
        style
    });

    scoreText.anchor.set(0.5, 0.5);
    scoreText.position.set(100, 50);
    headerContainer.addChild(scoreText);

    // Title

    const title = new Text({
        text: "Zombie Pizza",
        style
    });

    title.anchor.set(0.5, 0.5);
    title.position.set(headerContainer.width / 2, headerContainer.height / 2);
    headerContainer.addChild(title);

    // Timer
    var timeLeft = 61;

    const timer = new Text ({
        text: `Time Left: ${timeLeft}`,
        style
    });

    timer.anchor.set(0.5, 0.5)
    timer.position.set((window.innerWidth - 100), 50);
    app.stage.addChild(timer);

    function updateTimer() {
    
        if (timeLeft > 0) {
            timeLeft = timeLeft - 1;
            timer.text = `Time Left: ${timeLeft}`;
        };

        if (timeLeft === 0) {
            const gameEnding = new Text ({
                text: `Time Up! You Ate ${score} Pizzas In 60 Seconds!`,
                fontSize: 108,
                fill: 0x000000,
                fontFamily: "Ariel, sans-serif"
            });

            gameEnding.anchor.set(0.5, 0.5);
            gameEnding.position.set((window.innerWidth / 2), (window.innerHeight / 2));
            gameEnding.width = 400;
            app.stage.addChild(gameEnding);
            timeLeft = timeLeft - 1; // stops the loop playing and printing same statement continuously
            timer.text = "FINISHED!";
        
        if (timeLeft < 0) {

            timer.text = "FINISHED!";

            };
        };
    
    };

    // -- Footer -- //

    const footer = new Graphics()
        .rect(0, (window.innerHeight - 100), window.innerWidth, 100) // should figure out how to control width (the 3rd variable) in a better way
        .fill ({ color: 0x5e3202 })
    app.stage.addChild(footer);

    // Placeholder Statement - WILL ADD BUTTONS TO ASSET CREDITS HERE LATER

    const footerText = new Text({
        text: "Created by Lee Gallagher 2026",
        style
    })

    footerText.anchor.set(0.5, 0.5);
    footerText.position.set((window.innerWidth / 2), (window.innerHeight - 50));
    app.stage.addChild(footerText);

    // -- Pickups -- //

    // Pizza Spawning

    const pizza = await Assets.load('/images/pizza.svg');
    const pizzaSprite = Sprite.from(pizza);
    pizzaSprite.scale.set(0.2, 0.2);
    pizzaSprite.zIndex = 1;

    function pizzaSpawn() {
        // Spawns the target at a random position on our stage
        // Create two random points on our stage
        //var randomX = Math.floor((Math.random() * 10) + 0);
        //var randomY = Math.floor((Math.random() * 10) + 0);

        var randomX = Math.random(); // random decimal number between 0 and 1
        var randomY = Math.random();

        // Set the position of our target
        pizzaSprite.position.x = randomX * window.innerWidth; // multiply number by width of window (effectively a percentage of the window width)
        pizzaSprite.position.y = randomY * window.innerHeight; // multiply number by height of window (effectively a percentage of the window height)

        app.stage.addChild(pizzaSprite);

        if (pizzaSprite.position.y < 150 || pizzaSprite.position.y > (window.innerHeight - 150)) {
            pizzaSpawn(); // prevents pizza from spawning in the header or too close to the bottom of the window
        };

        if (pizzaSprite.position.x < 50 || pizzaSprite.position.x > (window.innerWidth - 50)) {
            pizzaSpawn(); // prevents pizza from spawning too close to the sides of the window
        }

    };

    function spritesIntersect(a, b) {
        let aBox = a.getBounds();
        let bBox = b.getBounds();

        return aBox.x + aBox.width > bBox.x && 
               aBox.x < bBox.x + bBox.width &&
               aBox.y + aBox.height > bBox.y &&
               aBox.y < bBox.y + bBox.height;
    };

    // -- Player -- //

    // Sprite

    const player = await Assets.load('images/zombie.svg');
    const playerSprite = Sprite.from(player);
    playerSprite.position.set(window.innerWidth / 2, window.innerHeight / 2, 0.5);
    playerSprite.scale.set(0.1, 0.1);
    playerSprite.zIndex = 1;
    app.stage.addChild(playerSprite);
    app.ticker.add(gameLoop);

    // -- Collisions -- //

    function gameLoop(delta) {
        if (spritesIntersect(playerSprite, pizzaSprite)) {
            pizzaSpawn();
            score++;
            scoreText.text = `Score: ${score}`;
        };
    };

    // -- Start Menu -- //

    //const start = new Container();
    //start.width()
    //start.anchor.set(0.5, 0.5);
    //start.position.set((window.innerWidth / 2), (window.innerHeight / 2));
    //app.stage.addChild(start);

    //const startBtn = new Graphics()
    //    .rect(0, 0, 300, 100)
    //    .fill({ color: 0x5e3202 })
    //startBtn.anchor.set(0.5, 0.5);
    //start.addChild(startBtn);

    //const startText = new Text({
    //    text: 'Start Game',
    //    style
    //});
    //startText.anchor.set(0.5, 0.5);
    //start.addChild(startText);

    // -- Game Start -- //

    pizzaSpawn();
    gameLoop();
    updateTimer();
    setInterval(updateTimer, 1000);

    // Basic Keyboard Control

    const speed = 10; // speed of player movement
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
        if (playerSprite.y > (window.innerHeight - 175)) playerSprite.y = (window.innerHeight - 175);
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