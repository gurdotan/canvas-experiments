$(function() {

    var canvas = document.getElementById("playground");
    var stage;
    var screen_width;
    var screen_height;
    var bmpAnimation;
    var bitmap;

    var sprite = new Image();

    function init() {

        // Prevent document scrolling
        $(document).on("touchmove", function(e) { e.preventDefault(); } );
        sprite.onload = handleImageLoad;
        sprite.onerror = handleImageError;
        sprite.src = "img/squirrel-sprite.png";
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
    //    canvas.addEventListener("touchstart", function(){alert("touch started");}, false);
    //    $(canvas).on("touchstart", function(){alert("touch started");});
    //    $(canvas).on("touchend", function(){alert("touch end");});
    //    $(canvas).on("touchmove", function(){alert("touch move");});

        // grab canvas width and height for later calculations:
        screen_width = canvas.width;
        screen_height = canvas.height;

        // create spritesheet and assign the associated data.
        var spriteSheet = new SpriteSheet({
            // image to use
            images: [sprite],
            // width, height & registration point of each sprite
            frames: {width: 64, height: 64, regX: 32, regY: 32},
            animations: {
                walk: [0, "walk"]
            }
        });

        // create a BitmapAnimation instance to display and play back the sprite sheet:
    //    bmpAnimation = new BitmapAnimation(spriteSheet);

        // start playing the first sequence:
    //    bmpAnimation.gotoAndPlay("walk"); 	//animate

        // set up a shadow. Note that shadows are ridiculously expensive. You could display hundreds
        // of animated rats if you disabled the shadow.
    //    bmpAnimation.shadow = new Shadow("#454", 0, 5, 4);

    //    bmpAnimation.name = "monster1";
    //    bmpAnimation.direction = 90;
    //    bmpAnimation.vX = 4;
    //    bmpAnimation.x = 16;
    //    bmpAnimation.y = 32;

        // have each monster start at a specific frame
    //    bmpAnimation.currentFrame = 0;
        bitmap = new Bitmap(sprite);
        bitmap.x = 0;
        bitmap.y = 0;

        stage.addChild(bitmap);

        // we want to do some work before we update the canvas,
        // otherwise we could use Ticker.addListener(stage);
        Ticker.addListener(window);
        Ticker.useRAF = true;
        // Best Framerate targeted (60 FPS)
        Ticker.setFPS(60);
    }

    //called if there is an error loading the image (usually due to a 404)
    function handleImageError(e) {
        console.log("Error Loading Image : " + e.target.src);
    }

    window.tick = function() {

        // Hit testing the screen width, otherwise our bitmap would disappear
        if (bitmap.x >= screen_width - sprite.width) {
            // We've reached the right side of our screen
            // We need to walk left now to go back to our initial position
            bitmap.direction = -90;
        }

        if (bitmap.x < 0) {
            // We've reached the left side of our screen
            // We need to walk right now
            bitmap.direction = 90;
        }

        // Moving the bitmap based on the direction & the speed
        if (bitmap.direction == 90) {
            bitmap.x += 2;
        }
        else {
            bitmap.x -= 2;
        }

        // update the stage:
        stage.update();
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
                    bitmap.direction = (touch.pageX > bitmap.x) ? 90 : -90
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
                bitmap.x = touch.pageX;
            }
            moved = true;
        },
        mousedown : function(event) {
            bitmap.direction = (event.offsetX > bitmap.x) ? 90 : -90

            $(this).on("mousemove.canvas", function(event) {
                bitmap.x = event.offsetX;
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
                bitmap.direction = -90;
                break;
            case 39:
                bitmap.direction = 90;
                break;
        }
    });

    init();
});