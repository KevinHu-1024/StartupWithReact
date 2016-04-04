// - CommentBox
//   - CommentList
//     - Comment
//   - CommentForm
var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];
var CommentBox = React.createClass({
    displayName: "CommentBox",
    getInitialState: function () {
        return {data: []};
    },
    loadCommentsFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }, 
    handleCommentSubmit: function (comment:Object) {
        var comments = this.state.data;
        comment.id = Date.now();
        var newComments = comments.concat([comment]);
        this.setState({data: newComments});
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({data: comments});
                console.error(this.props.url, status, err.toString());
            }.bind(this)            
        })
    },   
    componentDidMount: function() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },    
    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
            </div>
        );
    }
});
var CommentList = React.createClass({
    displayName: "CommentList",
    render: function () {
        var commentNodes = this.props.data.map(function(comment) {
        return (
            <Comment author={comment.author} key={comment.id}>
            {comment.text}
            </Comment>
        );
        });        
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});
var CommentForm = React.createClass({
    displayName: "CommentForm",
    getInitialState: function () {
        return {author: '', text: ''};
    },
    handleAuthorChange: function (e:Event) {
        this.setState({author: e.target.value});
    },
    handleTextChange: function (e:Event) {
        this.setState({text: e.target.value});
    },
    handleSubmit: function (e:Event) {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({author: author, text: text});
        this.setState({author: '', text: ''});
    }
    render: function () {
        return (
            <div className="commentForm" onSubmit={this.handleSubmit}>
                <form className="commentForm">
                    <input type="text" placeholder="Your name" onChange={this.handleAuthorChange}/>
                    <input type="text" placeholder="Say something..." onChange={this.handleTextChange}/>
                    <input type="submit" value="Post" />
                </form>
            </div>
        );
    }
});
var Comment = React.createClass({
    displayName: "Comment",
    rawMarkup: function() {
        var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return { __html: rawMarkup };
    },
    render: function() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox url="/api/comments"  pollInterval={60000}/>,
    document.getElementById('content')
);