if (typeof Trumpster === 'undefined') {
  Trumpster = {};
}

Trumpster.Animations = {
  playersCardToMiddle: function ($card, numberOfCards) {
    var position =  $card.data('position');

    $card.animate({ top: '-=150', left: this.leftOffset(position, numberOfCards) });
  },

  leftOffset: function (position, numberOfCards) {
    var cardWidth = 60,
        marginWidth = 15,
        totalWidth = (numberOfCards * cardWidth) + ((numberOfCards - 1) * marginWidth),
        totalWidth = (numberOfCards * cardWidth);

    switch (numberOfCards) {
      case 5:
        movesArray = [150, 75, 0, -75, -150];
        break;
      case 4:
        movesArray = [170, 85, 0, -85, -170];
        break;
      case 3:
        movesArray = [170, 85, 0, -85, -170];
        break;
      case 2:
        movesArray = [170, 85, 0, -85, -170];
        break;
      case 1:
        movesArray = [0];
        break;
    }
    moveAmount = movesArray[position];

    if (moveAmount >= 0) {
      leftAmountStr = "+=" + moveAmount;
    }
    else {
      leftAmountStr = "-=" + Math.abs(moveAmount);
    }

    return leftAmountStr;
  },

  opponentsCardToMiddle: function ($card, numberOfCards) {
    var position =  $card.data('position');

    $card.animate({ top: '+=150', left: this.leftOffset(position, numberOfCards) });
  },

  showAsWinner: function ($card) {
    setTimeout(function () { $card.addClass('winning-card') }, 900);
  }
};
