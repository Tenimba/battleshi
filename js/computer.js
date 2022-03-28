/*jslint browser this */
/*global _, player */

(function (global) {
    "use strict";

    var computer = _.assign({}, player, {
        grid: [],
        tries: [],
        fleet: [],
        game: null,
        play: function () {
            var self = this;
            setTimeout(function () {
                var c = Math.floor(Math.random() * (9 - 0 + 1) + 0);
                var l = Math.floor(Math.random() * (5 - 0 + 1) + 0);

              game.fire(this, c, l, function (hasSucced) {
                self.tries[c][l] = hasSucced;
                console.log(hasSucced);
               if(hasSucced){
            
                   document.querySelector('.mini-grid').children[c].children[l].style.backgroundColor = '#e60019';      
            }
                });
            }, 2000);
        },
  
        isShipOk: function (callback) {
            var rand =  Math.floor((Math.random()* 10)+1);
            if(rand < 5 ){
            var j;

            var i = Math.floor(Math.random() * (9 - 0 + 1) + 0);
            var colone = [];

            this.fleet.forEach(function (ship) {
                j = Math.floor(Math.random() * (5 - 0 + 1) + 0);
                var t = j;
                while (j < ship.life + t ) {
                    this.grid[j][i] = ship.getId();
                  
                    j += 1;
                }
                colone.push(i);
                while (colone.includes(i)){
                    i = Math.floor(Math.random() * (9 - 0 + 1) + 0);
                }
            }, this);
        console.log(this.grid)
        } 
        else {
    var i;
    var j = Math.floor(Math.random() * (9 - 0 + 1) + 0);
    var colone = [];

    this.fleet.forEach(function (ship) {
     i = Math.floor(Math.random() * (5 - 0 + 1) + 0);
        var t = i;
        while (i < ship.life + t) {
            this.grid[j][i] = ship.getId();
            
            i += 1;
        }
        colone.push(j);
        while (colone.includes(j)){
            j = Math.floor(Math.random() * (9 - 0 + 1) + 0);
        }
    }, this);
 
console.log(this.grid)

}

            setTimeout(function () {
                callback();
            }, 500);
        }
    });

    global.computer = computer;

}(this));