var AddPlaceButton = React.createClass({
  render: function() {
    return <button className="btn btn-lg btn-default  col-lg-12 col-sm-12 col-xs-12" data-toggle="modal" data-target="#yelpModal">Add Place</button>;
  }
});

React.render(<AddPlaceButton />);