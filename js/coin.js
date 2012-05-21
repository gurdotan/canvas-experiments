(function(window) {
    function Coin() {
        this.initialize();
    }

    var sprite = new Image();
//    sprite.onload = handleImageLoad;
    sprite.onerror = function(){alert("Error loading image")};
    sprite.src = "img/coin.png";

    Coin.prototype = new Bitmap(sprite);
    _.extend(Coin.prototype, {

        initialize : function() {
            this.x = screen.width -50;
            this.y = 0;
            this.direction = -90;
        },
        delta : screen.width / (3 * 60),  // 3 seconds @ 60fps
        hit : 0,
        hitPoint : function (tX, tY) {
            return this.hitRadius(tX, tY, 0);
        },
        hitRadius : function (tX, tY, tHit) {
            //early returns speed it up
            if (tX - tHit > this.x + this.hit) { return; }
            if (tX + tHit < this.x - this.hit) { return; }
            if (tY - tHit > this.y + this.hit) { return; }
            if (tY + tHit < this.y - this.hit) { return; }

            //now do the circle distance test
            return this.hit + tHit > Math.sqrt(Math.pow(Math.abs(this.x - tX), 2) + Math.pow(Math.abs(this.y - tY), 2));
        },

        tick : function() {
            this.x -= this.delta ;
        }
    });

    window.Coin = Coin;
})(window);