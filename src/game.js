// maps elements colors
var wall='#d0c5ad';  //x
var floor='#704b41';  //f
var water='#5d71a0';   //w
var enemy='#c60411';  //e

var map = [
    ['x', 'f', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'f', 'f', 'e', 'f', 'f', 'f', 'f', 'e', 'x'],
    ['x', 'f', 'f', 'f', 'x', 'f', 'x', 'e', 'f', 'x'],
    ['x', 'f', 'f', 'x', 'x', 'f', 'x', 'x', 'f', 'x'],
    ['x', 'e', 'f', 'f', 'f', 'f', 'f', 'x', 'f', 'x'],
    ['x', 'w', 'w', 'f', 'f', 'f', 'e', 'f', 'f', 'x'],
    ['x', 'w', 'f', 'x', 'f', 'x', 'x', 'x', 'f', 'x'],
    ['x', 'w', 'f', 'x', 'f', 'f', 'f', 'x', 'f', 'x'],
    ['x', 'f', 'f', 'x', 'f', 'f', 'f', 'x', 'f', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'f', 'x']
];

// player's position
var player = {
    x: 4,
    y: 3
};

function run() {
    // size between rectangles
    var gap = 2;

    // rectangles size
    var size = 10;

    // getting canvas
    var c = document.getElementById("gameCanvas");

    // adding event listeners to move player
    // http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    window.addEventListener('keydown', this.check, false);

    // to redraw in loop 
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 80);
        };
    })();

    // main loop
    (function animloop() {
        requestAnimFrame(animloop);

        // clear canvas
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);

        draw_map(c, map, size, 2);
        //console.log('draw');
    })();

}

// draw map, players, monsters, etc.

function draw_map(c, map, size, gap) {
    // draw map
    var color;
    for (var i = 0; i < map[0].length; ++i) {
        for (var j = 0; j < map[0].length; ++j) {
            if (map1[i][j] === 'x') {
                color = wall;
            } else if (map1[i][j] === 'w') {
                color = water;
            } else if (map1[i][j] === 'f') {
                color = floor;
            } else if (map1[i][j] === 'e') {
                color = enemy;
            }
            var ctx = c.getContext("2d");
            ctx.fillStyle = color;
            ctx.fillRect((gap + size) * i, (gap + size) * j, size, size);
        }
    }

    // draw player
    var ctx = c.getContext("2d");
    ctx.fillStyle = '#00FF00';
    ctx.fillRect((gap + size) * player.x, (gap + size) * player.y, size, size);
}

// keys and collision

function check(e) {
    console.log(e.keyCode);
    // 38 up
    if (e.keyCode === 38) {
        if (map[player.x][player.y - 1] !== 'o') {
            return;
        }
        player.y = player.y - 1;
        // 37 left
    } else if (e.keyCode === 37) {
        if (map[player.x - 1][player.y] !== 'o') {
            return;
        }
        player.x = player.x - 1;
        // 39 right
    } else if (e.keyCode === 39) {
        if (map[player.x + 1][player.y] !== 'o') {
            return;
        }
        player.x = player.x + 1;
        // 40 down
    } else if (e.keyCode === 40) {
        if (map[player.x][player.y + 1] !== 'o') {
            return;
        }
        player.y = player.y + 1;
    }
}