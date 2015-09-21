"use strict";

{
    var Chara = function() {
        this.charaChip_ = null;
        this.chipSize_ = 0;
        this.x_ = 0;
        this.y_ = 0;
        this.px_ = 0;
        this.py_ = 0;
        this.animCount_ = 0;
        this.animIndex_ = 0;
        this.direction_ = 0;
        this.movingLength_ = 0;
        this.route_ = null;
        this.influenceMap_ = null;
    };
    Chara.DIR_FRONT = 0;
    Chara.DIR_LEFT  = 1;
    Chara.DIR_RIGHT = 2;
    Chara.DIR_BACK  = 3;
    Chara.SPEED = 4;
    
    Chara.prototype = {
        create: function(image, size) {
            this.charaChip_ = image;
            this.chipSize_ = size;
        },
        put: function(x, y) {
            this.x_ = x;
            this.y_ = y;
            this.px_ = this.x_ * this.chipSize_;
            this.py_ = this.y_ * this.chipSize_;
            this.direction_ = Chara.DIR_FRONT;
        },
        update: function() {
            if (this.animCount_++ > 10) {
                this.animIndex_ = (this.animIndex_ === 0) ? 2 : 0;
                this.animCount_ = 0;
            }
            if (this.movingLength_ > 0) {
                this.movingLength_ -= Chara.SPEED;
                if (this.movingLength_ <= 0) {
                    this.movingLength_ = 0;
                }
                switch (this.direction_) {
                case Chara.DIR_FRONT:
                    this.py_ += Chara.SPEED;
                    if (this.movingLength_ === 0) {
                        ++this.y_;
                        this.py_ = this.y_ * this.chipSize_;
                    }
                    break;
                case Chara.DIR_LEFT:
                    this.px_ -= Chara.SPEED;
                    if (this.movingLength_ === 0) {
                        --this.x_;
                        this.px_ = this.x_ * this.chipSize_;
                    }
                    break;
                case Chara.DIR_RIGHT:
                    this.px_ += Chara.SPEED;
                    if (this.movingLength_ === 0) {
                        ++this.x_;
                        this.px_ = this.x_ * this.chipSize_;
                    }
                    break;
                case Chara.DIR_BACK:
                    this.py_ -= Chara.SPEED;
                    if (this.movingLength_ === 0) {
                        --this.y_;
                        this.py_ = this.y_ * this.chipSize_;
                    }
                    break;
                }
            } else if (this.route_ !== null) {
                for (let i = 0; i < this.route_.length; i++) {
                    if (this.route_[i].x === this.x_ && this.route_[i].y === this.y_) {
                        if (i === 0) {
                           return true;
                        }
                        if (this.route_[i - 1].x !== this.x_) {
                            if (this.route_[i - 1].x < this.x_) {
                                this.move(Chara.DIR_LEFT);
                            } else {
                                this.move(Chara.DIR_RIGHT);
                            }
                        } else if (this.route_[i - 1].y !== this.y_) {
                            if (this.route_[i - 1].y < this.y_) {
                                this.move(Chara.DIR_BACK);
                            } else {
                                this.move(Chara.DIR_FRONT);
                            }
                        }
                        break;
                    }
                }
            } else if (this.influenceMap_ !== null) {
                let xx = [0, -1, 1, 0], yy = [1, 0, 0, -1];
                for (let i = 0; i < 4; i++) {
                    let current = this.influenceMap_[this.y_][this.x_];
                    if (current < this.influenceMap_[this.y_ + yy[i]][this.x_ + xx[i]]) {
                        this.move(i);
                        break;
                    }
                }
                if (this.movingLength_ === 0) {
                    return true;
                }
            }
            return false;
        },
        move: function(dir) {
            if (this.movingLength_ !== 0) {
                return false;
            }
            this.moving = true;
            this.movingLength_ = this.chipSize_;
            this.direction_ = dir;
            return true;
        },
        trace: function(route) {
            this.route_ = route;
        },
        setInfluence: function(map) {
            this.influenceMap_ = map;
        },
        getX: function() {
            return this.x_;
        },
        getY: function() {
            return this.y_;
        },
        draw: function(context) {
            context.drawImage(this.charaChip_, 
                this.animIndex_ * this.chipSize_, this.direction_ * this.chipSize_, this.chipSize_, this.chipSize_,
                this.px_, this.py_, this.chipSize_, this.chipSize_
            );
        }
    };
}
