Cards = new Mongo.Collection('cards');
player1Hand = Blaze.ReactiveVar(null);
player2Hand = Blaze.ReactiveVar(null);

if (Meteor.isClient) {
  Meteor.subscribe("cards");

  Template.body.helpers({
    currentPlayersCards: function () {
      if (player1Hand.get() !== null) {
        return player1Hand.get();
      }
    },
    opponentsCards: function () {
      if (player2Hand.get() !== null) {
        return player2Hand.get();
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
    'click button': function () {
      var currentGame = new Trumpster.Game();

      currentGame.dealCards();

      player1Hand.set(currentGame.players[0].hand);
      player2Hand.set(currentGame.players[1].hand);
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
