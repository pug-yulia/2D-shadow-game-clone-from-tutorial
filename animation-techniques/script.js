let playerState = 'idle';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(e){
    playerState = e.target.value;
})

const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d'); 
//create a reference to the 2D drawing context, which allows us to use its methods 
//and properties to draw graphics on the canvas
const canvas_width = canvas.width = 600;
const canvas_height = canvas.height = 600;

const playerImage = new Image(); //built in class
playerImage.src = 'shadow_dog_animation_speadsheet.png';
const spriteWidth = 575;
const spriteHeight = 523; //count those from speadsheet
//let frameX = 0;
//let frameY = 0;-- not needed anymore
let gameFrame = 0;
const staggerFrames = 5;

const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'gethit',
        frames: 4,
    }  
];
animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let i = 0; i < state.frames; i++) {
        let positionX = i * spriteHeight;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations[state.name] = frames;
})

function animate() {
    context.clearRect(0, 0, canvas_width, canvas_height); //pre defined funcion to clear the canvas
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
    //cycle through the frames of the sprite sheet animation in sequence,
    // displaying each frame for a certain duration to create the illusion of movement
    let frameX = spriteWidth * position;
    let  frameY = spriteAnimations[playerState].loc[position].y;
    //context.fillRect(50, 50, 100, 100); -- testing
    // method acceps 3 or 5 or 9 arguments
    //what to draw, rectangluar area to be cut out of src img (source), where to draw the cut oart on canvas
    //context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    context.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight); 
    //frameX * dogWidth, frameY * dogHeight - cycles through spreadhseet
    gameFrame++;
    requestAnimationFrame(animate); //runs a passed function once, hence a loop
}
animate();