
class Deck {
  constructor() {
    this._playingDeck = [];
  }

  /**
   * Return an array of strings that correspond to all cards in a deck.
   *
   * Deck is not shuffled
   */
  generateDeck() {
    return [
      "1", "1", "1", "1", "1",
      "2", "2", "2", "2",
      "3", "3", "3", "3",
      "4", "4", "4", "4",
      "5", "5", "5", "5",
      "7", "7", "7", "7",
      "8", "8", "8", "8",
      "10", "10", "10", "10",
      "11", "11", "11", "11",
      "12", "12", "12", "12",
      "sorry", "sorry", "sorry", "sorry",
    ];
  }

  isPlayingDeckEmpty() {
    return this._playingDeck.length == 0;
  }

  /**
   * Draw a card from the deck and return the string value of the drawn card.
   */
  drawCard() {
    if (this.isPlayingDeckEmpty()) {
      return "";
    }
    return this._playingDeck.shift();
  }

  /**
   * Creates a new deck and shuffles the cards.
   */
  newPlayingDeck() {
    this._playingDeck = this._shuffle(this.generateDeck());
  }

  numPlayingCardsLeft() {
    return this._playingDeck.length;
  }

  /**
   * Shuffle an array.
   *
   * Method is from: https://stackoverflow.com/questions/2450954
   */
  _shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }
}

function drawCard() {
  currentCard = deck.drawCard();
  document.getElementById("currentCard").textContent = currentCard;
  document.getElementById("CardsLeft").textContent = deck.numPlayingCardsLeft();
}


// const let cards = {
//   "1": "img/1.png",
//   "2": "img/2.png",
//   "3": "img/3.png",
//   "4": "img/4.png",
//   "5": "img/5.png",
//   "7": "img/7.png",
//   "8": "img/8.png",
//   "10": "img/10.png",
//   "11": "img/11.png",
//   "12": "img/12.png",
//   "sorry": "img/sorry.png",
// }

let deck = new Deck();
deck.newPlayingDeck();
