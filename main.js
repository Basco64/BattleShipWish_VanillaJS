// var game = require("./game.js");
// var toolbox = require("./toolbox.js");

const alert = document.querySelector("#alert");
const player1Section = document.querySelector("#player1");
const player2Section = document.querySelector("#player2");
const inputBlock = document.querySelector("#inputBlock");
var nbShipInput = 0;

let currentPlayer = 1;
let gameIsInProgress = true;

let player1Points = 0;
let player2Points = 0;

function play(line, column) {
  playCell(line, column);
  let cellIA = IA.getCell();
  setTimeout(() => {
    playCell(cellIA.line, cellIA.column);
  }, 300);
}

function playCell(line, column) {
  if (gameIsInProgress) {
    game.playCell(line, column);
    game.displayGrid();
    if (game.checkEndOfGame(currentPlayer)) {
      endOfGame();
    }

    if (currentPlayer === 1 && gameIsInProgress) {
      currentPlayer = 2;
    } else if (currentPlayer === 2 && gameIsInProgress) {
      currentPlayer = 1;
    }
  }
}

function displayInitialization(nbShip) {
  game.numberCellPlayer1 = 0;
  game.numberCellPlayer2 = 0;

  let contentP1 =
    "<img src='./img/J1.png' class='bg-danger rounded-circle' /> <br/> <br/>";
  contentP1 += `<strong> ${player1Points} </strong>`;
  player1Section.innerHTML = contentP1;
  let contentP2 =
    "<img src='./img/J2.png' class='bg-info rounded-circle' />  <br/> <br/>";
  contentP2 += `<strong> ${player2Points} </strong>`;
  player2Section.innerHTML = contentP2;

  alert.classList.add("d-none");

  game.gameInitialization(nbShip);
  game.displayGrid();
  gameIsInProgress = true;
}

function endOfGame() {
  gameIsInProgress = false;
  let contentAlert = ` 🎉 <strong>  Le joueur ${currentPlayer} a gagné !! Félicitations !!  </strong> 🎉  <br/>`;
  contentAlert +=
    "<button type='button' class='btn btn-secondary'onClick= displayInitialization(" +
    nbShipInput +
    ") > Commencer une nouvelle manche </button>";
  displayAlert(contentAlert, 1);
  currentPlayer === 1 ? player1Points++ : player2Points++;
  currentPlayer = 1;
  inputBlock.classList.remove("d-none");
}

function displayAlert(txt, type) {
  if (type === 1) {
    alert.classList.add("alert-success");
    alert.classList.remove("alert-danger");
  } else {
    alert.classList.remove("alert-success");
    alert.classList.add("alert-danger");
  }
  alert.innerHTML = txt;
  alert.classList.remove("d-none");
}

function startGame() {
  nbShipInput = parseInt(document.querySelector("#nbShip").value);
  if (nbShipInput < 2)
    displayAlert("Le nombre de bateaux doit être au minimum de 2.", 2);

  if (nbShipInput > 4)
    displayAlert("Le nombre de bateaux doit être au maximum de 4.", 2);

  if (nbShipInput >= 2 && nbShipInput <= 4) {
    inputBlock.classList.add("d-none");
    displayInitialization(nbShipInput);
  }
}

addEventListener("click", function (event) {
  let target = event.target;
  if (target.id === "boom") {
    let img =
      "<img src='./img/explo/explosion00.png' id='explo' style='width:100px;height:100px;position:absolute;top:" +
      (event.clientY - 50) +
      "px;left:" +
      (event.clientX - 50) +
      "px' />";
    const body = document.querySelector("body");
    let element = document.createElement("p");
    element.innerHTML = img;
    body.appendChild(element);

    imageExplo(8);

    function imageExplo(timer) {
      let explo = document.querySelector("#explo");
      if (timer >= 0) {
        if (timer === 8)
          explo.setAttribute("src", "./img/explo/explosion01.png");
        if (timer === 7)
          explo.setAttribute("src", "./img/explo/explosion02.png");
        if (timer === 6)
          explo.setAttribute("src", "./img/explo/explosion03.png");
        if (timer === 5)
          explo.setAttribute("src", "./img/explo/explosion04.png");
        if (timer === 4)
          explo.setAttribute("src", "./img/explo/explosion05.png");
        if (timer === 3)
          explo.setAttribute("src", "./img/explo/explosion06.png");
        if (timer === 2)
          explo.setAttribute("src", "./img/explo/explosion07.png");
        if (timer === 1)
          explo.setAttribute("src", "./img/explo/explosion08.png");
        if (timer === 0) explo.remove(this);

        setTimeout(function () {
          imageExplo(timer - 1);
        }, 50);
      }
    }
  }
});

// function play(line, column) {
//   // let lineEntry = toolbox.integerEntry("Jouer en quelle ligne?");
//   // let columnEntry = toolbox.integerEntry("Jouer en quelle colonne?");
//   console.log(line + " : " + column);
//   let isOver = game.playCell(line, column);
//   game.displayGrid();
//   return isOver;
// }
