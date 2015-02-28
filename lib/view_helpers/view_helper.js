if (typeof ViewHelper === 'undefined') {
  ViewHelper = {};
}

ViewHelper = {
  playCard: function ($card) {
    var numberOfCards = $('.players-cards.card').length,
        $opponentsCard = $('.opponent .card').random();

    Trumpster.CardAnimations.playCards($card, $opponentsCard, numberOfCards);
    Trumpster.CardAnimations.showWinner($card, $opponentsCard);

    setTimeout(function () {
      player1Hand.set(Player.updateHand(player1Hand.get(), $card));
      player2Hand.set(Player.updateHand(player2Hand.get(), $opponentsCard));

      Trumpster.BoardAnimations.centerCardHands($('.players-cards.card').length - 1);
    }, 2000);
  }
}
