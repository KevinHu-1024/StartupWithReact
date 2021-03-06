var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var IndexRoute = ReactRouter.IndexRoute;
var cache = [];
var MainBox = React.createClass({
    displayName: "MainBox",
    render: function () {
        return (React.createElement("div", null, this.props.children));
    }
});
//<BlogTableView data={this.state.data}/>
var BlogTableView = React.createClass({
    displayName: "BlogTableView",
    getDefaultProps: function () {
        return {
            url: "/api/comments",
            pollInterval: 10000
        };
    },
    getInitialState: function () {
        return {
            data: []
        };
    },
    loadArticlesFromServer: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log(data);
                this.setState({ data: data });
                cache = data;
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function () {
        this.loadArticlesFromServer();
        // setInterval(this.loadArticlesFromServer, this.props.pollInterval);
    },
    render: function () {
        var tableNodes = this.state.data.map(function (article) {
            return (React.createElement(BlogTableViewCell, {author: article.user.login, title: article.title, key: article.id, id: article.id, source: article.url, link: article.html_url}));
        });
        return (React.createElement("ul", null, tableNodes));
    }
});
var BlogTableViewCell = React.createClass({
    displayName: "BlogTableViewCell",
    render: function () {
        return (React.createElement("li", null, React.createElement(Link, {to: "/article/" + this.props.id}, this.props.title), React.createElement("p", null, React.createElement("span", null, "作者："), React.createElement("span", null, this.props.author)), React.createElement("p", null, React.createElement("span", null, "源："), React.createElement("a", {href: this.props.source}, this.props.source))));
    }
});
var BlogArticleView = React.createClass({
    displayName: "BlogArticleView",
    getInitialState: function () {
        return {
            article: {}
        };
    },
    componentWillMount: function () {
        console.log(this.props, cache);
        for (var index = 0; index < cache.length; index++) {
            var cur = cache[index];
            console.log(cur.id);
            if (cur.id == this.props.params.id) {
                this.setState({
                    article: {
                        id: cur.id,
                        title: cur.title,
                        body: cur.body
                    }
                });
                return;
            }
        }
    },
    rawMarkup: function () {
        var rawMarkup = marked(this.state.article.body.toString(), { sanitize: true });
        return { __html: rawMarkup };
    },
    // render: function() {
    //     return (
    //         <div className="comment">
    //             <h2 className="commentAuthor">
    //             {this.props.author}
    //             </h2>
    //             <span dangerouslySetInnerHTML={this.rawMarkup()} />
    //         </div>
    //     );
    // }
    render: function () {
        // {article:{
        //     id: 
        //     title:
        //     body:
        // }}
        return (React.createElement("div", null, React.createElement("h3", null, this.state.article.title), React.createElement("p", {dangerouslySetInnerHTML: this.rawMarkup()})));
    }
});
//{this.props.article.title}{this.props.article.body}
//https://api.github.com/repos/lifesinger/lifesinger.github.com/issues
// ReactDOM.render(
//     <MainBox/>, document.getElementById('main')
//     );
ReactDOM.render((React.createElement(Router, null, React.createElement(Route, {path: "/", component: MainBox}, React.createElement(IndexRoute, {component: BlogTableView}), React.createElement(Route, {path: "/article/:id", component: BlogArticleView})))), document.getElementById('main'));
//      <IndexRoute component={BlogTableView}/>
//   <Route path="/article/:id" component={BlogArticleView} />
// ReactDOM.render((React.createElement(Router, null, React.createElement(Route, {path: "/", component: MainBox}))), document.getElementById('main'));
// ReactDOM.render(React.createElement(MainBox, null), document.getElementById('main')); 
