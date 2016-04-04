import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {CONFIG} from '../constants/constValues';
import {API_SVR} from '../constants/constValues';

import {BlogNavView} from './BlogNavView';
import {BlogTableView} from './BlogTableView';

var MainBox = React.createClass({
    displayName: "MainBox",
    render: function () {
        return (
            <div>
                <BlogNavView />
                <BlogTableView />
            </div>
        );
    }
});
ReactDOM.render(<MainBox />, document.getElementById('main'));