// If user chooses to search near self
function returnUserPosition() {
    // First disable and hide the location search bar, information
    document.getElementById("ajaxLocation").disabled = true;
    document.getElementById("ajaxLocation").style.display = "none";
    document.getElementById("ajaxLocation").style.visibility = "hidden";
    document.getElementById("yelpGeoCoordLat").disabled = false;
    //document.getElementById("yelpGeoCoordLat").style.display = "inline-block";
    document.getElementById("yelpGeoCoordLong").disabled = false;
    //document.getElementById("yelpGeoCoordLong").style.display = "inline-block";
    document.getElementById("placeholderWhileGettingLocation").style.display = "block";

    // Show placeholder while searching
    document.getElementById("placeholderWhileGettingLocation").innerHTML = "Now finding where you are. Please enable Geo-location services.";
     // Get geolocation data and output to field
     getUserPosition()
    .then(outputPosition)
    .catch(function(error){
        console.log("Oops! Something went wrong. You may have to enable Geo-location services.")
    });

}

function enableLocationSearch() {
    // Enable location search fields and disable geolocation search fields
    document.getElementById("ajaxLocation").disabled = false;
    document.getElementById("ajaxLocation").style.display = "block";
    document.getElementById("yelpGeoCoordLat").disabled = true;
    //document.getElementById("yelpGeoCoordLat").style.display = "none";
    document.getElementById("yelpGeoCoordLong").disabled = true;
    document.getElementById("ajaxLocation").style.visibility = "visible";
    //document.getElementById("yelpGeoCoordLong").style.display = "none";
    document.getElementById("placeholderWhileGettingLocation").innerHTML = "";
    //document.getElementById("placeholderWhileGettingLocation").style.display = "none";
    //document.getElementById("placeholderWhileGettingLocation").style.visibility = "hidden";
}

function getUserPosition() {
    return new Promise(function(resolve, reject) {
         navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

function outputPosition(geoposition) {
    document.getElementById("placeholderWhileGettingLocation").innerHTML = "Location found! Ready to search.";
    document.getElementById("yelpGeoCoordLat").value = geoposition.coords.latitude;
    document.getElementById("yelpGeoCoordLong").value = geoposition.coords.longitude;

}