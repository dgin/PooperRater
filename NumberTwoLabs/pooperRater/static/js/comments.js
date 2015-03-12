
var converter = new Showdown.converter();

var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentBody">
          {this.props.body}
        </h2>
        <div>{this.props.upvote}</div>
        <div>{this.props.downvote}</div>
      </div>
    );
  }
});

var CommentsBox = React.createClass({
  loadCommentsFromServer: function() {
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
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    comments.push(comment);
    this.setState({data: comments}, function() {
      // `setState` accepts a callback. To avoid (improbable) race condition,
      // `we'll send the ajax request right after we optimistically set the new
      // `state.
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: comment,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    });
  },
  //<CommentForm onCommentSubmit={this.handleCommentSubmit} />

  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="CommentsBox">
        <h1>Comment</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment, index) {
      return (
        <Comment key={index}
                   body = {comment.body}
            upvote = {comment.upvote}
            downvote = {comment.downvote} >
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

//air_flow_rating={comment.Rating.air_flow}
//            cleanliness_rating = {comment.Rating.cleanliness}
//            available_rating = {comment.Rating.available}
//            quality_rating = {comment.Rating.quality}


var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var body = this.refs.body.getDOMNode().value.trim();
    var upvote = this.refs.upvote.getDOMNode().value.trim();
    var downvote = this.refs.downvote.getDOMNode().value.trim();
    if (!upvote || !downvote || !body) {
      return;
    }
    this.props.onCommentSubmit({body: body,
                                upvote: upvote,
                                downvote: downvote });
    this.refs.body.getDOMNode().value = '';
    this.refs.upvote.getDOMNode().value = '';
    this.refs.downvote.getDOMNode().value = '';
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="body" ref="body" />
        <input type="text" placeholder="upvote" ref="upvote" />
        <input type="text" placeholder="downvote" ref="downvote" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

React.render(
    //<CommentsBox data={data}/>,
    <CommentsBox url="api/v1/comments/" pollInterval={10000} />,
  document.getElementById('comments')
);