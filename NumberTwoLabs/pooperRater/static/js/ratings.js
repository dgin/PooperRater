
var converter = new Showdown.converter();

var Rating = React.createClass({
  render: function() {
    return (
            <div className="rating">
                <div className="ratingBody">
                      <div className="col-lg-12 col-sm-12 col-xs-12"><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Air: </div><div className="col-lg-6 col-sm-6 col-xs-6"><SmallStarRating rating={this.props.rating.air_flow}></SmallStarRating></div></div>
                      <div className="col-lg-12 col-sm-12 col-xs-12"><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Cleanliness:  </div><div className="col-lg-6 col-sm-6 col-xs-6"><SmallStarRating rating={this.props.rating.cleanliness}></SmallStarRating></div></div>
                      <div className="col-lg-12 col-sm-12 col-xs-12"><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Availible: </div><div className="col-lg-6 col-sm-6 col-xs-6"><SmallStarRating rating={this.props.rating.available}></SmallStarRating></div></div>
                      <div className="col-lg-12 col-sm-12 col-xs-12"><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Quality: </div><div className="col-lg-6 col-sm-6 col-xs-6"><SmallStarRating rating={this.props.rating.quality}></SmallStarRating></div></div>
                      <div className="col-lg-12 col-sm-12 col-xs-12"><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Other: </div><div className="col-lg-6 col-sm-6 col-xs-6"><SmallStarRating rating={this.props.rating.other}></SmallStarRating></div></div>
               </div>
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

      if (this.props.pollInterval > 0){
        setInterval(this.loadRatingsFromServer, this.props.pollInterval);
        };
  },
  render: function() {
    if (this.state.data === null) {
          return (<span>loading ratings...</span>);
      }
      else {
        return (
            <div className="RatingsBox">
                <RatingList data={this.state.data} />
            </div>
        );
    }
  }
});

//<RatingForm onRatingSubmit={this.handleRatingSubmit} />

var RatingList = React.createClass({
  render: function() {
    if (Array.isArray(this.props.data)){
        var ratingNodes = this.props.data.map(function(rating) {
            return (
            <Rating rating = {rating}></Rating>
          );
        });
    } else {
        var ratingNodes = [];
        ratingNodes.push(this.singleNode(this.props.data));
    }

    return (
      <div className="ratingList">
        {ratingNodes}
      </div>
    );
  },

    singleNode: function(rating) {
        return (
            <Rating rating = {rating}></Rating>
        );
    }
});


var RatingForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var air_flow = this.refs.air_flow.getDOMNode().value.trim();
    var cleanliness = this.refs.cleanliness.getDOMNode().value.trim();
    var available = this.refs.available.getDOMNode().value.trim();
    var quality = this.refs.quality.getDOMNode().value.trim();
    var other = this.refs.other.getDOMNode().value.trim();

    if (!air_flow || !cleanliness || !available || !quality || !other) {
      return;
    }
    this.props.onRatingSubmit({air_flow: air_flow,
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
       <div className="panel panel-default">
        <div className="panel-body">
              <form className="commentForm" onSubmit={this.handleSubmit}>
                <div><input type="text" placeholder="air_flow" ref="air_flow" /></div>
                <div><input type="text" placeholder="cleanliness" ref="cleanliness" /></div>
                <div><input type="text" placeholder="available" ref="available" /></div>
                <div><input type="text" placeholder="quality" ref="quality" /></div>
                <div><input type="text" placeholder="other" ref="other" /></div>
                <div><input type="submit" value="Post" /></div>
              </form>
         </div>
       </div>
    );
  }
});

//React.render(
//    //<CommentsBox data={data}/>,
//    <RatingsBox url="/api/v1/ratings/" pollInterval={10000} />,
//  document.getElementById('ratings')
//);