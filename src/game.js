// maps elements colors
var wall='#d0c5ad';  //x
var floor='#704b41';  //f
var water='#5d71a0';   //w
var enemy='#c60411';  //e not used
var treasure='#FFCC11';  //t
var przesuniecieX = 0,
    przesuniecieY = 0,
    oknoEkranuWidth = 15,
    oknoEkranuHeight = 15;
	var canvas, context;
	
	
var map = [
    ['x', 'f', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'x', 'x', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 't', 'x'],
    ['x', 'f', 'f', 'f', 'x', 'f', 'f', 'f', 'f', 'x', 'x', 'f', 'x', 'f', 'f', 'x', 'f', 'f', 'f', 'x'],
    ['x', 'f', 'f', 'x', 'x', 'f', 'x', 'x', 'f', 'x', 'x', 'f', 'x', 'f', 'f', 'x', 'x', 'f', 'f', 'x'],
    ['x', 'f', 'f', 'f', 'f', 'f', 'f', 'x', 'f', 'x', 'x', 'f', 'x', 'w', 'w', 'w', 'x', 'f', 'f', 'x'],
    ['x', 'w', 'w', 'f', 'f', 'f', 'f', 'f', 'f', 'x', 'x', 'f', 'x', 'w', 'f', 'w', 'x', 'f', 'f', 'x'],
    ['x', 'w', 'f', 'f', 'f', 'x', 'x', 'x', 'f', 'x', 'x', 'f', 'x', 'f', 't', 'x', 'x', 'f', 'f', 'x'],
    ['x', 'w', 'f', 'x', 'f', 'f', 'f', 'x', 'f', 'x', 'x', 'f', 'x', 'x', 'x', 'x', 'f', 'f', 'f', 'x'],
    ['x', 'f', 'f', 'x', 'f', 'f', 'f', 'x', 'f', 'x', 'x', 'f', 'x', 'x', 'f', 'f', 'f', 'f', 'f', 'x'],
    ['x', 'f', 'f', 'x', 'f', 'f', 'f', 'x', 'f', 'f', 'f', 'f', 'x', 'x', 'f', 'f', 'f', 'f', 'f', 'x'],
	['x', 't', 'x', 'x', 'x', 'x', 'x', 'x', 'f', 'f', 'f', 'f', 'x', 'x', 'f', 'x', 'f', 'f', 'f', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'f', 'f', 'x', 'x', 'f', 'x', 'x', 'f', 'x', 'f', 'f', 'f', 'x'],
    ['x', 'x', 'x', 'f', 'f', 'f', 'f', 'f', 'f', 'x', 'f', 'f', 'f', 'f', 'f', 'x', 'f', 'f', 'f', 'x'],
    ['x', 'x', 'x', 'w', 'w', 'w', 'w', 'w', 'x', 'x', 'f', 'x', 'f', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'w', 'w', 'w', 'w', 'w', 'x', 'x', 'f', 'x', 'f', 'x', 'w', 'w', 'w', 'w', 'w', 'x'],
    ['x', 'f', 'f', 'f', 'w', 'f', 'w', 'w', 'f', 'x', 'f', 'x', 'f', 'x', 'f', 'x', 'x', 'x', 'w', 'x'],
    ['x', 'f', 'f', 'f', 'w', 'w', 'w', 'w', 'f', 'x', 't', 'x', 'f', 'x', 'f', 'x', 'w', 'w', 'w', 'x'],
    ['x', 'f', 'f', 'x', 'x', 'x', 'f', 'f', 'f', 'x', 'f', 'x', 'f', 'x', 'f', 'x', 'w', 'x', 'x', 'x'],
    ['x', 'f', 'f', 't', 'x', 'x', 'f', 'f', 'f', 'f', 'f', 'x', 'f', 'f', 'f', 'x', 'w', 'w', 'w', 'x'],
	['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'w', 'x']
];

var mapIloscKafelekWidth = map[0].length,
    mapIloscKafelekHeight = map[0].length;

// player's position
var player = {
    x: 4,
    y: 3
};

function run() {
    // size between rectangles
    var gap = 2;

    // rectangles size
    var rectanglesSize = 10;

    // getting canvas
    canvas = document.getElementById("gameCanvas");
    context = canvas.getContext("2d"); // !
	    canvas.focus(); // !
    // adding event listeners to move player
    // http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    window.addEventListener('keydown', this.check, false);
	
	canvas.width = 250;
    canvas.height = 250;

    // to redraw in loop 
   window.requestAnimFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 80);
        };
    })();

    // main loop
    (function animloop() {
        

        // clear canvas
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        draw_map(canvas, map, rectanglesSize, 2, context);
		requestAnimFrame(animloop);
        //console.log('draw');
    })();
	//animloop();

}

// draw map, players, monsters, etc.

function draw_map(canvas, map, rectanglesSize, gap, context) {
    // draw map
	 context.clearRect(0,0,canvas.width, canvas.height);
    var color;
	
	przesuniecieX = Math.floor(player.x - Math.floor(0.5 * oknoEkranuWidth));
        if (przesuniecieX < 0) przesuniecieX = 0;
        if (przesuniecieX+oknoEkranuWidth > mapIloscKafelekWidth) przesuniecieX = mapIloscKafelekWidth - oknoEkranuWidth;
        
        
        przesuniecieY = Math.floor(player.y - Math.floor(0.5 * oknoEkranuHeight));
        if (przesuniecieY < 0) przesuniecieY = 0;
        if (przesuniecieY+oknoEkranuHeight > mapIloscKafelekHeight) przesuniecieY = mapIloscKafelekHeight - oknoEkranuHeight;
        
	
    for (var j = 0 + przesuniecieY; j < oknoEkranuHeight + przesuniecieY; ++j) {
        for (var i = 0 + przesuniecieX; i < oknoEkranuWidth + przesuniecieX; ++i) {
            if (map[i][j] === 'x') {
                color = wall;
            } else if (map[i][j] === 'w') {
                color = water;
            } else if (map[i][j] === 'f') {
                color = floor;
            } else if (map[i][j] === 'e') {
                color = enemy;
            } else if (map[i][j] === 't') {
                color = treasure;
            }
   //         var ctx = canvas.getContext("2d");
            context.fillStyle = color;
            context.fillRect((gap + rectanglesSize) * (i-przesuniecieX), (gap + rectanglesSize) * (j-przesuniecieY), rectanglesSize, rectanglesSize);
        }
    }

    // draw player
//var ctx = canvas.getContext("2d");
    context.fillStyle = '#00FF00';
    context.fillRect((gap + rectanglesSize) * (player.x-przesuniecieX), (gap + rectanglesSize) * (player.y-przesuniecieY), rectanglesSize, rectanglesSize);
}
/*
function draw() {
        context.clearRect(0,0,canvas.width, canvas.height);
        for (y = 0; y <= oknoEkranuHeight; y++) {
            for (x = 0; x <= oknoEkranuWidth; x++) {
                theX = x * 32;
                theY = y * 32;
                context.drawImage(tiles, theX, theY, 32, 32);
            }
        }
        context.fillStyle = 'red';
        context.fillRect((player.x-przesuniecieX)*32, (player.y-przesuniecieY)*32, 32, 32);
    }
});*/
// keys and collision

function check(e) {
    console.log(e.keyCode);
    // 38 up
    if (e.keyCode === 38) {
        if (map[player.x][player.y - 1] === 'x') {
            return;
        }
        player.y = player.y - 1;
        // 37 left
    } else if (e.keyCode === 37) {
        if (map[player.x - 1][player.y] === 'x') {
            return;
        }
        player.x = player.x - 1;
        // 39 right
    } else if (e.keyCode === 39) {
        if (map[player.x + 1][player.y] === 'x') {
            return;
        }
        player.x = player.x + 1;
        // 40 down
    } else if (e.keyCode === 40) {
        if (map[player.x][player.y + 1] === 'x') {
            return;
        }
        player.y = player.y + 1;
    }
	
	
        
      //  draw();
}
