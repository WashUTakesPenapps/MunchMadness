//code from: https://serverless-stack.com/chapters/create-containers.html

import React from "react";
import { Route, Switch } from "react-router-dom";
//import {BracketPage} from './bracketPage';
// import { LoginForm } from "./login.js";
// import { HomePage} from "./main.js";
// import { ExplorePage} from "./explore.js";
// import {UserPage} from "./userPage.js";

// This function serves the different webpages and their certain components
export default function Routes() {
  return (
    <Switch>
      {/* <Route path="/bracket" exact component={BracketPage} />
      <Route path="/" exact component={BracketPage} /> */}
      {/* <Route path="/login.js" exact component={LoginForm} />
      <Route path="/main.js" exact component={HomePage} />
      <Route path="/" exact component={ExplorePage} />
      <Route path="/userPage.js" exact component={UserPage}/> */}

    </Switch>
  );
}