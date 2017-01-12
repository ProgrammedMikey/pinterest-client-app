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

class userPosts extends Component {


    componentWillMount(){
        this.props.UserPost(this.props.params.id);
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
                        <img className="card-img-top" width="240" src={post.body} alt="Book image"> </img>
                    </Link>
                    <div className="card-block">
                        <h4 className="card-title"><center>{ post.title }</center></h4>
                        <span className="label label-default"> By: {post.user_name} </span>
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
            <div className="container">
                <div className="col-12 col-md-auto">
                    <br/>
                    <h3><center>All Pins From This User!!</center></h3>
                    <br/>
                </div>

                <hr/>

                <Masonry
                    className={'grid'} // default ''
                    elementType={'div'} // default 'div'
                    options={masonryOptions} // default {}
                    disableImagesLoaded={false} // default false
                >
               
                {this.renderPosts(posts)}

            </Masonry>
                </div>
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
export default connect(mapStateToProps,actions)(userPosts);
