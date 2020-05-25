import React, {Component } from 'react';
import '../App.css';
import { Firebase } from '../services/firebase';
let db = Firebase.firestore();
var firebase = require("firebase");

class Group extends Component {
    constructor(props){
        super(props);
        this.onTextChange = this.onTextChange.bind(this);
        this.onPinChange = this.onPinChange.bind(this);

        this.state = {
            name: "",
            pin: 0
        };
    }

    onTextChange(e) {
        this.setState({
          name: e.target.value
        });
      }
    
    onPinChange(e) {
        this.setState({
            pin: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        // From Ethan Brimhall's Kahoot Clone repo
        let gamePin = Math.floor(Math.random()*900000) + 100000; //new pin for game
        let docId = gamePin.toString();
        // may want to keep auto generated id
        db.collection("groups").doc(docId).set({
            // probably want to add current user - not sure if we have that data somewhere?
            host: this.state.name,
            players: [this.state.name],
            pin: gamePin
        });
    }
    
    onJoin(e){
        e.preventDefault();
        console.log(this.state.pin);
        let newPlayer = this.state.name;
        db.collection("groups").where("pin", "==",parseInt(this.state.pin)).get().then(function(querySnapshot){
            console.log(querySnapshot);
            querySnapshot.forEach(function(doc){
                console.log(doc);
                db.collection("groups").doc(doc.id).update({
                    players: firebase.firestore.FieldValue.arrayUnion(newPlayer)
                });
            })
          })
        .catch(function(e){
          console.error('error logging in: ',e);
        })
    }


    render(){
        return(
            <>
                <form onSubmit={(e) => this.onSubmit(e)} className="user-inputs">
                    <label>Input a name that will be displayed during the poll!</label>
                    <input type="text" onChange={(e) => this.onTextChange(e)} placeholder="Name"/>
                    <button className="buttons" type="submit">Create Group!</button>
                </form>
                <form onSubmit={(e) => this.onJoin(e)} className="user-inputs">
                    <label>Input a name that will be displayed during the poll!</label>
                    <input type="number" onChange={(e) => this.onPinChange(e)} placeholder="Game PIN"/>
                    <input type="text" onChange={(e) => this.onTextChange(e)} placeholder="Name"/>
                    <button className="buttons" type="submit">Join Group!</button>
                </form>
            </>
            
        );
    }

}

export default Group;