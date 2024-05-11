
let currentPlayer = "X";
let gameMode = 0; // 0 - Against Computer, 1 - 2 Players
let gameOver = false;

document.addEventListener('click', function (event) {
  if (!stateFullscreen()) {
    openFullscreen();
    document.getElementById("splashContainer").setAttribute("hidden", "");
    document.getElementById("container").removeAttribute("hidden");
  }
});

function loadGame() {
  startGame();
}

function stateFullscreen() {
  return !(!document.fullscreenElement &&    // alternative standard method
    !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement);
}

function openFullscreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

function getPlayerClassImage(player) {
  let playerImage;
  switch (player) {
    case "X":
      playerImage = "p1";
      break;
    case "O":
    default:
      playerImage = "p2";
      break;
  }

  return playerImage;
}

function startGame() {
  board = document.getElementById("board");
  board.innerHTML = "";
  currentPlayer = "X";
  gameOver = false;
  createBoard();
}

function changeGameMode() {
  gameMode = parseInt(
    (document.getElementById("mode")).value
  );
  startGame();
}

function createBoard() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = i.toString();
      cell.dataset.col = j.toString();
      cell.addEventListener("click", () => {
        if (!gameOver && cell.innerHTML === "") {
          cell.innerHTML = "<span class='"+getPlayerClassImage(currentPlayer)+"'></span>";
          checkWinner();
          if (!gameOver) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            if (gameMode === 0 && currentPlayer === "O") {
              computerMove();
            }
          }
        }
      });
      board.appendChild(cell);
    }
  }
}

function checkWinner() {
  const cells = document.getElementsByClassName("cell");
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      cells[a].innerHTML !== "" &&
      cells[a].innerHTML === cells[b].innerHTML &&
      cells[a].innerHTML === cells[c].innerHTML
    ) {
      gameOver = true;
      setTimeout(() => {
        alert(`${(cells[a].childNodes[0].className == "p1" ? "Первый" : "Второй")} игрок победил!`);
        startGame();
      }, 100);
      return;
    }
  }

  if ([...cells].every((cell) => cell.innerHTML !== "")) {
    gameOver = true;
    setTimeout(() => {
      alert("Ничья!");
      startGame();
    }, 100);
  }
}

function computerMove() {
  const emptyCells = [...document.getElementsByClassName("cell")].filter(
    (cell) => cell.innerHTML === ""
  );
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const cell = emptyCells[randomIndex];
  currentPlayer = "X";
  cell.innerHTML = "<span class='"+getPlayerClassImage("O")+"'></span>";
  checkWinner();
}
