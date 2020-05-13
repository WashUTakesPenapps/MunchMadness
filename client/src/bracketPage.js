import React, {Component } from 'react';
import { Firebase } from './services/firebase';
import {Poll} from './components/poll';


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
                <Poll></Poll>
            </div>


        );
    }

}

export default BracketPage;