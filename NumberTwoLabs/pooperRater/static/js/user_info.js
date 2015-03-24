// PlaceBox
//    PlaceList
//       PlaceListItem

var converter = new Showdown.converter();

var User = React.createClass({
  render: function() {
    return (

    <div className="col-lg-12 col-sm-12 col-xs-12 text-right"><h5>- {this.props.user.anonymous_name}</h5></div>

    );
  }
});

var UserBox = React.createClass({
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
    return (
      <div className="PlaceBox">
        <UserList data={this.state.data} />
      </div>
    );
  }
});

var UserList = React.createClass({
  render: function() {
    var userNodes = this.props.data.map(function(user) {
            return (
                <User user = {user}></User>
            );

    });
    return (
      <div className="UserList">
        {userNodes}
      </div>
    );
  }
});