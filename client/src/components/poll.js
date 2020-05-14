import React, {Component } from 'react';
import '../App.css';
// import { database, firestore } from './services/firebase';
//import { firestore } from './services/firebase';

//let currRestaurant = 0;

class Poll extends Component {
    constructor(props){
        super(props);
        this.state = {
            isDone: false,
            restaurantIds: this.props.restaurantIds,
            restaurantDetails: [],
            num_votes: 0,
            num_votes_left: 0,
            num_votes_right: 0,
            // sort of a hack-y way to do this, but nested state vars seemed gross
            left_restaurant: {},
            right_restaurant: {}
            
        };
    }

    restaurantDetails() {
        // fix so that you can fetch details from Yelp API (restaurants Details is there)
        for(let i = 0; i < 8; ++i) {
            (async() => {
                let response = await fetch('http://localhost:9000/restaurants/details', {
                  method: 'POST',
                  body: JSON.stringify({
                    restaurantId: this.state.restaurantIds[i]
                  }),
                  headers: {"Content-Type": "application/json"}
                })
                .then(response => {
                  return response.json();
                })
                .then(restaurant => {
                    console.log("restaurant",restaurant);
                    this.setState(prevState => ({
                    restaurantDetails: [...prevState.restaurantDetails, restaurant]
                    }));
                    if (i ===0){
                        console.log("left_rest before", this.state.left_restaurant);
                        this.setState({
                            left_restaurant: restaurant
                        });
                        console.log("left_rest after", this.state.left_restaurant);

                    }
                    else if (i===1){
                        this.setState({
                            right_restaurant: restaurant
                        });
                    }
                    
                  return new Response(restaurant);
                })
                
                console.log(response);
                
            })();
        }
        
    }

    componentDidMount() {
        this.restaurantDetails();
    }
    // not sure if componentdidmount is the best way to update the restaurants?

    handleVote(id){
        // not sure if the id will be passed/if other things will be passed with it
        if (id === this.state.right_restaurant.id){
            this.setState({
                num_votes: this.state.num_votes+1,
                num_votes_right: this.state.num_votes_right+1
            });
        } else {
            this.setState({
                num_votes: this.state.num_votes+1,
                num_votes_left: this.state.num_votes_left+1
            });
        }
       
       

    }

    render() {
        const loading = this.state.restaurantDetails.length===0;
        return(
            <div>
                <div>
                    {loading
                    ? <h1>Loading</h1>
                    :
                    <>
                        <h1>Vote for your restaurant!</h1>
                        <div className="restaurants">
                            <div className="restaurant_info">
                                {/* <div key = {restaurant.id} className="restaurant_info">  */}
                                <h1 className="restaurant_name">{this.state.left_restaurant.name}</h1>
                                <h2 className="restaurant_rating">{this.state.left_restaurant.rating}</h2>
                                {this.state.left_restaurant.is_closed && 
                                    <h2 className="status_closed">
                                        Closed
                                    </h2>
                                }
                                {!this.state.left_restaurant.is_closed && 
                                    <h2 className="status_open">
                                        Open
                                    </h2>
                                }
                                <img src={this.state.left_restaurant.image_url} alt="From restaurant"></img>
                                <button onClick={this.handleVote.bind(this,this.state.left_restaurant.id)}>Vote for {this.state.left_restaurant.name}</button>
                                <h4 className="restaurant_votes">{this.state.num_votes_left}</h4>
                            </div>

                            <div className="restaurant_info">

                                {/* <div key = {restaurant.id} className="restaurant_info"> */}
                                <h1 className="restaurant_name">{this.state.right_restaurant.name}</h1>
                                <h2 className="restaurant_rating">{this.state.right_restaurant.rating}</h2>
                                {this.state.right_restaurant.is_closed && 
                                    <h2 className="status_closed">
                                        Closed
                                    </h2>
                                }
                                {!this.state.right_restaurant.is_closed && 
                                    <h2 className="status_open">
                                        Open
                                    </h2>
                                }
                                <img src={this.state.right_restaurant.image_url} alt="From restaurant"></img>
                                <button onClick={this.handleVote.bind(this,this.state.right_restaurant.id)}>Vote for {this.state.right_restaurant.name}</button>
                                <h4 className="restaurant_votes">{this.state.num_votes_right}</h4>
                            </div>
        
                        </div>
                    </>
                    }
                </div>      
            
            </div>
        );
       
    }
}


export default Poll;

// If we decide to go back to nested state variables, can use the map feature
// {
//     // creates a segment below for each restaurant (in this case, a pair)
//     this.state.restaurants.map((restaurant)=>
//     <div className="restaurant_info">

//     {/* <div key = {restaurant.id} className="restaurant_info"> */}
//         <h1 className="restaurant_name">{restaurant.name}</h1>
//         <h2 className="restaurant_rating">{restaurant.rating}</h2>
//         {restaurant.is_closed && 
//             <h2 className="status_closed">
//                 Closed
//             </h2>
//         }
//         {!restaurant.is_closed && 
//             <h2 className="status_closed">
//                 Open
//             </h2>
//         }
//         <img src={restaurant.image} alt="From restaurant"></img>
//         <button onClick={this.handleVote.bind(this,restaurant.id)}>Vote for {restaurant.name}</button>
//         <h4 className="restaurant_votes">{restaurant.votes}</h4>
//     </div>
//     )
// }

// For handleVote with nested
        // below code is when used nested state variables

        //function to handle a click of a vote button for either restaurant
        // let restaurantIndex =this.state.restaurants.findIndex(rest => rest.id === id);
        // let restaurantToUpdate = this.state.restaurants[restaurantIndex];
        // let updatedRestaurants = {...this.state.restaurants};
        // updatedRestaurants = {...restaurantToUpdate, 
        //     votes: restaurantToUpdate.votes+1
        // };
        
        // this.setState({
        //     restaurants: updatedRestaurants
        // });