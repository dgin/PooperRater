var converter = new Showdown.converter();

var VoteListItem = React.createClass({
  render: function() {
    return (
     <div className="panel panel-default">
        <div className="panel-body">
            <div className="place">
                <div className="col-lg-4">
                    <div className="col-lg-6 glyphicon glyphicon-thumbs-up"> {this.props.upvote}</div>
                    <div className="col-lg-6 glyphicon glyphicon-thumbs-down"> {this.props.downvote}</div>
                </div>
          </div>
        </div>
     </div>
    );
  }
});

var VotePage = React.createClass({
  loadVotesFromServer: function() {
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
  handleVoteSubmit: function(vote) {
    var votes = this.state.data;
    votes.push(vote);
    this.setState({data: votes}, function() {
      // `setState` accepts a callback. To avoid (improbable) race condition,
      // `we'll send the ajax request right after we optimistically set the new
      // `state.
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: vote,
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
    this.loadVotesFromServer();
    setInterval(this.loadVotesFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="Vote">
        <h1>Votes</h1>
        <VoteForm onVoteSubmit={this.handleVoteSubmit} />
        <VoteList data={this.state.data} />

      </div>
    );
  }
});

var VoteList = React.createClass({
  render: function() {
    var voteNodes = this.props.data.map(function(vote) {
      return (
        <VoteListItem
            comment_id = {vote.comment}
            upvote = {vote.upvote}
            downvote = {vote.downvote}></VoteListItem>
      );
    });
    return (
      <div className="voteList">
        {voteNodes}
      </div>
    );
  }
});


var VoteForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var upvote = this.refs.upvote.getDOMNode().value.trim();
    var downvote = this.refs.downvote.getDOMNode().value.trim();
    if (!upvote || !downvote) {
      return;
    }
    this.props.onVoteSubmit({   upvote: upvote,
                                downvote: downvote });
    this.refs.upvote.getDOMNode().value = '';
    this.refs.downvote.getDOMNode().value = '';
  },
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
              <form className="voteForm" onSubmit={this.handleSubmit}>
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

React.render(
  <VotePage url="api/v1/vote/" pollInterval={10000} />,
  document.getElementById('votes')
);