var ItemPaginator = React.createClass({
		displayName: "Main",

		render: function () {
			return React.createElement(ScrollPagination, {
				ref: "scrollPagination",
				loadNextPage: this.loadNextPage,
				loadPrevPage: this.loadPrevPage,
				unloadPage: this.unloadPage,
				hasNextPage: this.hasNextPage,
				hasPrevPage: this.hasPrevPage,
			}, this.pages.map(function (page, index) {
				return React.createElement(Page, { key: page.id, id: page.id, onPageEvent: this.__handlePageEvent }, page.items.map(function (item) {
					return React.createElement('div', { key: item.id, style: { paddingTop: index + "px" } }, item.text);
				}.bind(this)));
			}.bind(this)));
		},

		__handlePageEvent: function (pageId, height) {
			this.refs.scrollPagination.handlePageEvent(pageId, height);
		},

        ScrollPagination: window.ScrollPagination,
	    Page: ScrollPagination.Page,


	pages: [],
	loadedPages: [],
	initPages: function () {
		var items = [];
        var pageId = 1;
        var pageSize = 5;
        console.log("2", this.props.items);
		for (var i = 0; i < this.props.items.length; i++) {
			if (i % pageSize == 0){
                items = [];
                this.pages.push({
                    id: "page-"+ (pageId),
                    items: items
                });
                pageId++;
            }

            items.push({
				id: pageId +"_item-"+ (i+1),
				text: this.props.items[i]
			});
		}
        this.loadedPages = this.pages.slice(0, 3);
        console.log("1", this.loadedPages);
	},

     componentDidMount: function() {
        this.initPages();
        this.loadNextPage();
      },


	hasNextPage: function () {
		if (this.loadedPages[this.loadedPages.length-1] === this.pages[this.pages.length-1]) {
			return false;
		}
		return true;
	},

	hasPrevPage: function () {
		if (this.loadedPages[0] === this.pages[0]) {
			return false;
		}
		return true;
	},

	loadNextPage: function () {
		setTimeout(function () {
			var lastLoadedPage = this.loadedPages[this.loadedPages.length-1];
			var index = this.pages.indexOf(lastLoadedPage);
			var page = this.pages[index+1];
			if (page) {
				this.loadedPages.push(page);
			} else {
				throw new Error("Invalid attempt to load next page!");
			}

			this.view.setProps({
				pages: this.loadedPages,
				hasNextPage: this.hasNextPage()
			});
		}, 0);
	},

	loadPrevPage: function () {
		setTimeout(function () {
			var firstLoadedPage = this.loadedPages[0];
			var index = this.pages.indexOf(firstLoadedPage);
			var page = this.pages[index-1];
			if (page) {
				this.loadedPages.unshift(page);
			} else {
				throw new Error("Invalid attempt to load prev page!");
			}

			view.setProps({
				pages: this.loadedPages,
				hasPrevPage: this.hasPrevPage()
			});
		}, 0);
	},

	unloadPage: function (pageId) {
		setTimeout(function () {
			var page = null;
			var index = null;
			for (var i = 0, len = this.loadedPages.length; i < len; i++) {
				if (this.loadedPages[i].id === pageId) {
					page = this.loadedPages[i];
					index = i;
					break;
				}
			}

			if (page === null) {
				throw new Error("Invalid attempt to unload page: "+ pageId +"\n"+ JSON.stringify(this.loadedPages.map(function (p) { return p.id; })));
			}

			this.loadedPages = this.loadedPages.slice(0, index).concat(this.loadedPages.slice(index+1, this.loadedPages.length));
			view.setProps({
				pages: this.loadedPages,
				hasNextPage: this.hasNextPage(),
				hasPrevPage: this.hasPrevPage()
			});
		}, 0);
	}
});