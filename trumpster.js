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
    }
  });

  Template.currentPlayer.events({
    'click .players-cards.card': function (event) {
      var $card = $($(event.target).parents('.card')),
          $opponentsCard;

      if ($card.length > 0) {
        $opponentsCard = $('.opponent .card').random();

        Trumpster.Animations.opponentsCardToMiddle($opponentsCard);
        Trumpster.Animations.playersCardToMiddle($card);

        Trumpster.Animations.showAsWinner($card);
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
