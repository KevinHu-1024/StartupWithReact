import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {BlogTableViewCell} from './BlogTableViewCell';

export class  BlogTableView extends React.Component<any, any> {
    render() {
        return (
            <ul>
                <BlogTableViewCell />
                <BlogTableViewCell />          
            </ul>
        );
    }
}