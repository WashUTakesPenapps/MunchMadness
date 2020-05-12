import React, {Component } from 'react';
import './App.css';
// import { database, firestore } from './services/firebase';
//import { firestore } from './services/firebase';

class Restaurant extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name = props.name,
            rating = props.rating,
            is_closed = props.is_closed,
            image = props.image_url
            //restaurant, cuisine, price
        };
    }
    handleChange(e){
       
    }
    render() {
        <div className="Restaurant">
            <div className="Restaurant_Info">
                <h1 className="Restaurant_Name">{this.state.name}</h1>
                <h2 className="Restaurant_Rating">{this.state.rating}</h2>
                {is_closed && 
                    <h2 className="Restaurant_Is_Closed">
                        Open
                    </h2>
                }
                {!is_closed && 
                    <h2 className="Restaurant_Is_Closed">
                        Closed
                    </h2>
                }
                <img src={this.state.image}></img>
            </div>
        </div>
    }
}

export default Restaurant;
