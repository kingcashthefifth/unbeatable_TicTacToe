let playCounter = 0;
let p1score = 0;
let p2score = 0;
let userNamep1;
let userNamep2;
let listItems = document.querySelectorAll(".boxCss");
let resetButton = document.querySelector("#resetButton");

let consoleInform = () => {
  console.log("Loaded!");

  for (i = 0; i < listItems.length; i++) {
    listItems[i].addEventListener("click", showXorO);
  }

  resetButton.addEventListener("click", resetGame);

  if (Math.ceil(Math.random() * 100) <= 50) {
    aiTurn();
  }
};

let checkTie = () => {
  if (!checkWin("X") && playCounter == 9) {
    return true;
  } else if (!checkWin("O") && playCounter == 9) {
    return true;
  } else {
    return false;
  }
};

let checkWin = symbol => {
  let gettop1 = document.querySelector("#toprow1").innerText;
  let gettop2 = document.querySelector("#toprow2").innerText;
  let gettop3 = document.querySelector("#toprow3").innerText;
  let getmid1 = document.querySelector("#midrow1").innerText;
  let getmid2 = document.querySelector("#midrow2").innerText;
  let getmid3 = document.querySelector("#midrow3").innerText;
  let getbot1 = document.querySelector("#botrow1").innerText;
  let getbot2 = document.querySelector("#botrow2").innerText;
  let getbot3 = document.querySelector("#botrow3").innerText;
  if (
    (symbol == gettop1 && gettop1 == gettop2 && gettop2 == gettop3) ||
    (symbol == getmid1 && getmid1 == getmid2 && getmid2 == getmid3) ||
    (symbol == getbot1 && getbot1 == getbot2 && getbot2 == getbot3) ||
    (symbol == gettop1 && gettop1 == getmid1 && getmid1 == getbot1) ||
    (symbol == gettop2 && gettop2 == getmid2 && getmid2 == getbot2) ||
    (symbol == gettop3 && gettop3 == getmid3 && getmid3 == getbot3) ||
    (symbol == gettop1 && gettop1 == getmid2 && getmid2 == getbot3) ||
    (symbol == gettop3 && gettop3 == getmid2 && getmid2 == getbot1)
  ) {
    return true;
  } else {
    return false;
  }
};

let playAgain = () => {
  let p1 = document.querySelector("#p1name").innerText;
  let p2 = document.querySelector("#p2name").innerText;
  if (playCounter % 2 == 0) {
    p2score++;
    playCounter = 9;
    document.querySelector("#p2score").innerText = p2score;
    alert(
      "Congratulations! " +
        p2 +
        ' won!\nPlease click "Reset" button for a rematch!'
    );
  } else if (playCounter % 2 !== 0) {
    p1score++;
    playCounter = 9;
    document.querySelector("#p1score").innerText = p1score;
    alert(
      "Congratulations! " +
        p1 +
        ' won!\nPlease click "Reset" button for a rematch!'
    );
  }
};

let alertWin = playerName => {
  if (input !== "") {
    alert("Choose an empty box");
  }
  return;
};

let showXorO = function() {
  console.log(`this.innerText: `, this.innerText);
  if (playCounter == 9) {
    alert(`Game has ended. Please click "Reset button for a rematch!`);
    return;
  }
  if (checkTie()) {
    alert(`It's a tie! Please click "Reset" button for a rematch!`);
    return;
  } else if (checkWin("X")) {
    alert(`Game has ended. Please click "Reset button for a rematch!`);
    return;
  } else if (this.innerText !== "") {
    alert("Choose an empty box.");
    return;
  }
  playCounter++;
  this.innerText = "X";
  if (checkWin("X")) {
    alert(`Congratulations! X won! Please click "Reset" button for a rematch!`);
    return;
  }
  if (checkTie()) {
    alert(`It's a tie! Please click "Reset" button for a rematch!`);
    return;
  }
  aiTurn();
};

let getTestArray = () => {
  let tempArr = [];
  for (let i = 0; i < listItems.length; i++) {
    tempArr.push({
      id: listItems[i].id,
      content: listItems[i].innerText
    });
  }
  return tempArr;
};

let aiTurn = () => {
  let testThisArr = getTestArray();
  // console.log("testThisArr passing to minimax: ", testThisArr);
  let bestPosition = minimax(testThisArr, "O");
  document.querySelector(`#${bestPosition.id}`).innerText = "O";
  playCounter++;
  if (checkWin("O")) {
    alert(`Congratulations! O won! Please click "Reset" button for a rematch!`);
    return;
  }
  if (checkTie()) {
    alert(`It's a tie! Please click "Reset" button for a rematch!`);
    return;
  }
};

let minimaxCheckWin = (arr, symbol) => {
  if (
    (symbol == arr[0].content &&
      symbol == arr[1].content &&
      symbol == arr[2].content) ||
    (symbol == arr[3].content &&
      symbol == arr[4].content &&
      symbol == arr[5].content) ||
    (symbol == arr[6].content &&
      symbol == arr[7].content &&
      symbol == arr[8].content) ||
    (symbol == arr[0].content &&
      symbol == arr[3].content &&
      symbol == arr[6].content) ||
    (symbol == arr[1].content &&
      symbol == arr[4].content &&
      symbol == arr[7].content) ||
    (symbol == arr[2].content &&
      symbol == arr[5].content &&
      symbol == arr[8].content) ||
    (symbol == arr[0].content &&
      symbol == arr[4].content &&
      symbol == arr[8].content) ||
    (symbol == arr[2].content &&
      symbol == arr[4].content &&
      symbol == arr[6].content)
  ) {
    return true;
  } else {
    return false;
  }
};

let minimaxCheckTie = arr => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].content == "") {
      return false;
    }
  }
  if (!minimaxCheckWin(arr, "X") && !minimaxCheckWin(arr, "O")) {
    return true;
  }
};

let minimax = (arr, symbol) => {
  if (minimaxCheckWin(arr, "X")) {
    return { score: -10 };
  }
  if (minimaxCheckWin(arr, "O")) {
    return { score: 10 };
  }
  if (minimaxCheckTie(arr)) {
    return { score: 0 };
  }

  let availMoves = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].content == "") {
      let move = {};
      move.id = arr[i].id;
      arr[i].content = symbol;

      if (symbol == "O") {
        let result = minimax(arr, "X");
        // console.log(`human result: `, result);
        move.score = result.score;
      } else {
        let result = minimax(arr, "O");
        // console.log(`ai result: `, result);
        move.score = result.score;
      }
      arr[i].content = "";
      availMoves.push(move);
    }
  }

  let bestMove;
  if (symbol == "O") {
    let bestScore = -10000;
    for (let i = 0; i < availMoves.length; i++) {
      if (availMoves[i].score > bestScore) {
        bestScore = availMoves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = 10000;
    for (let i = 0; i < availMoves.length; i++) {
      if (availMoves[i].score < bestScore) {
        bestScore = availMoves[i].score;
        bestMove = i;
      }
    }
  }
  return availMoves[bestMove];
};

let resetGame = () => {
  playCounter = 0;
  for (i = 0; i < listItems.length; i++) {
    listItems[i].innerText = "";
  }
  if (Math.ceil(Math.random() * 100) <= 50) {
    aiTurn();
  }
};

// let addName = (input, node) => {
//   if (userNamep1 == null || userNamep1 == "") {
//     return;
//   } else {
//     document.querySelector(node).innerText = input;
//   }
// };

document.addEventListener("DOMContentLoaded", consoleInform);

// setTimeout((userNamep1 = prompt("Player 1 name? (X)")), 1000);
// addName(userNamep1, "#p1name");
// setTimeout((userNamep2 = prompt("Player 2 name? (O)")), 1000);
// addName(userNamep2, "#p2name");
