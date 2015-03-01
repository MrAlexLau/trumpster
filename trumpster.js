Cards = new Mongo.Collection('cards');
playersHand = Blaze.ReactiveVar(null);
playersScore = Blaze.ReactiveVar(0);
opponentsScore = Blaze.ReactiveVar(0);
opponentsHand = Blaze.ReactiveVar(null);

if (Meteor.isClient) {
  Meteor.subscribe("cards");

  Template.body.helpers({
    computerScore: function () {
      return opponentsScore.get();
    },
    playerScore: function () {
      return playersScore.get();
    },
    currentPlayersCards: function () {
      if (playersHand.get() !== null) {
        return playersHand.get();
      }
    },
    opponentsCards: function () {
      if (opponentsHand.get() !== null) {
        return opponentsHand.get();
      }
    },
  });

  Template.currentPlayer.events({
    'click .players-cards.card': function (event) {
      var $card = $($(event.target).parents('.card'));

      if ($card.length > 0) {
        ViewHelper.Actions.playCard($card);
      }
    }
  });

  Template.body.events({
    'click .start-game': function (e) {
      e.preventDefault();

      var currentGame = new Trumpster.Game();

      currentGame.dealCards();

      $('.board').show();
      $('.menu').hide();
      playersHand.set(currentGame.players[0].hand);
      opponentsHand.set(currentGame.players[1].hand);
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
