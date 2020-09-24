import React, { Fragment,useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPost } from '../../action/post'
import PostItems from '../posts/PostItems';
import Commentform from '../post/Commentform';
import Comentitems from '../post/Comentitems'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom';
const Post = ({getPost,post:{post,loading},match}) => {

useEffect(() => {
    getPost(match.params.id);
}, [getPost,match.params.id])

    return loading?<Spinner/>:<Fragment>
        <Link to='/posts' className="btn btn-light"> GO back</Link>
{post===null?<h1>post does not exist</h1>:<Fragment>
    <PostItems post={post} showaction={false} />
    <Commentform postId={post._id} />
    {post.comments.map(comment=><Comentitems postId={post._id} key={comment._id} comment={comment} />)}
    
    </Fragment>



}


    </Fragment>
}

Post.propTypes = {
post:PropTypes.object.isRequired,
}
const mapStateToProps=state=>({
    post:state.post
})

export default connect(mapStateToProps,{getPost})(Post)
