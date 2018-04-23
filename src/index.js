
import React from 'react';
import ReactDOM from 'react-dom';

import routes from './routes';
import App from './components/App';

import css from './style.css';

ReactDOM.render(<App routes={routes} />, document.getElementById('mainContent'));
