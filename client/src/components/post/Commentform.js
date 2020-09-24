import React, { Fragment,useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { addcomment } from '../../action/post'

const Commentform = ({addcomment,postId}) => {

const [text, settext] = useState('')    
    return(
        <Fragment>
      <div className="post-form">
      <div className="bg-primary dark">
        <h3>Comment Something...</h3>
      </div>
      <form className="form my-1"onSubmit={e=>{
          e.preventDefault();
          addcomment(postId,{text});
          settext('')
    }}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={e=>settext(e.target.value)}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
            
    </Fragment>
    ) 
    
}

Commentform.propTypes = {
addcomment:PropTypes.func.isRequired,
}

export default connect(null,{addcomment})(Commentform)
