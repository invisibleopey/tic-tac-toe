// Remains 6 and 7
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
    let player1, player2;
    let turn = true;
    let round = 1;
    let gameOver = false;

    // Grab DOM Elements we need to manipulate
    const doc = document;
    const buttons = doc.querySelectorAll("#board button");
    const resultBoard = doc.querySelector("#result-board");
    const restartbutton = doc.querySelector("#restart");
    const form = doc.querySelector("#form");

    buttons.forEach(button => button.addEventListener("click", gameFlow));
    restartbutton.addEventListener("click", restartGame);
    form.addEventListener("submit", submitNames);

    function gameFlow(e) {
        if (round === 9 ) {
            resultBoard.textContent = "Draw! Restart Game"
        }
        if (gameOver) return
        if (gameboard[e.target.dataset.index] !== "") return;
        if (turn) {
            player1.playerMove(e);
            turn = false;
        } else {
            player2.playerMove(e);
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
    // Action after winner has been determined
    function gotWinner(winnerBtn) {
        if (winnerBtn.textContent === "X") {
            resultBoard.textContent = `Congratulation ${player1.name}, you won!`
        }
        if (winnerBtn.textContent === "O") {
            resultBoard.textContent = `Congratulation ${player2.name}, you won!`
        }
        gameOver = true;
        round = 1;
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
    function restartGame() {
        turn = true;
        round = 1;
        gameOver = false;
        for (let i = 0; i < gameboard.length; i++){
            gameboard[i] = "";
        }
        displayController();
        resultBoard.textContent = "";
        form.classList.toggle("toggleForm");
        player1 = undefined;
        player2 = undefined;
    }
    function submitNames(e) {
        e.preventDefault();
        player1 = player(doc.querySelector("#player1").value, "X");
        player2 = player(doc.querySelector("#player2").value, "O");
        form.classList.toggle("toggleForm");
        form.reset();
    }
    displayController();
})();