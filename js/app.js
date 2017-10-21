var tictactoeApp = angular.module('tictactoeApp', []);

tictactoeApp.factory('table',function(){
    var tableGame = [];
    for(var row=0; row<3; row++){
        tableGame.push([]);
        for(var col=0; col<3; col++){
            tableGame[row].push(new cell(row,col));
        }  
    }
    return tableGame;
});


tictactoeApp.controller('GameCtrl', function GameCtrl($scope, table,focus) {
    $scope.theGame = new game();
    $scope.table = table;
    $scope.winnerText = "";
    $scope.showX = true;
    $scope.showO = true;
    $scope.focusX = function() {
      focus('inputBidX');
    };
    $scope.focusO = function() {
      focus('inputBidO');
    };

    $scope.placeXBid = function(){
        if($scope.theGame.xBid > $scope.theGame.playerXBalance){
            alert("Bid too high!");
        }
        else if ($scope.theGame.xBid < 0){
            alert("Bid too low!");
        }
        else if($scope.theGame.xBid === undefined){
            alert("Bid out of range!");
        }
        else{
            $scope.showX = !$scope.showX;
            $scope.focusO();
        }
        if(!$scope.showX && !$scope.showO){
            $scope.placeABid();
        }
    };
    $scope.placeOBid = function(){
         if($scope.theGame.oBid > $scope.theGame.playerOBalance){
            alert("Bid too high!");
        }
        else if ($scope.theGame.oBid < 0){
            alert("Bid too low!");
        }
        else if($scope.theGame.oBid === undefined){
            alert("Bid out of range!");
        }
        else{
            $scope.showO = !$scope.showO;
            $scope.focusX();
        }
        if(!$scope.showX && !$scope.showO){
            $scope.placeABid();
        }
    };
    $scope.placeABid = function(){
        if(!$scope.theGame.bidSet){

        if($scope.theGame.xBid > $scope.theGame.oBid){
            $scope.theGame.changeTurn(false);
            $scope.theGame.bidSet = true;
            $scope.theGame.playerXBalance = $scope.theGame.playerXBalance - $scope.theGame.xBid;
            $scope.theGame.playerOBalance = $scope.theGame.playerOBalance + $scope.theGame.xBid;
        }
        else if($scope.theGame.xBid < $scope.theGame.oBid){
            $scope.theGame.changeTurn(true);
            $scope.theGame.bidSet = true;
            $scope.theGame.playerXBalance = $scope.theGame.playerXBalance + $scope.theGame.oBid;
            $scope.theGame.playerOBalance = $scope.theGame.playerOBalance - $scope.theGame.oBid;
        }
        else{
            var random_boolean = Math.random() >= 0.5;
            if(random_boolean){
            $scope.theGame.changeTurn(false);
            $scope.theGame.bidSet = true;
            $scope.theGame.playerXBalance = $scope.theGame.playerXBalance - $scope.theGame.xBid;
            $scope.theGame.playerOBalance = $scope.theGame.playerOBalance + $scope.theGame.xBid;
        }
        else if(!random_boolean){
            $scope.theGame.changeTurn(true);
            $scope.theGame.bidSet = true;
            $scope.theGame.playerXBalance = $scope.theGame.playerXBalance + $scope.theGame.oBid;
            $scope.theGame.playerOBalance = $scope.theGame.playerOBalance - $scope.theGame.oBid;
        }
        }
    }
    else{
        alert("Please play first.");
    }
    };
    $scope.drawSign = function(cell){
        if($scope.theGame.bidSet){
            if(!cell.mark){
                var col = cell.col;
                cell.changeTo($scope.theGame.turn);
                    if(winCheck($scope.table)){
                        $scope.winnerText = $scope.theGame.colorTurn + " Win!";
                        $scope.theGame.gameFinish = true;
                    }
                    else{
                        $scope.focusX();
                    }
                    
                    $scope.theGame.bidSet = false;
                    $scope.theGame.oBid = 0;
                    $scope.theGame.xBid = 0;
                    $scope.showX = true;
                    $scope.showO = true;
            }
        }
        else{
            alert("place a bid first");
        }
    };
    $scope.newGame = function(){
        table.forEach(function(item){
            item.map(function(x) { 
                x.status = "N";
                x.mark = false;
                return x;
            });
        });
        $scope.theGame.gameFinish = false;
        $scope.theGame.playerXBalance = 100;
        $scope.theGame.playerOBalance = 100;
        $scope.theGame.oBid = 0;
        $scope.theGame.xBid = 0;
        $scope.showX = true;
        $scope.showO = true;
        $scope.focusX();
    };
});

//focus an element by id
tictactoeApp.factory('focus', function($timeout, $window) {
    return function(id) {
      // timeout makes sure that is invoked after any other event has been triggered.
      // e.g. click events that need to run before the focus or
      // inputs elements that are in a disabled state but are enabled when those events
      // are triggered.
      $timeout(function() {
        var element = $window.document.getElementById(id);
        if(element)
          element.focus();
          element.select();
      });
    };
  });

  //select the text whene click the input field
  tictactoeApp.directive('selectOnClick', ['$window', function ($window) {
    // Linker function
    return function (scope, element, attrs) {
      element.bind('click', function () {
        if (!$window.getSelection().toString()) {
          this.select();
        }
      });
    };
  }]);

 