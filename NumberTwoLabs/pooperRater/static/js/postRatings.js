
var converter = new Showdown.converter();

//var Rating = React.createClass({
//  render: function() {
//
//      //console.log(this.props.air_flow);
//
//    return (
//        <div className="panel panel-default">
//        <div className="panel-body">
//            <div className="rating">
//                <div className="ratingBody">
//                    <div className="row">
//                     <div className="col-lg-6 col-sm-12 col-xs-12">
//                          <div className="col-lg-12 col-sm-12 col-xs-12"><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Air: </div><div className="col-lg-6 col-sm-6 col-xs-6"><SmallStarRating rating={this.props.rating.air_flow}></SmallStarRating></div></div>
//                          <div className="col-lg-12 col-sm-12 col-xs-12"><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Clean:  </div><div className="col-lg-6 col-sm-6 col-xs-6"><SmallStarRating rating={this.props.rating.cleanliness}></SmallStarRating></div></div>
//                          <div className="col-lg-12 col-sm-12 col-xs-12"><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Availible: </div><div className="col-lg-6 col-sm-6 col-xs-6"><SmallStarRating rating={this.props.rating.available}></SmallStarRating></div></div>
//                          <div className="col-lg-12 col-sm-12 col-xs-12"><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Quality: </div><div className="col-lg-6 col-sm-6 col-xs-6"><SmallStarRating rating={this.props.rating.quality}></SmallStarRating></div></div>
//                          <div className="col-lg-12 col-sm-12 col-xs-12"><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Other: </div><div className="col-lg-6 col-sm-6 col-xs-6"><SmallStarRating rating={this.props.rating.other}></SmallStarRating></div></div>
//                     </div>
//                     <div className="col-lg-6 col-sm-12 col-xs-12">
//                         <CommentsBox url={"/api/v1/ratings/" + this.props.rating.id + "/comments/"} pollInterval={10000} ></CommentsBox>
//                     </div>
//                </div>
//                </div>
//                <div className="col-lg-12 col-sm-12 col-xs-12">
//                    <h1>&nbsp;</h1>
//                    <VoteBox url={"/api/v1/vote/" + this.props.rating.id + "/"} pollInterval={10000} ></VoteBox>
//                </div>
//            </div>
//
//        </div>
//        </div>
//
//
//    );
//  }
//});

//<CommentsBox url={"/api/v1/comments/" + this.props.rating.id + "/"}></CommentsBox>

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

var PostRatingsBox = React.createClass({
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
  handleRatingSubmit: function(rating) {
    var ratings = this.state.data;
    ratings.push(rating);
    this.setState({data: ratings}, function() {

      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: rating,
        //headers: {'X-CSRFToken': $.cookie('csrftoken')},
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
            <div className="PostRatingsBox">
                <RatingForm onRatingSubmit={this.handleRatingSubmit} />

            </div>
        );
    }

  }
});

//<DjangoCSRFToken />

//<RatingList data={this.state.data} />

//var RatingList = React.createClass({
//  render: function() {
//
//
//    var ratingNodes = this.props.data.map(function(rating, index) {
//
//      return (
//        <Rating key={index}
//                air_flow = {rating.air_flow}
//                cleanliness = {rating.cleanliness}
//                available = {rating.available}
//                quality = {rating.quality}
//                other = {rating.other}>
//        </Rating>
//      );
//    });
//
//    if (Array.isArray(this.props.data)){
//        ratingNodes = this.props.data.map(function(rating) {
//            return (
//            <Rating rating = {rating}></Rating>
//          );
//        });
//    } else {
//        ratingNodes = [];
//        ratingNodes.push(this.singleNode(this.props.data));
//    }
//
//
//    return (
//      <div className="ratingList">
//        {ratingNodes}
//      </div>
//    );
//  },
//
//    singleNode: function(rating) {
//        return (
//            <Rating rating = {rating}></Rating>
//        );
//    }
//});


//var RatingForm = React.createClass({
//  handleSubmit: function(e) {
//    e.preventDefault();
//    var air_flow = this.refs.air_flow.getDOMNode().value.trim();
//    var cleanliness = this.refs.cleanliness.getDOMNode().value.trim();
//    var available = this.refs.available.getDOMNode().value.trim();
//    var quality = this.refs.quality.getDOMNode().value.trim();
//    var other = this.refs.other.getDOMNode().value.trim();
//
//    if (!air_flow || !cleanliness || !available || !quality || !other) {
//      return;
//    }
//    this.props.onRatingSubmit({air_flow: air_flow,
//                                cleanliness: cleanliness,
//                                available: available,
//                                quality: quality,
//                                other: other
//                                });
//    this.refs.air_flow.getDOMNode().value = 0;
//    this.refs.cleanliness.getDOMNode().value = 0;
//    this.refs.available.getDOMNode().value = 0;
//    this.refs.quality.getDOMNode().value = 0;
//    this.refs.other.getDOMNode().value = 0;
//  },
//  render: function() {
//    return (
//      <form className="commentForm" onSubmit={this.handleSubmit}>
//        <input type="text" placeholder="air_flow" ref="air_flow" />
//        <input type="text" placeholder="cleanliness" ref="cleanliness" />
//        <input type="text" placeholder="available" ref="available" />
//        <input type="text" placeholder="quality" ref="quality" />
//        <input type="text" placeholder="other" ref="other" />
//        <input type="submit" value="Post" />
//      </form>
//    );
//  }
//});


var Star = React.createClass({
    getDefaultProps: function () {
        return {
            isActive: false,
            isDisabled: false
        }
    },
    render: function () {
        var className = this.props.isActive? 'is-active': '';
        className += this.props.isDisabled? ' is-disabled': '';
        return (
            <a className={className}>★</a>
        )
    }
});
var Rater = React.createClass({
    getInitialState: function() {
        return {
            lastRating: this.props.rating,
            rating: this.props.rating
        }
    },
    getDefaultProps: function() {
        return {
            total: 5,
            rating: 0
        }
    },
    componentDidMount: function() {
        this.setState({
            rating: this.props.rating
        })
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            rating: nextProps.rating
        })
    },
    handleMouseEnter: function () {
        this.setState({
            rating: 0
        })
    },
    handleMouseLeave: function () {
        this.setState({
            rating: this.state.lastRating
        })
    },
    handleClick: function (e) {
        var star = e.target
          , allStars = Array.prototype.slice.call(e.currentTarget.childNodes, 0)
          , index = allStars.indexOf(star)
          , rating = this.props.total - index
          , limit = Number(this.props.limit)
          , lastRating = Number(this.state.lastRating)
          , callback = this.props.onRate;
        if (star.getAttribute('class').indexOf('is-disabled') > -1) {
            return
        }
        limit = (this.props.limit === void 0)? this.props.total:limit;
        rating = rating < limit? rating:limit;
        rating = (rating === lastRating)? '0': rating;
        this.setState({
            lastRating: rating,
            rating: rating
        });
        callback && callback(Number(rating), Number(lastRating))
    },

    render: function () {
        var total = Number(this.props.total)
          , limit = Number(this.props.limit)
          , rating = Number(this.state.rating)
          , nodes;
        limit = (this.props.limit === void 0)? total: limit;
        nodes = Array(total).join(',').split(',').map(function (_, i) {
            return (
                <Star
                    isActive={ (i >= total - rating)? true:false }
                    isDisabled={ (i < total - limit) ? true:false } />
            )
        }.bind(this))
        return (
            <div
                className="react-rater"
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onClick={this.handleClick}>{nodes}</div>
        )
    }

});


var RatingForm = React.createClass({

    airFlowHandleRate: function(rating, lastRating) {
        this.refs.air_flow.props.rating = rating;
    },
    cleanlinessHandleRate: function(rating, lastRating) {
        this.refs.cleanliness.props.rating = rating;
    },
    availableHandleRate: function(rating, lastRating) {
        this.refs.available.props.rating = rating;
    },
    qualityHandleRate: function(rating, lastRating) {
        this.refs.quality.props.rating = rating;
    },
    otherHandleRate: function(rating, lastRating) {
        this.refs.other.props.rating = rating;
    },
//handle setting the variables to the DOM event and setting the POST info
    handleSubmit: function(e){


        e.preventDefault();

        //console.log("got to handlesubmit, not yet set variables");

        var air_flow = this.refs.air_flow.props.rating;
        var cleanliness = this.refs.cleanliness.props.rating;
        var available = this.refs.available.props.rating;
        var quality = this .refs.quality.props.rating;
        var other = this.refs.other.props.rating;
        var comment = this.refs.comment.getDOMNode().value.trim();

        //console.log('airflow: ', air_flow, 'cleanliness: ', cleanliness, 'avail: ', available, 'qual: ', quality, 'oth: ', other);
        //console.log('comment: ', comment);

        if (!air_flow || !cleanliness || !available || !quality || !other ) {
            alert('you missed a rating');
            return;
        }

        //console.log("have set rating variables");
        //console.log("handle submit", air_flow);
        //console.log('this props: ', this.props.onRatingSubmit.__reactBoundContext.props.url);
        //console.log('new place id: ', this.props.onRatingSubmit.__reactBoundContext.props.placeID);


        var placeID = this.props.onRatingSubmit.__reactBoundContext.props.placeID;


        var owner = GlobalUserID;
        //console.log('owner: ', GlobalUserID);

        this.props.onRatingSubmit({
            place: placeID,
            owner: owner,
            air_flow: air_flow,
            cleanliness: cleanliness,
            available: available,
            quality: quality,
            other:other,
            rating_comment: comment
        });


    },


    render: function() {
        return (
            <div>
                <h1>Rate {this.props.id}</h1>
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <form className="ratingForm" onSubmit={this.handleSubmit}>



                                <div className="col-lg-6 col-sm-6 col-xs-6 text-right">Air: </div><div className="col-lg-6 col-sm-6 col-xs-6 text-left">
                                    <Rater total={5} rating={0} onRate={this.airFlowHandleRate} ref="air_flow"/>
                                </div>

                                <div className="col-lg-6 col-sm-6 col-xs-6 text-right">Clean: </div><div className="col-lg-6 col-sm-6 col-xs-6 text-left">
                                    <Rater total={5} rating={0} onRate={this.cleanlinessHandleRate} ref="cleanliness" />
                                </div>

                                <div className="col-lg-6 col-sm-6 col-xs-6 text-right">Available: </div><div className="col-lg-6 col-sm-6 col-xs-6 text-left">
                                    <Rater total={5} rating={0} onRate={this.availableHandleRate} ref="available" />
                                </div>

                                <div className="col-lg-6 col-sm-6 col-xs-6 text-right">Quality: </div><div className="col-lg-6 col-sm-6 col-xs-6 text-left">
                                    <Rater total={5} rating={0} onRate={this.qualityHandleRate} ref="quality" />
                                </div>

                                <div className="col-lg-6 col-sm-6 col-xs-6 text-right">Other: </div><div className="col-lg-6 col-sm-6 col-xs-6 text-left">
                                    <Rater total={5} rating={0} onRate={this.otherHandleRate} ref="other" />
                                </div>
                                <div>
                                    <h1>&nbsp;</h1>
                                </div>
                                <div className="col-lg-12 col-sm-12 col-xs-12">
                                    <textarea rows="4" type="text" className="form-control" placeholder="Start writing your comment..." ref="comment" />
                                </div>
                                <div>
                                    &nbsp;
                                </div>
                                <div className="col-lg-12 col-sm-12 col-xs-12 text-right">
                                    <a href={"#place/" + this.props.onRatingSubmit.__reactBoundContext.props.url[this.props.onRatingSubmit.__reactBoundContext.props.url.indexOf("places/")+7]} >
                                        <button className="btn btn-lg btn-default text-left" type="submit" value="Rate">Rate</button>
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

        )
    }
  });

//var UserID = React.createElement('div', { userID: '{{ user.id }}' });
//React.render(root);

//React.render(
//    //<CommentsBox data={data}/>
//    <PostRatingsBox url="/api/v1/ratings/" pollInterval={100000} />,
//  document.getElementById('ratings')
//);