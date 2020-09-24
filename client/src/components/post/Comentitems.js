import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removecomment } from '../../action/post'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { post } from 'request'


const Comentitems = ({auth,comment:{user,name,avatar,_id,date,text},postId,removecomment}) => {
    return (
        <Fragment>
 <div class="comments">
        <div class="post bg-white p-1 my-1">
          <div>
            <Link   to={`/profile/${user}`}>
              <img
                class="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p class="my-1">
                {text}
            </p>
             <p class="post-date">
               Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
            </p>

            {!auth.loading && user === auth.user._id && (
            <button
              type='button'
              className='btn btn-danger'
              onClick={e=>removecomment(postId,_id)}
            >
              <i className='fas fa-times' />
            </button>
            )}

          </div>
        </div>
        </div>

        </Fragment>          
    
    )
}

Comentitems.propTypes = {
auth:PropTypes.object.isRequired,
removecomment:PropTypes.func.isRequired,
}


const mapStateToProps=state=>({
auth:state.auth

})

export default connect(mapStateToProps,{removecomment})(Comentitems)
