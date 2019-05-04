const HEIGHT = 10;

class Paddle {
    /**
     *
     * @param {*} param0
     */
    constructor({canvas=null, context=null, width=40, speed=10, height = HEIGHT}) {
        this._width = width;
        this._height = HEIGHT;
        this._ctx = context;
        this._canvas = canvas;
        this._dx = 0;
        this._speed = speed;
        this._rightPressed = false;
        this._leftPressed = false;
        this._x = this._canvas.width/2;
        this._y = this._canvas.height - (this._height / 2);
    }

    get speed() {
        return this._speed;
    }

    set speed(value) {
        this._speed = value;
    }

    get minX() {
        return this._x - (this._width / 2);
    }

    get maxX() {
        return this._x + (this._width / 2);
    }

    get minY() {
        return this._y - (this._height / 2);
    }

    get maxY() {
        return this._y + (this._height / 2);
    }

    keyDownHandler = (e) => {
        if (e.key == "Right" || e.key == "ArrowRight") {
            this._rightPressed = true;
        }
        else if (e.key == "Left" || e.key == "ArrowLeft") {
            this._leftPressed = true;
        }
    }

    keyUpHandler = (e) => {
        if (e.key == "Right" || e.key == "ArrowRight") {
            this._rightPressed = false;
        }
        else if (e.key == "Left" || e.key == "ArrowLeft") {
            this._leftPressed = false;
        }
    }

    move = ({dt=0}) => {
        if (this._rightPressed == true) {
            this._dx = this._speed;
        }
        else if (this._leftPressed == true) {
            this._dx = -this._speed;
        }
        else {
            this._dx = 0;
        }
        this._x = (this._dx * dt) + this._x;

        if (this._x >= (this._canvas.width - (this._width / 2))) {
            this._x = (this._canvas.width - (this._width / 2));
        }

        if (this._x <= (this._width / 2)) {
            this._x = this._width / 2;
        }
    }

    draw = () => {
        this._ctx.beginPath();
        this._ctx.rect(this._x - (this._width / 2), this._y - (this._height / 2), this._width, HEIGHT);
        this._ctx.fillStyle = '#000000';
        this._ctx.fill();
        this._ctx.closePath();
    }
}