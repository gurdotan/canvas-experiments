$(function() {

    // JS templates
    var itemTemplate = Handlebars.compile($("#item-template").html());

    // Define Backbone models
    var Item = Backbone.Model.extend({});
    var ItemCollection = Backbone.Collection.extend({
        model : Item
    });

    var ItemView = Backbone.View.extend({
        className : "item",
        render : function() {
            var html = itemTemplate({   title: this.model.get("title"),
                                        price : this.model.get("price"),
                                        img : this.model.get("img"),
                                        description : this.model.get("description")
                                    });
            this.$el.html(html);
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
        {title : "Colombo", price : "20.00$", img : "colombo.jpg", description : "Build stamina on each critter you capture."},
        {title : "Fireflower", price : "15.00$", img : "fireflower.jpg", description : "Shoot enemies with the powerful flower stinger."},
        {title : "Gloo-Boy", price : "16.00$", img : "glooboy.png", description : "Get ultra sticky feet for climbing those high branches."},
        {title : "Jimbakoo", price : "19.00$", img : "jimbakoo.jpg", description : "Transform yourself to another random gecko."},
        {title : "VelociDude", price : "20.00$", img : "velocidude.jpg", description : "Run like the wind with speed bursts."},
        {title : "Zeebster", price : "15.00$", img : "zeebster.jpg", description : "Hide from snakes when crawling in the bush."},
        {title : "Forester", price : "16.00$", img : "forester.jpg", description : "Camouflage yourself in the wake of jungle enemies"},
        {title : "Geckstock", price : "16.00$", img : "geckstock.jpg", description : "Sooth your enemies to sleep with a groovy sixties look."},
        {title : "Tugalu", price : "16.00$", img : "tugalu.png", description : "Gain treetop elevation with huge jumps."}
    ];

    var itemCollection = new ItemCollection(items);
    new ItemCollectionView({el : $("#item-group"), collection : itemCollection}).render();
});
