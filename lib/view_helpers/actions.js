if (typeof ViewHelper === 'undefined') {
  ViewHelper = {};
}

ViewHelper.Actions = {
  playCard: function ($card, $opponentsCard) {
    var numberOfCards = $('.players-cards.card').length,
        $opponentsCard = $('.opponent .card').random()

    ViewHelper.CardAnimations.playCards($card, $opponentsCard, numberOfCards);
    ViewHelper.CardAnimations.showWinner($card, $opponentsCard);

    setTimeout(function () {
      ViewHelper.Actions.removePlayedCards($card, $opponentsCard);
      ViewHelper.Actions.updateWinner($card, $opponentsCard);
    }, 2000);
  },

  updateWinner: function ($card, $opponentsCard) {
    var winningCard = Trumpster.RuleMaster.winningCard($card, $opponentsCard);

    if (winningCard === $card) {
      playersScore.set(playersScore.get() + 1);
    }
    else {
      opponentsScore.set(opponentsScore.get() + 1);
    }
  },

  removePlayedCards: function ($card, $opponentsCard) {
    playersHand.set(Player.removeCard(playersHand.get(), $card));
    opponentsHand.set(Player.removeCard(opponentsHand.get(), $opponentsCard));

    ViewHelper.BoardAnimations.centerCardHands($('.players-cards.card').length - 1);
  }

}
