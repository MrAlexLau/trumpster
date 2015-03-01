if (typeof ViewHelper === 'undefined') {
  ViewHelper = {};
}

ViewHelper.Actions = {
  actionsLock: false,

  startGame: function () {
    var currentGame = new Trumpster.Game();
    currentGame.dealCards();

    $('.board').show();
    $('.menu').hide();
    $('.game-over').hide();
    playersHand.set(currentGame.players[0].hand);
    opponentsHand.set(currentGame.players[1].hand);

    playersScore.set(0);
    opponentsScore.set(0);
  },

  playCard: function ($card, $opponentsCard) {
    var numberOfCards = $('.players-cards.card').length,
        $opponentsCard = $('.opponent .card').random();
    this.actionsLock = true;

    ViewHelper.CardAnimations.playCards($card, $opponentsCard, numberOfCards);
    ViewHelper.CardAnimations.showWinner($card, $opponentsCard);

    setTimeout(function () {
      ViewHelper.Actions.removePlayedCards($card, $opponentsCard);
      ViewHelper.Actions.updateWinner($card, $opponentsCard);

      if (numberOfCards === 1) {
        $('.game-over').show();
      }

      ViewHelper.Actions.actionsLock = false;
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

    if (playersScore.get() > opponentsScore.get()) {
      winnerLabel.set('You win!');
    }
    else {
      winnerLabel.set('The computer wins!');
    }
  },

  removePlayedCards: function ($card, $opponentsCard) {
    playersHand.set(Player.removeCard(playersHand.get(), $card));
    opponentsHand.set(Player.removeCard(opponentsHand.get(), $opponentsCard));

    ViewHelper.BoardAnimations.centerCardHands($('.players-cards.card').length - 1);
  }

}
