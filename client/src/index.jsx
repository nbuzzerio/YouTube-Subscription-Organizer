import ReactDOM from 'react-dom';
import React from 'react';

import App from './containers/App.jsx';

let accessCookie;

if (document.cookie.length > 0) {
        accessCookie = document.cookie.split('; ').filter((cookie) => {
                return cookie.includes('accessToken')
        })[0];
} else {
        accessCookie = ''
}

ReactDOM.render(
        <App cookie={accessCookie} />,
        document.getElementById('app')
);