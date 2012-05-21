$(function() {

    var canvas = document.getElementById("playground");
    $(canvas).attr({width : screen.width, height: screen.height});
    var screenHeight = screen.height;
    var stage;
    var bitmap;
    var coin;

    var sprite = new Image();
    var wallpaper = new Image();

    function init() {

        // Prevent document scrolling
        $(document).on("touchmove", function(e) { e.preventDefault(); } );
        sprite.onload = handleImageLoad;
        sprite.onerror = handleImageError;
        sprite.src = "img/squirrel-sprite.png";

        // Define wallpaper
        wallpaper.src = "img/wallpaper1.jpg";
        wallpaper.style.width = screen.width;
        wallpaper.style.height = screen.height;
    }

    function reset() {
        stage.removeAllChildren();
        Ticker.removeAllListeners();
        stage.update();
    }

    function handleImageLoad(e) {
        startGame();
    }

    function startGame() {
        // create a new stage and point it at our canvas:
        stage = new Stage(canvas);

        // have each monster start at a specific frame
        bitmap = new Bitmap(sprite);
        bitmap.x = 0;
        bitmap.y = 0;
        bitmap.bounds = 30;
        bitmap.hit = bitmap.bounds;

        // First add a background
        var background = new Bitmap(wallpaper);
        background.scaleX = screen.width / wallpaper.width;
        background.scaleY = screen.width / wallpaper.height;
        stage.addChild(background);

        // Then add other elements
        coin = new Coin();
        stage.addChild(bitmap);
        stage.addChild(coin);

        // we want to do some work before we update the canvas,
        // otherwise we could use Ticker.addListener(stage);
        Ticker.addListener(window);
        Ticker.useRAF = true;
        Ticker.setFPS(30);
    }

    //called if there is an error loading the image (usually due to a 404)
    function handleImageError(e) {
        console.log("Error Loading Image : " + e.target.src);
    }

    window.tick = function() {

        // Hit testing the screen width, otherwise our bitmap would disappear
        if (bitmap.y >= screenHeight - sprite.height) {
            // We've reached the right side of our screen
            // We need to walk left now to go back to our initial position
            bitmap.direction = 0;
        }

        if (bitmap.y < 0) {
            // We've reached the left side of our screen
            // We need to walk right now
            bitmap.direction = 180;
        }

        // Moving the bitmap based on the direction & the speed
        if (bitmap.direction == 180) {
            bitmap.y += 2;
        }
        else {
            bitmap.y -= 2;
        }

        // update the stage:
        stage.update();
        coin.tick();

        // If we have a collision stop the ticker (end the game)
        if (coin.hitRadius(bitmap.x, bitmap.y, bitmap.hit)) {
            Ticker.removeListener(window);
            alert("Dude!!! You just got yourself 1000 Noogra coins!  Go spend it on booze and hoes...");
        }
    };

    // a flag for passing data between touchmove and touchend
    var moved = false;

    $("#playground").on({
        touchend : function(event) {

            // If there's exactly one finger inside this element
            if (event.originalEvent.changedTouches.length == 1) {
                var touch = event.originalEvent.changedTouches[0];

                if (!moved) {
                    // Place element where the finger is
                    bitmap.direction = (touch.pageY > bitmap.y) ? 180 : 0
                } else {
                    // reset flag
                    moved = false;
                }
            }
        },
        touchmove : function(event) {
            // If there's exactly one finger inside this element
            if (event.originalEvent.changedTouches.length == 1) {
                var touch = event.originalEvent.changedTouches[0];
                bitmap.y = touch.pageY;
            }
            moved = true;
        },
        mousedown : function(event) {
            bitmap.direction = (event.offsetY > bitmap.y) ? 180 : 0

            $(this).on("mousemove.canvas", function(event) {
                bitmap.y = event.offsetY;
            });
        },
        mouseup : function(event) {
            $(this).off("mousemove.canvas");
        }
    });
    // Bind left \ right arrows for desktops...
    $(document).keydown(function(event) {
        switch (event.keyCode) {
            case 37:
                bitmap.direction = 0;
                break;
            case 39:
                bitmap.direction = 180;
                break;
        }
    });

    init();
});