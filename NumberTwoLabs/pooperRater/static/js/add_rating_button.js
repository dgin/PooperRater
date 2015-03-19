/**
 * Created by Nam-Storm on 17/3/15.
 */
//button component
//in app render button component
//pass page component to button component


var AddRatingButton = React.createClass({
  render: function() {
    return <button type="submit" className="btn btn-lg btn-warning col-lg-12 col-sm-12 col-xs-12">Add A Rating</button>;
  }
});

React.render(<AddRatingButton />);

