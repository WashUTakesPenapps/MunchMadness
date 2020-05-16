import React, { Component } from 'react'
import '../index.css';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      loggedIn: false
    }
    this.login = this.login.bind(this)
    this.userChange = this.userChange.bind(this)
    this.passChange = this.passChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  //login request to server
  login(user, pass){
    console.log('sending request to login');
      (async() => {
        await fetch('http://localhost:9000/login', {
          method: 'POST',
          body: JSON.stringify({
          username: user,
          password: pass
          }),
          headers: {"Content-Type": "application/json"}
      })
      .then(response => {
        return response.text()
      })
      .then(text => {
        this.setState({loggedIn: text})
        console.log('logged in successfully: ',this.state.loggedIn)
      })
    })()
  }
  userChange(e) {
    this.setState({username: e.target.value});
  }
  passChange(e) {
    this.setState({password: e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();
    var u = this.state.username;
    var p = this.state.password;
    console.log(u,' ',p);
    this.login(u, p);
  }
  render(){
    return(
      <div className='login-box'>
        <form className='login-form' onSubmit={this.handleSubmit}>
          <label>Username:</label>
          <input type='text' placeholder='username' id='register-username' onChange={this.userChange}></input>
          <br></br>
          <label>Password:</label>
          <input type='text'
          placeholder='password' id='register-password' onChange={this.passChange}></input>
          <br></br>
          <button type='submit' className='buttons'>Login</button>
        </form>
      </div>
    )
  }
}
export default Login;