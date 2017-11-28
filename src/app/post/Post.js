import React from "react";

export class Post extends React.Component {
  constructor(props) {
  	 super(props);
     this.state= {
     	post: null,
      currentInput: null,
     	comments: [],
     };
     this.formSubmit = this.formSubmit.bind(this);
     this.inputChange = this.inputChange.bind(this);
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
        	            <div className="row" key={sorted.id} id={sorted.postId}>
                         <span className="date col">{sorted.date}</span>
        	               <span className="author col">{sorted.user}</span>
        	               <span className="description col-9">"{sorted.content}"</span>
        	            </div>
        	        )
                })
                this.setState({comments: comments})
         	});
   }
   inputChange(e){
     this.setState({ currentInput: e.target.value });
     // console.log(e.target.value, this.state.currentInput);

   }
   formSubmit(e){
     e.preventDefault();
     this.refs.commentBox.value="";
     var today = new Date();
     var dd = today.getDate();
     var mm = today.getMonth()+1; //January is 0!
     var yyyy = today.getFullYear();

     if(dd<10) { dd = '0'+dd}
     if(mm<10) {mm = '0'+mm}
     today = yyyy + '-' + mm + '-' + dd;

     var newComment =
           <div className="row" key={ new Date() }>
              <span className="date col">{today}</span>
              <span className="author col">User 1</span>
              <span className="description col-9">"{this.state.currentInput}"</span>
           </div>;
     var currentComments = this.state.comments;
     currentComments.push(newComment);
     this.setState({comments: currentComments})
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
   				       <h1 className="display-3"> {this.state.post.title}</h1>
	               <span className="author small">{this.state.post.author} <br /> <i className="blockquote-footer"> {this.state.post.publish_date} </i></span>
                 <span className="content lead container" dangerouslySetInnerHTML={{ __html }} />

               </div>
            }
            <div className="comments alert alert-dark">
               <div className="container small">
             	     { this.state.comments}
               </div>
            </div>
            <div className="addComment">
                <form onSubmit={this.formSubmit}>
                  <textarea name="addComment" ref="commentBox" className="lead" onKeyUp={this.inputChange} ></textarea>
                  <button name="submit" type="submit"> Post </button>
                </form>
            </div>
        </div>
    )
  }
}
