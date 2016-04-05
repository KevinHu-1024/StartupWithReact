var MainBox = React.createClass({
    displayName: "MainBox",
    getInitialState: function () {
        return {data: []};
    },
    loadArticlesFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                console.log(data);
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }, 
    componentDidMount: function() {
        this.loadArticlesFromServer();
        setInterval(this.loadArticlesFromServer, this.props.pollInterval);
    },    
    render: function () {
        return (
            <div>
                <BlogTableView data={this.state.data}/>
            </div>  
        );
    }
});

var BlogTableView = React.createClass({
    displayName: "BlogTableView",
    render: function () {
        var tableNodes = this.props.data.map(function(article) {
            return (
                <BlogTableViewCell author={article.user.login} title={article.title} key={article.id} body={article.body} source={article.url} link={article.html_url}>
                {article.body}
                </BlogTableViewCell>
            );
        });        
        return (
            <ul>
                {tableNodes}
            </ul>
        );
    }    
});

var BlogTableViewCell = React.createClass({
    displayName: "BlogTableViewCell",
    render: function() {
        return (
            <li>
                <a href={this.props.link}>
                {this.props.title}
                </a>
                <p><span>作者：</span><span>{this.props.author}</span></p>
                <p><span>源：</span><a href={this.props.source}></a></p>
            </li>
        );
    }
});

ReactDOM.render(
    <MainBox url="https://api.github.com/repos/lifesinger/lifesinger.github.com/issues"  pollInterval={30000}/>, document.getElementById('main')
    );