import ReactDOM from 'react-dom';
import React from 'react';

import App from './containers/App.jsx';

ReactDOM.render(
        <App cookie={document.cookie}/>,
document.getElementById('app'));