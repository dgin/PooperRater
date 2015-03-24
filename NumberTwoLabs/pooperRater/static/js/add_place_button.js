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
    return <button className="btn btn-default btn-block"
        data-toggle="modal" data-target="#yelpModal" onClick={this.handleClick}><b>Add Place</b></button>;
  }
});

var GoNowButton = React.createClass({
    render: function() {
        return <a id="goNowButton" className="btn btn-danger btn-lg btn-block">BATHROOM EMERGENCY</a>
    }
});