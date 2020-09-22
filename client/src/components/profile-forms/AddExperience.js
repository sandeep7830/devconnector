import React, { Fragment , useState} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addexperience } from '../../action/profile'
import { withRouter , Link} from 'react-router-dom';



const AddExperience = ({addexperience,history}) => {

     const [formdata, setformdata] = useState({
        title:'',
        location:'',
        company:'',
        from:'',
        to:'',
        current:false,
        description:''

     });
const [displaydate, setdisplaydate] = useState(false)

const {
    title,
    location,
    company,
    from,
    to,
    current,
    description
}=formdata;


const onchange=e=>setformdata({...formdata,[e.target.name]:e.target.value})

    return (
        <Fragment>
 <h1 className="large text-primary">
       Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form"  onSubmit={e=>{
          e.preventDefault();
         addexperience(formdata,history); 
    }}>
        <div className="form-group">
          <input type="text" placeholder="* Job Title" name="title" value={title}  onChange={e=>onchange(e)}  />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Company" name="company" value={company}  onChange={e=>onchange(e)} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location}  onChange={e=>onchange(e)} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from}  onChange={e=>onchange(e)} />
        </div>
         <div className="form-group">
          <p><input type="checkbox" name="current" checked={current}  value={current}  onChange={()=>{ 
              setformdata({...formdata, current:!current});
              setdisplaydate(!displaydate)
              } }  /> Current Job</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to}  onChange={e=>onchange(e) }   disabled={displaydate?"disabled":""} />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}  onChange={e=>onchange(e)} 
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">  Go back</Link>
      </form>
   
        </Fragment>
            
    
    )
}

AddExperience.prototype={
addexperience:PropTypes.func.isRequired,
}

export default connect(null,{addexperience})(withRouter(AddExperience));
