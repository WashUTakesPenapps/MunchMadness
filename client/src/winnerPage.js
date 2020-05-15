import React, {Component } from 'react';
import './App.css';
import {Redirect } from 'react-router-dom';
// import $ from 'jquery';

class WinnerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winner: this.props.winner,
            goHome: false
        };

        // if there's a third line in the address (suite number, etc.), then it will display the third line
        if(this.state.winner.location.display_address.length === 3) {
            document.getElementsByClassName("third_add")[0].innerText = this.state.winner.location.display_address[2];
        }
    }

    //gets the business hours--if open, tells you time it's open until; if closed, tells you what time and day it's open
    getHours() {
        var current_date = new Date();
        var current_day = current_date.getDay() + 1;
        var openHours = this.state.winner.hours[0].open;
        if(this.state.winner.is_closed) {
            var tomorrow = "";
            current_day += 1;
            if (current_day === 7) {
                current_day = 0;
            }
            if(current_day === 0) {
                tomorrow = "Monday";
            } else if(current_day === 1) {
                tomorrow = "Tuesday";
            } else if(current_day === 2) {
                tomorrow = "Wednesday";
            } else if(current_day === 3) {
                tomorrow = "Thursday";
            } else if(current_day === 4) {
                tomorrow = "Friday";
            } else if(current_day === 5) {
                tomorrow = "Saturday";
            } else if(current_day === 6) {
                tomorrow = "Sunday";
            }
            return tomorrow + " at " + openHours[current_day].start.slice(0,2) + ":" + openHours[current_day].start.slice(2);
        } else {
            return openHours[current_day].end.slice(0,2) + ":" + openHours[current_day].end.slice(2);
        }
    }

    // formats the ways you can get the food (delivery, pickup, etc.)
    mode() {
        if (this.state.winner.transactions.length > 2) {
            var modes = "";
            for(var i=0; i < this.state.winner.transactions.length - 1; ++i) {
                modes += this.state.winner.transactions[i] + ", ";
            }
            modes += "and " + this.state.winner.transactions[this.state.winner.transactions.length - 1];
            return modes;
        } else if (this.state.winner.transactions.length === 2) {
            return this.state.winner.transactions[0] + " and " + this.state.winner.transactions[1];
        }
        return this.state.winner.transactions[0];
    }

    // if button is pressed, goHome is true to renavigate the page
    goHome() {
        this.setState({ 
            goHome: true 
        });
    }

    render() {
        if(this.state.goHome) {
            return <Redirect to={{
                pathname: "/",
                state: {
                    submitted: false
                }
              }}/>
        }

        return(
            <div>
                <h1>{this.state.winner.name}</h1>
                <h2 className="restaurant_rating">Rating: {this.state.winner.rating} stars from {this.state.winner.review_count} reviews</h2>
                <h2 className="restaurant_phone">Phone Number: {this.state.winner.display_phone}</h2>
                <span className="add_span">
                    <h2 className="restaurant_address">Address: {this.state.winner.location.display_address[0]}</h2>
                    <h2 className="restaurant_address">{this.state.winner.location.display_address[1]}</h2>
                    <h2 className="third_add"></h2>
                </span>
                <h2 className="modes">Offers {this.mode()}</h2>
                <h2 className="restaurant_price">Price: {this.state.winner.price}</h2>
                {this.state.winner.is_closed && 
                    <h2 className="status_closed">
                        Closed, opens {this.getHours()}
                    </h2> 
                }
                {!this.state.winner.is_closed && 
                    <h2 className="status_open">
                        Open until {this.getHours()}
                    </h2>
                }
                <img src={this.state.winner.photos[0]} alt="From restaurant" height="400" width="400"></img>
                <img src={this.state.winner.photos[1]} alt="From restaurant" height="400" width="400"></img>
                <img src={this.state.winner.photos[2]} alt="From restaurant" height="400" width="400"></img>
                <button onClick={this.goHome.bind(this)}>Go back to home page</button>
            </div>
        );
    }
}

export default WinnerPage;