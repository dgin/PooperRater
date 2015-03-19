

var DatabaseSearch = React.createClass({
    getInitialState: function() {
        return {message: '', results: ''};
    },
    //componentDidMount: function() {
    //},
    handleChange: function(event) {
        this.setState({message: event.target.value});
        if (event.target.value.length >= 3) {
            this.handleSearchSubmit();
        }
    },
    handleSearchSubmit: function() {
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
                    this.setState({results: response});
                }
            }.bind(this)

        });
    },
    render: function() {
        var message = this.state.message;
        var results = this.state.results;
        //var displayResults = [];
        //for (var i=0; i < results.length; i++) {
        //    displayResults.push(results[i].name + " at " + results[i].address);
        //}
        //displayResults = displayResults.join(', ');

        return (<div id="searchDataComponents">
            <input id="databaseSearchbar" type="text" placeholder="Search a toilet!"
                value={message} onChange={this.handleChange} />
            <button className="btn btn-default" onClick={this.handleChange}>Search it!</button>
            <div id="searchResults" dangerouslySetInnerHTML={{
            __html: converter.makeHtml(this.state.value)
          }}
            ><PlaceList data={results} /></div>
        </div>);
    }
});

//React.render(<DatabaseSearch />, document.getElementById("demo"));