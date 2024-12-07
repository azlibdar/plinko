const plinkoBoard = document.querySelector(".plinko-board") as HTMLDivElement;

const createPlinkoBoard = () => {
  const rows = 10; // Total number of rows
  const startingPegs = 3; // Pegs in the first row
  const endingPegs = 12; // Pegs in the last row

  for (let i = 0; i < rows; i++) {
    const row = document.createElement("div");
    row.classList.add("row");

    // Determine the number of pegs in the current row
    const pegsInRow = startingPegs + (endingPegs - startingPegs) * (i / (rows - 1));

    for (let j = 0; j < pegsInRow; j++) {
      const peg = document.createElement("div");
      peg.classList.add("peg");
      row.appendChild(peg);
    }

    plinkoBoard.appendChild(row);
  }
};

export default createPlinkoBoard;
