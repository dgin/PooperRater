var map;
var service;
var infowindow;
var iconBase2 = 'https://maps.google.com/mapfiles/kml/paddle/';
var toiletIcon = '../static/img/toilets.png';

// Calling promises in turn
getUserPosition()
.then(findGooglePlaces)
.catch(function(error){
        console.log(error);
        console.log("Something BROKE!")
    });

function getUserPosition() {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

// Two functions grouped together in same promise;
function findGooglePlaces(position) {
    return new Promise(function(resolve, reject) {
        initializeMap(position.coords.latitude, position.coords.longitude);
        getGooglePlaces(position.coords.latitude, position.coords.longitude);
        resolve(console.log("Completed"));
        });
}

initializeMap = function(lat, lng) {
    console.log(lat, lng);
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
        styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}]

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

getGooglePlaces = function(lat, lng) {
    var currentLocation = new google.maps.LatLng(lat,lng);
    var request = {
        location: currentLocation,
        //Change radius depending on where you are!
        radius: '1000',
        types: ['restaurant', 'bakery', 'cafe'],
        rankby: 'DISTANCE',
        openNow: 'true'
      };
    service = new google.maps.places.PlacesService(map);
    infowindow = new google.maps.InfoWindow();
    service.nearbySearch(request, displayGooglePlaces);
};

displayGooglePlaces = function(results, status) {
    console.log(results, status);
    results.forEach(createPlaceMarker);
};

createPlaceMarker = function(element, index, array) {
    var coords = new google.maps.LatLng(element.geometry.location.k,element.geometry.location.D);
    var newMarker = new google.maps.Marker({
        position: coords,
        map: map,
        title: element.name,
        animation: google.maps.Animation.DROP,
        icon: toiletIcon
    });
    google.maps.event.addListener(newMarker, 'click', function() {
        infowindow.setContent(element.name);
        infowindow.open(map, this);
    });

    // Puts the place details on the screen
    // Commented out because we don't need to put place details on the screen
    /*
    var place_details = document.getElementById("place-details");
    place_details.insertAdjacentHTML('beforeend',
        '<div id=place_'+index+'>'+element.name+' is located at '+element.vicinity+'</div>');
    */
};
