// Code specific to Yelp search and add
// ************* \\
// Searches Yelp for place data
function yelp_ajax() {
    // First check to ensure user has input a location
    if (isNotEmpty()) {
        var locationSearchIsChecked = document.getElementById("yelpIsLocation").value;
        var location = document.getElementById("ajaxLocation").value;
        var term = document.getElementById("ajaxTerm").value;
        var geoCoordLat = document.getElementById("yelpGeoCoordLat").value;
        var geoCoordLong = document.getElementById("yelpGeoCoordLong").value;
        // If user is searching by location
        var data;
        if (locationSearchIsChecked === "yes") {
            data = {"location": location, "term": term};
        } else {
            data = {"geoCoordLat": geoCoordLat, "geoCoordLong":geoCoordLong,
                    "term": term};
        }
        $.ajax({
            url: "/yelp/ajax/",
            type: 'GET',
            data: data,
            success: function(response) {
                createPostYelpButton(response);
                console.log(response);
                if (response.length === 0) {
                    document.getElementById("yelpOutput").innerHTML = "<br>Couldn't find any places with those search terms. Please try a different search!"
                }
            }
        });
    }
}

function createPostYelpButton(listOfBusinesses) {
    var i;
    // Cleans up output field so that the list doesn't get too long
    document.getElementById("yelpOutput").innerHTML = "";
    // Appends buttons and information, allows adding places
    for (i=0; i < listOfBusinesses.length; i ++) {
        var business = listOfBusinesses[i];
        // Populates page with information about the particular business
        var information = document.createElement("div");
        information.className = "businessInfo panel panel-default";
        //var info2 = document.createELement("div")
        information.innerHTML = "<br>"+ "<h4>" + business['name'] + "</h4>" +
            business['location']['address'] + ", " + business['location']['city'] + ", "
            + business['location']['state_code'] + "<br><br>";
        var newButton = document.createElement('button');
        newButton.className = "btn btn-warning";
        newButton.innerHTML = "Add " + business['name'];
        // Creates the business button, which, when clicked, posts the business data to our API
        newButton.data = business;
        newButton.onclick = function() {
            postYelpPlaceToAPI(this.data);
        };
        information.appendChild(newButton);
        var brk = document.createElement("p");
        information.appendChild(brk);
        document.getElementById("yelpOutput").appendChild(information);
    }
}


function postYelpPlaceToAPI(businessData) {
    // Using Yelp categories for description of business
    console.log(this);
    var categories = businessData['categories'];
    var desc = [];
    var i;
    for (i=0; i < categories.length; i++) {
        desc.push(categories[i][0]);
    }
    desc = desc.join(", ");
    // Making data object for ajax call
    data = {
        'name': businessData['name'],
        'address': businessData['location']['address'][0],
        'city': businessData['location']['city'],
        'yelp_id': businessData['id'],
        'desc': desc,
        'latitude':businessData['location']['coordinate']['latitude'],
        'longitude':businessData['location']['coordinate']['longitude'],
        //'pic': businessData['image_url'],
        'yelp_url': businessData['url']
    };
    ajaxToDatabase(data);
}

// Checks to ensure that there is a location to search by
function isNotEmpty() {
    var x = document.getElementById("ajaxLocation").value;
    var y = document.getElementById("yelpGeoCoordLat").value;
    if (x === "" && y === "") {
        alert("You have to actually enter a location!");
        // Prevents form submit
        return false;
    }
    return true;
}

// Code specific to manual place adding using the provided form
// ************* \\
// Checks required fields in form
function businessHasName() {
    var x = document.getElementById("placeName").value;
    if (x === "") {
        document.getElementById("nameRequired").style.display = "block";
        return false;
    }
    return true;
}

// Adds place that has been manually created with a form
function addPlaceToDatabase() {
    if (businessHasName()) {
        data = {
            "name": document.getElementById("placeName").value,
            "address": document.getElementById("placeAddress").value,
            "city": document.getElementById("placeCity").value,
            //"start_hours": document.getElementById("placeStartHour").value,
            //"end_hours": document.getElementById("placeEndHour").value,
        };
        ajaxToDatabase(data);
    }
}

// General codebase used for both types of calls
// ************** \\
// Obtaining a csrf token for the above AJAX call AJAX call
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

// Makes the ajax call to our database; first puts a csrf token in the header
function ajaxToDatabase (placeData) {

    var csrftoken = getCookie('csrftoken');
    $.ajaxSetup({
       beforeSend: function(xhr, settings) {
           if (! csrfSafeMethod(settings.type) && !this.crossDomain) {
               xhr.setRequestHeader("X-CSRFToken", csrftoken);
           }
       }
    });

    $.ajax({
        url: '/api/v1/places/',
        type: 'POST',
        dataType: 'json',
        data: placeData,
        success: function (response) {
            console.log("Added a place.");
            alert("You added a business! Go you! Now rate it!");
        },
        error: function (err) {
            console.log(err);
            if (err.responseText === '{"yelp_id":["This field must be unique."]}') {
                alert("Place already exists! Find it in our database!");
            }
            else {
                console.log(err.responseText);
                alert("Something went wrong! Please try again!");
            }
        }
    });
}
