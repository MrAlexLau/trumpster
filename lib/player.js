Player = function () {
  // TODO: update this
  this.name = 'Player';
  this.hand = [];
};

Player.updateHand = function (hand, $card) {
  var cardFinder = function (card) {
        return card.suit == $card.data('suit') && card.value == $card.data('rank');
      },
      index = hand.indexOf(_.find(hand, cardFinder));

  if (index >= 0) {
    hand.splice(index, 1);
  }

  return hand;
}
