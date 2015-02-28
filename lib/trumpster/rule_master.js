if (typeof Trumpster === 'undefined') {
  Trumpster = {};
}

Trumpster.RuleMaster = {
  winningCard: function (card1, card2) {
    var rankings = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    if (rankings.indexOf(card1.data('rank')) > rankings.indexOf(card2.data('rank'))) {
      return card1;
    }
    else {
      return card2;
    }
  }
};
