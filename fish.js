var canvas = document.getElementById('pondCanvas')
// defines drawing context
var context = canvas.getContext('2d')

function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    // retains the pixels' sharpness when false
    // (when enlarging imgs, the default resizing algo will blur the pixels)
    context.imageSmoothingEnabled = false
}
resizeCanvas()
window.addEventListener('resize', resizeCanvas)


// load fish sprite sheet
var img = new Image()
img.src = 'fish_sheet.png'

img.addEventListener('load', loadImage, false)
// once img is loaded, call animate()
function loadImage(e) {
    animate()
}

var shift = 0
var frameWidth = 16
var frameHeight = 16
var totalFrames = 4
var currentFrame = 0

// animation speed
var frameCounter = 0 

// TODO: randomize fish amount and positions 
// TODO: add more types of fish
// research about their speed in real life
var fishes = [
    { x: 0, y: 0, speed: 8},
    {x: 20, y: 100, speed: 4},
    { x: 50, y: 330, speed: 5},
    { x: 150, y: 200, speed: 1.5 },
    {x: 190, y: 550, speed: 3.2},
    {x: 220, y: 880, speed: 3},
    { x: 300, y: 450, speed: 1 },
    {x: 90, y: 650, speed: 2.5},
    { x: 450, y: 300, speed: 2.8},
    {x: 500, y: 400, speed: 7},
    {x: 800, y: 730, speed: 3}
]

animate = () => {
    // clear the are where fish will be drawn
    context.clearRect(0, 0, canvas.width, canvas.height)

    // draw all fish and enlargen to 32x32 px
    fishes.forEach(fish => {

    context.save();
    // move the origin of the fish to the right edge (prepare for flipping it)
    context.translate(fish.x + 32, fish.y);
    // flip horizontally
    context.scale(-1, 1);
    context.drawImage(
        img,
        shift, 0, frameWidth, frameHeight,
        0, 0, 64, 64
    );

context.restore();

    })


    // advance animation every 10 frames
    frameCounter++

    if (frameCounter >= 10) {
        shift += frameWidth
        currentFrame++
        frameCounter=0
    }

    // start at the beginning if at the end of sprite sheet
    if (currentFrame == totalFrames) {
        shift = 0
        currentFrame = 0
    }

   // move fish

   fishes.forEach(fish => {

    fish.x += fish.speed

    if (fish.x > canvas.width) {
        fish.x = -64
    }

})

    requestAnimationFrame(animate)
}



