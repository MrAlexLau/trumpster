if (typeof Trumpster === 'undefined') {
  Trumpster = {};
}

Trumpster.Game = function () {
  this.players = [];

  this.dealCards = function () {
    // don't put a limit on the call to find()
    // since that will mess with the randomness of the cards (it will only be card records that are located near each other in the db)

    var num_total_cards = 10;
    var cards_per_player = 5;

    var all_cards = _.sample(Cards.find().fetch(), num_total_cards);
    this.players = this.players.concat({ hand: _.first(all_cards, cards_per_player) });

    all_cards = _.last(all_cards, all_cards.length - cards_per_player)
    this.players = this.players.concat({ hand: _.first(all_cards, cards_per_player) });
  }
};
