import React, {Component } from 'react';
import './App.css';
// import { database, firestore } from './services/firebase';
import { firestore } from './services/firebase';
import Register from './register_comp';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      cuisine: "",
      radius: "",
      location: ""
    };

    // this.getLocation = this.getLocation.bind(this);
  }

  // callAPI() {
  //     fetch("http://localhost:9000/restaurants")
  //         .then(res => res.text())
  //         .then(res => this.setState({ apiResponse: res }));
  // }

  // finds user's location
  componentDidMount() {
    const success = position => {
      var loc = position.coords.latitude.toString() + "," + position.coords.longitude.toString();
      this.setState({
        location: loc
      });
    }
    function error() {
      console.log("Cannot find your location");
    }

    if(!navigator.geolocation) {
       console.log('Geolocation is not supported by your browser');
    } else {
      console.log('Locating...');
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  // request a restaurant
  onSubmit(e) {
    e.preventDefault();
    var priceObj = document.getElementById("price");
    var maxPrice = priceObj.options[priceObj.selectedIndex].value;
        
    // Updates the attempt database with dummy data passed through the form
    firestore.collection("attempt").add({
      cuisine: this.state.cuisine,
      user: this.state.radius
    }); 
    
    // calls the route restaurants.js to query list of restaurants
    fetch('http://localhost:9000/restaurants', {
      method: 'POST',
      body: JSON.stringify({
        cuisine: this.state.cuisine, //cuisine entry (make sure it's sanitized)
        radius: this.state.radius, //radius entry, 0 to 24.854848 miles (so up to 25 mile radius)
        maxPrice: maxPrice,
        location: this.state.location
      }),
      headers: {"Content-Type": "application/json"}
    })
    .then(response => response.text())
    .then(text => console.log(text))
  }

  onTextChangeC(e) {
    this.setState({
      cuisine: e.target.value
    });
  }

  onTextChangeR(e) {
    this.setState({
      radius: Math.floor(e.target.value * 1609.344)
    });
  }

  render () {
    return (
      <div className="App">
        <Register/>
        <form onSubmit={(e) => this.onSubmit(e)} className="user-inputs">
          <input type="text" onChange={(e) => this.onTextChangeC(e)} placeholder="Cuisine"/>
          <input type="text" onChange={(e) => this.onTextChangeR(e)} placeholder="Radius (in miles)"/>
          <label>Price:</label>
          <select id="price">
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
          </select>
          <button className="buttons" type="submit">Go!</button>
        </form>

        {/* <p className="App-intro">{this.state.apiResponse}</p> */}

      </div>
    );
  }
}

export default App;
