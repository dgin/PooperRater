console.log(1);

yelp_search = function () {
    console.log(3);
};

function returnUserPosition() {
    document.getElementById("placeholderWhileGettingLocation").innerHTML = "Now finding where you are. Please enable location services.";
     getUserPosition()
    .then(outputPosition)
    .catch(function(error){
        console.log("Something went wrong. You may have to enable geolocation services.")
    });

}


//returnUserPosition();
//getUserPosition()
//.then(outputPosition)
//.catch(function(error){
//        console.log("Something went wrong. You may have to enable geolocation services.")
//    });

function getUserPosition() {
    return new Promise(function(resolve, reject) {
         navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

function outputPosition(geoposition) {
    document.getElementById("placeholderWhileGettingLocation").innerHTML = "";
    document.getElementById("userLat").innerHTML = "You are at coordinates: " + geoposition.coords.latitude + ", ";
    document.getElementById("userLong").innerHTML = geoposition.coords.longitude;
}