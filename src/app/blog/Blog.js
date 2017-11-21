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
import { Link } from "react-router";

export class Blog extends React.Component {
  constructor() {
  	 super();
     this.state={items:[], post: null};
  }
  componentDidMount(){
  	fetch(`http://localhost:9001/posts`)
 	.then(result => result.json())
    .then(data => {
       var sorted = data.sort(function(a ,b){
         return new Date(b.publish_date) - new Date(a.publish_date);
       })
       console.table(sorted);

     //   console.table(data);
       let items = data.map((sorted) => {
	        return(
	            <div key={sorted.id} id={sorted.slug}>
	               <span className="title"><Link to={ 'post/' + sorted.id}>{sorted.title}</Link></span>
	               <span className="author">{sorted.author}</span>
	               <span className="date">{sorted.publish_date}</span>
	                <span className="description">{sorted.description}</span>
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


