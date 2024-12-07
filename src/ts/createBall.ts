const plinkoBoard = document.querySelector(".plinko-board") as HTMLDivElement;

const createBall = (): HTMLDivElement => {
  const ball = document.createElement("div");
  ball.classList.add("ball");
  plinkoBoard.appendChild(ball);
  return ball;
};

export default createBall;
