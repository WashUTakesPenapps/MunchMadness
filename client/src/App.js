import React, {Component } from 'react';
import './App.css';

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

  onSubmit(e) {
    var priceObj = document.getElementById("price");
    var maxPrice = priceObj.options[priceObj.selectedIndex].value;
    fetch('http://localhost:9000/restaurants', {
      method: 'POST',
      body: JSON.stringify({
        query: this.state.cuisine, //cuisine entry (make sure it's sanitized)
        radius: this.state.radius, //radius entry, 0 to 50,000 m
        minPriceLevel: 0,
        maxPriceLevel: maxPrice,
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
      radius: e.target.value
    });
  }

  render () {
    return (
      <div className="App">
        <form onSubmit={(e) => this.onSubmit(e)} className="user-inputs">
          <input type="text" onChange={(e) => this.onTextChangeC(e)} placeholder="Cuisine"/>
          <input type="text" onChange={(e) => this.onTextChangeR(e)} placeholder="Radius"/>
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
