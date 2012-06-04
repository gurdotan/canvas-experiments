(function(window) {
    function Coin() {
        this.initialize();
    }

    var sprite = new Image();
//    sprite.onload = handleImageLoad;
    sprite.onerror = function(){alert("Error loading image")};
    sprite.src = "img/coin.png";

    Coin.prototype = new Bitmap(sprite);
    Coin.prototype.initialize = function() {
        this.x = 100;
        this.y = 100;
        this.direction = 90;

    };

    Coin.prototype.tick = function() {
        this.x += 10;
    };
    window.Coin = Coin;
})(window);