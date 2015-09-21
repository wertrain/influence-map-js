"use strict";

{
    var Item = function() {
        this.itemChip_ = null;
        this.chipSize_ = 0;
        this.x_ = 0;
        this.y_ = 0;
        this.px_ = 0;
        this.py_ = 0;
    };

    Item.prototype = {
        create: function(image, size) {
            this.itemChip_ = image;
            this.chipSize_ = size;
        },
        put: function(x, y) {
            this.x_ = x;
            this.y_ = y;
            this.px_ = this.x_ * this.chipSize_;
            this.py_ = this.y_ * this.chipSize_;
        },
        isHit: function(x, y) {
            return (this.x_ === x && this.y_ === y);
        },
        getX: function() {
            return this.x_;
        },
        getY: function() {
            return this.y_;
        },
        draw: function(context) {
            context.drawImage(this.itemChip_, 
                0, 0, this.chipSize_, this.chipSize_,
                this.px_, this.py_, this.chipSize_, this.chipSize_
            );
        }
    };
}
