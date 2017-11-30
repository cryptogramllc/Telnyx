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
                // let childComment = commentsArray.map((sorted) => {
                //     if(sorted.parent_id != null){
                //          return (
                //            <div className="row" key={sorted.id} id={sorted.postId}>
                //               <span className="date col">{sorted.date}</span>
                //               <span className="author col">{sorted.user}</span>
                //               <span className="description col-9">
                //               "{sorted.content}"
                //               </span>
                //            </div>
                //          )
                //       }
                // });
                // let comments = commentsArray.map((sorted) => {
                //     if (sorted.parent_id == null){
            	  //       return(
            	  //           <div className="row" key={sorted.id} id={sorted.postId}>
                //              <span className="date col">{sorted.date}</span>
            	  //              <span className="author col">{sorted.user}</span>
            	  //              <span className="description col-9">
                //                 "{sorted.content}"
                //                  <div className = "childComment">
                //                       {childComment}
                //                  </div>
                //              </span>
            	  //           </div>
            	  //       )
                //     }
                // })

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
                          // <div className="" id={ "comment-" + child.parent_id } key={ child.id }>
                          //   <h6 className="author blockquote"> {child.user} </h6>
                          //   <div className="row">
                          //     <div className="content small col-10"> "{child.content}" </div>
                          //     <div className="content col"> {child.date} </div>
                          //   </div>
                          // </div>
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
                      // <div className="alert alert-dark" id={ "comment-" + parent.id } key={ parent.id }>
                      //     <h6 className="author blockquote"> {parent.user} </h6>
                      //     <div className="row">
                      //       <div className="description blockquote col-10"> "{parent.content}" </div>
                      //       <div className="date col small">{parent.date}</div>
                      //     </div>
                      //     <div className="childComments container small">
                      //         {childComment}
                      //     </div>
                      // </div>
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
                    </div>
                    <div className="panel-body">
                      <div className="parent-comment"> "{this.state.currentInput}" </div>
                    </div>
                 </div>
              </div>
           </div>
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
