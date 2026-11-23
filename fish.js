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

// fish images array
let fishTypes = ['./fish_images/blue_fish.png',
    './fish_images/nemo.png'
]

let fishImages = []
let loadedCount = 0

fishTypes.forEach(path => {
    let img = new Image()
    img.addEventListener('load', () => {
        loadedCount++
        if (loadedCount === fishTypes.length) {
            animate()
        }
    })
    img.src = path
    fishImages.push(img)

});

// select random fish img from array
let randomFishPicker = () => fishImages[Math.floor(Math.random() * fishImages.length)]



var shift = 0
var frameWidth = 16
var frameHeight = 16
var totalFrames = 4
var currentFrame = 0

// animation speed
var frameCounter = 0 

// TODO: randomize fish positions 

var fishes = [
    { x: 0, y: 0, speed: 8, img: randomFishPicker()},
    {x: 20, y: 100, speed: 4, img: randomFishPicker()},
    { x: 50, y: 330, speed: 5, img: randomFishPicker()},
    { x: 150, y: 200, speed: 1.5, img: randomFishPicker() },
    {x: 190, y: 550, speed: 3.2, img: randomFishPicker()},
    {x: 220, y: 880, speed: 3, img: randomFishPicker()},
    { x: 300, y: 450, speed: 1, img: randomFishPicker()},
    {x: 90, y: 650, speed: 2.5, img: randomFishPicker()},
    { x: 450, y: 300, speed: 2.8, img: randomFishPicker()},
    {x: 500, y: 400, speed: 7, img: randomFishPicker()},
    {x: 800, y: 730, speed: 3, img: randomFishPicker()}
]

animate = () => {
    // clear the are where fish will be drawn
    context.clearRect(0, 0, canvas.width, canvas.height)

    // draw all fish and enlargen to 32x32 px
    fishes.forEach(fish => {

    // true for the sprite that needs to be mirrored
    let flipped = fish.img === fishImages[0]

    context.save();
    // move the origin of the fish to the right edge (prepare for flipping it)
    // (a flipped sprite is drawn to the left of the origin, so shift by its 64px width)
    context.translate(fish.x + (flipped ? 64 : 0), fish.y);
    // flip horizontally
    if (flipped) { 
        context.scale(-1, 1)
    }
    context.drawImage(
        fish.img,
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