//Variables
var player = [];
var deck = [];

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
//
// Each card should get its data from an object instance of a Card class
// Each card should have a matchInfo property which will hold the same value as the card that matches it. You can determine how to format that matching value. Each card should also have a matched property, a boolean, that will default to false and toggle to true once a match has been made.
// Each card should have a method match on it
// All card object instances should be held in the Deck class
// The Deck should have cards, matchedCards, selectedCards, and matches as properties. The Deck should have the following methods: shuffle, checkSelectedCards, and moveToMatched. If you find a need for additional methods, write/use them!

class Deck {
  constructor() {
    this.cards = 0;
    this.matchedCards = 0;
    this.selectedCards = 0;
    this.matches = 0;
  }

  shuffle() {

  }

  checkSelectedCards() {

  }

  moveToMatched() {

  }
}

class Card {
  constructor(num) {
    this.matchInfo = num;
    this.matched = false;
  }

  match() {
    this.matched = true;
  }
}

// Start.html
 document.querySelector('main').addEventListener('click', clickMain);

function clickMain() {
  if (window.location.href.indexOf("start") > -1) {
         startInputs()
       }
  cardFlip(event);
}

 function startInputs() {
   if (document.querySelectorAll('input')[0] === undefined || document.querySelectorAll('input')[0].value === "" || document.querySelectorAll('input')[1] === undefined || document.querySelectorAll('input')[1].value === "") {
    document.querySelector('.play-game').disabled = true;
    document.querySelector('.error-1').classList.add('no-hide')
  } else {
     document.querySelector('.play-game').disabled = false;
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
  if (player[0] != undefined &&  document.querySelector('.game-player-name-1') != null) {
     document.querySelector('.game-player-name-1').innerHTML = player[0].name1.toUpperCase();
     document.querySelector('.game-player-name-2').innerHTML = player[0].name2.toUpperCase();
   }
 }

 //game.html
 for (i = 0; i < document.querySelectorAll('.card').length; i++) {
  var random = Math.round(Math.random() * 360);
 document.querySelectorAll('.card')[i].style.transform = `rotate(${random}deg)`
}

function cardFlip(event) {
  winner();
  if (document.querySelectorAll('.flip-vertical-right').length < 2) {
 event.target.closest('article').classList.add('flip-vertical-right');
}
  if (document.querySelectorAll('.flip-vertical-right')[0].classList.toString() === document.querySelectorAll('.flip-vertical-right')[1].classList.toString()) {
    document.querySelectorAll('.flip-vertical-right')[0].classList.add('swing-out-top-fwd');
    document.querySelectorAll('.flip-vertical-right')[1].classList.add('swing-out-top-fwd');
    flipBack()
  } else {
    setTimeout(flipBack, 2000)
  }

}

function winner() {
// if (document.querySelectorAll('.swing-out-top-fwd').length === 10) {
  document.querySelector('main').innerHTML = `<section class="text-center margin-auto directions">
    <h2 class="player-welcome">WECLOME <span class="player1"></span> AND <span class="player2"></span>!</h2>
    <article class="text-left">

    </article>
    <a href="game.html" class="block"><button type="button" name="button" class="play-game">PLAY GAME</button></a>
  </section>`
// }
}

function flipBack() {
    document.querySelectorAll('.flip-vertical-right')[1].classList.remove('flip-vertical-right');
    document.querySelectorAll('.flip-vertical-right')[0].classList.remove('flip-vertical-right');
}

function gameNames() {
  document.querySelector('.game-player-name-1').innerHTML = player[0].name1.toUpperCase();
  document.querySelector('.game-player-name-2').innerHTML = player[0].name2.toUpperCase();
}


function cardNumber() {
var nums = [1,1,2,2,3,3,4,4,5,5];
for (var i = 0; i < 10; i++) {
  var rand = Math.floor(Math.random() * nums.length);
  document.querySelectorAll('.card')[i].classList.add(nums[rand])
  nums.splice(rand, 1)
}
}

// class Card {
//   constructor(num) {
//     this.matchInfo = num;
//     this.matched = false;
//   }
//
//   match() {
//     this.matched = true;
//   }
// }


function cardBack() {
for (var i = 0; i < 5; i++) {
  var card = new Card(i)
  document.querySelectorAll('.card')[i].innerHTML = document.querySelectorAll('.card')[0].innerHTML = `<img style="
    height: 130px; width:85px" src="img/bey${i}.jpg" />
"<img style="height: 130px; width:85px"/>`
}
}
