/**
 * This source file contains the objects
 * that make up the game.
 */

class Game {
    constructor() {
        this._score = 0;
        this._canvas = null;
        this._ctx = null;
        this._balls = [];
        this._paddle = null;

        // Define X and Y boundaries.
        this._min_x = null;
        this._min_y = null;
        this._max_x = null;
        this._max_y = null;

        // When set to true, game is over!
        this._game_over = false;
        console.log("The game is initialised.");
    }

    /**
     * Return whether the game is over.
     * Returns True if game is over.
     * Returns False if game is still going.
     */
    get game_over() {
        return this._game_over;
    }

    /**
     * Link the canvas and context objects to the
     * Game class.
     * @param {*} canvas
     * @param {*} context
     */
    attachContext(canvas, context) {
        console.log("Context has been initialised!");
        this._ctx = context;
        this._canvas = canvas;
    }

    /**
     * Start the game.
     * Initialises all object that will be used in the
     * game and sets up event handlers.
     */
    start() {
        // Add objects to the ball.
        let ball = new Ball({
            canvas: this._canvas,
            context: this._ctx
        });
        this._balls.push(ball);

        this._paddle = new Paddle({
            canvas: this._canvas,
            context: this._ctx,
            speed: 20
        });

        // Create the main boundaries.
        this._min_x = 0;
        this._min_y = 0;
        this._max_x = this._canvas.width;
        this._max_y = this._canvas.height;

        // Attach the input to the paddle's controller.
        document.addEventListener('keydown', this._paddle.keyDownHandler, false);
        document.addEventListener('keyup', this._paddle.keyUpHandler, false);
    }

    /**
     * Updates all moving objects on the screen.
     * @param {*} dt Time between last frame and current frame.
     */
    update(dt) {
        // Draw the ball instances of
        this._balls.map((ball) => {
            if (((ball.x + ball.radius) >= this._max_x) || ((ball.x - ball.radius) <= this._min_x)) {
                // Add a random number at the end to randomise the
                // ball's movement a bit.
                ball.dx = -ball.dx;
            }
            /*// Check for top wall collision.
            if ((ball.y + ball.radius) >= this._max_y) {
                this._game_over = true;
            }*/
            if (((ball.y - ball.radius) <= this._min_y) || ((ball.y + ball.radius) >= this._max_y)) {
                // Add a random number at the end to randomise the
                // ball's movement a bit.
                ball.dy = -ball.dy;
            }

            ball.move({ dt: dt });
            ball.draw();
        });

        // Draw the paddle.
        this._paddle.move({ dt: dt });
        this._paddle.draw();
    }
}

/**
 * This is the base game object. This is not the Game
 * itself, but a base objects for objects from within
 * the game. This encompasses:
 * - Ball
 * - Paddle
 * - Blocks
 *
 * Each have their own properties, however they will
 * share some similar properties, such as colour,
 * width, height, speed, position, collision enabled,
 * and more.
 *
 *  */
class GameObject {
    constructor({type=null, x=0, y=0, dx=0, dy=0,
        width=10, height=10, colour="#000000",
        type=gameObjectType.none, radius=10}) {
        this._type = type;
        this._x = x;
        this._y = y;
        this._dx = dx;
        this._dy = dy;
        this._radius = radius;
        this._width = width;
        this._height = height;
        if (this._type === gameObjectType.ball) {
            this._width = this._radius * 2;
            this._height = this._radius * 2;
        }

        this._colour = colour;
        this._collisionEnabled = false;
    }

    /**
     * This method calculates this objects resultant
     * velocity. It will not change the other object's
     * velocity however.
     * @param {*} gameObject The object to detect the
     * calculate the collision against.
     */
    calculateCollision(gameObject) {

    }

    /**
     * Calculate whether collision is occuring
     * from the right of the object.
     * @param {*} gameObject THe object we are detecting
     * the collision from. We can treat this as a
     * stationary object. Our object will bounce off
     * this one.
     */
    detectCollisionFromRight(gameObject) {

    }


    /**
     * Returns the minimum X position of the far left
     * edge of the object's hitbox.
     */
    getMinX() {
        return this.x - (this._width / 2);
    }

    /**
     * Returns the maximum X position of the far right
     * edge of the object's hitbox.
     */
    getMaxX() {
        return this.x + (this._width / 2);
    }

    /**
     * Returns the minimum Y position of the far bottom
     * edge of the object's hitbox. (Because
     * Y-coordinates are inverted i.e., 0 is the top,
     * this means getMinY will return the bottom.)
     */
    getMinY() {
        return this.y - (this._height / 2);
    }

    /**
     * Returns the maximum Y position of the far top
     * edge of the object's hitbox. (Because
     * Y-coordinates are inverted, i.e., 0 is the top,
     * this means getMaxY will return the top)
     */
    getMaxY() {
        return this.y + (this._height / 2);
    }


}
/**
 * Class that defines the ball.
 */
class Ball {
    constructor({ context = null, x = 100, y = 100, radius = 10 }) {
        this._ctx = context;
        this._x = x; // X-Coordinate
        this._y = y; // Y-Coordinate
        this._dx = 10; // X-Speed.
        this._dy = 10; // Y-Speed.
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

    // Move the ball with velocities dx and dy.
    move({ dt = 0 }) {
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
