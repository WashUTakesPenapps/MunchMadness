import React, {Component } from 'react';
import { Firebase } from './services/firebase';


class BracketPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          title1 = "",
          title2 = ""
        };
    }

    componentDidMount() {
        var database = Firebase.firestore();
    }

    render () {
        return (
            <div>
                <h1>{this.state.title1}</h1>

                <h2>{this.state.title2}</h2>
            </div>


        );
    }

}

export default BracketPage;