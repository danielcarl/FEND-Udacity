
/*
    Enemies our player must avoid
*/
var Enemy = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.row = this.setRow();
    this.speed = this.setSpeed();
    this.x = -100;                                              // Starting location is offset by -100 so that enemies start offscreen
    this.y = (this.row * 83) - 25;                              // Added -50 offset to the y coordinate to better align enemies with street lanes
};

/*
    Sets a random starting speed for the enemy object
    Random number generator based on code sample found at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/
Enemy.prototype.setSpeed = function() {
    var newSpeed = Math.floor(Math.random() * (6 - 1)) + 1;     // sets the speed to a random number between 1 (slow) and 5 (fast)
    newSpeed = newSpeed * 50;                                   // assign the result to the current Enemy object with a multiplier to make the speed difference more noticible!
    return newSpeed;
};

/*
    Sets a random starting row for the enemy object
*/
Enemy.prototype.setRow = function() {
    var newRow = Math.floor(Math.random() * (4 - 1)) + 1;       // set the starting row to a random number between 1 and 3
    return newRow;                                              // asign the result to the current Enemy object
};

/*
    Update the enemy's position, required method for game
    Parameter: dt, a time delta between ticks
*/
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 606) {                                         // if the enemy goes off the right side of the screen...
        this.x = -100;                                          // respawn at the left,
        this.y = (this.setRow() * 83) - 25;                     // choose a new row at random,
        this.speed = this.setSpeed();                           // and choose a new speed at random
    }
    this.x = this.x + (this.speed * dt);
};

/*
    Draw the enemy on the screen, required method for game
*/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
    Now write your own player class
    This class requires an update(), render() and
    a handleInput() method.
*/
var Player = function() {
    var playerStartLocationX = 202;
    var playerStartLocationY = 390;
    this.sprite = 'images/char-boy.png';
    this.x = playerStartLocationX;
    this.y = playerStartLocationY;
};

/*
    Update player's position.
    NOTE: Player movement is handled via the handleInput method, so this function is currently a pass-through.
    However, I may add some additional functionality in the future, so I'm leaving it in place.
    Parameter: dt, a delta between clicks.
*/
Player.prototype.update = function(dt) {
    this.x = this.x;
    this.y = this.y;
};

/*
    Draw the player on the screen.
*/
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
    Handle player input. Also updates player's position and prevents movement beyond the boundaries of the game screen.
    Parameter: keyPress, an allowed key pressed by the player (UP, DOWN, LEFT, RIGHT).
*/
Player.prototype.handleInput = function(keyPress) {
    if(keyPress === 'left') {
        // prevents player from going past the left border of the game screen
        if (this.x <= 0) {
            this.x = 0;
        } else {
            this.x = this.x - 101;
        }
    }
    if(keyPress === 'right') {
        // prevents player from going past the right border of the game screen
        if (this.x >= 404) {
            this.x = 404;
        } else {
            this.x = this.x + 101;
        }
    }
    if(keyPress === 'up') {
        // if the player reaches the top, respawn at starting position
        if (this.y <= 108) {
            this.y = 390;
            this.x = 202;
        } else {
            this.y = this.y - 83;
        }
    }
    if(keyPress === 'down') {
        // prevents player from going past the bottom border of the game screen
        if (this.y >= 390) {
            this.y = 390;
        } else {
            this.y = this.y + 83;
        }
    }
};

/*
    Player.prototype.checkCollisions loops through each enemy in allEnemies and compares the location to the player's current location
    NOTE: this is based off a collision detection algorythm found at https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
*/
Player.prototype.checkCollisions = function() {
    for(var enemy in allEnemies) {
        if(this.x < (allEnemies[enemy].x + 75) &&           // if the player.x is left of current enemy.x + 75 (offset to align with visible image), and
           this.y < (allEnemies[enemy].y + 83) &&           // player.y is above current enemy.y + 83 (offset to align with visible image), and
           (this.x + 50) > allEnemies[enemy].x &&           // player.x + 50 to the right of current enemy.x (offset to align with visible image), and
           (this.y + 83) > allEnemies[enemy].y) {           // player.y + 83 is below current enemy.y (offset to align with vislbe image), then
            this.x = 202;                                   // collision detected; respawn player at starting location
            this.y = 390;
        }
    }
};

/*
    Now instantiate your objects.
    Place all enemy objects in an array called allEnemies
    Place the player object in a variable called player
*/
var enemyOne = new Enemy();
var enemyTwo = new Enemy();
var enemyThree = new Enemy();
var allEnemies = [enemyOne, enemyTwo, enemyThree];
var player = new Player();

/*
    This listens for key presses and sends the keys to your
    Player.handleInput() method. You don't need to modify this.
*/
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
