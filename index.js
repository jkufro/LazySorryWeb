
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
      return "back_of_card";
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

/**
 * Get the current card from the `recentCards` array.
 */
function getCurrentCard() {
  return getRecentCard(0);
}

/**
 * Get a previous card from the `recentCards` array.
 *
 * 0 is considered the current card, 1 the last card, 2 the card before that,
 * and so on.
 */
function getRecentCard(negativeIndex) {
  if (recentCards.length < (negativeIndex + 1)) {
    return "back_of_card";
  }
  return recentCards[recentCards.length - 1 - negativeIndex];
}

function getCardImage(card) {
  console.log("getCardImage -> " + cardImgMapping[card]);
  return cardImgMapping[card] || cardImgMapping["back_of_card"];
}

function updateUi() {
  // document.getElementById("currentCard").textContent = getCurrentCard();
  // document.getElementById("cardsLeft").textContent = deck.numPlayingCardsLeft();
  // document.getElementById("recentCards").textContent = recentCards;
  document.getElementById("currentCardImg").src = getCardImage(getCurrentCard());
  document.getElementById("lastCard1").src = getCardImage(getRecentCard(1));
  document.getElementById("lastCard2").src = getCardImage(getRecentCard(2));
  document.getElementById("lastCard3").src = getCardImage(getRecentCard(3));
}

function drawCard() {
  if ((Date.now() - lastCardDrawMillis) < cardDrawDelayMillis) {
    return;
  }

  lastCardDrawMillis = Date.now();
  if (deck.isPlayingDeckEmpty()) {
    deck.newPlayingDeck();
  }
  let drawnCard = deck.drawCard();
  recentCards.push(drawnCard);
  while (recentCards.length > maxCardHistorySize) {
    recentCards.shift();
  }

  updateUi();
}

const imgFolder = 'jpg-img';
const imgExtension = 'jpeg';
const cardImgMapping = {
  "1": `${imgFolder}/1.${imgExtension}`,
  "2": `${imgFolder}/2.${imgExtension}`,
  "3": `${imgFolder}/3.${imgExtension}`,
  "4": `${imgFolder}/4.${imgExtension}`,
  "5": `${imgFolder}/5.${imgExtension}`,
  "7": `${imgFolder}/7.${imgExtension}`,
  "8": `${imgFolder}/8.${imgExtension}`,
  "10": `${imgFolder}/10.${imgExtension}`,
  "11": `${imgFolder}/11.${imgExtension}`,
  "12": `${imgFolder}/12.${imgExtension}`,
  "sorry": `${imgFolder}/sorry.${imgExtension}`,
  "back_of_card": `${imgFolder}/back_of_card.${imgExtension}`,
};

const currentCardProperties = {
  position: 'fixed',
  left: '0',
  right: '0',
  margin: 'auto',
  top: 'min(50vw, 30vh)',
  height: '60vh',
};

lastCard1Properties = {
  position: 'fixed',
  left: 'min(65vw, 34vh)',
  right: '0',
  margin: 'auto',
  top: '2vh',
  height: undefined,
};

lastCard2Properties = {
  position: 'fixed',
  left: '0',
  right: '0',
  margin: 'auto',
  top: '2vh',
  height: undefined,
};

lastCard3Properties = {
  position: 'fixed',
  left: '0',
  right: 'min(65vw, 34vh)',
  margin: 'auto',
  top: '2vh',
  height: undefined,
};

// The max length of `recentCards` that will be enforced
const maxCardHistorySize = 5;
const cardDrawDelayMillis = 1000;
let lastCardDrawMillis = Date.now();
let recentCards = [];
let recentCardElements = [];
let deck = new Deck();
deck.newPlayingDeck();
