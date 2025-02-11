let boxes = document.querySelectorAll(".box");
let ResetButton = document.querySelector("#reset");
let msgContainer = document.querySelector(".msg-container"); //div class of showing msg
let newGamebtn = document.querySelector(".new-btn"); // button for new game
let msg = document.querySelector("#msg"); // p tag to display message

let turnO = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],    
];
const ResetGame = () =>{
    turnO = true;
    count = 0;
    enableBox();
    msgContainer.classList.add("hide");
    newGamebtn.classList.add("hide");
}
const DrawGame = () =>{
    msg.innerText = "Game is drawn";
    msgContainer.classList.remove("hide");
    newGamebtn.classList.remove("hide");
    disableBox();
}
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("A box was clicked");
        if (box.innerText !== "") 
        {
            return;
        }
        if (turnO) 
        {
            box.innerText = "O";
            turnO = false; 
        } 
        else 
        {
            box.innerText = "X";
            turnO = true; 
        }
        count++;
        let isWinner = checkWinner();
        if(count === 9 && !isWinner)
        {
            DrawGame();
            disableBox();
        }
    });
});
const disableBox = () =>
{
    for(let box of boxes)
    {
        box.disabled = true;
    }
};
const enableBox = () =>
    {
        for(let box of boxes)
        {
            box.disabled = false;
            box.innerText = "";
        }
};

const showWinner = (winner) =>{
    msg.innerText = `We have a winner: ${winner}`;
    
    msgContainer.classList.remove("hide");
    newGamebtn.classList.remove("hide");
    disableBox();
};
const checkWinner = () =>{
    for(let pattern of winPatterns)
    {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != "")
        {
            if(pos1 === pos2 && pos2 === pos3 && pos3 === pos1)
            {
                console.log("WINNER!", pos1);
                showWinner(pos1);
            }
        }
    }
    
};

newGamebtn.addEventListener("click", ResetGame);
ResetButton.addEventListener("click", ResetGame);