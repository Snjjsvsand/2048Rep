var board = [];
var score = 0;
var hasConflicted = [];


function newGame(){
    init();
    createNumber();
    createNumber();
    // 
}

//初始化棋盘函数
function init(){
    $("#score").text(0);
    for(var i = 0;i<4;i++){
        board[i] = [];
        hasConflicted[i] = [];
        for(var j = 0;j<4;j++){
            board[i][j] = 0;
            hasConflicted[i][j] = false;
            $("#grid-cell-"+i+"-"+j).css("left",getPosLeft(i,j));
            $("#grid-cell-"+i+"-"+j).css("top",getPosTop(i,j));
        }
    }
    updateBoardView();

    score = 0;
}

function gameover(){
    if(noSpace(board) && noMoveSpace(board)){
        alert("You lose!");
    }
}

//生成新数字函数(每次一个)
function createNumber(){
    var row;
    var col;
    var times = 0;
    while(times<300){
        row = parseInt(Math.floor(Math.random()*4));
        col = parseInt(Math.floor(Math.random()*4));
        if(board[row][col] == 0){
            break;
        }
        times++;
    }
    if(times == 300){
        for(var i = 0;i<4;i++){
            for(var j = 0;j<4;j++){
                if(board[i][j] == 0){
                    row = i;
                    col = j;
                }
            }
        }
    }

    var randNum = Math.random() < 0.5 ? 2 : 4;
    board[row][col] = randNum;
    // console.log("row:" + row +"col:" + col);
    showNumberWithAnimation(row ,col ,randNum);

    return true;
};
//更新面板的函数
function updateBoardView(){
    $(".number-cell").remove();
    for(var i = 0;i<4;i++){
        for(var j = 0;j<4;j++){
            $("#main-grid").append('<div class = "number-cell" id = "number-cell-'+i+'-'+j+'"></div>');
            var thisNumberCell = $("#number-cell-"+i+"-"+j);
            if(board[i][j] == 0){
                thisNumberCell.css("width",0);
                thisNumberCell.css("height",0);
                //这里设置偏移量在方块中间可能是为了动画效果(从中间扩大)
                thisNumberCell.css("left",getPosLeft(i,j) + 50);
                thisNumberCell.css("top",getPosTop(i,j) + 50);
            }else{
                thisNumberCell.css("width",100);
                thisNumberCell.css("height",100);
                thisNumberCell.css("left",getPosLeft(i,j));
                thisNumberCell.css("top",getPosTop(i,j));
                thisNumberCell.css("background-color",getNumberBackgroundColor( board[i][j] ));
                thisNumberCell.css("color",getNumberColor( board[i][j] ));
                thisNumberCell.text(board[i][j]);
            }

            hasConflicted[i][j] = false;
        }
    }
}

function moveLeft(){
    if(!canMoveLeft(board)){
        return false;
    }

    for(var i = 0;i<4;i++){
        for(var j = 1;j<4;j++){
            
            if(board[i][j]!=0){
                for(var k = 0;k<j;k++){
                    if(board[i][k] == 0 && noBlockHorizontal( i , k , j , board )){
                        showMoveAnimation(i , j , i , k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        break;
                    }else if(board[i][k] == board[i][j] && noBlockHorizontal( i , k , j , board ) && !hasConflicted[i][k]){
                        showMoveAnimation( i , j , i , k );
                        board[i][k] *= 2;
                        board[i][j] = 0;

                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        break;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView();",200);
    return true;
}

function moveRight(){
    if(!canMoveRight( board )){
        return false;
    }
    
    for(var i = 0;i<4;i++){
        for(var j = 2;j>=0;j--){

            if(board[i][j]!=0){
                for(var k = 3;k>j;k--){
                    if(board[i][k] == 0 && noBlockHorizontal( i , j , k , board )){
                        showMoveAnimation( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        break;
                    }else if(board[i][j] == board[i][k] && noBlockHorizontal( i , j , k , board ) && !hasConflicted[i][k]){
                        showMoveAnimation( i , j , i , k );
                        board[i][k] *= 2;
                        board[i][j] = 0;

                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        break;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView();",200);
    return true;
}

function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }
    for(var j = 0;j<4;j++){
        for(var i = 1;i<4;i++){

            if(board[i][j] != 0){
                for(var k = 0;k<i;k++){
                    if(board[k][j] == 0 && noBlockVertical( j , k , i , board )){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        break;
                    }else if(board[k][j] == board[i][j] && noBlockVertical( j , k , i , board ) && !hasConflicted[k][j]){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] *= 2;
                        board[i][j] = 0;

                        score += board[k][j];
                        updateScore(score);

                        hasConflicted[k][j] = true;
                        break;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView();",200);
    return true;
}

function moveDown(){
    if(!canMoveDown(board)){
        return false;
    }

    for(var j = 0;j<4;j++){
        for(var i = 2;i>=0;i--){

            if(board[i][j]!=0){
                for(var k = 3;k>i;k--){
                    if(board[k][j] == 0 && noBlockVertical( j , i , k , board )){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        break;
                    }else if(board[k][j] == board[i][j] && noBlockVertical( j , i , k , board ) && !hasConflicted[k][j]){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] *= 2;
                        board[i][j] = 0;

                        score += board[k][j];
                        updateScore(score);
        
                        hasConflicted[k][j] = true;
                        break;
                    }
                }
                // for(var k = 3;k>i;k--){
                //     if(board[k][j] == 0 && noBlockVertical( j , i , k , board )){
                //         showMoveAnimation( i , j , k , j );
                //         board[k][j] = board[i][j];
                //         board[i][j] = 0;
                //         break;
                //     }else if(board[k][j] == board[i][j] && noBlockVertical( j , i , k , board ) && !hasConflicted[k][j]){
                //         showMoveAnimation( i , j , k , j );
                //         board[k][j] *= 2;
                //         board[i][j] = 0;

                //         score += board[k][j];
                //         updateScore(score);

                //         hasConflicted[k][j] = true;
                //         break;
                //     }
                // }
            }
        }
    }
    setTimeout("updateBoardView();",200);
    return true;
}

//为a标签添加单击相应事件
$(function(){
    newGame();
    $("#newGame-btn").click(function(){
        newGame();
    })
    //添加键盘响应事件
    document.onkeydown = function(event){
        event = event || window.event;
        switch(event.keyCode){
            case 37:
                if(moveLeft()){
                    setTimeout("createNumber();",210);
                    setTimeout("gameover()",300);
                }
                break;//左
            case 38:
                if(moveUp()){
                    setTimeout("createNumber();",210);
                    setTimeout("gameover()",300);
                }
                break;//上
            case 39:
                if(moveRight()){
                    setTimeout("createNumber();",210);
                    setTimeout("gameover()",300);
                }
                break;//右
            case 40:
                if(moveDown()){
                    setTimeout("createNumber();",210);
                    setTimeout("gameover()",300);
                }
                break;//下
        }    
    }
})

