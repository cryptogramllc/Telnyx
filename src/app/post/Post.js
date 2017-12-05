import React from "react";

export class Post extends React.Component {
  constructor(props) {
  	 super(props);
     this.state= {
     	post: null,
      comments:[],
      currentInput: null,
     	parentComment: [],
      childComment:[],
      displayReplyInput: false,
      replyObj: null
     };
     this.formSubmit = this.formSubmit.bind(this);
     this.inputChange = this.inputChange.bind(this);
     this.replyInput = this.replyInput.bind(this);
     this.postReply = this.postReply.bind(this);
  }

  GenID(){
   return this.state.comments.length + 1;
  }

  createReplies(){
     console.log(this.state.parentComment);
      return  this.state.parentComment.map((parent) => {
           var childComment = this.state.childComment.map((child)=> {
              if (child.parent_id == parent.id){
                return (
                  <div className="item" id={ "comment-" + child.parent_id }>
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


             // this.setState({replyInput: replyInput});
             // console.log(this.state.replyInput);

           return (
             <div className="panel-default">
               <div className="panel-heading">
                  <strong>{parent.user}</strong> <span className="text-muted">commented on {parent.date}</span>
               </div>
               <div className="panel-body">
                  <div className="parent-comment"> "{parent.content}" </div>
                  <div className="child-comment">{ childComment }</div>
               </div>
            </div>

           )
      });
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
                  return elem.postId == tab;
              });
              commentsArray.map((sorted) => {
                   this.state.parentComment.push(sorted);
                   if( sorted.parent_id != null){
                      this.state.childComment.push(sorted);
                   }
              });
              var comments = this.createReplies();
              this.setState({comments: comments});
         	});
  }


   replyInput(e){
      // console.log(this.state.childComment);

      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();

      if(dd<10) { dd = '0'+dd}
      if(mm<10) {mm = '0'+mm}
      today = yyyy + '-' + mm + '-' + dd;

      var value = e.target.value;
      var id =  this.GenID();
      var postID = parseInt(this.props.routeParams.tab);
      var user = "User 1";
      var parent_id = parseInt(e.target.id) + 1;
      var date = new Date();
      var obj = {id: id, content: value, date: today, parent_id: parent_id, postId: postID, user: user}
      this.setState({replyObj: obj});

   }

   postReply(){
     this.state.childComment.push(this.state.replyObj);
     var comments = this.state.parentComment.map((parent) => {
        var childComment = this.state.childComment.map((child)=> {
           if (child.parent_id == parent.id){
             return (
               <div className="item" id={ "comment-" + child.parent_id }>
                  <div className="col-sm-2">
                     <div className="thumbnail">
                        <img className="img-responsive user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png" />
                     </div>

                  </div>
                  <div className="col-sm-10">
                     <div className="panel panel-default">
                        <div className="panel-heading">
                           <strong>{child.user}</strong>
                           <span className="text-muted"> commented on {child.date} </span>
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
          <div className="panel-default">
            <div className="panel-heading">
               <strong>{parent.user}</strong> <span className="text-muted">commented on {parent.date}</span>
            </div>
            <div className="panel-body">
               <div className="parent-comment"> "{parent.content}" </div>
               <div className="child-comment">{ childComment }</div>
            </div>
         </div>
        )
     });
     this.setState({comments: comments})
   }


   inputChange(e){
     this.setState({ currentInput: e.target.value });
   }
   formSubmit(e){
       console.log(`form submitted`);
       e.preventDefault();
       this.refs.commentBox.value="";

       var today = new Date();
       var dd = today.getDate();
       var mm = today.getMonth()+1; //January is 0!
       var yyyy = today.getFullYear();
       if(dd<10) { dd = '0'+dd}
       if(mm<10) {mm = '0'+mm}
       today = yyyy + '-' + mm + '-' + dd;

       var value = this.state.currentInput;
       console.log(value);
       var id =  this.GenID();
       var postID = parseInt(this.props.routeParams.tab);
       var user = "User 1";
       var date = new Date();


       var obj = {id: id, content: value, date: today, parent_id: null, postId: postID, user: user}


      if(value.length !== 0){
        this.state.parentComment.push(obj);
        var comments = this.createReplies();
        this.setState({comments: comments});
      }
   }

  render(){
    	var body;
    	var __html;
      if(this.state.post !== null){
      	__html = this.state.post.content;
      }
      var commentsDom = this.state.comments.map((elem, index) => {
         return (
             <div className="row" id={ "comment-" + index } >
                <div className="col-sm-2">
                   <div className="thumbnail">
                      <img className="img-responsive user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png" />
                   </div>
                </div>
                <div className="col-sm-10">
                  <div className="panel panel-default">
                      {elem}
                      <div className="form-group panel-body">
                          <input type="text" onChange={this.replyInput} className="form-control" id={index} placeholder="Your Reply" />
                          <button name="reply" onClick={this.postReply} className="btn btn-primary" type="submit"> Post </button>
                      </div>
                  </div>
                </div>
             </div>
         )
      });
      return(
          <div>
              {
              	this.state && this.state.post && __html &&
              	 <div id={this.state.post.slug}>
     				       <h1 className="display-3"> {this.state.post.title}</h1>
  	               <span className="author small">{this.state.post.author} <br /> <i className="blockquote-footer"> {this.state.post.publish_date} </i></span>
                   <span className="content lead container" dangerouslySetInnerHTML={{ __html }} />
                 </div>
              }
              <div className="comments">{commentsDom}</div>
              <div className="addComment">
                  <form onSubmit={this.formSubmit}>
                    <textarea name="addComment" ref="commentBox" className="lead" onKeyUp={this.inputChange} ></textarea>
                    <button name="submit" className="btn btn-primary" type="submit"> Post </button>
                  </form>
              </div>
          </div>
      )
  }




}
