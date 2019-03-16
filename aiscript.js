// ==========================================================
// Declaring all global variables
let playCounter = 0;
let listItems = document.querySelectorAll(".boxCss");
let resetButton = document.querySelector("#resetButton");
// ==========================================================

let consoleInform = () => {
  console.log("Loaded!");
  // on DOMContentLoaded, add event listeners to DOM elements
  for (i = 0; i < listItems.length; i++) {
    listItems[i].addEventListener("click", showXorO);
  }

  resetButton.addEventListener("click", resetGame);

  // randoms AI or Human starting turn

  if (Math.ceil(Math.random() * 100) <= 50) {
    aiTurn();
  }
};

// function for checking tie condition based on current DOM elements
let checkTie = () => {
  if (!checkWin("X") && playCounter == 9) {
    return true;
  } else if (!checkWin("O") && playCounter == 9) {
    return true;
  } else {
    return false;
  }
};

// function for checking win condition based on current DOM elements
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

// on click, execute Human turn and input symbol, then pass to AI turn
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

// get an instance of current game board, simulated as an array of objects
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
  // executing AI's turn: get an instance of gameboard "testThisArr", pass "testThisArr"
  // to minimax function to find best move and save it to "bestPostiion".
  let testThisArr = getTestArray();
  let bestPosition = minimax(testThisArr, "O");

  // set the symbol to DOM based on the best position
  document.querySelector(`#${bestPosition.id}`).innerText = "O";
  playCounter++;

  // check for win or tie
  if (checkWin("O")) {
    alert(`Congratulations! O won! Please click "Reset" button for a rematch!`);
    return;
  }
  if (checkTie()) {
    alert(`It's a tie! Please click "Reset" button for a rematch!`);
    return;
  }
};

// function for checking win condition based on minimax gameboard instance simulated with array of objects
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

// function for checking tie condition based on minimax gameboard instance simulated with array of objects
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
  // ===================  part 1  ============================
  // checking if at this point of gameboard instance, is there
  // any win or tie conditions met? If condition fulfilled,
  // straightaway return the score.

  // if no conditions are fulfilled, means there are more moves
  // to be tested, moving on to part 2

  if (minimaxCheckWin(arr, "X")) {
    return {
      score: -10
    };
  }
  if (minimaxCheckWin(arr, "O")) {
    return {
      score: 10
    };
  }
  if (minimaxCheckTie(arr)) {
    return {
      score: 0
    };
  }

  // ===================  part 2  ============================
  // loop through the available moves and push to an array for
  // choosing later at part 3
  //
  // during each loop, input a spot in the game board
  // instance and pass this new instance into a 2nd minimax function
  // to check for another win/tie condition.
  //
  // if conditions are met at the 2nd minimax function, return the
  // score back into this 1st minimax function's "result" variable
  // and put it inside a temp object.
  //
  // Push the object into the array.
  //
  // Once loop is finished, move on to part 3
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

  // ===================  part 3  ============================
  // with the completed "availMoves" array, now we determine
  // out of all moves, which is the best to make at this current
  // minimax function
  //
  // first we determine who's turn is it by checking the "symbol"
  // argument. if symbol == "O", this means the one deciding which
  // is the best move now is the AI. Vice versa if symbol == "X".
  //
  // if it's the AI's turn, the highest score will be the best move.
  // (refer to part 1, (if AI win condition, return score: 10))
  // if there are a few same scores, minimax will take the first
  // among all the same scores.
  //
  // if it's the Human's turn for this minimax function instance,
  // human will want to choose the move with the least score.
  // (refer to part 1, (if Human win condition, return score: -10))
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
  // return the final best move after traversing all moves of this
  // minimax instance
  return availMoves[bestMove];
};

// when reset button clicked, resetGame function fired.
// resets all DOM boxes to empty again
// resets playCounter back to 0 for reseting tie condition
// randoms AI or Human starting turn
let resetGame = () => {
  playCounter = 0;
  for (i = 0; i < listItems.length; i++) {
    listItems[i].innerText = "";
  }
  if (Math.ceil(Math.random() * 100) <= 50) {
    aiTurn();
  }
};
// adding event listener to document, on DOMContentLoaded, execute consoleInform callback function
document.addEventListener("DOMContentLoaded", consoleInform);
