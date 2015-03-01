if (typeof ViewHelper === 'undefined') {
  ViewHelper = {};
}

ViewHelper.BoardAnimations = {
  cardWidth: 70, // TODO: refactor this into a config file
  marginWidth: 15,

  centerCardHands: function (numberOfCards) {
    var totalWidth = (numberOfCards * this.cardWidth) + ((numberOfCards - 1) * this.marginWidth),
        currentMarginLeft = $('.hand').css('margin-left'),
        moveAmount = parseFloat(currentMarginLeft) + (totalWidth / 2),
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
  }
};

