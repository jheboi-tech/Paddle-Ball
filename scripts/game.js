/**
 * This source file contains the objects
 * that make up the game.
 */

class Game {
    constructor() {
        this._score = 0;
        this._ctx = null;
        this._objects = [];
        console.log("The game is initialised.");
    }

    attachContext(context) {
        console.log("Context has been initialised!");
        this._ctx = context;
    }

    start() {
        // Add objects to the ball.
        this._objects.push(new Ball({
            context: this._ctx,
            x: 0,
            y: 0,
            radius: 20
        }));
    }

    update() {
        // Draw all the objects attached to the game.
        this._objects.map((object) => {
            object.draw();
        })
    }
}

/**
 * Class that defines the ball.
 */
class Ball {
    constructor({context = null, x = 0, y = 0, radius = 10}) {
        this._ctx = context;
        this._x = x; // X-Coordinate
        this._y = y; // Y-Coordinate
        this._dx = 0; // X Speed.
        this._dy = 0; // Y Speed.
        this._radius = radius;
    }

    // Move the ball with velocities dx and dy.
    move({dx = 0, dy = 0}) {

    }
    draw() {
        this._ctx.beginPath();
        this._ctx.arc(this._x, this._y, this._radius, 0, 2 * Math.PI);
        this._ctx.fillStyle = "#FF0000";
        this._ctx.fill();
        this._ctx.closePath();
    }
}