$(function() {

    // Define Backbone models
    var Item = Backbone.Model.extend({});
    var ItemCollection = Backbone.Collection.extend({
        model : Item
    });

    var ItemView = Backbone.View.extend({
        className : "item",
        render : function() {
            this.$el.html("<h1>" + this.model.get("title") + "</h1>" + "<h3>Price : " + this.model.get("price") + "</h3>");
            return this;
        }
    });

    var ItemCollectionView = Backbone.View.extend({
        initialize : function() {
            this.collection.on("reset", this.render);
            this.currentTranslateX = 0;
        },
/*
        events : {
            "touchstart" : function(event) {
                if (event.originalEvent.targetTouches.length == 1) {
                    this.anchorTouchX = event.originalEvent.targetTouches[0].pageX;
                }

            },
            "touchmove" : function(event) {
                event.preventDefault();
//                alert(event.originalEvent.touches);
                  // If there's exactly one finger inside this element
               if (event.originalEvent.changedTouches.length == 1) {
                    var touch = event.originalEvent.targetTouches[0];

                   // Division by 8 to slow the unwanted speedy with brute force
                   var translateX = this.currentTranslateX + (touch.pageX - this.anchorTouchX)/8;

                   // Put 240 hardcoded, because the width of each item container
                   // was calculated to 100 instead of 200 for some reason
                   var maxTranslate = (this.collection.length * 240) - screen.width;

                   if (translateX <= 0 && translateX >= -maxTranslate) {
                       // Place element where the finger is
//                   alert("Current: " + this.currentTranslateX + ", Touch start: " + this.anchorTouchX + ", Touch move: " + touch.pageX);
                       this.$el.css("-webkit-transform", "translateX(" + translateX + "px)");
                       this.currentTranslateX = translateX;
                   }
                }
            }
        },
*/
        render : function() {
            var $this = this;
            this.collection.each(function(item) {
                $this.$el.append(new ItemView({model : item}).render().el);
            });
            return this;
        }
    })

    var items = [
        {title : "Pink hat", price : "20.00$"},
        {title : "Yellow hat", price : "15.00$"},
        {title : "Red hat", price : "16.00$"},
        {title : "Green hat", price : "19.00$"},
        {title : "Pink hat", price : "20.00$"},
        {title : "Yellow hat", price : "15.00$"},
        {title : "Red hat", price : "16.00$"},
        {title : "Green hat", price : "19.00$"}
    ];

    var itemCollection = new ItemCollection(items);
    new ItemCollectionView({el : $("#item-group"), collection : itemCollection}).render();
});
