/**
 * This file provided by Facebook is for non-commercial testing and evaluation purposes only.
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var converter = new Showdown.converter();

var Place = React.createClass({
  render: function() {
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    return (
      <div className="place">
        <h2 className="placeName">
          {this.props.name}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});

var PlacesBox = React.createClass({
  loadPlacesFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      contentType: 'application/json',
      //crossDomain: true,
      //beforeSend: function(request){
      //    request.setRequestHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
      //},
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  //handleCommentSubmit: function(comment) {
  //  var comments = this.state.data;
  //  comments.push(comment);
  //  this.setState({data: comments}, function() {
  //    // `setState` accepts a callback. To avoid (improbable) race condition,
  //    // `we'll send the ajax request right after we optimistically set the new
  //    // `state.
  //    $.ajax({
  //      url: this.props.url,
  //      dataType: 'json',
  //      type: 'POST',
  //      data: comment,
  //      success: function(data) {
  //        this.setState({data: data});
  //      }.bind(this),
  //      error: function(xhr, status, err) {
  //        console.error(this.props.url, status, err.toString());
  //      }.bind(this)
  //    });
  //  });
  //},
  // <CommentForm onCommentSubmit={this.handleCommentSubmit} />

  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadPlacesFromServer();
    setInterval(this.loadPlacesFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="PlaceBox">
        <h1>Places</h1>
        <PlaceList data={this.state.data} />
      </div>
    );
  }
});

var PlaceList = React.createClass({
  render: function() {
      console.log(this.props.data);
    var placeNodes = this.props.data.map(function(place, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <Place name={place.name} key={index}>
              {place.desc}
        </Place>

      );
    });
    return (
      <div className="placeList">
        {placeNodes}
      </div>
    );
  }
});


//var CommentForm = React.createClass({
//  handleSubmit: function(e) {
//    e.preventDefault();
//    var author = this.refs.author.getDOMNode().value.trim();
//    var text = this.refs.text.getDOMNode().value.trim();
//    if (!text || !author) {
//      return;
//    }
//    this.props.onCommentSubmit({author: author, text: text});
//    this.refs.author.getDOMNode().value = '';
//    this.refs.text.getDOMNode().value = '';
//  },
//  render: function() {
//    return (
//      <form className="commentForm" onSubmit={this.handleSubmit}>
//        <input type="text" placeholder="Your name" ref="author" />
//        <input type="text" placeholder="Say something..." ref="text" />
//        <input type="submit" value="Post" />
//      </form>
//    );
//  }
//});

React.render(
  <PlacesBox url="api/v1/places/" pollInterval={10000} />,
  document.getElementById('places')
);


