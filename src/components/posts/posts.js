import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';
import {Link} from 'react-router';
import spinner from 'react-loader';
var Masonry = require('react-masonry-component');

var masonryOptions = {
    transitionDuration: 5,
    gutter: 10,
    rowHeight: 60
};

class Posts extends Component {


  componentWillMount(){
  this.props.fetchPost();
  this.props.userInfo();
  }

  handleEditButton(post) {
      if(this.props.authenticated){
      return ( 
            <Link  className="pull-xs-right btn btn-warning btn-sm" to ={"posts/"+post.id+"/edit"}>Edit</Link>
             );
      }
  }

 renderPosts(posts) {

    return posts.map((post) => {
      return (

          <div className="card cardStyle" key={post.id}>
              <Link to={"posts/"+post.id}>
                  <center>
                  <img className="card-img-top" width="240" src={post.body} alt="Book image"> </img>
                  </center>
              </Link>
              <div className="card-block">
                  <p className="card-title">{ post.title }</p>
                  <Link to={"user/"+post.user_id}>
                      <span className="btn btn-secondary">by {post.user_name}</span>
                  </Link>

              </div>
          </div>
      );
    });
  }

    render(){
        const {posts,loading,error} = this.props.postsList;
        if(loading === true){  
            return <div className="loader"></div>;
        }
        return (
            <Masonry
                className={'grid'} // default ''
                elementType={'div'} // default 'div'
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
            >

                {this.renderPosts(posts)}

            </Masonry>
        );

    }
}

function mapStateToProps(state) {
    return {
        postsList:state.posts.postsList,
        authenticated:state.auth.authenticated,
        userinfo : state.auth.userinfo
    }
}
export default connect(mapStateToProps,actions)(Posts);
