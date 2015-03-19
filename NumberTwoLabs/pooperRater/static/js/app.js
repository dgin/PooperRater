
// App
//      - PlacesPage
//      - PlacePage
//            - rating
//            - VoteBox
//                  - VoteBox
var App = React.createClass({
    getInitialState: function() {
        return {
            page: null
        }
    },

    componentDidMount: function() {

        router.addRoute('places/', function() {
            this.setState({page: <PlacesPage url="/api/v1/places/" pollInterval={0} />});
        }.bind(this));
        router.addRoute('place/:id', function(id) {
            this.setState({page: <PlacePage url={"/api/v1/places/" + id} pollInterval={0} />});
        }.bind(this));
        router.addRoute('ratings/:id', function(id) {
            this.setState({page: <PostRatingsBox url={"/api/v1/places/" + id + "/ratings/"} pollInterval={0} />});
        }.bind(this));
        router.addRoute('anon/', function(id) {
            this.setState({page: <UserBox url={"/api/v1/anon/" + id} pollInterval={0} />});
        }.bind(this));
        //*******
        // Dan's new stuff
        //router.addRoute('search/', function() {
        //    this.setState({page: <DatabaseSearch pollInterval={0} />});
        //}.bind(this));
        //*******
        router.start();
    },
    render: function() {
        return this.state.page;
    }
});
React.render(<App/>, document.getElementById('places'));

// Added promise here to get it to work.
// Suggests that modularity is a viable standard to aim for;
// Should refactor rest of code to clean up
var userPositionCoords;

function setUserLocation(position) {
    return new Promise(function(resolve, reject) {
        userPositionCoords = position.coords;
        resolve(position);
    });
}

function reactRenderAppPromise(position) {
    return new Promise(function(resolve, reject){
        React.render(<App/>, document.getElementById('places'));

        resolve(position);
    });
}

getUserPosition()
.then(setUserLocation)
.then(reactRenderAppPromise)
.then(initMapAndMarkers)
.catch(function(err) {
        console.log("Something broke!");
        console.log(err);
    });


var geocoder;
geocoder = new google.maps.Geocoder();
geocode();
function geocode() {
    var address = "225 Bush Street, San Francisco";
    geocoder.geocode( {"address": address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            console.log("Success!");
            console.log(results);
        } else {
            console.log("Geocode was not successful because: " + status);
        }
    });
}