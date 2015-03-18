createPlaceMarkerAlt = function(element, index, array) {
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
