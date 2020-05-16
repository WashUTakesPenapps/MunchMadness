import React, {Component } from 'react';
import '../App.css';
// import { database, firestore } from './services/firebase';
//import { firestore } from './services/firebase';

let currRestaurant = 0;

class Restaurant extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            id: "",
            rating: 0,
            is_closed: false,
            image: "",
            votes: 0,
            
        };
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
        return(
            <>
                <div className="restaurant_info">
                    <h1 className="restaurant_name">{this.state.name}</h1>
                    <h2 className="restaurant_rating">{this.state.rating}</h2>
                    {this.state.is_closed && 
                        <h2 className="status_closed">
                            Closed
                        </h2>
                    }
                    {!this.state.is_closed && 
                        <h2 className="status_open">
                            Open
                        </h2>
                    }
                    <img src={this.state.image_url} alt="From restaurant"></img>
                    {/* <button onClick={this.handleVote.bind(this,this.state.id)}>Vote for {this.state.name}</button> */}
                    <h4 className="restaurant_votes">{this.state.votes}</h4>
                </div>
    
            </>
        );
       
    }
}

export default Restaurant;

