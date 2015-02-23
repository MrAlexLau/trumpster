if (typeof Trumpster === 'undefined') {
  Trumpster = {};
}

Trumpster.Animations = {
  playersCardToMiddle: function ($card) {
    var position =  $card.data('position'),
        movesArray = ['+=170', '+=85', '+=0', '-=85', '-=170'];

    $card.animate({ top: '-=150', left: movesArray[position] });
  },

  opponentsCardToMiddle: function ($card) {
    var position =  $card.data('position'),
        movesArray = ['+=170', '+=85', '+=0', '-=85', '-=170'];

    $card.animate({ top: '+=150', left: movesArray[position] });
  },

  showAsWinner: function ($card) {
    setTimeout(function () { $card.addClass('winning-card') }, 900);
  }
};
