
// App
//      - PlacesPage
//      - PlacePage
//            - rating
//            - Comment
var App = React.createClass({
    getInitialState: function() {
        return {
            page: null
        }
    },

    componentDidMount: function() {
        router.addRoute('', function() {
            this.setState({page: <PlacesPage url="/api/v1/places/" pollInterval={0} />});
        }.bind(this));
        router.addRoute('places/:id', function(id) {
            this.setState({page: <PlacePage url={"/api/v1/places/" + id} pollInterval={0} />});
        }.bind(this));
        router.start();
    },
    render: function() {
        return this.state.page;
    }
});

React.render(<App/>, document.getElementById('places'));