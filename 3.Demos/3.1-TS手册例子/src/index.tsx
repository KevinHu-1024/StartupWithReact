import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { HelloComponent } from "./components/Hello";

ReactDOM.render(
    <HelloComponent complier="TypeScript" framework="React" />,
    document.getElementById("example")
);