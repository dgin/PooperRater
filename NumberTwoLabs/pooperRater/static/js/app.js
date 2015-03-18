
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
        router.addRoute('', function() {
            this.setState({page: <PlacesPage url="/api/v1/places/" pollInterval={0} />});
        }.bind(this));
        router.addRoute('places/:id', function(id) {
            this.setState({page: <PlacePage url={"/api/v1/places/" + id} pollInterval={0} />});
        }.bind(this));
        router.start();
    },
    render: function() {
        return this.state.page;
    }
});


// Added promise here to get it to work.
// Suggests that modularity is a viable standard to aim for;
// Should refactor rest of code to clean up
function reactRenderAppPromise(position) {
    return new Promise(function(resolve, reject){
        React.render(<App/>, document.getElementById('places'));

        resolve()
    });
}

getUserPosition()
.then(setUserLocation)
.then(reactRenderAppPromise);
//React.render(<App/>, document.getElementById('places'));

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