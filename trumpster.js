Cards = new Mongo.Collection('cards');
playersHand = Blaze.ReactiveVar(null);
playersScore = Blaze.ReactiveVar(0);
opponentsScore = Blaze.ReactiveVar(0);
opponentsHand = Blaze.ReactiveVar(null);
winnerLabel = Blaze.ReactiveVar(null);

if (Meteor.isClient) {
  Meteor.subscribe("cards");

  Template.body.helpers({
    winner: function () {
      if (winnerLabel.get() !== null) {
        return winnerLabel.get();
      }
    },
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
      if (!ViewHelper.Actions.actionsLock) {
        var $card = $($(event.target).parents('.card'));

        if ($card.length > 0) {
          ViewHelper.Actions.playCard($card);
        }
      }
    }
  });

  Template.body.events({
    'click .start-game': function (e) {
      e.preventDefault();
      ViewHelper.Actions.startGame();
    }
  });

  Template.body.rendered = function () {
    $.fn.random = function() {
      return this.eq(Math.floor(Math.random() * this.length));
    }

    ViewHelper.BoardAnimations.initialize();
    ViewHelper.Config.initialize();
  };

  Template.loadNotification.rendered = function() {
    $('.reloaded').fadeOut(1500);
  }

  Template.currentPlayer.rendered = function() {
    // remove any styles set in the previous round
    $('.hand').removeAttr('style');
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
