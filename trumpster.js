Cards = new Mongo.Collection('cards');
player1 = Blaze.ReactiveVar(null);
player2 = Blaze.ReactiveVar(null);

if (Meteor.isClient) {
  Meteor.subscribe("cards");

  Template.body.helpers({
    currentPlayersCards: function () {
      if (player1.get() !== null) {
        return player1.get().hand;
      }
    },
    opponentsCards: function () {
      if (player2.get() !== null) {
        return player2.get().hand;
      }
    },
  });

  Template.currentPlayer.events({
    'click .players-cards.card': function (event) {
      var $card = $($(event.target).parents('.card')),
          $opponentsCard,
          winningCard,
          player1Hand,
          player2Hand,
          cardFinder,
          numberOfCards;

      if ($card.length > 0) {
        numberOfCards = $('.players-cards.card').length;
        $opponentsCard = $('.opponent .card').random();

    $('.current-player .card').each(function(index) {
      $(this).data('position', index);
    });
    $('.opponent .card').each(function(index) {
      $(this).data('position', index);
    });

        Trumpster.CardAnimations.opponentsCardToMiddle($opponentsCard, numberOfCards);
        Trumpster.CardAnimations.playersCardToMiddle($card, numberOfCards);

        winningCard = Trumpster.RuleMaster.winningCard($card, $opponentsCard);
        Trumpster.CardAnimations.showAsWinner(winningCard);


        setTimeout(function () {
          player1Hand = player1.get().hand;
          player2Hand = player2.get().hand;

          player1CardFinder = function (card) {
            return card.suit == $card.data('suit') && card.value == $card.data('rank');
          };

          opponentCardFinder = function (card) {
            return card.suit == $opponentsCard.data('suit') && card.value == $opponentsCard.data('rank');
          };

          index1 = player1Hand.indexOf(_.find(player1Hand, player1CardFinder));
          if (index1 >= 0) {
            player1Hand.splice(index1, 1);
            player1.set({ hand: player1Hand });
          }

          index2 = player2Hand.indexOf(_.find(player2Hand, opponentCardFinder));
          if (index2 >= 0) {
            player2Hand.splice(index2, 1);
            player2.set({ hand: player2Hand });
          }

          Trumpster.BoardAnimations.centerCardHands($('.players-cards.card').length - 1);
        }, 2000);
      }
    }
  });

  Template.currentPlayer.rendered = function() {
    $('.current-player .card').each(function(index) {
      $(this).data('position', index);
    });
    $('.opponent .card').each(function(index) {
      $(this).data('position', index);
    });
  }

  Template.body.events({
    'click button': function () {
      var currentGame = new Trumpster.Game();

      currentGame.dealCards();

      player1.set(currentGame.players[0]);
      player2.set(currentGame.players[1]);
    }
  });

  Template.body.rendered = function () {
    $.fn.random = function() {
      return this.eq(Math.floor(Math.random() * this.length));
    }
  };

  Template.loadNotification.rendered = function() {
    $('.reloaded').fadeOut(1500);
  }
}

if (Meteor.isServer) {
  Meteor.publish("cards", function () {
    return Cards.find();
  });

  Meteor.startup(function () {
    // // uncomment to delete previous values
    // coll = Cards.find().fetch();
    // _.each(coll, function(card) {
    //   Cards.remove(card._id);
    // });

    // seed the cards collection
    if (Cards.find().count() == 0) {
      _.each(Trumpster.CardHelper.VALUES, function(value) {
        _.each(Trumpster.CardHelper.SUITS, function(suit) {
          Cards.insert({ suit: suit, value: value });
        });
      });
    }


  });

}
