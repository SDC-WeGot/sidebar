import React from 'react';
import axios from 'axios';
import { InfoList } from './InfoList.jsx';
import MapContainer from './MapContainer.jsx';
import '../dist/styles.css';
import '../dist/fontawesome-all.min.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: {}
    };
    //this.getRestaurantData();
  }
  componentWillMount() {
    
    this.getRestaurantData();
    // {console.log(this.state.restaurant, 'resturant data should be mounting')}
  }

  getRestaurantData () {
    var restaurantId = location.pathname.split('restaurants/')[1];
    console.log('restaurant id is', restaurantId);
    if (restaurantId[restaurantId.length - 1] === '/') {
      restaurantId = restaurantId.substring(0, restaurantId.length - 1);

    console.log(restaurantId);
    //console.log(location.origin, 'origin');


    axios.get(location.origin + '/api/restaurants/' + restaurantId + '/sidebar')
      .then((response) => {
        console.log('received:', response.data);
        
        this.setState({ restaurant: response.data});
      }).catch((err) => {
        console.error('Failed to fetch restaurant data from server:', err);
      });
    }
  }

  render() {
      if (!this.state.restaurant) {
        return <div> Loading Sidebar... </div>;
      } else {
        return (<div className="sidebar-flexbox-col sidebar-app">
          <p>hi there john</p>
          {console.log(this.state.restaurant, 'resturant data should be set')}
          <InfoList restaurant={this.state.restaurant} />
          <MapContainer geometry={this.state.restaurant.geometry} />
        </div>
      );
    }
  }
}

// export default App ;
