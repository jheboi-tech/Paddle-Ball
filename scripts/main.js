// Define the frames_per_seconds and related
// constants.
const frames_per_second = 30;
const seconds_per_frame = 1 / frames_per_second;
const milliseconds_per_frame = seconds_per_frame / 1000;

// Create the canvas object as a global variable.
let game = new Game();
let canvas = null;
let ctx = null;
var frame = 0;

/**
 * Function draws all the elements to the
 * frame.
 */
const draw = () => {
    // console.log("Draw frame" + frame++);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
}

/**
 * This main function is the function that kicks
 * off the application.
 */
const main = () => {
    // Kick off the frame drawing process.
    // This will cause the function "draw"
    // to be run every "milliseconds_per_frame".
    setInterval(draw, milliseconds_per_frame);
}

/**
 * Wait for elements to be drawn to the page prior to
 * creating the canvas handlers. Since this script is
 * called prior to the canvas being created, we need to
 * wait for the canvas to be drawn.
 */
window.addEventListener('load', function () {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    game.attachContext(ctx);
    game.start();
    main();
}, false);
