//获取元素偏移量
function getPosLeft(i , j){
    return 20 + j * 120;
}

function getPosTop(i , j){
    return 20 + i * 120;
}
//获取元素背景色
function getNumberBackgroundColor( number ){
    switch( number ){
        case 2:return "#FFCCCC";break;
        case 4:return "#CCFF99";break;
        case 8:return "#99CCFF";break;
        case 16:return "#FFCC33";break;
        case 32:return "#6666FF";break;
        case 64:return "#FF6666";break;
        case 128:return "#990066";break;
        case 256:return "#CC0033";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }

    return "black";
}
//获取元素前景色
function getNumberColor( number ){
    if( number <= 4 )
        return "#776e65";

    return "white";
}

function canMoveLeft( board ){
    for(var i = 0;i<4;i++){
        for(var j = 1;j<4;j++){
            if(board[i][j] != 0){
                if(board[i][j-1] == 0 || board[i][j-1] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveRight( board ){
    for(var i = 0;i<4;i++){
        for(var j = 0;j<3;j++){
            if(board[i][j] != 0){
                if(board[i][j] == board[i][j+1] || board[i][j+1] == 0){
                    return true;
                }
                
            }
        }
    }
}

function canMoveUp(board){
    for(var j = 0;j<4;j++){
        for(var i = 1;i<4;i++){
            if(board[i][j]!=0){
                if(board[i-1][j] == 0 || board[i-1][j] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown(board){
    for(var j = 0;j<4;j++){
        for(var i = 0;i<3;i++){
            if(board[i][j]!=0){
                if(board[i+1][j] == 0 || board[i+1][j] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function noBlockHorizontal( row , col1 , col2 , board ){
    for(col1 = col1+1;col1<col2;col1++){
        if(board[row][col1]!=0)
            return false;
    }
    return true;
}

function noBlockVertical( col , row1 , row2 , board ){
    for(row1 = row1 + 1;row1<row2;row1++){
        if(board[row1][col]!=0){
            return false;
        }
    }
    return true;
}

function noSpace(board){
    for(var i = 0;i<4;i++){
        for(var j = 0;j<4;j++){
            if(board[i][j] == 0){
                return false;
            }
        }
    }
    return true;
}

function noMoveSpace(board){
    if(canMoveLeft(board) || canMoveRight(board) || canMoveUp(board) || canMoveDown(board)){
        return false;
    }else{
        return true;
    }
}
// function noBlock(origin , begin , end , board){

// }