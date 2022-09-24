
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
  return cardImgMapping[card] || cardImgMapping["back_of_card"];
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
  let drawnCardElement = createCardElement(drawnCard, offScreenCardProperties);
  recentCardElements.push(drawnCardElement);
  document.body.appendChild(drawnCardElement);
  $(drawnCardElement).animate(currentCardProperties, 500, "swing");

  // Fade out old card elements
  while (recentCardElements.length > maxCardHistorySize) {
    $(recentCardElements[0]).fadeOut(500, function() {
      $(recentCardElements[0]).remove();
    });
    recentCardElements.shift();
  }

  // Animate movement of existing card elements
  newLastCard1 = recentCardElements[recentCardElements.length - 2];
  $(newLastCard1).animate(lastCard1Properties, 500, "swing");

  newLastCard2 = recentCardElements[recentCardElements.length - 3];
  $(newLastCard2).animate(lastCard2Properties, 500, "swing");

  newLastCard3 = recentCardElements[recentCardElements.length - 4];
  $(newLastCard3).animate(lastCard3Properties, 500, "swing");
}

function createCardElement(card, props) {
  let newCard = document.createElement("img");
  newCard.setAttribute('style', propertiesToStyleString(props));
  newCard.setAttribute('src', getCardImage(card));
  return newCard;
}

function initialize() {
  let lastCard3 = createCardElement("", lastCard3Properties);
  recentCardElements.push(lastCard3);
  document.body.appendChild(lastCard3);

  let lastCard2 = createCardElement("", lastCard2Properties);
  recentCardElements.push(lastCard2);
  document.body.appendChild(lastCard2);

  let lastCard1 = createCardElement("", lastCard1Properties);
  recentCardElements.push(lastCard1);
  document.body.appendChild(lastCard1);

  let currentCard = createCardElement("", currentCardProperties);
  recentCardElements.push(currentCard);
  document.body.appendChild(currentCard);
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


function vh(percent) {
  // https://stackoverflow.com/questions/44109314
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (percent * h) / 100;
}
function vw(percent) {
  // https://stackoverflow.com/questions/44109314
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  return (percent * w) / 100;
}
const offScreenCardProperties = {
  position: 'fixed',
  left: '0',
  right: '0',
  margin: 'auto',
  top: '400vh',
  height: '60vh',
  'max-height': '100vh',
  'max-width': '100vw',
}
const currentCardProperties = {
  position: 'fixed',
  left: '0',
  right: '0',
  margin: 'auto',
  top: Math.min(vw(50), vh(30)) + 'px',
  height: '60vh',
  'max-height': '100vh',
  'max-width': '100vw',
};

const lastCard1Properties = {
  position: 'fixed',
  left: Math.min(vw(65), vh(34)) + 'px',
  right: '0',
  margin: 'auto',
  top: '2vh',
  height: 'unset',
  'max-height': '21vh',
  'max-width': '30vw',
};

const lastCard2Properties = {
  position: 'fixed',
  left: '0',
  right: '0',
  margin: 'auto',
  top: '2vh',
  height: 'unset',
  'max-height': '21vh',
  'max-width': '30vw',
};

const lastCard3Properties = {
  position: 'fixed',
  left: '0',
  right: Math.min(vw(65), vh(34)) + 'px',
  margin: 'auto',
  top: '2vh',
  height: 'unset',
  'max-height': '21vh',
  'max-width': '30vw',
};

function propertiesToStyleString(props) {
  let result = '';
  for (const [key, value] of Object.entries(props)) {
    result += `${key}: ${value}; `
  }
  return result;
}

// The max length of `recentCards` that will be enforced
const maxCardHistorySize = 5;
const cardDrawDelayMillis = 1000;
let lastCardDrawMillis = Date.now();
let recentCards = [];
let recentCardElements = [];
let deck = new Deck();
deck.newPlayingDeck();
initialize();
