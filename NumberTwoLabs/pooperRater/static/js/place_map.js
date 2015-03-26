var map;
var infowindow;
var iconBase2 = 'https://maps.google.com/mapfiles/kml/paddle/';
var toiletIcon = '../static/img/toilets.png';

function getUserPosition() {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

function initMapAndMarkers(position) {
    return new Promise(function(resolve, reject) {
        initializeMap(position.coords.latitude, position.coords.longitude);
        infowindow = new google.maps.InfoWindow();
        resolve(position);
        });
}

initializeMap = function(lat, lng) {
    //console.log(lat, lng);
    var currentLocation = new google.maps.LatLng(lat,lng);

    map = new google.maps.Map(document.getElementById('map-canvas'), {
        // Required
        center: currentLocation,
        zoom: 15,

        // Makes map non-interactive(so it doesnt get messed up by fat fingers)
        disableDefaultUI: false,
        scrollwheel: false,
        draggable: true,
        // Styles Google map so that it looks good
        styles: [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#46bcec"
            },
            {
                "visibility": "on"
            }
        ]
    }
]


        });

    var youMarker = new google.maps.Marker({
        position: currentLocation,
        map: map,
        title: "You",
        icon: iconBase2 + 'grn-stars-lv.png'
    });
    google.maps.event.addListener(youMarker, 'click', function() {
        infowindow.setContent(youMarker.title);
        infowindow.open(map, this);
    });

    };
createPlaceMarker = function(element, index, array) {
    var coords = new google.maps.LatLng(element.latitude,element.longitude);
    var newMarker = new google.maps.Marker({
        position: coords,
        map: map,
        title: element.name,
        //animation: google.maps.Animation.DROP,
        icon: toiletIcon
    });
    google.maps.event.addListener(newMarker, 'click', function() {
        infowindow.setContent("<b>" + element.name + "</b>" + "<br>" +
            element.address + "<br>" + element.city);
        infowindow.open(map, this);
    });
};
