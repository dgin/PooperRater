// PlacePage
//      Place
//      Comments
//      Ratings



var converter = new Showdown.converter();

var Place = React.createClass({
  render: function() {
    return (
    <div className="place">
    <h1>{this.props.data.name}</h1>
    <div className="panel panel-default">
        <div className="panel-body">

                        <div>
                            <div>
                                    <div className="col-lg-8 col-sm-12 col-xs-12">{this.props.data.desc}</div>
                                    <div className="col-lg-4 col-sm-12 col-xs-12">
                                        <div><small className="glyphicon glyphicon-inbox"> {this.props.data.unit}</small></div>
                                        <div><small className="glyphicon glyphicon-align-justify"> {this.props.data.floor}</small></div>
                                        <div><small className="glyphicon glyphicon-home"> {this.props.data.address}</small></div>
                                        <div><small className="glyphicon glyphicon-globe"> {this.props.data.city}</small></div></div>
                            </div>
                            <div>
                                <h1>&nbsp;</h1>
                            </div>
                            <div>
                                <div className="col-lg-12 col-sm-12 col-xs-12"><h3><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Overall Rating: </div><div className="col-lg-6 col-sm-6 col-xs-6"><SmallStarRating rating={this.props.data.overall_average_rating}></SmallStarRating></div></h3></div>
                                <div className="col-lg-12 col-sm-12 col-xs-12"><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Air: </div><div className="col-lg-6 col-sm-6 col-xs-6"><SmallStarRating rating={this.props.data.average_rating.air_flow__avg}></SmallStarRating></div></div>
                                <div className="col-lg-12 col-sm-12 col-xs-12"><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Clean: </div><div className="col-lg-6 col-sm-6 col-xs-6"><SmallStarRating rating={this.props.data.average_rating.cleanliness__avg}></SmallStarRating></div></div>
                                <div className="col-lg-12 col-sm-12 col-xs-12"><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Available: </div><div className="col-lg-6 col-sm-6 col-xs-6"><SmallStarRating rating={this.props.data.average_rating.available__avg}></SmallStarRating></div></div>
                                <div className="col-lg-12 col-sm-12 col-xs-12"><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Quality: </div><div className="col-lg-6 col-sm-6 col-xs-6"><SmallStarRating rating={this.props.data.average_rating.quality__avg}></SmallStarRating></div></div>
                                <div className="col-lg-12 col-sm-12 col-xs-12"><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Other: </div><div className="col-lg-6 col-sm-6 col-xs-6"><SmallStarRating rating={this.props.data.average_rating.other__avg}></SmallStarRating></div></div>
                            </div>
                        </div>


            </div>
        </div>

        <div className="panel panel-default">
        <div className="panel-body">
            <div><RatingsBox url={"/api/v1/ratings/" + this.props.data.id + "/"} pollInterval={4000} /></div>
            <div>
                <h1>&nbsp;</h1>
            </div>
            <div><CommentsBox url={"/api/v1/comments/" + this.props.data.id + "/"} pollInterval={4000} ></CommentsBox></div>
            <div><VoteBox url={"/api/v1/vote/" + this.props.data.id + "/"} pollInterval={4000} ></VoteBox></div>
        </div>
        </div>
    </div>

    );
  }
});

var PlacePage = React.createClass({
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
       };
  },
  render: function() {
      if (this.state.data.length == 0) {
          return (<span>loading...</span>);
      }
      else{
          return (
              <div className="PlaceBox">
                <Place data={this.state.data} />
              </div>
          );
      }
  }
});

//var PlaceList = React.createClass({
//  render: function() {
//    var placeNodes = this.props.data.map(function(place, index) {
//      return (
//        <Place name={place.name}
//            desc={place.desc}
//            placeType={place.place_type}
//            rating={place.overall_average_rating}
//            air_rating={place.average_rating.air_flow__avg}
//            clean_rating={place.average_rating.cleanliness__avg}
//            available_rating={place.average_rating.available__avg}
//            quality_rating={place.average_rating.quality__avg}
//            other_rating={place.average_rating.other__avg}
//            unit={place.unit} floor={place.floor}
//            address={place.address}
//            city={place.city}
//            key={index}></Place>
//      );
//    });
//    return (
//      <div className="placeList">
//        {placeNodes}
//      </div>
//    );
//  }
//});

var SmallStarRating = React.createClass({

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

//React.render(
//  <PlacePage url="api/v1/places/" pollInterval={10000} />,
//  document.getElementById('place')
//);
//

