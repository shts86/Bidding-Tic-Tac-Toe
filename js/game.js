function cell(row,col){
    this.row = row;
    this.col = col;
    this.status = "N";
    this.mark = false;
    this.changeTo = function(newStatus){
        if(!newStatus){
            this.status = "X";
            this.mark = true;
        }
        else{
            this.status = "O";
            this.mark = true;
        }
    };
}

function game(){
    this.turn = false;//false is X turn
    this.colorTurn = "X";
    this.gameFinish = false;
    this.playerXBalance = 100;
    this.playerOBalance = 100;
    this.xBid = 0;
    this.oBid = 0;
    this.bidSet = false;
    this.changeTurn = function(bool){
        if(bool !== undefined)this.turn = bool;
        else this.turn = !this.turn;
        if(!this.turn) this.colorTurn = "X";
        else this.colorTurn = "O";
    };
}

function winCheck(table){
    if((table[0][0].status === "X" || table[0][0].status ==="O") && 
        table[0][0].status === table[0][1].status && 
        table[0][0].status === table[0][2].status){ 
        return true;
    }
    if((table[1][0].status === "X" || table[1][0].status ==="O") && 
        table[1][0].status === table[1][1].status && 
        table[1][0].status  === table[1][2].status){
        return true;
    }
    if((table[2][0].status === "X" || table[2][0].status ==="O") && 
        table[2][0].status === table[2][1].status && 
        table[2][0].status === table[2][2].status){
        return true;
    }
    if((table[0][0].status === "X" || table[0][0].status ==="O") && 
        table[0][0].status === table[1][0].status && 
        table[0][0].status === table[2][0].status){
        return true;
    }
    if((table[0][1].status === "X" || table[0][1].status ==="O") && 
        table[0][1].status === table[1][1].status && 
        table[0][1].status === table[2][1].status){
        return true;
    }
    if((table[0][2].status === "X" || table[0][2].status ==="O") && 
        table[0][2].status === table[1][2].status && 
        table[0][2].status === table[2][2].status){
        return true;
    }
    if((table[0][0].status === "X" || table[0][0].status ==="O") && 
        table[0][0].status === table[1][1].status && 
        table[0][0].status === table[2][2].status){
        return true;
    }
    if((table[0][2].status === "X" || table[0][2].status ==="O") && 
        table[0][2].status === table[1][1].status && 
        table[0][2].status === table[2][0].status){
        return true;
    }
    
}

function arraySum(array) {
    var sum = 0;
    function sumIt(item){
        sum += item;
    }
    array.forEach(sumIt);
    return sum;
}
