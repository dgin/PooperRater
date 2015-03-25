//button component
//in app render button component
//pass page component to button component


var AddRatingButton = React.createClass({
  render: function() {
    //console.log("add button child: ",this.props.placeID);
    return <button type="submit" className="btn btn-lg btn-warning col-lg-12 col-sm-12 col-xs-12 btn-block" placeID= {this.props.placeID}>Add A Rating</button>;
  }
});
