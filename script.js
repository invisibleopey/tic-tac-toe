// Player1 and Player2 with selectors
let player1, player2;
const buttons = document.querySelectorAll("#board button");
// Factory function to make players
const playerFactory = function (name, selector) {
    name = name;
    selector = selector;
    playerMove = function (e) {
        displayController.gameboard[e.target.dataset.index] = selector;
    }
    return {
        name, selector, playerMove
    }
}
// Module for the Board
const gameBoard = (function (){
    let turn = true;
    let round = 1;
    let gameOver = false;
    // Grab DOM Elements we need to manipulate
    const doc = document;
    const resultBoard = doc.querySelector("#result-board");
    const restartbutton = doc.querySelector("#restart");
    const form = doc.querySelector("#form");

    buttons.forEach(button => button.addEventListener("click", gameFlow));
    restartbutton.addEventListener("click", restartGame);
    form.addEventListener("submit", submitNames);

    function restartGame() {
        gameBoard.turn = true;
        gameBoard.round = 1;
        gameBoard.gameOver = false;
        for (let i = 0; i < displayController.gameboard.length; i++){
            displayController.gameboard[i] = "";
        }
        displayController.render();
        gameBoard.resultBoard.textContent = "";
        form.classList.toggle("toggleForm");
        player1 = undefined;
        player2 = undefined;
    }
    function submitNames(e) {
        e.preventDefault();
        player1 = playerFactory(doc.querySelector("#player1").value, "X");
        player2 = playerFactory(doc.querySelector("#player2").value, "O");
        form.classList.toggle("toggleForm");
        form.reset();
    }
    return {
        turn, round, gameOver, resultBoard
    }
})();
// Function for playing each round
function gameFlow(e) {
    if (gameBoard.round === 9 ) {
        gameBoard.resultBoard.textContent = "Draw! Restart Game"
    }
    if (gameBoard.gameOver) return
    if (displayController.gameboard[e.target.dataset.index] !== "") return;
    if (gameBoard.turn) {
        player1.playerMove(e);
        gameBoard.turn = false;
    } else {
        player2.playerMove(e);
        gameBoard.turn = true;
    }
    gameBoard.round++
    displayController.render();
    gameLogics.getWinner();
}
const displayController = (function (){
    const gameboard = ["","","","","","","","",""]
    function render () {
        buttons.forEach(button => {
            button.textContent = displayController.gameboard[button.dataset.index];
        })
    }
    return {
        gameboard, render
    }
})();
// Module for game logics and determining winner
const gameLogics = (function (){
        // Action after winner has been determined
        function gotWinner(winnerBtn) {
            if (winnerBtn.textContent === "X") {
                gameBoard.resultBoard.textContent = `Congratulation ${player1.name}, you won!`
            }
            if (winnerBtn.textContent === "O") {
                gameBoard.resultBoard.textContent = `Congratulation ${player2.name}, you won!`
            }
            gameBoard.gameOver = true;
            gameBoard.round = 1;
        }
        // Logic to determine winner
        function getWinner() {
            if ((buttons[0].textContent !== "") && (buttons[0].textContent === 
                    buttons[1].textContent) && buttons[1].textContent === 
                        buttons[2].textContent) {
                            gotWinner(buttons[0]);
                        };
            if ((buttons[3].textContent !== "") && (buttons[3].textContent === 
                    buttons[4].textContent) && buttons[4].textContent === 
                        buttons[5].textContent) {
                            gotWinner(buttons[3]);
                        };
            if ((buttons[6].textContent !== "") && (buttons[6].textContent === 
                    buttons[7].textContent) && buttons[7].textContent === 
                        buttons[8].textContent) {
                            gotWinner(buttons[6]);
                        };
            if ((buttons[0].textContent !== "") && (buttons[0].textContent === 
                    buttons[3].textContent) && buttons[3].textContent === 
                        buttons[6].textContent) {
                            gotWinner(buttons[0]);
                        };
            if ((buttons[1].textContent !== "") && (buttons[1].textContent === 
                    buttons[4].textContent) && buttons[4].textContent === 
                        buttons[7].textContent) {
                            gotWinner(buttons[1]);
                        };
            if ((buttons[2].textContent !== "") && (buttons[2].textContent === 
                    buttons[5].textContent) && buttons[5].textContent === 
                        buttons[8].textContent) {
                            gotWinner(buttons[2]);
                        };
            if ((buttons[0].textContent !== "") && (buttons[0].textContent === 
                    buttons[4].textContent) && buttons[4].textContent === 
                        buttons[8].textContent) {
                            gotWinner(buttons[0]);
                        };
            if ((buttons[2].textContent !== "") && (buttons[2].textContent === 
                    buttons[4].textContent) && buttons[4].textContent === 
                        buttons[6].textContent) {
                            gotWinner(buttons[2]);
                        };
        }
    return {
        getWinner
    }
})();
displayController.render();