


var converter = new Showdown.converter();

var Place = React.createClass({
  render: function() {
    return (
    <div className="panel panel-default">
        <div className="panel-body">
            <div className="place">

                        <div>
                            <div>
                                    <div className="placeName col-lg-10 col-sm-10 col-xs-10"><h3>{this.props.name}</h3></div>
                                    <div className="col-lg-1 col-sm-2 col-xs-2">{this.props.rating}</div>
                            </div>
                            <div>
                                    <div className="col-lg-8 col-sm-8 col-xs-12">{this.props.desc}</div>
                                    <div className="col-lg-4 col-sm-4 col-xs-12"><div><small>U: {this.props.unit}</small></div> <div><small>F: {this.props.floor}</small></div> <div><small>A: {this.props.address}</small></div></div>
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
  //handleCommentSubmit: function(comment) {
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
  // <CommentForm onCommentSubmit={this.handleCommentSubmit} />

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
        <h1>Places</h1>
        <PlaceList data={this.state.data} />
      </div>
    );
  }
});

var PlaceList = React.createClass({
  render: function() {
    var placeNodes = this.props.data.map(function(place, index) {
      return (
        <Place name={place.name} desc={place.desc} placeType={place.place_type}
            rating={place.overall_average_rating} unit={place.unit} floor={place.floor} address={place.address} key={index}></Place>
      );
    });
    return (
      <div className="placeList">
        {placeNodes}
      </div>
    );
  }
});


//var CommentForm = React.createClass({
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
  document.getElementById('places')
);


