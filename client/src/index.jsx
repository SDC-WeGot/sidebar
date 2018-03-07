import ReactDOM from 'react-dom';
import React from 'react';
import { App } from './app.jsx';

var restaurantId = location.pathname.split('restaurants/')[1];

ReactDOM.render(<App restaurantId={restaurantId} restaurant={null}/>, document.getElementById('sidebar-app'));