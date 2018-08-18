var quake = L.map("map", {
    center: [0,0],
    zoom: 3
  });

  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: "pk.eyJ1IjoianNtdWNobW9yZSIsImEiOiJjamtpeG9ianowNG4zM3JwOG05Z3k3bnI5In0.pnVuqjP3ZXqlPLW4NvnP7Q"
}).addTo(quake);

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson"

var geojsonMarkerOptions = {
  radius: 10,
  color: "#8B0000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
};

var geojsonMarkerOptions2 = {
  radius: 5,
  color: "#FFD700",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
};

var geojsonMarkerOptions3 = {
  radius: 2,
  color: "#008000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
};

d3.json(url, function(response) {
  for (var i = 0; i < response.features.length; i++) {
    if (response.features[i].properties.mag > 6) { 
      L.geoJSON(response.features[i], {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
      }).addTo(quake);
    } else if (response.features[i].properties.mag < 4 ) {
      L.geoJSON(response.features[i], {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions3);
        }
      }).addTo(quake);
    } else {
      L.geoJSON(response.features[i], {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions2);
        }
      }).addTo(quake);
    }
  }  
});
