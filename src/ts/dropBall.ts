const bucketContainer = document.querySelector(".bucket-container") as HTMLDivElement;
const scoreBoard = document.querySelector(".score-board") as HTMLDivElement;
import addToScoreBoard from "../helpers/addToScoreBoard";
import getSquareDistance from "../helpers/getSquareDistance";
import playSound from "../helpers/playSound";

const dropBall = (ball: HTMLDivElement) => {
  // Get initial ball position
  const ballStyles = window.getComputedStyle(ball);
  const ballTop = parseInt(ballStyles.top);
  const ballLeft = parseInt(ballStyles.left);

  let top = ballTop;
  let left = ballLeft;

  const interval = setInterval(() => {
    const ballRect = ball.getBoundingClientRect();
    const bucketRects = Array.from(bucketContainer.children).map((bucket) => bucket.getBoundingClientRect());

    // Check for collision with buckets
    const bucketIndex = bucketRects.findIndex(
      (bucketRect) =>
        ballRect.bottom >= bucketRect.top + bucketRect.width / 2 && ballRect.left < bucketRect.right && ballRect.right > bucketRect.left
    );

    // If collision detected
    if (bucketIndex !== -1) {
      clearInterval(interval);

      // Add score to scoreboard
      const bucket = bucketContainer.children[bucketIndex] as HTMLDivElement;
      addToScoreBoard(bucket, scoreBoard);

      // Remove the ball
      ball.remove();
    } else {
      // Simulate gravity
      top += 5;

      // Check for collision with pegs
      const pegs = document.querySelectorAll(".peg");
      pegs.forEach((peg) => {
        const pegRect = peg.getBoundingClientRect();
        // Get the center of the peg and ball
        const pegMid = { x: (pegRect.left + pegRect.right) / 2, y: (pegRect.top + pegRect.bottom) / 2 };
        const ballMid = { x: (ballRect.left + ballRect.right) / 2, y: (ballRect.top + ballRect.bottom) / 2 };

        // Check for collision
        if (
          getSquareDistance(pegMid.x, pegMid.y, ballMid.x, ballMid.y) < (ballRect.width / 2 + pegRect.width / 2) ** 2 &&
          ballRect.bottom >= pegRect.top
        ) {
          // Randomly deflect left or right on collision
          left += Math.random() < 0.5 ? -14 : 14;
          top -= 3;
          playSound("/sounds/collision.mp3", 0.6);
        }
      });

      // Update ball position
      ball.style.top = `${top}px`;
      ball.style.left = `${left}px`;
    }
  }, 50);
};

export default dropBall;
