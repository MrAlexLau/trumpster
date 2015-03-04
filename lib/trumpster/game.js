if (typeof Trumpster === 'undefined') {
  Trumpster = {};
}

Trumpster.Game = function () {
  this.players = [];

  this.dealCards = function () {
    // don't put a limit on the call to find()
    // since that will mess with the randomness of the cards (it will only be card records that are located near each other in the db)

    if (this._game) {
      this.players = this.players.concat({ hand: this._game.playersHand });
      this.players = this.players.concat({ hand: this._game.opponentsHand });
    }
    else {
      var num_total_cards = 10;
      var cards_per_player = 5;

      var all_cards = _.sample(Cards.find().fetch(), num_total_cards);
      this.players = this.players.concat({ hand: _.first(all_cards, cards_per_player) });

      all_cards = _.last(all_cards, all_cards.length - cards_per_player)
      this.players = this.players.concat({ hand: _.first(all_cards, cards_per_player) });
    }
  };

  this.currentPlayer = function () {
    return this.players[0];
  }

  this.opponent = function () {
    return this.players[1];
  }

  this.save = function () {
    if (Meteor.userId() === null) {
      console.log('user not logged in');
      console.log(this.currentPlayer().hand);
    }
    else if (this._game) { // create a new game record
      Games.update(this._game._id,
        {
          $set: {
            playersHand: this.currentPlayer().hand,
            opponentsHand: this.opponent().hand
          }
        }
      );
    }
    else { // create a new game record
      Games.insert({
        userId: Meteor.userId(),
        playersHand: this.currentPlayer().hand,
        opponentsHand: this.opponent().hand,
        moves: [],
        createdAt: new Date()
      });
    }
  };

  this.load = function () {
    this._game = Games.findOne({ userId: Meteor.userId() }, {sort: {createdAt: -1}});
  };

  this.removePlayerCard = function (card) {
    Player.removeCard(this.currentPlayer().hand, card);
  }

  this.removeOpponentCard = function (card) {
    Player.removeCard(this.opponent().hand, card);
  }
};
