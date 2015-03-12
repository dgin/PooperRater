var converter = new Showdown.converter();

var Comment = React.createClass({
  render: function() {
    return (
     <div className="panel panel-default">
        <div className="panel-body">
            <div className="comment">
                <div className="commentBody col-lg-10 offset-lg-1">{this.props.body}</div>
                <div className="col-lg-4"><div className="col-lg-6 glyphicon glyphicon-thumbs-up"> {this.props.upvote}</div> <div className="col-lg-6 glyphicon glyphicon-thumbs-down"> {this.props.downvote}</div></div>
          </div>
        </div>
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
        <h1>Comments</h1>
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
        <CommentList data={this.state.data} />

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
            downvote = {comment.downvote} />
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});


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
      <div className="panel panel-default">
        <div className="panel-body">
              <form className="commentForm" onSubmit={this.handleSubmit}>
                <div class="row">
                    <div className="col-lg-12"><textarea rows="4" type="text" className="form-control .col-lg-10 .offset-lg-1" placeholder="Start writing your comment..." ref="body" />
                        <span id="helpBlock" className="help-block"></span>
                    </div>
                </div>
                <div class="row">
                    <div className="col-lg-4"><input type="text" placeholder="upvote" ref="upvote" /></div>
                    <div className="col-lg-4"><input type="text" placeholder="downvote" ref="downvote" /></div>
                    <div className="col-lg-4 text-right"><input type="submit" value="Post" /></div>
                </div>
              </form>
        </div>
      </div>
    );
  }
});

//React.render(
//    //<CommentsBox data={data}/>,
//  <CommentsBox url="api/v1/comments/" pollInterval={10000} />,
//  document.getElementById('comments')
//);