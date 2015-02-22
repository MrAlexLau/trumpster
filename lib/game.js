if (typeof Trumpster === 'undefined') {
  Trumpster = {};
}

Trumpster.Game = function () {
  this.players = [];

  this.dealCards = function () {
    // don't put a limit on the call to find()
    // since that will mess with the randomness of the cards (it will only be card records that are located near each other in the db)
    var all_cards = _.sample(Cards.find().fetch(), 10);
    this.players = this.players.concat({ hand: _.first(all_cards, 5) });
    this.players = this.players.concat({ hand: _.first(all_cards, 5) });
  }
};
