/**
 * Application entry point.
 */

// Global application styles
import "src/app.scss";

// React
import React from "react";
import {render} from "react-dom";
import {Router, Route, IndexRoute, Redirect, browserHistory} from "react-router";

// Our app
import App       from "./app/App";
import { About } from "./app/about/About";
import { Home }  from "./app/home/Home";
import { Blog }  from "./app/blog/Blog";
import { Post }  from "./app/post/Post";

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="about" component={About}/>
      <Route path="home" component={Home}/>
      <Route path="blog" component={Blog}/>
      <Route path="post/:tab" component={Post}/>
      <Redirect from="*" to="/home"/>
    </Route>
  </Router>
), document.getElementById("root"));
