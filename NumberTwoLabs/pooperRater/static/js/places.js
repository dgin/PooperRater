var converter = new Showdown.converter();

var Place = React.createClass({
  render: function() {
    return (
      <div className="place">
        <h2 className="placeName">
          {this.props.name}
        </h2>
        <div>{this.props.desc}</div>
        <div>{this.props.rating}</div>
        <button type="submit" className="btn btn-default">Submit</button>
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
        <Place name={place.name} desc={place.desc} placeTyoe={place.place_type}
            rating={place.overall_average_rating} key={index}></Place>
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


