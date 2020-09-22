import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteducation } from '../../action/profile'

const Education = ({education,deleteducation}) => {

    const educations= education.map(edu=>(
        <tr key={edu._id}>
            <td>{edu.degree}</td>
            <td>{edu.fieldofstudy}</td>
            
    <td><Moment format="DD/MM/YYYY">{edu.from}</Moment>-{''}  
    {edu.to===null?('now'):(<Moment format="DD/MM/YYYY">{edu.to}</Moment>)}
    </td>
    <td>
            <button  onClick={()=>deleteducation(edu._id)} className="btn btn-danger">Delete</button>
        </td>
   
        </tr>
         ))

    return (
   


        <Fragment>
         <h2 className="my-2">
          Education 
         </h2>
        <table className='table'>
            <thead>
                <tr>
                  <th >degree</th>
                  <th className="hide-sm">Fieldofstudy</th>
                  <th className="hide-sm">years</th>
                  <th />
                </tr>
            </thead>
            <tbody>
                {educations}
            </tbody>
        </table>


        </Fragment>
            
        
    )
}

Education.propTypes = {
education:PropTypes.array.isRequired,
deleteducation:PropTypes.func.isRequired,
}

export default connect(null,{deleteducation})(Education)