import React from "react";

// Render static HTML:
import __html from "./blog.html";

export class Blog extends React.Component {
  render() {
    return <div dangerouslySetInnerHTML={{__html}} />;
  }
}
