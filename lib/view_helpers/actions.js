if (typeof ViewHelper === 'undefined') {
  ViewHelper = {};
}

ViewHelper.Actions = {
  playCard: function ($card) {
    var numberOfCards = $('.players-cards.card').length,
        $opponentsCard = $('.opponent .card').random();

    ViewHelper.CardAnimations.playCards($card, $opponentsCard, numberOfCards);
    ViewHelper.CardAnimations.showWinner($card, $opponentsCard);

    setTimeout(function () {
      player1Hand.set(Player.updateHand(player1Hand.get(), $card));
      player2Hand.set(Player.updateHand(player2Hand.get(), $opponentsCard));

      ViewHelper.BoardAnimations.centerCardHands($('.players-cards.card').length - 1);
    }, 2000);
  }
}
