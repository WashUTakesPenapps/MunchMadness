import React, {Component } from 'react';
import '../App.css';
import WinnerPage from '../winnerPage';
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
            right_restaurant: {},
            current_index: 0,
            left_location: [],
            right_location: [],
            winner: ""
        };
    }

    restaurantDetails(i, id) {
        (async() => {
            // fetches details of one restaurant from yelp API
            fetch('http://localhost:9000/restaurants/details', {
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

                // for first two restaurants after first query
                if (id === "") {
                    // sets left restaurant as second element in array
                    if (i % 2 === 1) {
                        this.setState({
                            left_restaurant: restaurant,
                            left_location: restaurant.location.display_address,
                            current_index: this.state.current_index + 1
                        });
                        //if restaurant has more than one address (e.g. Suite number), then add new line to address
                        if (restaurant.location.display_address.length === 3) {
                            document.getElementsByClassName("third_add")[0].innerText = restaurant.location.display_address[2];

                        }
                    // sets right restaurant as first element in array
                    } else {
                        this.setState({
                            right_restaurant: restaurant,
                            right_location: restaurant.location.display_address,
                            current_index: this.state.current_index + 1
                        });
                        //if restaurant has more than one address (e.g. Suite number), then add new line to address
                        if (restaurant.location.display_address.length === 3) {
                            document.getElementsByClassName("third_add")[1].innerText = restaurant.location.display_address[2];
                        }
                    }
                // if right restaurant is voted for, change left restaurant
                } else if (id === this.state.right_restaurant.id) {
                    this.setState({
                        left_restaurant: restaurant,
                        left_location: restaurant.location.display_address,
                        current_index: this.state.current_index + 1,
                        winner: this.state.right_restaurant
                    });
                    //if restaurant has more than one address (e.g. Suite number), then add new line to address
                    if (restaurant.location.display_address.length === 3) {
                        document.getElementsByClassName("third_add")[0].innerText = "";
                        document.getElementsByClassName("third_add")[0].innerText = restaurant.location.display_address[2];

                    }
                // if left restaurant is voted for, change right restaurant
                } else if (id === this.state.left_restaurant.id) {
                    this.setState({
                        right_restaurant: restaurant,
                        right_location: restaurant.location.display_address,
                        current_index: this.state.current_index + 1,
                        winner: this.state.left_restaurant
                    });
                    //if restaurant has more than one address (e.g. Suite number), then add new line to address
                    if (restaurant.location.display_address.length === 3) {
                        document.getElementsByClassName("third_add")[1].innerText = "";
                        document.getElementsByClassName("third_add")[1].innerText = restaurant.location.display_address[2];
                    }
                }                
                return new Response(restaurant);
            })
        })();
    }

    componentDidMount() {
        // queries first two restaurants
        this.restaurantDetails(this.state.current_index, "");
        this.restaurantDetails(this.state.current_index + 1, "");
    }
    // not sure if componentdidmount is the best way to update the restaurants?

    handleVote(id){
        // if end of array is reached, then isDone is set, and will reroute to winner page
        if (this.state.current_index === this.state.restaurantIds.length) {
            this.setState({
                isDone: true
            })
            return;
        }
        this.restaurantDetails(this.state.current_index, id);
        if (id === this.state.right_restaurant.id){
            this.setState({
                num_votes: this.state.num_votes+1,
                num_votes_right: this.state.num_votes_right+1,
            });
        } else {
            this.setState({
                num_votes: this.state.num_votes+1,
                num_votes_left: this.state.num_votes_left+1,
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
                    !this.state.isDone &&
                    <>
                        <h1>Vote for your restaurant!</h1>
                        <div className="restaurants">
                            <div className="restaurant_info">
                                {/* <div key = {restaurant.id} className="restaurant_info">  */}
                                <h1 className="restaurant_name">{this.state.left_restaurant.name}</h1>
                                <h2 className="restaurant_rating">Rating: {this.state.left_restaurant.rating} stars from {this.state.left_restaurant.review_count} reviews</h2>
                                <span className="add_span">
                                    <h2 className="restaurant_address">Address: {this.state.left_location[0]}</h2>
                                    <h2 className="restaurant_address">{this.state.left_location[1]}</h2>
                                    <h2 className="third_add"></h2>
                                </span>
                                <h2 className="restaurant_price">Price: {this.state.left_restaurant.price}</h2>
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
                                <img src={this.state.left_restaurant.image_url} alt="From restaurant" height="400" width="400"></img>
                                <br />
                                <button onClick={this.handleVote.bind(this,this.state.left_restaurant.id)}>Vote for {this.state.left_restaurant.name}</button>
                                {/* <h4 className="restaurant_votes">{this.state.num_votes_left}</h4> */}
                            </div>

                            <div className="restaurant_info">

                                {/* <div key = {restaurant.id} className="restaurant_info"> */}
                                <h1 className="restaurant_name">{this.state.right_restaurant.name}</h1>
                                <h2 className="restaurant_rating">Rating: {this.state.right_restaurant.rating} stars from {this.state.right_restaurant.review_count} reviews</h2>
                                <span className="add_span">
                                    <h2 className="restaurant_address">Address: {this.state.right_location[0]}</h2>
                                    <h2 className="restaurant_address">{this.state.right_location[1]}</h2>
                                    <h2 className="third_add"></h2>
                                </span>
                                <h2 className="restaurant_price">Price: {this.state.right_restaurant.price}</h2>

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
                                <img src={this.state.right_restaurant.image_url} alt="From restaurant" height="400" width="400"></img>
                                <br />
                                <button onClick={this.handleVote.bind(this,this.state.right_restaurant.id)}>Vote for {this.state.right_restaurant.name}</button>
                                {/* <h4 className="restaurant_votes">{this.state.num_votes_right}</h4> */}
                            </div>
        
                        </div>
                    </>
                    }
                </div>      
            {this.state.isDone &&
                <WinnerPage winner= {this.state.winner}></WinnerPage>
            }
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