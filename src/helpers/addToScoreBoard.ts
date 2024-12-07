import playSound from "./playSound";

const addToScoreBoard = (bucket: HTMLDivElement, targetElement: HTMLDivElement) => {
  const score = bucket.textContent || "0";
  const scoreElement = document.createElement("div");
  scoreElement.classList.add("score");
  scoreElement.textContent = `${score}x`;

  if (parseInt(score) > 0) {
    scoreElement.classList.add("win");
    playSound("/sounds/cash-register.wav", 0.1);
  }
  targetElement.appendChild(scoreElement);

  scoreElement.scrollIntoView({ behavior: "smooth" });
  return;
};

export default addToScoreBoard;
