var converter = new Showdown.converter();

var VoteListItem = React.createClass({
  render: function() {
    return (
            <div className="vote">
                <div className="col-xs-12 col-sm-12 col-lg-12 text-center">
                    <div className="col-xs-6 col-sm-3 col-lg-2 glyphicon glyphicon-thumbs-up"> {this.props.vote.upvote}</div>
                    <div className="col-xs-6 col-sm-3 col-lg-2 glyphicon glyphicon-thumbs-down"> {this.props.vote.downvote}</div>
                </div>
          </div>
    );
  }
});

var VoteBox = React.createClass({
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

    if (this.props.pollInterval > 0) {
        setInterval(this.loadVotesFromServer, this.props.pollInterval);
    };
  },
  render: function() {
       if (this.state.data === null) {
              return (<span>loading ratings...</span>);
       }
       else {
           return (
               <div className="Vote">
                   <VoteList data={this.state.data} />

               </div>
           );
       }
  }
});

//<VoteForm onVoteSubmit={this.handleVoteSubmit} />

var VoteList = React.createClass({
  render: function() {
    if (Array.isArray(this.props.data)){
        var voteNodes = this.props.data.map(function(vote) {
          return (
            <VoteListItem vote = {vote} ></VoteListItem>
          );
        });
    } else {
        var voteNodes = [];
        voteNodes.push(this.singleNode(this.props.data));
    }

    return (
      <div className="voteList">
        {voteNodes}
      </div>
    );
  },

    singleNode: function(vote) {
        return (
            <VoteListItem vote = {vote}></VoteListItem>
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
  <VoteBox url="/api/v1/vote/" pollInterval={10000} />,
  document.getElementById('votes')
);