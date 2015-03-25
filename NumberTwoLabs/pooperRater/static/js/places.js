// PlaceBox
//    PlaceList
//       PlaceListItem

var converter = new Showdown.converter();

var PlaceListItem = React.createClass({
  render: function() {
    return (
        <a href={"#place/" + this.props.place.id}>
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="place">

                        <div>
                            <div>
                                    <div className="placeName col-lg-9 col-sm-12 col-xs-12"><h3> {this.props.place.name}</h3></div>
                                    <div className="col-lg-3 col-sm-12 col-xs-12"><OverallStarRating rating={this.props.place.overall_average_rating}></OverallStarRating> <small>({this.props.place.number_of_ratings})</small></div>

                            </div>
                            <div>
                                    <div className="col-lg-8 col-sm-12 col-xs-12">{this.props.place.desc}</div>
                                    <div className="col-lg-4 col-sm-12 col-xs-12">
                                        <div><small className="glyphicon glyphicon-home"> {this.props.place.address} </small></div>
                                        <div><small className="glyphicon glyphicon-globe"> {this.props.place.city}</small></div></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </a>
    );
  }
});

var PlacesPage = React.createClass({
  loadPlacesFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      contentType: 'application/json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadPlacesFromServer();

      if (this.props.pollInterval > 0){
          setInterval(this.loadPlacesFromServer, this.props.pollInterval);
       }
  },
  render: function() {
    return (
      <div className="PlaceBox">
        <AddPlaceButton />
          <div>&nbsp;</div>
        <DatabaseSearch />
        <div>&nbsp;</div>
        <h1>Toilets Near You</h1>
          <div className="placeBox">
        <PlaceList data={this.state.data} />
          </div>
      </div>
    );
  }
});


var PlaceList = React.createClass({
     getInitialState: function () {
        return {
            hasMore: true,
            items: []
        };
    },
    loadChunkSize:7,


    loadMore: function (page, callback) {
        if (this.props.data.length > 0){
            var items = this.state.items.concat(this.props.data.slice(this.state.items.length,
                    Math.min(this.state.items.length + this.loadChunkSize, this.props.data.length)));

            this.setState({
                items: items,
                hasMore: ((this.props.data.length - this.state.items.length) > 0)
            });
            console.log("Has more:" + this.state.hasMore);

            callback(items);
        }
        else {
            setTimeout(function()
                {this.loadMore(page, callback);}.bind(this), 1000);
        }
    },

    //    setTimeout(function () {
    //        var items = this.state.items.concat(this.props.data.slice(this.state.items.length,
    //            Math.min(this.state.items.length + this.loadChunkSize, this.props.data.length)));
    //
    //        this.setState({
    //            items: items,
    //            hasMore: ((this.props.data.length - this.state.items.length) > 0)
    //        });
    //        console.log("Has more:" + this.state.hasMore);
    //
    //        callback(items);
    //
    //    }.bind(this), 1000);
    //},


    render: function() {
          var placeNodes = [];
          //Catches error in case no data passed
        //console.log("5", this.props.data);
          if (this.props.data) {
             // finds closest highly-rated toilet for use with Bathroom Emergency button
             var closestDistance = 99999;
             var goNowButton = document.getElementById("goNowButton");
             var goNowButtonActivated = false;
             // Sets placeNodes, which populate placeList
             placeNodes = this.state.items.map(function (place) {
                 // Catches error in case user doesn't have position coordinates
                 // Here: if position data exists, then find nearby places
                 if (userPositionCoords !== undefined) {
                     var distanceFromYou = getDistanceFromLatLonInKm(userPositionCoords.latitude,
                         userPositionCoords.longitude, place.latitude, place.longitude);
                     if (distanceFromYou <= 1) { // 1 kilometer

                         if (distanceFromYou <= closestDistance && place.overall_average_rating >= 3){
                             closestDistance = distanceFromYou;
                             goNowButton.href = '#place/'+place.id;
                             goNowButtonActivated = true;
                         }
                         // Puts marker on the map
                         createPlaceMarker(place);
                         return (
                             <PlaceListItem place = {place}></PlaceListItem>
                         );
                     }
                     // If position data doesn't exist, return no places
                 }

             });
             // If no place matches criteria of <= 1 km away and rating >= 3
             if (!goNowButtonActivated && this.props.data.length > 0) {
                 goNowButton.href = '#place/'+this.props.data[0].id
             }

             return (
                 <div className="placeList">
                    <InfiniteScroll loadMore={this.loadMore} hasMore={this.state.hasMore}
                        loader={<div className="loader">loading...</div>}>
                        {placeNodes}
                    </InfiniteScroll>
                 </div>
             );
         }
          else {
              return (
                  <div className="placeList">
                      loading...
                  </div>
              );
          }
    }
});


//<ItemPaginator items={placeNodes}/>

// overallRating - expecting number
var OverallStarRating = React.createClass({

    getInitialState: function() {
    return {rating: 0};
    },

    render: function() {
        var ratingProp = Math.round(this.props.rating);
        var placeRating = [];
        if (ratingProp == 0){
            placeRating.push(<span><small>- no rating -</small></span>)
        }
        else {
            for (var i = 0; i < ratingProp; i++){
                placeRating.push(<span className="glyphicon glyphicon-star"></span>);
            }
            for (var i = ratingProp; i < 5; i++){
                placeRating.push(<span className="glyphicon glyphicon-star-empty"></span>);
            }
        }
        return (
            <span className={this.props.rating}>{placeRating}</span>
        );
    }
});

var DataList = React.createClass({
  render: function() {
    if (this.props.data) {
        var placeNodes = this.props.data.map(function(place) {
            return (
                <PlaceListItem place = {place}></PlaceListItem>
            );
    });
    }
    return (
      <div className="placeList">
        {placeNodes}
      </div>
    );
  }
});

var DatabaseSearch = React.createClass({
    getInitialState: function() {
        return {message: '', results: "" };
    },
    handleChange: function(event) {
        this.setState({message: event.target.value});
        if (event.target.value.length >= 3) {
            // UI add-ons
            setTimeout(this.handleSearchSubmit,1000);
            document.getElementById("noResults").innerHTML = "Now searching...";
        } else {
            // Cleanup the search section
            this.setState({results: ""});
            document.getElementById("noResults").innerHTML = "";
            document.getElementById("searchTitle").innerHTML = "";
        }
    },
    handleSearchSubmit: function() {
        var searchTerm = document.getElementById("databaseSearchbar").value;
        // Requiring a length here prevents "Return all" errors if user
        // rapidly empties search input during search
        if (searchTerm.length >= 3) {
            $.ajax({
                url: '/api/v1/place_search/?search='+searchTerm,
                type: 'GET',
                success: function(response) {
                    if (response.length === 0) {
                        this.setState({results: response});
                        document.getElementById("noResults").innerHTML = "No toilets found! " +
                        "Maybe you should <b>add one</b>?<br>" +
                        "(You can always add one using the button above)";
                    } else {
                        this.setState({results: response});
                        document.getElementById("noResults").innerHTML = "";
                    }
                    document.getElementById("searchTitle").innerHTML = "<h1>Search Results</h1>";
                    //document.getElementsByClassName("placeList").style.display = 'none';
                }.bind(this)

            });
        }
    },
    render: function() {
        var message = this.state.message;
            var results = this.state.results;
            return (
                <div id="searchDataComponents">
                    <div className="col-lg-12">
                        <input id="databaseSearchbar"
                            aria-describedby="sizing-addon1"
                            className="form-control input-lg"
                            type="text"
                            placeholder="Search for a toilet... (e.g Number Two Labs 123 Sesame St)"
                            value={message}
                            onChange={this.handleChange} />
                    </div>
                    <div id="searchTitle"></div>
                    <div id="searchResults">
                        <DataList test="test" data={results} />
                        <div id="noResults"></div>
                    </div>
                </div>

            );
    }
});

//***************
// Roughly calculating geodistance from geocoordinates
// Used for picking out places within 1km of user
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
