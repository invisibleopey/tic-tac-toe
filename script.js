// Remains 5, 6 and 7
const myModule = (function () {
    // Player Factory function
    const player = function (name, selector) {
    name = name;
    selector = selector;
    playerMove = function (e) {
        gameboard[e.target.dataset.index] = selector;
    }
    return {
        name, selector, playerMove
    }
}
    const gameboard = ["","","","","","","","",""]
    // Player1 and Player2 with selectors
    const player1 = player("Opey", "X");
    const player2 = player("Yemi", "O");
    let turn = true;
    let round = 1;
    let gameOver = false;

    // Grab DOM Elements we need to manipulate
    const doc = document;
    const buttons = doc.querySelectorAll("#board button");
    const resultBoard = doc.querySelector("#result-board");
    const restartbutton = doc.querySelector("#restart");

    buttons.forEach(button => button.addEventListener("click", gameFlow));
    restartbutton.addEventListener("click", restartGame);

    function gameFlow(e) {
        if (round === 9 ) {
            resultBoard.textContent = "Draw! Restart Game"
        }
        if (gameOver) return
        if (gameboard[e.target.dataset.index] !== "") return;
        if (turn) {
            player1.playerMove(e);
            resultBoard.textContent = "Player Two's turn";
            turn = false;
        } else {
            player2.playerMove(e);
            resultBoard.textContent = "Player One's turn";
            turn = true;
        }
        round++
        displayController();
        getWinner();
    }
    const displayController = function () {
        buttons.forEach(button => {
            button.textContent = gameboard[button.dataset.index];
        })
    }
    function gotWinner(winnerBtn) {
        if (winnerBtn.textContent === "X") {
            resultBoard.textContent = `${player1.name} won!`
        }
        if (winnerBtn.textContent === "O") {
            resultBoard.textContent = `${player2.name} won!`
        }
        gameOver = true;
    }
    function getWinner() {
        // let btn1 = buttons[0], btn2 = buttons[1], btn3 = buttons[2], btn4 = buttons[3];
        // let btn5 = buttons[4], btn6 = buttons[5], btn7 = buttons[6], btn8 = buttons[7];
        // let btn9 = buttons[8];
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
    function restartGame() {
        turn = true;
        round = 1;
        gameOver = false;
        for (let i = 0; i < gameboard.length; i++){
            gameboard[i] = "";
        }
        displayController();
        resultBoard.textContent = "Player One's turn";
    }
    displayController();
})();