var converter = new Showdown.converter();

var Place = React.createClass({
  render: function() {
    return (
        <div className="place">

            <h1><a href="#" ><BackButton /></a>&nbsp; {this.props.data.name}</h1>

            <div className="panel panel-default">
                <div className="panel-body">

                    <div>
                                <div>
                                        <div className="col-lg-8 col-sm-12 col-xs-12">{this.props.data.desc}</div>
                                        <div className="col-lg-4 col-sm-12 col-xs-12">
                                            <div><small className="glyphicon glyphicon-home"> {this.props.data.address}</small></div>
                                            <div><small className="glyphicon glyphicon-globe"> {this.props.data.city}</small></div>
                                        </div>
                                </div>
                                <div>
                                    <h1>&nbsp;</h1>
                                </div>
                                <div>
                                    <div className="col-lg-12 col-sm-12 col-xs-12"><h4><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Average: </div><div className="col-lg-6 col-sm-6 col-xs-6"><SmallStarRating rating={this.props.data.overall_average_rating}></SmallStarRating> <small>({this.props.data.number_of_ratings})</small></div></h4></div>
                                    <div className="col-lg-12 col-sm-12 col-xs-12"><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Air: </div><div className="col-lg-6 col-sm-6 col-xs-6"><SmallStarRating rating={this.props.data.average_rating.air_flow__avg}></SmallStarRating></div></div>
                                    <div className="col-lg-12 col-sm-12 col-xs-12"><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Clean: </div><div className="col-lg-6 col-sm-6 col-xs-6"><SmallStarRating rating={this.props.data.average_rating.cleanliness__avg}></SmallStarRating></div></div>
                                    <div className="col-lg-12 col-sm-12 col-xs-12"><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Available: </div><div className="col-lg-6 col-sm-6 col-xs-6"><SmallStarRating rating={this.props.data.average_rating.available__avg}></SmallStarRating></div></div>
                                    <div className="col-lg-12 col-sm-12 col-xs-12"><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Quality: </div><div className="col-lg-6 col-sm-6 col-xs-6"><SmallStarRating rating={this.props.data.average_rating.quality__avg}></SmallStarRating></div></div>
                                    <div className="col-lg-12 col-sm-12 col-xs-12"><div className="col-lg-6 col-sm-6 col-xs-6 text-right">Ammenities: </div><div className="col-lg-6 col-sm-6 col-xs-6"><SmallStarRating rating={this.props.data.average_rating.other__avg}></SmallStarRating></div></div>
                                </div>
                    </div>
                </div>
            </div>

                    <div className="col-lg-12 col-sm-12 col-xs-12"><a href={"#ratings/" + this.props.data.id}><AddRatingButton/></a></div>

                    <div>&nbsp;</div>
                    <div><RatingsBox url={"/api/v1/places/" + this.props.data.id + "/ratings/"} placeID = {this.props.data.id} /></div>
       </div>
    );
  }
});

var PlacePage = React.createClass({
  loadPlacesFromServer: function() {
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

  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadPlacesFromServer();
    if (this.props.pollInterval > 0){
          setInterval(this.loadPlacesFromServer, this.props.pollInterval);
       }
  },
  render: function() {
      if (this.state.data.length == 0) {
          return (<span>loading...</span>);
      }
      else{
          return (
              <div className="PlaceBox">
                <Place data={this.state.data} />
              </div>
          );
      }
  }
});

var SmallStarRating = React.createClass({

    getInitialState: function() {
    return {rating: 0};
    },

    render: function() {
        var ratingProp = Math.round(this.props.rating);

        var placeRating = [];

        if (ratingProp == 0){
            placeRating.push(<span><small>no rating</small></span>)
        }
        else {
            var i;
            var j;
            for (i = 0; i < ratingProp; i++){
                placeRating.push(<span className="glyphicon glyphicon-star"></span>);
            }
            for (j = ratingProp; j < 5; j++){
                placeRating.push(<span className="glyphicon glyphicon-star-empty"></span>);
            }
        }
        return (
            <span className={this.props.rating}>{placeRating}</span>
        );
    }
});

