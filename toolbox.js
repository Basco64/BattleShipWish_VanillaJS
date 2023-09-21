// var readline = require("readline-sync");

var toolbox = {
  stringEntry: function (txt) {
    return readline.question(txt);
  },

  integerEntry: function (txt) {
    return parseInt(readline.question(txt));
  },

  initializeEmptyArray: function (nbLines, nbColumns, character = '') {
    let arr = [];

    for (let i = 0; i < nbLines; i++) {
      let line = [];
      for (let j = 0; j < nbColumns; j++) {
        line.push(character);
      }
      arr.push(line);
    }
    return arr;
  },
};
