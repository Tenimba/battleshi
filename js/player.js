/*jslint browser this */
/*global _, shipFactory, player, utils */

(function (global) {
    "use strict";

    var sheep = {dom: {parentNode: {removeChild: function () {}}}};
    var array = [];

    var player = {
        grid: [],
        tries: [],
        fleet: [],
        game: null,
        activeShip: 0,
        init: function () {
            // créé la flotte
            this.fleet.push(shipFactory.build(shipFactory.TYPE_BATTLESHIP));
            this.fleet.push(shipFactory.build(shipFactory.TYPE_DESTROYER));
            this.fleet.push(shipFactory.build(shipFactory.TYPE_SUBMARINE));
            this.fleet.push(shipFactory.build(shipFactory.TYPE_SMALL_SHIP));

            // créé les grilles
            this.grid = utils.createGrid(10, 10);
            this.tries = utils.createGrid(10, 10);
        },



        play: function (col, line) {
            // appel la fonction fire du game, et lui passe une calback pour récupérer le résultat du tir
            game.fire(this, col, line, _.bind(function (hasSucced) {
                this.tries[line][col] = hasSucced;
           
            }, this));
        },
        
        // quand il est attaqué le joueur doit dire si il a un bateaux ou non à l'emplacement choisi par l'adversaire
        receiveAttack: function (col, line, callback) {
            var succeed = false;

            if (this.grid[line][col] !== 0) {
                succeed = true;
                this.grid[line][col] = 0;

            }
            callback.call(undefined, succeed);
        },
        setActiveShipPosition: function (x, y) {
            var ship = this.fleet[this.activeShip];
            var i = 0;
            if (ship.getLife() == 5) {
                if((x < Math.floor(ship.getLife() / 2) || x > 7) || (y < Math.floor(ship.getLife() /2) || y > 7 )){
                    return false
                } else {
                    for(i = 0; i < array.length; i++){
                        for(var X = x -2; X <= x +2; X++){
                            if(array[i][0] == X && array[i][1] == y){
                                return false;
                            }
                        }
                    }
                }
                    array.push([x + 2 , y])
                    array.push([x + 1 , y])
                    array.push([x , y])
                    array.push([x - 2 , y])
                    array.push([x - 1 , y])

            }
            if(ship.getLife() == 4) {
                if((x < Math.floor(ship.getLife() / 2) || x > 8 ) || (y < Math.floor(ship.getLife() /2) || y > 8)){
                    return false
                } else {
                    for(i = 0; i < array.length; i++){
                        for(var X = x -2; X <= x +1; X++){
                            if(array[i][0] == X && array[i][1] == y){
                                return false;
                            }
                        }
                    }
                }
                    array.push([x - 2 , y])
                    array.push([x - 1 , y])
                    array.push([x , y])
                    array.push([x + 1 , y])

            }
            if(ship.getLife() == 3) {
                if((x < Math.floor(ship.getLife() / 2) || x > 8)|| (y < Math.floor(ship.getLife() /2) || y > 8)){
                    return false
                } else {
                    for(i = 0; i < array.length; i++){
                        for(var X = x -2; X <= x +2; X++){
                            if(array[i][0] == X && array[i][1] == y){
                                return false;
                            }
                        }
                    }
                }
                    array.push([x + 1 , y])
                    array.push([x , y])
                    array.push([x - 1 , y])
                    
        }

            while (i < ship.getLife()) {
                this.grid[y][x + i] = ship.getId();
                i += 1;
            }

            return true;

        },
        clearPreview: function () {
            this.fleet.forEach(function (ship) {
                if (ship.dom.parentNode) {
                    ship.dom.parentNode.removeChild(ship.dom);
                };
            });
        },
        resetShipPlacement: function () {
            this.clearPreview();

            this.activeShip = 0;
            this.grid = utils.createGrid(10, 10);
        },
        activateNextShip: function () {
            if (this.activeShip < this.fleet.length - 1) {
                this.activeShip += 1;
                return true;
            } else {
                return false;
            }
        },
        renderTries: function (grid) {
            this.tries.forEach(function (row, rid) {
                row.forEach(function (val, col) {
                    var node = grid.querySelector('.row:nth-child(' + (rid + 1) + ') .cell:nth-child(' + (col + 1) + ')');

                    if (val === true) {
                        node.style.backgroundColor = '#e60019';
                        node.setAttribute("id", "touche");

                    } else if (val === false) {
                        node.style.backgroundColor = '#aeaeae';

                        node.setAttribute("id", "coule");
                    }
                });
            });
        },
        renderShips: function (grid) {
        },
        setGame: function () {

        }
    };

    global.player = player;

}(this));