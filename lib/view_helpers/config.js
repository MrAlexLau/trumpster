if (typeof ViewHelper === 'undefined') {
  ViewHelper = {};
}

ViewHelper.Config = {
  _cardWidth: 70,
  _marginWidth: 15,
  mediumWidth: 500,

  cardWidth: function () {
    return this._cardWidth;
  },

  marginWidth: function () {
    return this._marginWidth;
  },

  initialize: function () {
    this.watchWindowResize();
    $(window).on('responsive:small', _.bind(this.setMobileConfig, this));
    $(window).on('responsive:medium', _.bind(this.setDesktopConfig, this));

    // set mobile config settings if it's mobile upon pageload
    if (this.isMobile()) {
      this.setMobileConfig();
    }
  },

  setMobileConfig: function () {
    this._cardWidth = 50;
    this._marginWidth = 15;

    $(window).trigger('responsive:screenChanged');
  },

  setDesktopConfig: function () {
    this._cardWidth = 70;
    this._marginWidth = 15;

    $(window).trigger('responsive:screenChanged');
  },

  watchWindowResize: function () {
    var $window = $(window);

    $window.data('responsive:event', null);

    $window.resize(function () {
      if ($window.width() <= ViewHelper.Config.mediumWidth) {
        if ($window.data('responsive:event') !== 'responsive:small') {
          $window.trigger('responsive:small');
          $window.data('responsive:event', 'responsive:small');
        }
        return true;
      }
      else {
        if ($window.data('responsive:event') !== 'responsive:medium') {
          $window.trigger('responsive:medium');
          $window.data('responsive:event', 'responsive:medium');
        }
        return true;
      }
    });

    $window.resize();
  },

  isMobile: function () {
    return $(window).data('responsive:event') === 'responsive:small';
  }
}
