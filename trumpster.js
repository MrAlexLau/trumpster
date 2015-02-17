Cards = new Mongo.Collection('cards');

if (Meteor.isClient) {
  Meteor.subscribe("cards");

  Template.body.helpers({
    cards: function () {
      return Cards.find();
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

  // TODO: add some events for cards
  Template.card.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish("cards", function () {
    return Cards.find();
  });

  Meteor.startup(function () {
    // TODO: refactor these into shared object
    var VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    var SUITS = ['clubs', 'spades', 'hearts', 'diams'];

    // uncomment to delete previous values
    coll = Cards.find().fetch();
    _.each(coll, function(card) {
      Cards.remove(card._id);
    });

    // seed the cards collection
    if (Cards.find().count() == 0) {
      _.each(VALUES, function(value) {
        _.each(SUITS, function(suit) {
          Cards.insert({ suit: suit, value: value });
        });
      });
    }
  });

}
