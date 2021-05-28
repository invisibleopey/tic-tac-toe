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

    // Grab DOM Elements we need to manipulate
    const doc = document;
    const buttons = doc.querySelectorAll("#board button");

    buttons.forEach(button => button.addEventListener("click", gameFlow));

    function gameFlow(e) {
        if (turn) {
            if (gameboard[e.target.dataset.index] !== "") return;
            player1.playerMove(e);
            turn = false;
        } else {
            if (gameboard[e.target.dataset.index] !== "") return;
            player2.playerMove(e);
            turn = true;
        }
        displayController();
    }
    const displayController = function () {
        buttons.forEach(button => {
            button.textContent = gameboard[button.dataset.index];
        })
    }
    displayController();
})();