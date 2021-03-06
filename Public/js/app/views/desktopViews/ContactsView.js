define([
  'jquery',
  'underscore',
  'backbone',
  'gmap',
  'text!templates/desktopTemplates/contactsPageView.html'
], function($, _, Backbone, gmap, contactsPageTemplate){
  var ContactsView = Backbone.View.extend({
    el:".middleContainer",
    initialize: function (){},
    render: function(){
            var places = new Backbone.GoogleMaps.LocationCollection([
                  {
                    title: "Walker Art Center",
                    lat: 44.9796635,
                    lng: -93.2748776
                  },
                  {
                    title: "Science Museum of Minnesota",
                    lat: 44.9429618,
                    lng: -93.0981016
                  },
                  {
                    title: "The Museum of Russian Art",
                    lat: 44.9036337,
                    lng: -93.2755413
                  },
                  {
                    title: "Park Tavern",
                    lat: 44.9413272,
                    lng: -93.3705791
                  },
                  {
                    title: "Chatterbox Pub",
                    lat: 44.9393882,
                    lng: -93.2391039
                  },
                  {
                    title: "Acadia Cafe",
                    lat: 44.9709853,
                    lng: -93.2470717
                  }
                ]);
            this.$el.html(_.template(contactsPageTemplate, {}));
            var mapOptions = {
                center: new google.maps.LatLng(44.9796635, -93.2748776),
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP
              };
              // Instantiate map
          var map = new google.maps.Map($('#map')[0], mapOptions);
          // Render Markers
          var markerCollectionView = new Backbone.GoogleMaps.MarkerCollectionView({
            collection: places,
            map: map
          });
          markerCollectionView.render();
    },
    events:{
    }
  });
  return ContactsView;
});
