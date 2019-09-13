//Variables
var player = [];

if (localStorage.length > 0) {
player = JSON.parse(localStorage.getItem('player'))
}
//classes

class Player {
  constructor(player1, player2) {
    this.name1 = player1;
    this.name2 = player2;
  }
}

// Start.html
 document.querySelector('main').addEventListener('click', clickMain);

function clickMain() {
  startInputs();
}

 function startInputs() {
 console.log('yes');
   if (document.querySelectorAll('input')[0].value === "" || document.querySelectorAll('input')[0].value === "") {
    document.querySelector('.error-1').classList.add('no-hide');
   } else {
     var newPlayer = new Player(document.querySelectorAll('input')[0].value, document.querySelectorAll('input')[1].value);
     player.unshift(newPlayer);
     localStorage.setItem('player', JSON.stringify(player));
     document.querySelector('.error-1').classList.remove("no-hide");
   }
 }

 //directions.html

 window.addEventListener("load", names);

 function names() {
   if (player[0] != undefined &&  document.querySelector('.player1') != null) {
     document.querySelector('.player1').innerHTML = player[0].name1.toUpperCase();
     document.querySelector('.player2').innerHTML = player[0].name2.toUpperCase();
   }
 }
