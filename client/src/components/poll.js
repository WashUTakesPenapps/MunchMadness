import React, {Component } from 'react';
import './App.css';
// import { database, firestore } from './services/firebase';
//import { firestore } from './services/firebase';

class Poll extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isDone =false,
            //num_votes = 0,
            restaurants = [
                {
                    name = props.name,
                    rating = props.rating,
                    is_closed = props.is_closed,
                    image = props.image_url,
                    votes = 0
                },
                {
                    name = props.name,
                    id = props.id,
                    rating = props.rating,
                    is_closed = props.is_closed,
                    image = props.image_url,
                    votes = 0
                }
            ]
            
        };
    }

    handleClick(id){
        let restaurantIndex =this.state.restaurants.findIndex(rest => rest.id === id);
        let restaurantToUpdate = this.state.restaurants[restaurantIndex];
        let updatedRestaurants = {...this.state.restaurants};
        updatedRestaurants = {...restaurantToUpdate, 
            votes: restaurantToUpdate.votes+1
        };
        
        this.setState({
            restaurants: updatedRestaurants
        });
    }

    render() {
        <>
        <h1>Vote for your restaurant!</h1>
            <div className="restaurants">
                {
                    this.state.restaurants.map((restaurant)=>
                    <div key = {restaurant.id} className="restaurant_info">
                        <h1 className="restaurant_name">{restaurant.name}</h1>
                        <h2 className="restaurant_rating">{restaurant.rating}</h2>
                        {restaurant.is_closed && 
                            <h2 className="status_closed">
                                Closed
                            </h2>
                        }
                        {!restaurant.is_closed && 
                            <h2 className="status_closed">
                                Open
                            </h2>
                        }
                        <img src={restaurant.image}></img>
                        <button onClick={this.handleClick.bind(this,restaurant.id)}>Vote for {restaurant.name}</button>
                        <h4 className="restaurant_votes">{restaurant.votes}</h4>
                    </div>
                    )
                }
            
            </div>
    </>
    }
}

export default Poll;