import React from "react";

export class Post extends React.Component {
  constructor(props) {
  	 super(props);
     this.state= {
     	post: null,
      currentInput: null,
     	comments: [],
     };
     this.addComment = this.addComment.bind(this);
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
   inputChange(e){
     this.setState({ currentInput: e.target.value });
     // console.log(e.target.value, this.state.currentInput);

   }

   addComment(){
     // console.log('this state comment' , this.state.currentInput);
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
    dd = '0'+dd
    }

    if(mm<10) {
    mm = '0'+mm
    }

    today = yyyy + '-' + mm + '-' + dd;

     var newComment =
          <div id="test">
             <span className="author">User 1</span>
             <span className="date">{today}</span>
             <span className="description">{this.state.currentInput}</span>
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
   				       <h1> {this.state.post.title}</h1>
	               <span className="author">{this.state.post.author}</span>
	               <span className="date">{this.state.post.publish_date}</span>
	               <span className="content" dangerouslySetInnerHTML={{ __html }} />
	             </div>
            }
            <div className="comments">
            	{ this.state.comments}
            </div>
            <div className="addComment">
              <input name="addComment" onKeyUp={this.inputChange} type="text" />
              <button name="submit" type="submit" onMouseUp={this.addComment}> Post </button>
            </div>
        </div>
    )
  }
}
