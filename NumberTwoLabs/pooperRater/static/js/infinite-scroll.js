
var InfiniteScroll = React.createClass({
    getDefaultProps: function () {
        return {
            containerId: "content",
            pageStart: 0,
            hasMore: false,
            loadMore: function (page, callback) {},
            threshold: 50
        };
    },
    container:{},

    componentDidMount: function () {
        this.pageLoaded = this.props.pageStart;
        this.container  = document.getElementById(this.props.containerId) || window;
        this.attachScrollListener();

    },
    componentDidUpdate: function () {
        this.container  = document.getElementById(this.props.containerId) || window;
        this.attachScrollListener();
    },
    render: function () {
        var props = this.props;
        return React.DOM.div(null, props.children, props.hasMore && (props.loader || InfiniteScroll._defaultLoader));
    },
    scrollListener: function () {
        var el = this.getDOMNode();

        // Get the smaller of either the height of the container of the height of all shown items
        // the reason for this is to force some items to load at the start
        var scrollHeight = Math.min(this.container == window?document.body.scrollHeight:this.container.scrollHeight, el.offsetHeight);
        console.log("scrollHeight", document.body.scrollHeight)

        // Get the bottom of the scroll
        var scrollBottom = (this.container == window?window.pageYOffset:this.container.scrollTop) + (this.container == window?window.innerHeight:this.container.offsetHeight);
        console.log("WindowHeight", window.innerHeight, scrollHeight, scrollBottom)

        console.log("onscroll",
            "Math.min(", this.container.scrollHeight, el.offsetHeight, ")-(",
            this.container.scrollTop, "+", this.container.offsetHeight,")<", Number(this.props.threshold));

        // if top of this element + height of this element - how far we scrolled - scrollable height

        if (scrollHeight - scrollBottom < Number(this.props.threshold)) {
            // detach scroll because we're now loading
            this.detachScrollListener();

            this.props.loadMore(this.pageLoaded++, this.loadedMore);
        }
    },
    loadedMore: function(items) {
        console.log("finished loading items", (items && items.length));
    },

    attachScrollListener: function () {
        if (!this.props.hasMore) {
            return;
        }

        this.container.addEventListener('scroll', this.scrollListener);
        this.container.addEventListener('resize', this.scrollListener);
        this.scrollListener();
    },

    detachScrollListener: function () {

        this.container.removeEventListener('scroll', this.scrollListener);
        this.container.removeEventListener('resize', this.scrollListener);

    },
    componentWillUnmount: function () {
        this.detachScrollListener();
    }
});
InfiniteScroll.setDefaultLoader = function (loader) {
    InfiniteScroll._defaultLoader = loader;
};
