function Player() {
    this.x = 1;
    this.y = 1;
    this.dy = 0;
    this.dx = 0;
    this.ai = 0;
    this.width = 64;
    this.height = 64;
    this.color = 0; // 0 RED, 1 BLUE, 2 ORANGE, 3 GREEN
    this.count = 0;
    this.speed = 0.06;
    this.facing = 0; // 0 UP, 1 DOWN, 2 LEFT, 3 RIGHT
    this.frameCount = 0;
    this.animateSpeed = 3;
}

var madePlayers = [];
var players = [];

Player.prototype.draw = function(ctx) {
    if (this.frameCount % 2) {
        ctx.drawImage(tiles, 160 + (this.facing * tilesize * 2), this.color * tilesize, tilesize, tilesize, this.x * tileDrawSize, this.y * tileDrawSize, tileDrawSize, tileDrawSize);
    } else {
        ctx.drawImage(tiles, 160 + (this.facing * tilesize * 2 + tilesize), this.color * tilesize, tilesize, tilesize, this.x * tileDrawSize, this.y * tileDrawSize, tileDrawSize, tileDrawSize);
    }
    this.count++;

    if (this.count % this.animateSpeed == 0) {
        this.frameCount++;
    }

    if (this.frameCount > 2) {
        this.frameCount = 0;
    }
}

Player.prototype.update = function(ctx) {
    if (!this.ai) {
        if (rightPressed) {
            this.dx = this.speed;
            this.facing = 3;
        } else if (leftPressed) {
            this.dx = -this.speed;
            this.facing = 2;
        } else if (downPressed) {
            this.dy = this.speed;
            this.facing = 1;
        } else if (upPressed) {
            this.dy = -this.speed;
            this.facing = 0;
        } else {
            this.dx = 0;
            this.dy = 0;
        }

    } else {

    }
    if (this.dy == 0) {
        this.x += this.dx;
    }
    if (this.dx == 0) {
        this.y += this.dy;
    }
}

function makePlayer(x, y, color, ai, facing, madePlayers) {
    var newPlayer = new Player();

    newPlayer.x = x;
    newPlayer.y = y;
    newPlayer.color = color;
    newPlayer.ai = ai;
    newPlayer.facing = facing;

    madePlayers.push(newPlayer);

    return madePlayers;
}

function makePlayers() {
    //                       x, y, color, ai, facing
    madePlayers = makePlayer(1, 1, 0, 0, 3, madePlayers);
    madePlayers = makePlayer(11, 1, 1, 0, 1, madePlayers);
    madePlayers = makePlayer(1, 11, 2, 0, 0, madePlayers);
    madePlayers = makePlayer(11, 11, 3, 0, 2, madePlayers);

    return madePlayers;
}

function drawPlayers(grid) {
    for (i = 0; i < players.length; i++) {
        players[i].draw(ctx);
        for (j = 0; j < grid.length; j++) {
            var block = grid[j];
            if (block.collide != 0) {
                var dir = colCheck(players[i], block);
            }
        }
    }
}

function updatePlayers() {
    for (i = 0; i < players.length; i++) {
        players[i].update(ctx);
    }
}
