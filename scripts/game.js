/**
 * This source file contains the objects
 * that make up the game.
 */

class Game {
    constructor() {
        this._score = 0;
        this._canvas = null;
        this._ctx = null;
        this._objects = [];

        // Define X and Y boundaries.
        this._min_x = null;
        this._min_y = null;
        this._max_x = null;
        this._max_y = null;

        // When set to true, game is over!
        this._game_over = false;
        console.log("The game is initialised.");
    }

    get game_over() {
        return this._game_over;
    }

    attachContext(canvas, context) {
        console.log("Context has been initialised!");
        this._ctx = context;
        this._canvas = canvas;
    }

    start() {
        // Add objects to the ball.
        let ball = new Ball({context: this._ctx, x: this._canvas.width / 2, y: this._canvas.height / 2});
        ball.randomise();
        this._objects.push(ball);

        // Create the main boundaries.
        this._min_x = 0;
        this._min_y = 0;
        this._max_x = this._canvas.width;
        this._max_y = this._canvas.height;
    }

    /**
     * Updates all moving objects on the screen.
     * @param {*} dt Time between last frame and current frame.
     */
    update(dt) {
        // Draw all the objects attached to the game.
        this._objects.map((object) => {
            // Check for side wall collisions.
            if (((object.x + object.radius) >= this._max_x) || ((object.x - object.radius) <= this._min_x)) {
                object.dx = -object.dx;
            }
            // Check for top wall collision.
            if ((object.y + object.radius) >= this._max_y) {
                this._game_over = true;
            }
            if ((object.y - object.radius) <= this._min_y) {
                object.dy = -object.dy;
            }

            object.move({dt: dt});
            object.draw();
        });
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
        this._dx = 0; // X-Speed.
        this._dy = 0; // Y-Speed.
        this._radius = radius;
    }

    // Define setters.
    set dx(value) {
        this._dx = value;
    }

    set dy(value) {
        this._dy = value;
    }

    set radius(value) {
        this._radius = value;
    }

    // Define getters.
    get dx() {
        return this._dx;
    }

    get dy() {
        return this._dy;
    }

    get radius() {
        return this._radius;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    randomise() {
        this._dx = (Math.random() - 0.5) + 30;
        this._dy = (Math.random() - 0.5) + 30;
        this._radius = (Math.random() * 20) + 5;
    }

    // Move the ball with velocities dx and dy.
    move({dt = 0}) {
        // Update position with speed.
        this._x = (this._dx * dt) + this._x;
        this._y = (this._dy * dt) + this._y;
    }

    draw() {
        this._ctx.beginPath();
        this._ctx.arc(this._x, this._y, this._radius, 0, 2 * Math.PI);
        this._ctx.fillStyle = "#FF0000";
        this._ctx.fill();
        this._ctx.closePath();
    }
}