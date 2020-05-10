import React, { Component } from 'react'
import './index.css';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        this.register = this.register.bind(this)
        this.userChange = this.userChange.bind(this)
        this.passChange = this.passChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    //register fxn client side
    register(user, pass) {
        console.log('sending to register');
        fetch('http://localhost:9000/register', {
            method: 'POST',
            body: JSON.stringify({
              username: user,
              password: pass
            }),
            headers: {"Content-Type": "application/json"}
          })
          .then(response => response.text())
          .then(text => console.log(text))
    }
    userChange(e) {
        console.log('in userChange', e.target.value)
        this.setState({username: e.target.value});
    }
    passChange(e) {
        console.log('in passChange', e.target.value)
        this.setState({password: e.target.value});
    }
    handleSubmit(e) {
        e.preventDefault();
        var u = this.state.username;
        var p = this.state.password;
        console.log(u,' ',p);
        this.register(u, p);
    }
    render() {
        return(
            <div className='registerBox'>
                <form className='register-form' onSubmit={this.handleSubmit}>
                    <label>Username:</label>
                    <input type='text' placeholder='username' id='register-username' onChange={this.userChange}></input>
                    <br></br>
                    <label>Password:</label>
                    <input type='text'
                    placeholder='password' id='register-password' onChange={this.passChange}></input>
                    <button type='submit' className='buttons'>Register</button>
                </form>
            </div>
        )
    }
}
export default Register;
