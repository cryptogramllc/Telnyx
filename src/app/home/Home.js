import React from "react";

// Render static HTML:
import __html from "./home.html";

export class Home extends React.Component {
  render() {
    return <div dangerouslySetInnerHTML={{__html}} />;
  }
}
