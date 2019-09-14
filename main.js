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


class Deck {
  constructor() {
    this.cards = [];
    this.matchedCards = [];
    this.selectedCards = [];
    this.matches = [];
  }

  shuffle() {
    var nums = [1,1,2,2,3,3,4,4,5,5];
    for (var i = 0; i < 10; i++) {
      var rand = Math.floor(Math.random() * nums.length);
      var card = new Card(nums[rand], i);
      deck.cards.push(card);
      document.querySelectorAll('.card')[i].classList.add(parseInt(deck.cards[i].matchInfo));
      document.querySelectorAll('.card')[i].id = deck.cards[i].id;
      nums.splice(rand, 1);
    }
  }

  checkSelectedCards() {
    if (this.selectedCards[0].matchInfo === this.selectedCards[1].matchInfo) {
      deckMatch(parseInt(document.querySelectorAll('.flip-vertical-right')[0].classList[1]));
      document.querySelectorAll('.flip-vertical-right')[0].classList.add('swing-out-top-fwd');
      document.querySelectorAll('.flip-vertical-right')[1].classList.add('swing-out-top-fwd');
      document.querySelectorAll('.flip-vertical-right')[1].classList.remove('flip-vertical-right');
      document.querySelectorAll('.flip-vertical-right')[0].classList.remove('flip-vertical-right');
      this.selectedCards.splice(0, 2)
    } else {
      this.selectedCards.splice(0, 2)
      setTimeout(flipBack, 2500)
    }
  }

  moveToMatched(card) {
    this.matchedCards.push(card)
  }
}

var deck = new Deck;

class Card {
  constructor(num, id) {
    this.matchInfo = num;
    this.matched = false;
    this.id = id;
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

deck.shuffle();

for (i = 0; i < document.querySelectorAll('.card').length; i++) {
  var random = Math.round(Math.random() * 360);
  document.querySelectorAll('.card')[i].style.transform = `rotate(${random}deg)`
}

function cardFlip(event) {
  // winnerMessage();
  if (document.querySelectorAll('.flip-vertical-right').length < 2) {
    event.target.closest('article').classList.add('flip-vertical-right');
    selectedCards();
    cardBack(event);
    deck.checkSelectedCards();
  }
}

function selectedCards() {
    for (i = 0; i < 10; i++) {
      if (deck.cards[i].id === parseInt(event.target.closest('article').id))
      {
        deck.selectedCards.push(deck.cards[event.target.closest('article').id])
      }
    }
    }

function deckMatch(match) {
  for (i = 0; i < 10; i++) {
    if (deck.cards[i].matchInfo === match)
    {
      deck.cards[i].match();
      deck.moveToMatched(deck.cards[i]);
    }
  }
}

// function winnerMessage() {
//   for (i = 0; i < 10; i++) {
//
//   }
//   document.querySelector('main').innerHTML = `<section class="text-center margin-auto directions">
//     <h2 class="player-welcome">WECLOME <span class="player1"></span> AND <span class="player2"></span>!</h2>
//     <article class="text-left">
//
//     </article>
//     <a href="game.html" class="block"><button type="button" name="button" class="play-game">PLAY GAME</button></a>
//   </section>`
//   }


function flipBack() {
    document.querySelectorAll('.flip-vertical-right')[0].innerHTML = "B";
    document.querySelectorAll('.flip-vertical-right')[1].innerHTML = "B";
    document.querySelectorAll('.flip-vertical-right')[1].classList.remove('flip-vertical-right');
    document.querySelectorAll('.flip-vertical-right')[0].classList.remove('flip-vertical-right');
}

function gameNames() {
  document.querySelector('.game-player-name-1').innerHTML = player[0].name1.toUpperCase();
  document.querySelector('.game-player-name-2').innerHTML = player[0].name2.toUpperCase();
}

function cardBack(event) {
  event.target.closest('article').innerHTML = `<img style="
       height: 130px; width:85px" src="img/bey${event.target.closest('article').classList[1]}.jpg"/>`
}
