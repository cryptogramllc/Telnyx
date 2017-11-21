// import React from "react";

// // Render static HTML:
// import __html from "./blog.html";
// import {react_api} from "react-api";


// var URL = 'http://localhost:9001/posts';
 

// export class Blog extends React.Component {


//   render() {
//        <div>
//         <ReactAPI ref='github' url={URL} callback={this.handleResponse} />
//       </div>
//   }
// }


import React from "react";

export class Blog extends React.Component {
  constructor() {
  	 super();
     this.state={items:[]};
  }
  componentDidMount(){
  	fetch(`http://localhost:9001/posts`)
 	.then(result => result.json())
    .then(data => {
       console.table(data);
       let items = data.map((post) => {
	        return(
	            <div key={post.id} id={post.slug}>
	               <span className="title">{post.title}</span>
	               <span className="author">{post.author}</span>
	               <span className="date">{post.publish_date}</span>
	                <span className="description">{post.description}</span>
	            </div>
	        )
        })

	    this.setState({items: items})
	    console.log("state", this.state.items)
    })
    .catch(e => {
       console.log(e);
       return e;
    });	
 
 	// .then(data => {
  //   	let items = data.results.map((post) => {
	 //        return(
	 //            <div post_id={post.id}>
	 //               <span className="title">{post.title}</span>
	 //            </div>
	 //        )
  //       })

	 //    this.setState({items: items})
	 //    console.log("state", this.state.items)
  //   });

  }
  render() {

  	return(
    	<div className="table">
          <div className="table-inner">
             {this.state.items}
          </div>
    	</div>

   )
  }
}


