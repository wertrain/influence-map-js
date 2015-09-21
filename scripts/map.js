"use strict";

{
    var defaultMap = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1], 
        [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1], 
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1], 
        [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1], 
        [1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1], 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
    ];
    
    var Map = function() {
        this.map_ = null;
        this.mapChip_ = null;
        this.chipSize_ = 0;
    };

    Map.prototype = {
        create: function(image, size, map) {
            this.mapChip_ = image;
            this.chipSize_ = size;
            if (typeof map == 'undefined') {
                this.map_ = defaultMap;
            }
        },
        draw: function(context) {
            for (let i = 0; i < this.map_.length; i++) {
                for (let j = 0; j < this.map_[i].length; j++) {
                    let index = this.map_[i][j];
                    context.drawImage(this.mapChip_, 
                        index * this.chipSize_, 0, this.chipSize_, this.chipSize_,
                        j * this.chipSize_, i * this.chipSize_, this.chipSize_, this.chipSize_
                    );
                }
            }
        },
        getArray: function() {
            return this.map_;
        },
        isHit: function(x, y) {
            return this.map_[y][x] !== 0;
        },
        getWidth: function(index) {
            let i = index;
            if (typeof index === 'undefined') {
                i = 0;
            }
            return this.map_[i].length;
        },
        getHeight: function() {
            return this.map_.length;
        }
    };
}
