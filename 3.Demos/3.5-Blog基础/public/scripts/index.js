var MainBox = React.createClass({
    displayName: "MainBox",
    getInitialState: function () {
        return { data: [] };
    },
    loadArticlesFromServer: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log(data);
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function () {
        this.loadArticlesFromServer();
        setInterval(this.loadArticlesFromServer, this.props.pollInterval);
    },
    render: function () {
        return (React.createElement("div", null, React.createElement(BlogTableView, {data: this.state.data})));
    }
});
var BlogTableView = React.createClass({
    displayName: "BlogTableView",
    render: function () {
        var tableNodes = this.props.data.map(function (article) {
            return (React.createElement(BlogTableViewCell, {author: article.user.login, title: article.title, key: article.id, body: article.body, source: article.url, link: article.html_url}, article.body));
        });
        return (React.createElement("ul", null, tableNodes));
    }
});
var BlogTableViewCell = React.createClass({
    displayName: "BlogTableViewCell",
    render: function () {
        return (React.createElement("li", null, React.createElement("a", {href: this.props.link}, this.props.title), React.createElement("p", null, React.createElement("span", null, "作者："), React.createElement("span", null, this.props.author)), React.createElement("p", null, React.createElement("span", null, "源："), React.createElement("a", {href: this.props.source}))));
    }
});
ReactDOM.render(React.createElement(MainBox, {url: "https://api.github.com/repos/lifesinger/lifesinger.github.com/issues", pollInterval: 30000}), document.getElementById('main'));
