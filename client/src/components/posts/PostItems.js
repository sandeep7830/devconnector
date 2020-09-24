import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment';
import { addlike,removelike,deletepost} from '../../action/post';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';


const PostItems = ({auth,showaction,post:{avatar,likes,_id,text,user,name,date,comments},addlike,removelike,deletepost})=> {




    return (
        <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img
              className="round-img"
              src={avatar}
              alt=""
            />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">
    {text}</p>


           <p className="post-date">
              Posted on <Moment format="DD/MM/YYYY" >{date}</Moment>
          </p>

          <button type="button" className="btn btn-light"
          onClick={e=>addlike(_id)} >
            <i className="fas fa-thumbs-up"></i>
    {likes.length>0 &&(<span>{likes.length}</span>)}</button>



          <button type="button" className="btn btn-light" onClick={e=>removelike(_id)} >
            <i className="fas fa-thumbs-down"></i>
          </button>

          {showaction&&<Fragment><Link to={`/posts/${_id}`} className="btn btn-primary">
    Discussion  {comments.length> 0&& (<span className='comment-count'>{comments.length}</span>)}
          </Link></Fragment>}
          


          {!auth.loading && user === auth.user._id && (
            <button
              type='button'
              className='btn btn-danger'
              onClick={e=>deletepost(_id)}
            >
              <i className='fas fa-times' />
            </button>
          )}
        
        </div>

        

      </div>
            
        
    )
}


PostItems.defaultProps={
  showaction:true
}

PostItems.propTypes = {
auth:PropTypes.object.isRequired,
post:PropTypes.object.isRequired,
addlike:PropTypes.func.isRequired,
deletepost:PropTypes.func.isRequired,
removelike:PropTypes.func.isRequired,
}

const mapStateToProps=state=>({
    auth:state.auth
})

export default connect(mapStateToProps,{addlike,removelike,deletepost})(PostItems)
