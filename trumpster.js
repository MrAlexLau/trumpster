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

  Template.card.helpers({
    // suit: function () {
    //   return 'hearts';
    // },
    // value: function () {
    //   return 'A';
    // }
  });

  // TODO: add some real events for cards
  Template.body.events({
    'click button': function () {
      currentGame = new Trumpster.Game();
      currentGame.dealCards();

      player1.set(currentGame.players[0]);
      player2.set(currentGame.players[1]);
      // player2 = Blaze.ReactiveVar(currentGame.players[1]);

    }
  });
}

if (Meteor.isServer) {
  Meteor.publish("cards", function () {
    return Cards.find();
  });

  Meteor.startup(function () {
    // // uncomment to delete previous values
    coll = Cards.find().fetch();
    _.each(coll, function(card) {
      Cards.remove(card._id);
    });

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
