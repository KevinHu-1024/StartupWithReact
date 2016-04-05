// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import { API_SVR } from './constants/constValues';
// import { CONFIG } from './constants/constValues';
// import { BlogNavView } from './BlogNavView';
// import { BlogTableView } from './BlogTableView';
/**
 * MainBox
 */
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
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
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
            return (React.createElement(BlogTableViewCell, {author: article.user.login, title: article.title}, article.body));
        });
        return (React.createElement("ul", null, tableNodes));
    }
});
var BlogTableViewCell = React.createClass({
    displayName: "BlogTableViewCell",
    rawMarkup: function () {
        var rawMarkup = marked(this.props.body.toString(), { sanitize: true });
        return { __html: rawMarkup };
    },
    render: function () {
        return (React.createElement("li", null, React.createElement("h3", null, this.props.title), React.createElement("p", {dangerouslySetInnerHTML: this.rawMarkup()})));
    }
});
ReactDOM.render(React.createElement(MainBox, {url: "https://api.github.com/repos/lifesinger/lifesinger.github.com/issues", pollInterval: 30000}), document.getElementById('main'));
// export class MainBox extends React.Component<any, any> {
//     constructor(props) {
//         super(props);
//         this.state = {
//             data: props.initialData
//         };
//     }   
//     render() {
//         return (
//             <div>
//                 <BlogNavView />
//                 <BlogTableView data={this.state.data}/>
//             </div>
//         );
//     }    
// }
// BlogTableView.propTypes = {
//     data: React.PropTypes.array,
//     url: React.PropTypes.string
// }
// BlogTableView.defaultProps = {
//     data: [],
//     url: API_SVR
// }
//"https://api.github.com/repos/"+_config['owner']+"/"+_config['repo']+"/issues"
