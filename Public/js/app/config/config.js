require.config({
  baseUrl: "./js/app",
  paths: {
      "jquery": "../libs/jquery",
      "underscore": "../libs/lodash",
      "backbone": "../libs/backbone",
      "restApiServer": "../libs/restApiServer",
      "jasminejquery": "../libs/plugins/jasmine-jquery",
      "text": "../libs/plugins/text",
      "PDF":"../libs/plugins/pdf",
      "gmap": "../libs/plugins/backbone.googlemaps"
  },
  waitSeconds:10,
  shim: {
      "backbone": {
        "deps": ["underscore", "jquery"],
        "exports": "Backbone"
      },
      "jasminejquery": ["jquery"],
  }

});
