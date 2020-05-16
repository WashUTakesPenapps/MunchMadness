import React, { Component } from 'react'
import '../index.css';
import BracketPage from '../bracketPage';
import { Firebase } from '../services/firebase';

class Search extends Component {
  constructor(props){
    super(props);
    this.state = { 
      cuisine: "",
      radius: "",
      location: "",
      submitted: false,
      docRef: "",
    };
  }
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

    var firestore = Firebase.firestore();
    // Updates the attempt database with dummy data passed through the form
    firestore.collection("attempt").add({
      cuisine: this.state.cuisine,
      user: this.state.radius
    }); 
    
    // calls the route restaurants.js to query list of restaurants
    (async() => {
      let response = await fetch('http://localhost:9000/restaurants', {
        method: 'POST',
        body: JSON.stringify({
          cuisine: this.state.cuisine, //cuisine entry (make sure it's sanitized)
          radius: this.state.radius, //radius entry, 0 to 24.854848 miles (so up to 25 mile radius)
          maxPrice: maxPrice,
          location: this.state.location
        }),
        headers: {"Content-Type": "application/json"}
      })
      .then(response => {
        return response.json();
      })
      .then(text => {
        this.setState({
          docRef: text
        });
        this.setState({
          submitted: true
        });
        return new Response(text);
      })
      
      console.log(response);
    })();
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
        {!this.state.submitted && 
          <>
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
          </>
        }
        {this.state.submitted &&
          // passing the doc id through props to bracket page
          <BracketPage docId = {this.state.docRef.docId}></BracketPage>
        }
      </div>
    );
  }
}

export default Search;