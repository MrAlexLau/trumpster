if (typeof ViewHelper === 'undefined') {
  ViewHelper = {};
}

ViewHelper.BoardAnimations = {
  initialize: function () {
    $(window).on('responsive:screenChanged', function () {
      setTimeout(function () {
        var numCards = $('.players-cards.card').length;

        if (numCards === 0) {
          numCards = Trumpster.Options.cardsPerHand;
        }

        ViewHelper.BoardAnimations.adjustBoardHeight();
        ViewHelper.BoardAnimations.responsiveCentering(numCards);
      }, 500);
    });
  },

  centerCardHands: function (numberOfCards) {
    var currentMarginLeft = $('.hand').css('margin-left'),
        moveAmount = parseFloat(currentMarginLeft) + (this.totalHandWidth(numberOfCards) / 2),
        moveStr;

    if (moveAmount >= 0) {
      moveStr = '+=' + moveAmount;
    }
    else {
      moveStr = '-=' + moveAmount;
    }

    $('.hand').animate({
      marginLeft: moveStr
    }, 500);
  },

  responsiveCentering: function (numberOfCards) {
    $('.hand').css('margin-left', -(this.totalHandWidth(numberOfCards) / 2).toString() + 'px');
  },

  totalHandWidth: function (numberOfCards) {
    return (numberOfCards * ViewHelper.Config.cardWidth()) + ((numberOfCards - 1) * ViewHelper.Config.marginWidth());
  },

  adjustBoardHeight: function () {
    return $('.board').css('height', ViewHelper.Config.boardHeight().toString() + 'px');
  }
};
