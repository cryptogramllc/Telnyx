import React from "react";

export class Post extends React.Component {
  constructor() {
  	 super();
     this.state= { 
     	post: null,
     	comments: []
     };
  }
   
   componentDidMount(){
     console.log(`compontent mounted`, this.state);
     var tab = parseInt(this.props.routeParams.tab);
     fetch(`http://localhost:9001/posts`)
 	 .then(result => result.json())
     .then(data => {
    	var postNum = data.find(item => item.id === tab);
    	this.setState({post: postNum});
     });

    fetch(`http://localhost:9001/comments`)
 	.then(result => result.json())
 	.then(data => {
 		var commentsArray = data.filter(function(elem, i, array) {
            console.table(array)
            return elem.postId == tab;
         });
        console.log(commentsArray);
        let comments = commentsArray.map((sorted) => {
	        return(
	            <div key={sorted.id} id={sorted.postId}>
	               <span className="author">{sorted.user}</span>
	               <span className="date">{sorted.date}</span>
	                <span className="description">{sorted.content}</span>
	            </div>
	        )
        })
        this.setState({comments: comments})
 	});



   }

  render(){
  	var body;
  	var __html;
  // console.log(this.state.post)
    if(this.state.post !== null){
    	__html = this.state.post.content;
    }
    return(

        <div>
            {   
            	this.state && this.state.post && __html &&
            	 <div key={this.state.post.id} id={this.state.post.slug}>
   				   <h1> {this.state.post.title}</h1> 
	               <span className="author">{this.state.post.author}</span>
	               <span className="date">{this.state.post.publish_date}</span>
	               <span className="content" dangerouslySetInnerHTML={{ __html }} />
	             </div>
            }
            <div className="comments">
            	{ this.state.comments}
            </div>
        </div>
    )
  }
}
