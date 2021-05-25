const Module = (function(){
    // Array of gameboard starting content
    const gameboard = ["X","X","O","O","O","O","X","O","O"];
    // Factory to create as many player as needed
    const player = function (name, selector) {
        name = name;
        selector = selector;
        return {
            name, selector
        }
    }

    // Grab DOM Elements we need to manipulate
    const doc = document;
    const buttons = doc.querySelectorAll("#board button");
    
    // Add Event Listener to the buttons
    buttons.forEach(button => button.addEventListener("click", selectCell));
    // Function to select each cell
    function selectCell(e) {
        let index = e.target.dataset.index;
        gameboard[index] = "X";
        displayController();
    }
    // Display Controller
    const displayController = function () {
        buttons.forEach(button => {
            let index = button.dataset.index;
            button.textContent = gameboard[index];
        })
    }
    displayController();
    // Player1 and Player2 with selectors
    const player1 = player("Opey", "X");
    const player2 = player("Yemi", "O");
})();