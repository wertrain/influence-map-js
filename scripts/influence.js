"use strict";

{
    var InfluenceMap = function() {
        this.map_ = null;
        this.maxScore_ = 0;
    };

    InfluenceMap.prototype = {
        setScoredMap: function(map) {
            this.map_ = new Array(map.length);
            for (let i = 0; i < map.length; i++) {
                this.map_[i] = new Array(map[i].length);
                for (let j = 0; j < map[i].length; j++) {
                    this.map_[i][j] = map[i][j];
                    this.maxScore_ = Math.max(this.maxScore_, map[i][j]);
                }
            }
        },
        normalize: function() {
            if (this.map_ === null) {
                return false;
            }
            for (let i = 0; i < this.map_.length; i++) {
                 for (let j = 0; j < this.map_[i].length; j++) {
                    if (this.map_[i][j] === -1) {
                        continue;
                    }
                    this.map_[i][j] = this.map_[i][j] / this.maxScore_;
                }
            }
            this.maxScore_ = 1.0;
            return true;
        },
        inverse: function() {
            if (this.map_ === null) {
                return false;
            }
            for (let i = 0; i < this.map_.length; i++) {
                 for (let j = 0; j < this.map_[i].length; j++) {
                    if (this.map_[i][j] === -1) {
                        continue;
                    }
                    this.map_[i][j] = this.maxScore_ - this.map_[i][j];
                }
            }
            return true;
        },
        mix: function(influenceMap) {
            if (this.map_ === null) {
                this.setScoredMap(influenceMap.map_);
                return;
            }
            for (let i = 0; i < this.map_.length; i++) {
                 for (let j = 0; j < this.map_[i].length; j++) {
                    this.map_[i][j] = Math.min(this.map_[i][j], influenceMap.map_[i][j]);
                    this.maxScore_ = Math.max(this.maxScore_, this.map_[i][j]);
                }
            }
        },
        getArray: function() {
            return this.map_;
        },
        getLinear_: function(min, mid, max, num, diff) {
            let dm = (diff / 2);
            let l = (num <= dm) ? 
                min + (mid - min) * (num / dm) : 
                mid + (max - mid) * ((num - dm) / dm);
            return Math.round(l);
        },
        draw: function(context, chipSize) {
            if (this.map_ === null) {
                return;
            }
            for (let i = 0; i < this.map_.length; i++) {
                for (let j = 0; j < this.map_[i].length; j++) {
                    if (this.map_[i][j] === -1) {
                        continue;
                    }
                    var score = String(Math.round(this.map_[i][j] * 100 ) / 100);
                    context.beginPath();
                    context.fillStyle = 'rgba(' + 
                        this.getLinear_(255, 230,   0, this.map_[i][j], 1.0) + ', ' +
                        this.getLinear_(  0, 230,   0, this.map_[i][j], 1.0) + ', ' + 
                        this.getLinear_(  0,  32, 255, this.map_[i][j], 1.0) + ', 1.0)';
                    context.fillRect(j * chipSize, i * chipSize, chipSize, chipSize);
                    context.font = '8px Georgia';
                    context.fillStyle = 'rgba(0, 0, 0, 1.0)';
                    context.fillText(score, j * chipSize + 6, i * chipSize + 18);
                }
            }
        },
    };
}
