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
    otherPlayersCards: function () {
      if (player2.get() !== null) {
        return player2.get().hand;
      }
    }
  });

  Template.currentPlayer.events({
    'click .players-cards.card': function (event) {
      var $card = $($(event.target).parents('.card')),
          position =  $card.data('position'),
          amount =  -100 + $card.data('position') * 10,
          leftAmountStr,
          movesArray = ['+=170', '+=85', '+=0', '-=85', '-=170'];

      leftAmountStr = movesArray[position];

      $card.animate({top: '-=200', left: leftAmountStr});
    }
  });

  Template.currentPlayer.rendered = function() {
    $('.current-player .card').each(function(index) {
      $(this).data('position', index);
    });
  }

  Template.body.events({
    'click button': function () {
      currentGame = new Trumpster.Game();
      currentGame.dealCards();

      player1.set(currentGame.players[0]);
      player2.set(currentGame.players[1]);
    }
  });

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
