"use strict";

{
    let Node = function(x, y, type) {
        this.score = Number.MAX_VALUE;
        this.prev = null;
        this.done = false;
        this.type = type;
        this.x = x;
        this.y = y;
    };
    Node.TYPE_PASS  = 0;
    Node.TYPE_WALL  = 1;
    Node.TYPE_ROUTE = 2;

    var Dijkstra = function() {
        this.map_ = null;
        this.indeterminateList_ = [];
    };

    Dijkstra.prototype = {
        scoreFromMap: function(map, startX, startY) {
            this.map_ = new Array(map.length);
            for (let i = 0; i < map.length; i++) {
                this.map_[i] = new Array(map[i].length);
                for (let j = 0; j < map[i].length; j++) {
                    this.map_[i][j] = new Node(j, i, map[i][j]);
                }
            }
            
            var startNode = this.map_[startY][startX];
            startNode.score = 0;
            this.indeterminateList_.push(startNode);
            
            while (this.indeterminateList_.length !== 0) {
                let node = null;
                let minIndex = -1, minScore = Number.MAX_VALUE;
                for (let i = 0; i < this.indeterminateList_.length; i++) {
                    let tmp = this.indeterminateList_[i];
                    if (tmp.done) {
                        continue;
                    }
                    if(tmp.score < minScore) {
                        minScore = tmp.score;
                        minIndex = i;
                        node = tmp;
                    }
                    this.maxScore_ = Math.max(this.maxScore_, tmp.score);
                }
                
                if (node === null) {
                    break;
                }
                
                this.indeterminateList_.splice(minIndex, 1);
                node.done = true;
                
                let xx = [0, 1, 0, -1], yy = [1, 0, -1, 0];
                for (let i = 0; i < 4; i++) {
                    let width = this.map_[node.y].length, height = this.map_.length;
                    if (node.y + yy[i] < 0 || node.y + yy[i] >= height || 
                        node.x + xx[i] < 0 || node.x + xx[i] >= width) {
                        continue;
                    }
                    let t = this.map_[node.y + yy[i]][node.x + xx[i]];
                    if (t.done || t.type == Node.TYPE_WALL) {
                        continue;
                    }
                    if (node.score + 1 < t.score) {
                        t.score = node.score + 1;
                        t.prev = node;
                        if (this.indeterminateList_.indexOf(t) === -1) {
                            this.indeterminateList_.push(t);
                        }
                    }
                }
            }
        },
        findShortestPath: function(map, startX, startY, goalX, goalY) {
            this.scoreFromMap(map, startX, startY);
            var route = [];
            var goalNode = this.map_[goalY][goalX];
            while (goalNode !== null) {
                goalNode.type = Node.TYPE_ROUTE;
                route.push(goalNode);
                goalNode = goalNode.prev;
            }
            return route;
        },
        getScoredMap: function() {
            if (this.map_ === null) {
                return null;
            }
            var scoreMap = new Array(this.map_.length);
            for (let i = 0; i < this.map_.length; i++) {
                scoreMap[i] = new Array(this.map_[i].length);
                for (let j = 0; j < this.map_[i].length; j++) {
                    let score = this.map_[i][j].score;
                    if (score === Number.MAX_VALUE) {
                        score = -1;
                    }
                    scoreMap[i][j] = score;
                }
            }
            return scoreMap;
        },
        draw: function(context, chipSize) {
            for (let i = 0; i < this.map_.length; i++) {
                for (let j = 0; j < this.map_[i].length; j++) {
                    let score = String(this.map_[i][j].score);
                    if (this.map_[i][j].score < 10) {
                        score = '0' + score;
                    }
                    switch(this.map_[i][j].type) {
                    case Node.TYPE_PASS:
                        context.font = '12px Georgia';
                        context.fillStyle = 'rgba(0, 0, 0, 1.0)';
                        context.fillText(score, j * chipSize + 10, i * chipSize + 20);
                        break;
                    case Node.TYPE_ROUTE:
                        context.beginPath();
                        context.fillStyle = 'rgba(192, 80, 77, 0.5)';
                        context.fillRect(j * chipSize, i * chipSize, chipSize, chipSize);
                        context.font = '12px Georgia';
                        context.fillStyle = 'rgba(0, 0, 0, 1.0)';
                        context.fillText(score, j * chipSize + 10, i * chipSize + 20);
                        break;
                    }
                }
            }
        },
    };
}
