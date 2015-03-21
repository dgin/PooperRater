
var converter = new Showdown.converter();

var Rating = React.createClass({
  render: function() {

      //console.log(this.props.air_flow);

    return (
        <div className="panel panel-default">
        <div className="panel-body">
            <div className="rating">
                <div className="ratingBody">
                    <div className="row">
                     <div className="col-lg-6 col-sm-12 col-xs-12">
                          <div className="col-lg-12 col-sm-12 col-xs-12"><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Air: </div><div className="col-lg-6 col-sm-6 col-xs-6"><SmallStarRating rating={this.props.rating.air_flow}></SmallStarRating></div></div>
                          <div className="col-lg-12 col-sm-12 col-xs-12"><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Clean:  </div><div className="col-lg-6 col-sm-6 col-xs-6"><SmallStarRating rating={this.props.rating.cleanliness}></SmallStarRating></div></div>
                          <div className="col-lg-12 col-sm-12 col-xs-12"><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Availible: </div><div className="col-lg-6 col-sm-6 col-xs-6"><SmallStarRating rating={this.props.rating.available}></SmallStarRating></div></div>
                          <div className="col-lg-12 col-sm-12 col-xs-12"><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Quality: </div><div className="col-lg-6 col-sm-6 col-xs-6"><SmallStarRating rating={this.props.rating.quality}></SmallStarRating></div></div>
                          <div className="col-lg-12 col-sm-12 col-xs-12"><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Other: </div><div className="col-lg-6 col-sm-6 col-xs-6"><SmallStarRating rating={this.props.rating.other}></SmallStarRating></div></div>
                     </div>
                          <div className="col-lg-6 col-sm-12 col-xs-12">{this.props.rating.rating_comment}</div>
                </div>
                </div>
                <div className="col-lg-12 col-sm-12 col-xs-12">
                    <h1>&nbsp;</h1>
                    <VoteBox url={"/api/v1/vote/" + this.props.rating.id + "/"} pollInterval={10000} ></VoteBox>
                </div>
            </div>

        </div>
        </div>


    );
  }
});

//<div className="col-lg-6 col-sm-12 col-xs-12">
//                         <CommentsBox url={"/api/v1/ratings/" + this.props.rating.id + "/comments/"} pollInterval={10000} ></CommentsBox>
//                     </div>
//*************************
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

// Makes the ajax call to our database; first puts a csrf token in the header

var RatingsBox = React.createClass({
  loadRatingsFromServer: function() {
    var csrftoken = getCookie('csrftoken');
    $.ajaxSetup({
       beforeSend: function(xhr, settings) {
           if (! csrfSafeMethod(settings.type) && !this.crossDomain) {
               xhr.setRequestHeader("X-CSRFToken", csrftoken);
           }
       }
    });
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
  //handleRatingSubmit: function(rating) {
  //  var ratings = this.state.data;
  //  ratings.push(rating);
  //  this.setState({data: ratings}, function() {
  //
  //    $.ajax({
  //      url: this.props.url,
  //      dataType: 'json',
  //      type: 'POST',
  //      data: rating,
  //      //headers: {'X-CSRFToken': $.cookie('csrftoken')},
  //      success: function(data) {
  //        this.setState({data: data});
  //      }.bind(this),
  //      error: function(xhr, status, err) {
  //        console.error(this.props.url, status, err.toString());
  //      }.bind(this)
  //    });
  //  });
  //},


  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadRatingsFromServer();

      //if (this.props.pollInterval > 0){
      //  setInterval(this.loadRatingsFromServer, this.props.pollInterval);
      //  }
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


///<RatingForm onRatingSubmit={this.handleRatingSubmit} />

var RatingList = React.createClass({
  render: function() {


    var ratingNodes = this.props.data.map(function(rating, index) {

      return (
        <Rating key={index}
                air_flow = {rating.air_flow}
                cleanliness = {rating.cleanliness}
                available = {rating.available}
                quality = {rating.quality}
                other = {rating.other}
                comment = {rating.rating_comment}>
        </Rating>
      );
    });

    if (Array.isArray(this.props.data)){
        ratingNodes = this.props.data.map(function(rating) {
            return (
            <Rating rating = {rating}></Rating>
          );
        });
    } else {
        ratingNodes = [];
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
