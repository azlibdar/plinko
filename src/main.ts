import createPlinkoBoard from "./ts/createPlinkoBoard";
import createBall from "./ts/createBall";
import dropBall from "./ts/dropBall";
import "./style.css";

const startButton = <HTMLButtonElement>document.getElementById("start-button");

// Start the game
startButton.addEventListener("click", () => {
  const ball = createBall();
  dropBall(ball);
});

createPlinkoBoard();
