const X_Class='x';
const CIRCLE_Class='circle';
const WINNING_COMBINATIONS=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements=document.querySelectorAll('[data-cell]');
const board=document.querySelector('#board');
const restartButton=document.querySelector("#restart");
const WinningMessageElement=document.querySelector("#winningMessage");
const WinningMessageText=document.querySelector('[data-warning-message-text]');
let circleTurn;

startGame();

restartButton.addEventListener('click',startGame);

function startGame(){
    circleTurn=false;
    cellElements.forEach(cell=>{
        cell.classList.remove(X_Class)
        cell.classList.remove(CIRCLE_Class)
        cell.removeEventListener('click',handleClick);
    cell.addEventListener('click',handleClick,{once:true})
});
setBoardHover();
WinningMessageElement.classList.remove("show");
}


function handleClick(e){
   const cell = e.target;
   const currentClass=circleTurn ? CIRCLE_Class: X_Class;
   placeMark(cell,currentClass);
   if(checkWin(currentClass)){
       endGame(false)
   }else if(isDraw()){
    endGame(true)
   }else{
       swapTurns();
       setBoardHover();
   }
  
}

function endGame(draw){
    if(draw){
        WinningMessageText.innerText= 'Yenidən Başla!';
    }else{
      WinningMessageText.innerText=`${circleTurn ? "O" : "X"} Qalib Gəldi!`
    }
    WinningMessageElement.classList.add("show");
}

function isDraw(){
    return [...cellElements].every(cell=>{
        return cell.classList.contains(X_Class) || 
        cell.classList.contains(CIRCLE_Class)
    })
}

function placeMark(cell,currentClass){
    cell.classList.add(currentClass);
}

function swapTurns(){
    circleTurn=!circleTurn;
}

function setBoardHover(){
    board.classList.remove(X_Class);
    board.classList.remove(CIRCLE_Class);
    if(circleTurn){
        board.classList.add(CIRCLE_Class);
    }else{
        board.classList.add(X_Class);
    }
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combinations=>{
        return combinations.every(index=>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}