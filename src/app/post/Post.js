import React from "react";


export class Post extends React.Component {
  constructor(props) {
  	 super(props);
     this.state= {
     	post: null,
      comments:[],
      currentInput: null,
     	parentComment: [],
      childComment:[]
     };
     this.formSubmit = this.formSubmit.bind(this);
     this.inputChange = this.inputChange.bind(this);
     this.addReply = this.addReply.bind(this);
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
                  // console.table(array)
                  return elem.postId == tab;
               });

                commentsArray.map((sorted) => {
                     this.state.parentComment.push(sorted);

                     if( sorted.parent_id != null){
                        this.state.childComment.push(sorted);
                     }
                });

                var comments = this.state.parentComment.map((parent) => {
                   var childComment = this.state.childComment.map((child)=> {
                      if (child.parent_id == parent.id){
                        return (
                          <div className="row" id={ "comment-" + child.parent_id } key={ child.id }>
                             <div className="col-sm-2">
                                <div className="thumbnail">
                                   <img className="img-responsive user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png" />
                                </div>

                             </div>
                             <div className="col-sm-10">
                                <div className="panel panel-default">
                                   <div className="panel-heading">
                                      <strong>{child.user}</strong> <span className="text-muted">commented on {child.date}</span>
                                   </div>
                                   <div className="panel-body">
                                      <div className="parent-comment"> "{child.content}" </div>
                                   </div>
                                </div>
                             </div>
                          </div>
                        )
                      }
                   });

                   return (
                      <div className="row" id={ "comment-" + parent.id } key={ parent.id }>
                         <div className="col-sm-2">
                            <div className="thumbnail">
                               <img className="img-responsive user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png" />
                            </div>

                         </div>
                         <div className="col-sm-10">
                            <div className="panel panel-default">
                               <div className="panel-heading">
                                  <strong>{parent.user}</strong> <span className="text-muted">commented on {parent.date}</span>
                                  <button className="addReply btn btn-primary pull-right" onClick={this.addReply}>reply</button>
                               </div>
                               <div className="panel-body">
                                  <div className="parent-comment"> "{parent.content}" </div>

                                  <div className="child-comment">{ childComment }</div>
                               </div>
                            </div>
                         </div>
                      </div>

                   )
                });
                console.log(comments);
                this.setState({comments: comments})
         	});
   }
   addReply(){
     console.log("add reply");
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
     var date = new Date();
     var key = date;
     var newComment =
           <div className="row" id={ "comment-" + key} key={ key }>
              <div className="col-sm-2">
                 <div className="thumbnail">
                    <img className="img-responsive user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png" />
                 </div>

              </div>
              <div className="col-sm-10">
                 <div className="panel panel-default">
                    <div className="panel-heading">
                       <strong>User 1</strong> <span className="text-muted">commented on {today}</span>
                       <button className="addReply btn btn-primary pull-right" onClick={this.addReply}>reply</button>
                    </div>
                    <div className="panel-body">
                      <div className="parent-comment"> "{this.state.currentInput}" </div>
                    </div>
                 </div>
              </div>
           </div>
     var currentComments = this.state.comments;
     console.log(this.state.currentInput);
     if (this.state.currentInput != null){
       currentComments.push(newComment);
       this.setState({comments: currentComments});
       this.setState({currentInput: null});
     }

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
            <div className="comments">
             	     {this.state.comments}
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
