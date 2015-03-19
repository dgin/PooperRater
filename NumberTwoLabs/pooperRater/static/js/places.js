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
                                    <div className="col-lg-3 col-sm-12 col-xs-12"><OverallStarRating rating={this.props.place.overall_average_rating}></OverallStarRating></div>

                            </div>
                            <div>
                                    <div className="col-lg-8 col-sm-12 col-xs-12">{this.props.place.desc}</div>
                                    <div className="col-lg-4 col-sm-12 col-xs-12">
                                        <div><small className="glyphicon glyphicon-home"> {this.props.place.address}</small></div>
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
  //handleVoteSubmit: function(comment) {
  //  var comments = this.state.data;
  //  comments.push(comment);
  //  this.setState({data: comments}, function() {
  //    // `setState` accepts a callback. To avoid (improbable) race condition,
  //    // `we'll send the ajax request right after we optimistically set the new
  //    // `state.
  //    $.ajax({
  //      url: this.props.url,
  //      dataType: 'json',
  //      type: 'POST',
  //      data: comment,
  //      success: function(data) {
  //        this.setState({data: data});
  //      }.bind(this),
  //      error: function(xhr, status, err) {
  //        console.error(this.props.url, status, err.toString());
  //      }.bind(this)
  //    });
  //  });
  //},
  // <VoteForm onCommentSubmit={this.handleVoteSubmit} />

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
        <div className="col-lg-12"><AddPlaceButton /></div>
        <div>&nbsp;</div>
        <h1>Places</h1>
        <PlaceList data={this.state.data} />
      </div>
    );
  }
});

var PlaceList = React.createClass({
  render: function() {
    var placeNodes = this.props.data.map(function(place) {

        // Catches error in case user doesn't have position data
        // Here: if position data exists, then find nearby places
        if (userPositionCoords !== undefined) {
            var distanceFromYou = getDistanceFromLatLonInKm(userPositionCoords.latitude,
                userPositionCoords.longitude, place.latitude,place.longitude);
            if (distanceFromYou <= 1) { // 1 kilometer
                // Puts marker on the map
                createPlaceMarker(place);
            return (
                <PlaceListItem place = {place}></PlaceListItem>
            );
            //}
        // If position data doesn't exist, return no places
        }
        //else {
        //    return (
        //        <PlaceListItem place = {place}></PlaceListItem>
        //    );
        }
      //return (
      //  <PlaceListItem place = {place}></PlaceListItem>
      //);
    });
    return (
      <div className="placeList">
        {placeNodes}
      </div>
    );
  }
});


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

//var VoteForm = React.createClass({
//  handleSubmit: function(e) {
//    e.preventDefault();
//    var author = this.refs.author.getDOMNode().value.trim();
//    var text = this.refs.text.getDOMNode().value.trim();
//    if (!text || !author) {
//      return;
//    }
//    this.props.onCommentSubmit({author: author, text: text});
//    this.refs.author.getDOMNode().value = '';
//    this.refs.text.getDOMNode().value = '';
//  },
//  render: function() {
//    return (
//      <form className="commentForm" onSubmit={this.handleSubmit}>
//        <input type="text" placeholder="Your name" ref="author" />
//        <input type="text" placeholder="Say something..." ref="text" />
//        <input type="submit" value="Post" />
//      </form>
//    );
//  }
//});

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
