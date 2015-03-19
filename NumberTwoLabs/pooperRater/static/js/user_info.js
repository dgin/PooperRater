// PlaceBox
//    PlaceList
//       PlaceListItem

var converter = new Showdown.converter();

var User = React.createClass({
  render: function() {
    return (

    <div className="placeName col-lg-9 col-sm-12 col-xs-12"><h3>{this.props.user.related_user} {this.props.user.anonymous_name}</h3></div>

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
        <h1>username</h1>
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



React.render(
    <UserBox url="/api/v1/anon/" pollInterval={10000} />,
  document.getElementById('userinfo')
);