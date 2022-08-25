document.addEventListener("DOMContentLoaded", () => {
    const keys = document.querySelectorAll(".keyboard-row button");
    const questions = ["Alternatively", "A type of computer memory", "A movie so bad that it has become a cult classic: The ___",
                        "The English translation of \"Baka\"", "A play written by the creators of South Park: The Book of ___", "A small molecule which can be covalently bonded with other molecules"];
    const answers = ["or", "rom", "room", "moron", "mormon", "monomer"];
    const rowNumLetters = [2, 3, 4, 5, 6, 7];
    const numRows = 6;
    let guess = [];
    let squareId = 0;
    let rowNum = 0;
    let gameOver = false;

    createSquares();
    initQuestion();

    function resetTileAnimation(animation) {
        setTimeout(() => {
            const elems = document.getElementsByClassName(animation);
            const elemsArr = Array.from(elems);
            elemsArr.forEach((elem) => {
                elem.classList.remove(animation);
            });
        }, 1600);
    }

    function tileAnimationIncorrect() {
        const firstSquareId = squareId - rowNumLetters[rowNum] > 0 ? squareId - rowNumLetters[rowNum] : 0;
        console.log(firstSquareId)
        Array.from({length: rowNumLetters[rowNum]}, (letter, index) => {
            const letterElem = document.getElementById(firstSquareId + index);
            letterElem.classList.add("animate__shakeX");
        });
    }

    function tileAnimationCorrect() {
        const interval = 250;
        const firstSquareId = squareId - rowNumLetters[rowNum];
        guess.forEach((letter, index) => {
            setTimeout(() => {
                const tileColor = "rgb(83, 141, 78)";
                const letterElem = document.getElementById(firstSquareId + index);
                letterElem.classList.add("animate__flipInX");
                letterElem.style = `background-color:${tileColor};border-color:${tileColor}`;
            }, interval * index);
        });
    }

    function initQuestion() {
        const question = document.getElementById("question-text");
        question.classList.add("animate__animated");
        question.classList.add("animate__fadeIn");
        question.textContent = questions[rowNum];
        resetTileAnimation("animate__fadeIn");
    }

    function updateQuestion() {
        const question = document.getElementById("question-text");
        question.classList.add("animate__animated");
        setTimeout(() => {
            question.classList.add("animate__fadeIn");
            question.textContent = questions[rowNum];
            resetTileAnimation("animate__fadeIn");
        }, 800);
    }

    function deleteLetter() {
        guess.pop();

        const lastLetterEl = document.getElementById(String(squareId - 1));

        lastLetterEl.textContent = "";
        squareId--;
    }

    function updateGuess(letter, rowNum) {
        if (guess.length < rowNumLetters[rowNum]) {
            guess.push(letter);

            const square = document.getElementById(String(squareId));
            squareId = squareId + 1;
            square.textContent = letter;
        }
    }
    
    function submitGuess() {
        if (guess.length !== rowNumLetters[rowNum]) {
            tileAnimationIncorrect();
            resetTileAnimation("animate__shakeX");
            window.alert("Not enough letters");
            return;
        }
        guessStr = guess.join("");
        if (guessStr == answers[rowNum]) {
            tileAnimationCorrect();
            if (rowNum === numRows - 1) {
                window.alert("Congrats!");
                gameOver = true;
                return;
            }
            rowNum++;
            guess = [];
            updateQuestion();
        }
        else {
            tileAnimationIncorrect();
            resetTileAnimation("animate__shakeX");
        }
    }

    function createSquares() {
        const gameBoard = document.getElementById("board");
        
        let id = 0;
        for (let i = 0; i < numRows; i++) {
            let boardRow = document.createElement("div");
            boardRow.classList.add("board-row");
            gameBoard.appendChild(boardRow);
            for (let j = 0; j < i + 2; j++) {
                let square = document.createElement("div");
                square.classList.add("square");
                square.classList.add("animate__animated");
                square.setAttribute("id", id);
                boardRow.appendChild(square);
                id++;
            }
        }
    }

    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            const letter = target.getAttribute("data-key");
            
            if (letter === "enter") {
                submitGuess();
                return;
            }
            if (letter === "del" && guess.length > 0) {
                deleteLetter();
                return;
            } else if (letter === "del") {
                return;
            }
            updateGuess(letter, rowNum);
        }
    }

    // Listen for key presses

});