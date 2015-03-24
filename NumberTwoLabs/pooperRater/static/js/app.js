var App = React.createClass({
    getInitialState: function() {
        return {
            page: null
        }
    },

    componentDidMount: function() {

        router.addRoute('', function() {
            this.setState({page: <PlacesPage url="/api/v1/places/" pollInterval={0} />});
        }.bind(this));
        router.addRoute('place/:id', function(id) {
            this.setState({page: <PlacePage url={"/api/v1/places/" + id} pollInterval={1000} />});
        }.bind(this));
        router.addRoute('ratings/:id', function(id) {
            this.setState({page: <PostRatingsBox url={"/api/v1/places/" + id + "/ratings/"} placeID = {id} pollInterval={0} />});
        }.bind(this));
        router.start();
    },
    render: function() {
        return this.state.page;
    }
});
//React.render(<App/>, document.getElementById('places'));

// Added promise here to get it to work.
var userPositionCoords;

//var userID = React.createElement('div', { userID: GlobalUserID });


function setUserLocation(position) {
    return new Promise(function(resolve, reject) {
        userPositionCoords = position.coords;
        resolve(position);
    });
}

function reactRenderAppPromise(position) {

    //this.props.data.userID = userID;
    //var localuserID = userID._store.props.userID;
    return new Promise(function(resolve, reject){

        //userID = usrID;
        //console.log(GlobalUserID);
        var appUserID = GlobalUserID;
        React.render(<App userID ={appUserID}/>, document.getElementById('places'));
        resolve(position);
    });
}

function setGoNowButtonLocation(position) {
    return new Promise(function(resolve, reject) {
        document.getElementById('goNowButton').value = [position.coords.latitude,
            position.coords.longitude];
        resolve(position);
    });
}

getUserPosition()
.then(setUserLocation)
.then(reactRenderAppPromise)
.then(initMapAndMarkers)
//.then(setGoNowButtonLocation)
.catch(function(err) {
        console.log("Something broke!");
        console.log(err);
    });

React.render(<GoNowButton />, document.getElementById("buttonDiv"));

//var geocoder;
//geocoder = new google.maps.Geocoder();
//geocode();
//function geocode() {
//    var address = "225 Bush Street, San Francisco";
//    geocoder.geocode( {"address": address}, function(results, status) {
//        if (status === google.maps.GeocoderStatus.OK) {
//            console.log("Success!");
//            console.log(results);
//        } else {
//            console.log("Geocode was not successful because: " + status);
//        }
//    });
//}