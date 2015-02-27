if (typeof Trumpster === 'undefined') {
  Trumpster = {};
}

Trumpster.Animations = {
  cardWidth: 70, // TODO: refactor this into a config file
  marginWidth: 15,

  playersCardToMiddle: function ($card, numberOfCards) {
    var position =  $card.data('position');

    $card.animate({ top: '-=150', left: this.leftOffset(position, numberOfCards) });
  },

  leftOffset: function (position, numberOfCards) {
    moveAmount = this.centeredXOffset(numberOfCards) - this.currentXOffest(position);

    if (moveAmount >= 0) {
      leftAmountStr = "+=" + moveAmount;
    }
    else {
      leftAmountStr = "-=" + Math.abs(moveAmount);
    }

    return leftAmountStr;
  },

  // returns the current X axis location of a card
  currentXOffest: function (position) {
    var cardWidth = this.cardWidth,
        marginWidth = this.marginWidth;
    return ((position * cardWidth) + (position * marginWidth));
  },

  // calculate the left offset for a card on X axis
  // in order to center this card in a hand
  // given a particular number of cards, their dimensions, and their margins
  centeredXOffset: function (numberOfCards) {
    var cardWidth = this.cardWidth,
        marginWidth = this.marginWidth;
    var totalWidth = (numberOfCards * cardWidth) + ((numberOfCards - 1) * marginWidth);

    return (totalWidth / 2) - (cardWidth / 2);
  },

  opponentsCardToMiddle: function ($card, numberOfCards) {
    var position =  $card.data('position');

    $card.animate({ top: '+=150', left: this.leftOffset(position, numberOfCards) });
  },

  showAsWinner: function ($card) {
    setTimeout(function () { $card.addClass('winning-card') }, 900);
  }
};
