function yelp_ajax() {
    // First check to ensure user has input a location
    if (isNotEmpty()) {
        var location = document.getElementById("ajaxLocation").value;
        var term = document.getElementById("ajaxTerm").value;
        var geoCoordLat = document.getElementById("yelpGeoCoordLat").value;
        var geoCoordLong = document.getElementById("yelpGeoCoordLong").value;
        // If user is searching by location
        if (location !== '') {
            $.ajax({
                url: "/yelp/ajax/",
                type: 'GET',
                data: {"location": location, "term": term},
                success: function(response) {
                    createPostYelpButton(response);
                    console.log(typeof(response));
                    console.log(response);
                }
            });
        // If user is searching by geolocation data
        } else {
            $.ajax({
                url: "/yelp/ajax/",
                type: 'GET',
                data: {"geoCoordLat": geoCoordLat, "geoCoordLong":geoCoordLong,
                    "term": term},
                success: function(response) {
                    createPostYelpButton(response);
                    console.log(typeof(response));
                    console.log(response);
                }
            });
        }

    }
}