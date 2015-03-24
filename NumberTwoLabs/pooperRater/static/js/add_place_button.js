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

var GoNowButton = React.createClass({
    render: function() {
        return <a id="goNowButton" className="col-lg-3 col-lg-offset-1 col-sm-6 col-xs-12 hidden-xs
            text-center btn btn-danger">GET ME A TOILET NOW</a>
    }
});