function cleanManualAdd () {
    document.getElementById("placeName").value = "";
    document.getElementById("placeAddress").value = "";
    document.getElementById("placeCity").value = "";
    var manualRes = document.getElementById("manualResult");
    manualRes.innerHTML = "";
    manualRes.className = "";
}

var AddPlaceButton = React.createClass({
    handleClick: function() {
        //document.getElementById('yelpIsLocation').value='no';
        cleanManualAdd();
        if (document.getElementById('yelpIsLocation').value === 'no') {
            returnUserPosition();
        }
        //returnUserPosition();
    },
  render: function() {
    return <button className="btn btn-default btn-add btn-block"
        data-toggle="modal" data-target="#yelpModal" onClick={this.handleClick}><b>Add Toilet</b></button>;
  }
});

var GoNowButton = React.createClass({
    render: function() {
        return <a id="goNowButton" className="btn btn-emergency btn-danger text-center col-lg-6 col-lg-offset-3 col-sm-8 col-sm-offset2 col-xs-12"><span className="fa fa-male"></span><span className="fa fa-female"></span> EMERGENCY</a>
    }
});

