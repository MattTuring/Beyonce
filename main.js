//Variables
var player = [];
var gameStart = Math.round(Date.now()/1000);

if (localStorage.length > 0) {
player = JSON.parse(localStorage.getItem('player'))
}
//classes

class Player {
  constructor(player1, player2) {
    this.name1 = player1;
    this.name2 = player2;
    this.score = 0;
  }
}


class Deck {
  constructor() {
    this.cards = [];
    this.matchedCards = [];
    this.selectedCards = [];
    this.matches = 0;
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
    setTimeout(winner(), 1100)
    this.matches += .5;
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
 document.querySelector('nav').addEventListener('click', clickNav);
document.querySelector('main').addEventListener('input', input);

function input() {
  startInputs(event);
}

function clickNav() {
    scoreBoard(event);
}
function clickMain() {
  if (document.querySelectorAll('.card').length === 10) {
    cardFlip(event);
  }
  if (document.querySelector('.play-game').disabled === false && document.querySelectorAll('input').length === 2) {
    var newPlayer = new Player(document.querySelectorAll('input')[0].value, document.querySelectorAll('input')[1].value);
    player.unshift(newPlayer);
    localStorage.setItem('player', JSON.stringify(player));
    directions(event);
  }
  if (document.querySelector('.text-left') != null && document.querySelector('.text-left').innerText.length === 583 && event.target.classList.contains('go')) {
    game(event);
  }
}
 function startInputs(event) {
   if (document.querySelectorAll('input').length === 2) {
    inputError();
  }
 }

function inputError() {
  if (document.querySelectorAll('input')[0] === undefined || document.querySelectorAll('input')[0].value === "" || document.querySelectorAll('input')[1] === undefined || document.querySelectorAll('input')[1].value === "") {
    document.querySelector('.play-game').disabled = true;
    document.querySelector('.error-1').classList.add('no-hide');
  } else {
      document.querySelector('.play-game').disabled = false;
      document.querySelector('.error-1').classList.remove("no-hide");
   }
}

function scoreBoard(event) {
  if (event.target.classList.contains('nav-menu') && document.querySelector('aside').classList.contains('no-hide') != true) {
  document.querySelector('aside').classList.add('no-hide')
  document.querySelector('.scores').innerHTML = ""
  for (var i = 0; i < 5; i++) {
  document.querySelector('.scores').innerHTML += `<p>${i + 1}. ${sorter()[i].name} ${sorter()[i].score}<p>`
}
} else {
      document.querySelector('aside').classList.remove('no-hide')
  }
}

 function directions(event) {
   if (event.target.classList.contains('play-game')){
   document.querySelector('main').innerHTML =
   `<section class="text-center margin-auto directions">
     <h2 class="player-welcome">WECLOME <span class="player1"></span> AND <span class="player2"></span>!</h2>
     <article class="text-left">
       <p>The goal of the game is to find all 5 pairs of cards as quickly as possible. The player tht finds the greatest number of pairs, wins.</p>
       <p>To begin playing, the player whose name is highlighted can click any card in the pile. It will flip over and reveal a picture of Beyonce. Click another card. If they match, they will disappear and you will have completed a match! If they don't, you'll have three seconds to look at them before they flip over. Then it's time for the other player to try!</p>
       <p>After you play, you'll see the name of the final winner and how long it took to win the game.</p>
     </article>
    <button type="button" name="button" class="play-game go">PLAY GAME</button>
   </section>`
   names();
 }
 }


 function game(event) {
     document.querySelector('main').classList.add('game');
     document.querySelector('main').innerHTML = `<section class="game-player1 text-center">
             <h2 class="game-player-name-1"></h2>
             <p class="top-player-1"></p>
             <hr>
             <p>MATCHES THIS ROUND</p>
             <span class="matched bold">0</span>
             <hr>
             <h3>GAME WINS</h3>
           </section>
           <section class="game-cards">
             <div class="row-1">
               <span>
               <article class="card">
                 B
               </article>
               </span>
               <span>
               <article class="card">
                 B
               </article>
               </span>
               <span>
               <article class="card">
                 B
               </article>
               </span>
             </div>
             <div class="row-2">
               <span>
               <article class="card">
                 B
               </article>
               </span>
               <span>
               <article class="card">
                 B
               </article>
               </span>
               <span>
               <article class="card">
                 B
               </article>
               </span>
               <span>
               <article class="card">
                 B
               </article>
               </span>
             </div>
             <div class="row-3">
               <span>
               <article class="card">
                 B
               </article>
               </span>
               <span>
               <article class="card">
                 B
               </article>
               </span>
               <span>
               <article class="card">
                 B
               </article>
               </span>
             </div>
           </section>
           <section class="game-player2 text-center">
             <h2 class="game-player-name-2"></h2>
             <p class="top-player-2"></p>
             <hr>
             <p>MATCHES THIS ROUND</p>
             <span class="matched bold">0</span>
             <hr>
             <h3>GAME WINS</h3>
           </section>`
           deck.shuffle();
           rotate();
 }


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

function rotate() {
  for (i = 0; i < document.querySelectorAll('.card').length; i++) {
    var random = Math.round(Math.random() * 360);
    document.querySelectorAll('.card')[i].style.transform = `rotate(${random}deg)`
  }
}

function cardFlip(event) {
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

function winnerMessage() {
if (deck.matchedCards.length === 10) {
  var score = (Math.round(Date.now()/1000) - gameStart)/60;
  player[0].score = parseInt(score.toFixed(2));
  localStorage.setItem('player', JSON.stringify(player));
  document.querySelector('main').classList.remove('game');
  document.querySelector('main').innerHTML = `<section class="text-center margin-auto directions">
    <h2 class="player-welcome">CONGRATULATIONS <span class="player1">${player[0].name1.toUpperCase()}</span> AND <span class="player2">${player[0].name2.toUpperCase()}</span>!</h2>
    <article class="text-left">
    It took you ${score.toFixed(2)} minutes to beat the game!
    </article>
    <a href="game.html" class="block"><button type="button" name="button" class="play-game">NEW GAME</button></a>   <a href="game.html" class="block"><button type="button" name="button" class="play-game">Rematch</button></a>
  </section>`
  }
  }

function sorter() {
  var scoreArray = [];
  for (var i = 0; i < player.length; i++) {
    scoreArray.push({name: player[i].name1, score: parseInt(player[i].score)});
  }
  return scoreArray.sort(function(a, b){return a.score - b.score});
}

// function sortMatch() {
//  for (i = 0; i < sorter().length; i++) {
//    if (sorter()[i] === player[i].score) {
//      console.log(player[i].name, player[i].score)
//    }
//  }
// }


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
