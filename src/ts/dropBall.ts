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
  const collidedPegs: Element[] = [];

  const intervalTimeMS = 50;
  let speedY = 100;

  // the amount vertical speed set after collision
  const boostY = -50;

  // s = ut + 1/2 at ** 2
  // dy = -vy + a/2 t**2
  // t = [ sqrt(vy ** 2 - ady) - vy ] / a

  const accelerationY = 500;
  const distanceBtwPegsX= 28;
  const distanceBtwPegsY = 48;
  const timeBtwCollisions = (Math.sqrt(boostY ** 2 + accelerationY * distanceBtwPegsY) - boostY) / accelerationY;
  
  console.log("Speed x:", timeBtwCollisions);  
  const speedX = 0.5 * distanceBtwPegsX / timeBtwCollisions;
  let dirX = 0;

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
      top += speedY * intervalTimeMS / 1000;
      speedY += accelerationY * intervalTimeMS / 1000;
      left += dirX * speedX * intervalTimeMS / 1000;

      // Check for collision with pegs
      const pegs = document.querySelectorAll(".peg");
      pegs.forEach((peg) => {
        const pegRect = peg.getBoundingClientRect();
        // Get the center of the peg and ball
        const pegMid = { x: (pegRect.left + pegRect.right) / 2, y: (pegRect.top + pegRect.bottom) / 2 };
        const ballMid = { x: (ballRect.left + ballRect.right) / 2, y: (ballRect.top + ballRect.bottom) / 2 };

        // Check for collision
        if (
          getSquareDistance(
            pegMid.x, pegMid.y, ballMid.x, ballMid.y) < (ballRect.width / 2 + pegRect.width / 2) ** 2 &&
            ballRect.bottom >= pegRect.top &&
            !collidedPegs.includes(peg) &&
            !collidedPegs.find((ele) => ele.getBoundingClientRect().top >= pegRect.top)
        ) {
          // on collision, set the ball directly above the peg and push the peg into collidedPegs to prevent further collision
          top =  pegRect.top - ballRect.height + (top - ballRect.top);
          collidedPegs.push(peg);

          // on collision, set the ball's x midpoint equal to the peg's x midpoint to prevent propagation of errors in x position
          left = pegRect.left + pegRect.width / 2 - ballRect.width/2 + (left - ballRect.left);
          // add bounce to the ball on collision
          speedY = boostY;
          // Randomly deflect left or right on collision
          dirX = Math.random() < 0.5 ? -1 : 1;
          playSound("/sounds/collision.mp3", 0.6);
        }
      });

      // Update ball position
      ball.style.top = `${top}px`;
      ball.style.left = `${left}px`;
    }
  }, intervalTimeMS);
};

export default dropBall;
