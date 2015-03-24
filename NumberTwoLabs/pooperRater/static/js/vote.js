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

  loadRatingVoteCountsFromServer: function(rating) {
      var ratingData = this.state.data;
      console.log("rating1: ", rating['url']);
      //console.log("rating2: ",rating.key("url"));
      var ratingURL = rating['url'].toString() + rating['rating'].toString();
      console.log("ratingData: ", ratingData);

    this.setState({data: ratingData}, function() {
        $.ajax({
            url: ratingURL,
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(ratingURL, status, err.toString());
            }.bind(this)
        });
        console.log("get rating ajax call returned", ratingData);
    });
  },

  handleVoteSubmit: function(vote) {
    var votes = this.state.data;
    //  console.log(vote);
    //votes.push(vote);
    this.setState({data: votes}, function() {
      // `setState` accepts a callback. To avoid (improbable) race condition,
      // `we'll send the ajax request right after we optimistically set the new
      // `state.
        console.log("before post ajax call: ", this.props.upVoteCount);

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
      console.log("after post ajax call: ",this.props.upVoteCount);
      //console.log("data: ", {data});
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
                   <VoteForm onVoteSubmit={this.handleVoteSubmit}
                            loadVoteCount = {this.loadRatingVoteCountsFromServer}
                            upVoteCount = {this.props.upVoteCount}
                            downVoteCount = {this.props.downVoteCount}/>
               </div>
           );
       }
  }
});

//<VoteList data={this.state.data} />

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

  handleUpvote: function(e) {
      e.preventDefault();
      var upvote = true;
      var downvote = false;
      var ratingID = this.props.onVoteSubmit.__reactBoundContext.props.ratingID;

      this.props.onVoteSubmit({
          rating_vote: ratingID,
          upvote: upvote,
          downvote: downvote
      });

      //var url = "/api/v1/ratings/";
      //console.log("it got here");
      //
      //this.props.laodVoteCount({
      //    url: url,
      //    ratingL: ratingID
      //})


  },

    //this.


  handleDownvote: function(e) {
    e.preventDefault();
    var upvote = false;
    var downvote = true;
    var ratingID = this.props.onVoteSubmit.__reactBoundContext.props.ratingID;

    this.props.onVoteSubmit({   rating_vote: ratingID,
                                upvote: upvote,
                                downvote: downvote });



  },

  render: function() {
    return (
              <form className="voteForm" onSubmit={this.handleSubmit}>
                <div class="row">
                    <div className="col-xs-12 col-sm-12 col-lg-12 text-center">
                        <div className="col-lg-2 col-sm-4 col-xs-6"><a type="text" placeholder="upvote" ref="upvote" onClick = {this.handleUpvote}><span className="glyphicon glyphicon-thumbs-up"> {this.props.upVoteCount}</span></a></div>
                        <div className="col-lg-2 col-sm-4 col-xs-6"><a type="text" placeholder="downvote" ref="downvote" onClick = {this.handleDownvote}><span className="glyphicon glyphicon-thumbs-down"> {this.props.downVoteCount}</span></a></div>
                    </div>
                </div>
              </form>
    );
  }
});

//var VoteCount = React.createClass({
//    render: function(){
//        <p>this is a count of the votes</p>
//    }
//});

//<div>{this.children._owner._owner.props.upVoteCount}</div>
//<div className="col-lg-4 text-right"><input type="submit" value="Post" /></div>

React.render(
  <VoteBox url="/api/v1/vote/" pollInterval={10000} />,
  document.getElementById('votes')
);