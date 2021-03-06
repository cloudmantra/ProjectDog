require.config({
  baseUrl: "./js/app",
  paths: {
      "jquery": "../libs/jquery",
      "underscore": "../libs/lodash",
      "backbone": "../libs/backbone",
      "restApiServer": "../libs/restApiServer",
      "jasminejquery": "../libs/plugins/jasmine-jquery",
      "text": "../libs/plugins/text",
      "jqueryFile": "../libs/plugins/jquery.fileDownload",
      "gmap": "../libs/plugins/backbone.googlemaps"
  },
  shim: {
    "backbone": {
      "deps": ["underscore", "jquery"],
      "exports": "Backbone"
    },
    "jasminejquery": ["jquery"],
    "jqueryFile": ["jquery"]
  }

});
