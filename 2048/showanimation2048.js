function showNumberWithAnimation(i , j , randomNumber){
    
    theNumberCell = $("#number-cell-"+i+"-"+j);
    theNumberCell.css("background-color",getNumberBackgroundColor( randomNumber ));
    theNumberCell.css("color",getNumberColor( randomNumber ));
    theNumberCell.text(randomNumber);

    theNumberCell.animate({
        width:100,
        height:100,
        left:getPosLeft(i , j),
        top:getPosTop(i , j)
    },50);
    
}

function showMoveAnimation(fromx , fromy , tox , toy){
    theNumberCell = $("#number-cell-"+fromx+"-"+fromy);

    theNumberCell.animate({
        left:getPosLeft(tox,toy),
        top:getPosTop(tox,toy),   
    },200);
}

function updateScore( score ){
    $("#score").text(score);
}