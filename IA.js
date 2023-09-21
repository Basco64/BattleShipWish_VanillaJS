var IA = {
  getCell: function () {
    let possibleCell = this.getAllPossibleCell();
    let cell = this.getBestRandomCellWithWeight(possibleCell);
    return cell;
  },

  getAllPossibleCell: function () {
    let emptyCell = [];
    for (let i = 0; i < game.lineTotal; i++) {
      for (let j = 0; j < game.columnTotal; j++) {
        if (game.grid[i][j] === 0 || game.grid[i][j] === 1) {
          let cell = {
            line: i,
            column: j,
            weight: this.getWeightCell(i, j),
          };
          emptyCell.push(cell);
        }
      }
    }
    return emptyCell;
  },

  getWeightCell: function (line, column) {
    let cellWeight = 1;

    if (column + 1 < game.columnTotal && game.grid[line][column + 1] === 4)
      cellWeight++;

    if (column - 1 >= 0 && game.grid[line][column - 1] === 4) cellWeight++;

    if (line + 1 < game.lineTotal && game.grid[line + 1][column] === 4)
      cellWeight++;

    if (line - 1 >= 0 && game.grid[line - 1][column] === 4) cellWeight++;

    return cellWeight;
  },

  getBestRandomCellWithWeight: function (cell) {
    let bestCell = 0;
    let bestCells = [0];
    for (let i = 1; i < cell.length; i++) {
      if (cell[i].weight > cell[bestCell].weight) {
        bestCell = i;
        bestCells = new Array();
        bestCells.push(i);
      } else if (cell[i].weight === cell[bestCell].weight) {
        bestCells.push(i);
      }
    }
    let randomCell = Math.floor(Math.random() * bestCells.length);
    return cell[bestCells[randomCell]];
  },
};
