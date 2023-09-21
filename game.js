// var toolbox = require("./toolbox.js");

var game = {
  columnTotal: 5,
  lineTotal: 5,
  grid: [],

  numberCellPlayer1: 0,
  numberCellPlayer2: 0,

  gameInitialization: function (nbShip) {
    this.columnTotal = nbShip * 2 + 1;
    this.lineTotal = nbShip * 2 + 1;

    this.grid = toolbox.initializeEmptyArray(
      this.lineTotal,
      this.columnTotal,
      0
    );
    for (let i = 1; i <= nbShip; i++) {
      this.shipPosition(i + 1, 1);
      this.numberCellPlayer1 += i + 1;
      this.shipPosition(i + 1, 2);
      this.numberCellPlayer2 += i + 1;
    }
  },

  shipPosition: function (size, player) {
    let ship = {};
    let finalPosition = false;
    while (!finalPosition) {
      let xMax = 0;
      let yMax = 0;
      let isHorizontal = Math.floor(Math.random() * 2);
      if (isHorizontal) {
        xMax = this.lineTotal - (size - 1);
        yMax = this.columnTotal;
      } else {
        xMax = this.lineTotal;
        yMax = this.columnTotal - (size - 1);
      }
      let xAlea = Math.floor(Math.random() * xMax);
      let yAlea = Math.floor(Math.random() * yMax);

      let isEmptyCell = true;

      for (var i = 1; i <= size && isEmptyCell; i++) {
        ship["case" + i] = this.getCellCreationShip(
          xAlea,
          yAlea,
          isHorizontal,
          i
        );
        isEmptyCell = this.checkEmptyCell(ship["case" + i]);
      }
      if (isEmptyCell) finalPosition = true;
    }
    this.saveGrid(ship, player);
  },

  getCellCreationShip: function (xAlea, yAlea, isHorizontal, numCell) {
    let cell = {};
    if (isHorizontal) {
      cell.x = xAlea + (numCell - 1);
      cell.y = yAlea;
    } else {
      cell.x = xAlea;
      cell.y = yAlea + (numCell - 1);
    }
    return cell;
  },

  checkEmptyCell: function (cell) {
    if (this.grid[cell.x][cell.y] === 0) return true;
    return false;
  },

  saveGrid: function (ship, player) {
    for (var cell in ship) {
      this.grid[ship[cell].x][ship[cell].y] = player;
    }
  },

  displayGrid: function () {
    // for (let i = 0; i < this.lineTotal; i++) {
    //   var txt = "";
    //   for (let j = 0; j < this.columnTotal; j++) {
    //     txt += "| ";
    //     if (this.grid[i][j] === 0) {
    //       txt += "_";
    //     } else if (this.grid[i][j] === 1) {
    //       txt += "x";
    //     } else if (this.grid[i][j] === 2) {
    //       txt += "o";
    //     } else if (this.grid[i][j] === 3) {
    //       txt += "a";
    //     }
    //     txt += " |";
    //   }
    //   console.log(txt);
    // }

    const game = document.querySelector("#game");
    game.innerHTML = "";
    let ratio = 100 - (10 * (this.columnTotal - 9) + 1);

    var content = "<table>";
    for (let i = 0; i < this.lineTotal; i++) {
      content += " <tr>";
      for (let j = 0; j < this.columnTotal; j++) {
        content +=
          "<td class='border border-black text-center' style='width:" +
          ratio +
          "px;height:" +
          ratio +
          "px' >";
        if (this.grid[i][j] === 0) {
          content +=
            "<button class='btn btn-secondary' onClick='play(" +
            i +
            "," +
            j +
            ")'>Tirer</button>";
        }
        if (this.grid[i][j] === 1) {
          content +=
            "<img src='./img/J1.png' style='width:" +
            ratio +
            "px;height:" +
            ratio +
            "px' class='bg-danger rounded-circle' />";
        }

        if (this.grid[i][j] === 2) {
          content +=
            "<button id='boom' class='btn btn-secondary' onClick='play(" +
            i +
            "," +
            j +
            ")'>Tirer</button>";
          // content +=
          //   "<img src='./img/J2.png' class='bg-info rounded-circle' />";
        }

        if (this.grid[i][j] === 3) {
          content +=
            "<img src='./img/croix.png' style='width:" +
            ratio +
            "px;height:" +
            ratio +
            "px' />";
        }

        if (this.grid[i][j] === 4) {
          content +=
            "<img src='./img/croix.png' class='bg-danger rounded-circle' style='width:" +
            ratio +
            "px;height:" +
            ratio +
            "px'' />";
        }
        if (this.grid[i][j] === 5) {
          content +=
            "<img src='./img/croix.png' class='bg-info rounded-circle' style='width:" +
            ratio +
            "px;height:" +
            ratio +
            "px'  />";
        }
        content += "</td>";
      }
      content += " </tr>";
    }

    content += "</table>";

    game.innerHTML = content;
  },

  playCell: function (line, column) {
    if (this.grid[line][column] === 0) {
      this.grid[line][column] = 3;
    }
    if (this.grid[line][column] === 1) {
      this.numberCellPlayer1--;
      this.grid[line][column] = 4;
    }
    if (this.grid[line][column] === 2) {
      this.numberCellPlayer2--;
      this.grid[line][column] = 5;
    }
  },

  checkEndOfGame: function () {
    if (this.numberCellPlayer1 <= 0 || this.numberCellPlayer2 <= 0) return true;
  },
};
