const app = new PIXI.Application();
const ufoList = [];

document.body.appendChild(app.view);

 
const stars = PIXI.Sprite.from('assets/stars.png');
app.stage.addChild(stars);

const moon = PIXI.Sprite.from('assets/moon.png');
app.stage.addChild(moon);
moon.x = 50;
moon.y = 70;
moon.scale.x = 0.1;
moon.scale.y = 0.1;

const saturn = PIXI.Sprite.from('assets/saturn.png');
app.stage.addChild(saturn);
saturn.x = 550;
saturn.y = 200;
saturn.scale.x = 0.1;
saturn.scale.y = 0.1;

const rocket = PIXI.Sprite.from('assets/rocket2.png');
rocket.x = 360;
rocket.y = 490;
rocket.scale.x = 0.04;
rocket.scale.y = 0.04;
app.stage.addChild(rocket);


gameInterval(function() {
const ufo = PIXI.Sprite.from('assets/ufo' + random(1,2) + '.png');
ufo.x = random(0, 700);
ufo.y = -25;
ufo.scale.x = 0.04;
ufo.scale.y = 0.04;
app.stage.addChild(ufo);
ufoList.push(ufo);
flyDown(ufo, 1);

    waitForCollision(ufo, rocket).then(function() {
        app.stage.removeChild(rocket);
        stopGame();
    });
}, 1000);

function leftKeyPressed() {
    rocket.x = rocket.x - 5;
}

function rightKeyPressed() {
    rocket.x = rocket.x + 5;
}

function spaceKeyPressed() {
    const ammo = PIXI.Sprite.from('assets/ammo.png');
    ammo.x = rocket.x + 13;
    ammo.y = 490;
    ammo.scale.x = 0.015;
    ammo.scale.y = 0.015;
    app.stage.addChild(ammo);
    flyUp(ammo);

    waitForCollision(ammo, ufoList).then(function([bullet, ufo]) {
        app.stage.removeChild(ammo);
        app.stage.removeChild(ufo);
    });
}
