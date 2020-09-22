import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux'
import { deletexperience } from '../../action/profile'

const Experience = ({experience,deletexperience}) => {

    const experiences= experience.map(exp=>(
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            
    <td><Moment format="DD/MM/YYYY">{exp.from}</Moment>-{''}  
    {exp.to===null?('now'):(<Moment format="DD/MM/YYYY">{exp.to}</Moment>)}
    </td>
    <td>
            <button  onClick={()=>deletexperience(exp._id)} className="btn btn-danger">Delete</button>
        </td>
   
        </tr>
         ))

    return (
   


        <Fragment>
         <h2 className="my-2">
          Experience 
         </h2>
        <table className='table'>
            <thead>
                <tr>
                  <th >company</th>
                  <th className="hide-sm">title</th>
                  <th className="hide-sm">years</th>
                  <th />
                </tr>
            </thead>
            <tbody>
                {experiences}
            </tbody>
        </table>


        </Fragment>
            
        
    )
}

Experience.propTypes = {
experience:PropTypes.array.isRequired,
deletexperience:PropTypes.func.isRequired,
}

export default connect(null,{deletexperience})(Experience)
