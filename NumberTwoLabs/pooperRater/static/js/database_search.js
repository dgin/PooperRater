handleSearchSubmit = function() {
    var searchTerm = document.getElementById("databaseSearchbar").value;
    //console.log('/api/v1/places/?search='+searchTerm);
    $.ajax({
        url: '/api/v1/places/?search='+searchTerm,
        type: 'GET',
        success: function(response) {
            if (response.length === 0) {
                return (0);
                //return ("Nothing is there!");
            } else {
                console.log(response);
                return (1);
            }
        }

    });
};

var DatabaseSearch = React.createClass({
  getInitialState: function() {
    return {message: ''};
  },
  handleChange: function(event) {
    this.setState({message: event.target.value});
    if (event.target.value.length >= 3) {
      var results = handleSearchSubmit();
      console.log(results);
    }

  },
  render: function() {
    var message = this.state.message;
    return (<div id="searchDataComponents">
        <input id="databaseSearchbar" type="text" placeholder="Search a toilet!"
            value={message} onChange={this.handleChange} />
        <div id="searchResults">{this.state.searchResults}</div>
    </div>);
  }
});

React.render(<DatabaseSearch />, document.getElementById("demo"));