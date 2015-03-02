if (typeof ViewHelper === 'undefined') {
  ViewHelper = {};
}

ViewHelper.CardAnimations = {
  playCards: function (playersCard, opponentsCard, numberOfCards) {
    this.calculationCardPositions();
    this.opponentsCardToMiddle(opponentsCard, numberOfCards);
    this.playersCardToMiddle(playersCard, numberOfCards);
  },

  playersCardToMiddle: function ($card, numberOfCards) {
    var position =  $card.data('position');

    $card.animate({ top: '-=120', left: this.leftOffset(position, numberOfCards) });
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
    return ((position * ViewHelper.Config.cardWidth()) + (position * ViewHelper.Config.marginWidth()));
  },

  // calculate the left offset for a card on X axis
  // in order to center this card in a hand
  // given a particular number of cards, their dimensions, and their margins
  centeredXOffset: function (numberOfCards) {
    var totalWidth = (numberOfCards * ViewHelper.Config.cardWidth()) + ((numberOfCards - 1) * ViewHelper.Config.marginWidth());

    return (totalWidth / 2) - (ViewHelper.Config.cardWidth() / 2);
  },

  opponentsCardToMiddle: function ($card, numberOfCards) {
    var position =  $card.data('position');

    $card.animate({ top: '+=120', left: this.leftOffset(position, numberOfCards) });
  },

  showWinner: function($card, $opponentsCard) {
    var winningCard = Trumpster.RuleMaster.winningCard($card, $opponentsCard);
    this.showAsWinner(winningCard);
  },

  showAsWinner: function ($card) {
    setTimeout(function () { $card.addClass('winning-card') }, 900);
  },

  calculationCardPositions: function () {
    $('.current-player .card').each(function(index) {
      $(this).data('position', index);
    });

    $('.opponent .card').each(function(index) {
      $(this).data('position', index);
    });
  }
};

