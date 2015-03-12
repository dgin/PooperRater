var converter = new Showdown.converter();

var Comment = React.createClass({
  render: function() {
    return (
     <div className="panel panel-default">
        <div className="panel-body">
            <div className="comment">
                <div className="commentBody col-lg-10 offset-lg-1">{this.props.body}</div>
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
      contentType: "application/json; charset=utf-8",
      success: function(data) {
        this.setState({data: data}
        );
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, err);
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
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment body = {comment.body} />
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
    if (!body) {
      return;
    }
    this.props.onCommentSubmit({body: body});
    this.refs.body.getDOMNode().value = '';
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
                    <div className="col-lg-12 text-right"><input type="submit" value="Post" /></div>
                </div>
              </form>
        </div>
      </div>
    );
  }
});

React.render(
  <CommentsBox url="api/v1/comments/" pollInterval={10000} />,
  document.getElementById('comments')
);