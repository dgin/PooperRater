
var converter = new Showdown.converter();

var Rating = React.createClass({
  render: function() {
    return (
      <div className="rating">
        <h2 className="ratingBody">
          {this.props.body}
        </h2>
          <div>{this.props.air_flow}</div>
          <div>{this.props.cleanliness}</div>
          <div>{this.props.available}</div>
          <div>{this.props.quality}</div>
          <div>{this.props.other}</div>
      </div>
    );
  }
});

var RatingsBox = React.createClass({
  loadRatingsFromServer: function() {
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
  handleRatingSubmit: function(rating) {
    var ratings = this.state.data;
    ratings.push(rating);
    this.setState({data: ratings}, function() {

      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: rating,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    });
  },


  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadRatingsFromServer();
    setInterval(this.loadRatingsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="RatingsBox">
        <h1>Rating</h1>
        <RatingList data={this.state.data} />
        <RatingForm onRatingSubmit={this.handleRatingSubmit} />
      </div>
    );
  }
});

var RatingList = React.createClass({
  render: function() {
    var ratingNodes = this.props.data.map(function(rating, index) {
      return (
        <Rating key={index}
                air_flow = {rating.air_flow}
                cleanliness = {rating.cleanliness}
                available = {rating.available}
                quality = {rating.quality}
                other = {rating.other}>
        </Rating>
      );
    });
    return (
      <div className="ratingList">
        {ratingNodes}
      </div>
    );
  }
});

//air_flow_rating={comment.Rating.air_flow}
//            cleanliness_rating = {comment.Rating.cleanliness}
//            available_rating = {comment.Rating.available}
//            quality_rating = {comment.Rating.quality}


var RatingForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var air_flow = this.refs.body.getDOMNode().value.trim();
    var cleanliness = this.refs.upvote.getDOMNode().value.trim();
    var available = this.refs.downvote.getDOMNode().value.trim();
    var quality = this.refs.upvote.getDOMNode().value.trim();
    var other = this.refs.downvote.getDOMNode().value.trim();

    if (!air_flow || !cleanliness || !available || !quality || !other) {
      return;
    }
    this.props.onCommentSubmit({air_flow: air_flow,
                                cleanliness: cleanliness,
                                available: available,
                                quality: quality,
                                other: other
                                });
    this.refs.air_flow.getDOMNode().value = '';
    this.refs.cleanliness.getDOMNode().value = '';
    this.refs.available.getDOMNode().value = '';
    this.refs.quality.getDOMNode().value = '';
    this.refs.other.getDOMNode().value = '';
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="air_flow" ref="air_flow" />
        <input type="text" placeholder="cleanliness" ref="cleanliness" />
        <input type="text" placeholder="available" ref="available" />
        <input type="text" placeholder="quality" ref="quality" />
        <input type="text" placeholder="other" ref="other" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

React.render(
    //<CommentsBox data={data}/>,
    <RatingsBox url="api/v1/ratings/" pollInterval={10000} />,
  document.getElementById('ratings')
);