# Unbeatable TicTacToe

Game link: https://kingcashthefifth.github.io/unbeatable_TicTacToe/
My Code Pen: https://codepen.io/kingcashthefifth/pen/BbxKEo

![screenshot](/Screenshot.png)

_My take on the famous game theory MiniMax algorithm_ ;)

## Instructions

Just click on the game link and enjoy! :D

## Program flow process

Please refer to 'program_flowchart.pdf'.

## Minimax Algorithm explained

It is a decision rule used in decision theory, game theory, statistics, and philosophy for **mini**mizing the possible loss for a worst case (**max**imum loss) scenario. It is a decision making process for finding the least worst move in two player zero-sum games such as tic tac toe and checkers.

The core concept is that the algorithm will play out every possible series of moves and rank them based on who, if anyone, will win. Every possible move will have a whole series of possible counter moves (which will in turn have a series of counter-counter moves and so on).

The algorithm will traverse through these branches until each one reaches a terminal state, that is to say there is either a victor or a draw. The terminal states are given positive, negative, or zero rankings for minimax player victory, opponent victory, and draw respectively. Then the algorithm returns those terminal rankings back up the tree choosing to return either the minimum or the maximum value at each depth based on which player’s move it would be at that depth. This enables the player to select the least worst move in any given situation.

Lets go through a near end game example:

![alt text](https://cdn-images-1.medium.com/max/1600/1*7GmlTvk-MG-lBKgXhylW-w.jpeg "Image from Resources shown below")

X will be running the minimax algorithm and feeds in the current game state. Lets call this Depth 0. First the algorithm looks at all possible moves and checks if they are terminal. Lets call this set of possible moves Depth 1. In the left branch of Depth 1, X takes the middle square and results in a terminal state with X as the victor. This move returns +10.

The next two possible moves are not terminal. So the algorithm will go another level in depth and check the possible counter moves to the depth 1 branches. At Depth 2 of each branch, the algorithm will check all possible moves and rank them if they are terminal. One move is terminal with a victory for player O so that move gets a -10 rank. The other move is non-terminal so the algorithm will go one more level into Depth 3. At Depth 3 X takes the center and wins getting +10 rank.

Now the Depth 3 score is returned to the non-terminal branch of Depth 2, then the two terminal branches of Depth2 are returned to Depth 1. Depth 1 has now been returned two ranks which must be decided between. This is where the minimax algorithm gets its name. The algorithm wants to choose the best move for the current player AT THIS DEPTH. In this case it is O’s turn so the minimum rank -10 is returned.

Now all the way back at Depth 0 we have +10, -10, and -10 returned from the three possible Depth 1 moves. Because at Depth zero it is X’s turn, the algorithm will return the maximum rank (+10). This happens to be the winning move for X. The chosen move won’t always result in a winning move, but it will always choose the move which minimizes the player’s chance of losing, thus maximizing its chance of winning. If the opponent plays correctly this will result in a draw game of tic-tac-toe every time.

Minimax is a recursive function. This means that it calls itself on its output over and over until it reaches a ‘base case.’ Once a base case has been reached, then a value is returned. Since all the instances of the function are nested inside one another, once you reach a base case and return a value, you start a chain reaction where each instance of the function is able to return its value to the higher level instance. In minimax, the base case is the terminal branch and the returned value is the ranking of that terminal state.

The input to the minimax function is the current game state. First it checks if this game state is terminal and if so it ends the function and returns the state’s rank. If the state is not terminal then it creates a list of all possible moves from this state. Next it calls itself recursively on all these possible moves and appends the returned ranks for each of those moves into a list. Finally the function returns either the minimum or maximum value from that list, choosing to minimize or maximize based on which player’s turn it is.

This continuous process of calling the minimax function on each possible move works its way through every possible move in the tree and returns the rankings of each state depth by depth until it gets back to Depth 0 and returns the least worst move for the current player.

## Technologies

Javascript

- DOM manipulation
- Loops
- Functions
- Event Listeners

HTML

- Boilerplate and tags structuring

CSS (The usual basic properties)

## References

- **[Minimax Algorithm explanation](https://medium.com/@ssbothwell/lets-learn-algorithms-minimax-91487a1d5fb1)**
- **[Minimax Algorithm process flow visual animation](https://www.youtube.com/watch?v=zDskcx8FStA&t=45s)**
- **[Minimax Algorithm implementation in javascript from FreeCodeCamp](https://medium.freecodecamp.org/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37)**
