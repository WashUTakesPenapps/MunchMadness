import React, {Component } from 'react';
import { Firebase } from './services/firebase';
import Poll from './components/poll';


class BracketPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            docRef: this.props.docId,
            restaurantIds: []
        };
    }

    async componentDidMount() {
        var database = Firebase.firestore();
        // gets the restaurant ids for the given search and stores them in the 
        // restaurantIds state
        let doc = await database.collection("restaurants").doc("groups_from_yelp").collection("business_ids")
            .doc(this.state.docRef).get()
            // .then(function(doc) {
            //     if (doc.exists) {
            //         console.log("Document data:", doc.data());
                    
            //       } else {
            //         console.log("No such document!");
            //       }
            //     })
            .catch(function(error) {
                console.log("Error getting document:", error);
            });
        if (doc.exists) {
            console.log("Document data:", doc.data());
            
        } else {
            console.log("No such document!");
        }
        this.setState({restaurantIds: doc.data().ids});        
    }

    restaurantDetails() {
        // fix so that you can fetch details from Yelp API (restaurants Details is there)
        for(i = 0; i < 8; ++i) {
            (async() => {
                let response = await fetch('http://localhost:9000/restaurants/details', {
                  method: 'POST',
                  body: JSON.stringify({
                    restaurantId: restaurantIds[i]
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
        
    }

    render () {
        return (
            <div>
                <Poll restaurantDetails = {this.restaurantDetails.bind(this)} ></Poll>
            </div>


        );
    }

}

export default BracketPage;