var converter = new Showdown.converter();

var Place = React.createClass({
  render: function() {
    return (
    <div className="panel panel-default">
        <div className="panel-body">
            <div className="place">

                        <div>
                            <div>
                                    <div className="placeName col-lg-9 col-sm-12 col-xs-12"><h3>{this.props.name}</h3></div>
                            </div>
                            <div>
                                    <div className="col-lg-8 col-sm-12 col-xs-12">{this.props.desc}</div>
                                    <div className="col-lg-4 col-sm-12 col-xs-12">
                                        <div><small className="glyphicon glyphicon-inbox"> {this.props.unit}</small></div>
                                        <div><small className="glyphicon glyphicon-align-justify"> {this.props.floor}</small></div>
                                        <div><small className="glyphicon glyphicon-home"> {this.props.address}</small></div>
                                        <div><small className="glyphicon glyphicon-globe"> {this.props.city}</small></div></div>
                            </div>
                            <div>
                                <div className="col-lg-12 col-sm-12 col-xs-12"><h3><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Overall Rating: </div><div className="col-lg-6 col-sm-6 col-xs-6"><OverallStarRating rating={this.props.rating}></OverallStarRating></div></h3></div>
                                <div className="col-lg-12 col-sm-12 col-xs-12"><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Air: </div><div className="col-lg-6 col-sm-6 col-xs-6"><AirStarRating air_rating={this.props.air_rating}></AirStarRating></div></div>
                                <div className="col-lg-12 col-sm-12 col-xs-12"><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Clean: </div><div className="col-lg-6 col-sm-6 col-xs-6"><CleanStarRating clean_rating={this.props.clean_rating}></CleanStarRating></div></div>
                                <div className="col-lg-12 col-sm-12 col-xs-12"><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Available: </div><div className="col-lg-6 col-sm-6 col-xs-6"><AvailbleStarRating available_rating={this.props.available_rating}></AvailbleStarRating></div></div>
                                <div className="col-lg-12 col-sm-12 col-xs-12"><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Quality: </div><div className="col-lg-6 col-sm-6 col-xs-6"><QualityStarRating quality_rating={this.props.quality_rating}></QualityStarRating></div></div>
                                <div className="col-lg-12 col-sm-12 col-xs-12"><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Other: </div><div className="col-lg-6 col-sm-6 col-xs-6"><OtherStarRating other_rating={this.props.other_rating}></OtherStarRating></div></div>
                            </div>
                        </div>


            </div>
        </div>
    </div>
    );
  }
});

var PlacesBox = React.createClass({
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
    setInterval(this.loadPlacesFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="PlaceBox">
        <h1>Yelp Place</h1>
        <PlaceList data={this.state.data} />
      </div>
    );
  }
});

var PlaceList = React.createClass({
  render: function() {
    var placeNodes = this.props.data.map(function(place, index) {
      return (
        <Place name={place.name}
            desc={place.desc}
            placeType={place.place_type}
            rating={place.overall_average_rating}
            air_rating={place.average_rating.air_flow__avg}
            clean_rating={place.average_rating.cleanliness__avg}
            available_rating={place.average_rating.available__avg}
            quality_rating={place.average_rating.quality__avg}
            other_rating={place.average_rating.other__avg}
            unit={place.unit} floor={place.floor}
            address={place.address}
            city={place.city}
            key={index}></Place>
      );
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
            placeRating.push(<span><small>no rating</small></span>)
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

var AirStarRating = React.createClass({

    getInitialState: function() {
    return {air_rating: 0};
    },

    render: function() {
        var airRatingProp = Math.round(this.props.air_rating);

        var airPlaceRating = [];

        if (airRatingProp == 0){
            airPlaceRating.push(<span><small>no rating</small></span>)
        }
        else {
            for (var i = 0; i < airRatingProp; i++){
                airPlaceRating.push(<span className="glyphicon glyphicon-star"></span>);
            }
            for (var i = airRatingProp; i < 5; i++){
                airPlaceRating.push(<span className="glyphicon glyphicon-star-empty"></span>);
            }
        }
        return (
            <span className={this.props.air_rating}>{airPlaceRating}</span>
        );
    }
});

var CleanStarRating = React.createClass({

    getInitialState: function() {
    return {clean_rating: 0};
    },

    render: function() {
        var ratingProp = Math.round(this.props.clean_rating);
        var placeRating = [];
        if (ratingProp == 0){
            placeRating.push(<span><small>no rating</small></span>)
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
            <span className={this.props.clean_rating}>{placeRating}</span>
        );
    }
});

var AvailbleStarRating = React.createClass({

    getInitialState: function() {
    return {available_rating: 0};
    },

    render: function() {
        var ratingProp = Math.round(this.props.available_rating);
        var placeRating = [];
        if (ratingProp == 0){
            placeRating.push(<span><small>no rating</small></span>)
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
            <span className={this.props.available_rating}>{placeRating}</span>
        );
    }
});

var QualityStarRating = React.createClass({

    getInitialState: function() {
    return {quality_rating: 0};
    },

    render: function() {
        var ratingProp = Math.round(this.props.quality_rating);
        var placeRating = [];
        if (ratingProp == 0){
            placeRating.push(<span><small>no rating</small></span>)
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
            <span className={this.props.quality_rating}>{placeRating}</span>
        );
    }
});

var OtherStarRating = React.createClass({

    getInitialState: function() {
    return {other_rating: 0};
    },

    render: function() {
        var ratingProp = Math.round(this.props.other_rating);
        var placeRating = [];
        if (ratingProp == 0){
            placeRating.push(<span><small>no rating</small></span>)
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
            <span className={this.props.other_rating}>{placeRating}</span>
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

React.render(
  <PlacesBox url="api/v1/places/" pollInterval={10000} />,
  document.getElementById('yelpPlace')
);

$.ajax({
  type: "POST",
  url: "../../api_calls/yelp_business_search.py",
  data: { param: text}
}).done(function( o ) {
    // do something
    console.log(o);
});


