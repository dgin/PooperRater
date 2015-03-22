var AddPlaceButton = React.createClass({
    handleClick: function() {
        //document.getElementById('yelpIsLocation').value='no';
        if (document.getElementById('yelpIsLocation').value === 'no') {
            returnUserPosition();
        }
        //returnUserPosition();
    },
  render: function() {
    return <button className="btn btn-lg btn-default  col-lg-12 col-sm-12 col-xs-12"
        data-toggle="modal" data-target="#yelpModal" onClick={this.handleClick}>Add Place</button>;
  }
});

React.render(<AddPlaceButton />);