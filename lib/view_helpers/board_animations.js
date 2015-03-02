if (typeof ViewHelper === 'undefined') {
  ViewHelper = {};
}

ViewHelper.BoardAnimations = {
  initialize: function () {
    $(window).on('responsive:screenChanged', function () {
      setTimeout(function () {
        ViewHelper.BoardAnimations.responsiveCentering($('.players-cards.card').length);
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
  }
};
