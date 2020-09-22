import React,{ useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getcurrentprofile } from '../../action/profile'
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardAction  from './DashboardAction';
import Experience  from './Experience';
import Education  from './Education';
import { deletaccount } from '../../action/profile';


const Dashboard = ({getcurrentprofile,auth:{user},profile:{loading,profile},deletaccount}) => {
   


    useEffect(() => {
        getcurrentprofile()
    }, [getcurrentprofile])
   

    return loading?<Spinner/>:<Fragment>
        
    <h1 className="large text-primary">
        Dashboard
      </h1>
      <p className="lead"><i className="fas fa-user"></i> Welcome {user&&user.name}</p>
        
        {profile!==null?<Fragment>
            <DashboardAction/>

            <Experience experience={profile.experience}/>        
    
    <Education education={profile.education}/> 
    
        </Fragment>:<Fragment><p>you Dont have profile</p>
        <Link to="/create-profile" className="btn btn-primary my-1">
            create profile
        </Link> </Fragment>}
          
        
    
<div className="my-2">
<button onClick={()=>deletaccount()} className="btn btn-danger">
    <i className="fas fa-user"></i>DELET YOUR ACCOUNT
</button>
</div>
    </Fragment>
}
Dashboard.prototype={
    getcurrentprofile:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired,
    deletaccount:PropTypes.func.isRequired,
}
const mapStateToProps=state=>({
    profile:state.profile,
    auth:state.auth,
    
})

export default connect(mapStateToProps,{getcurrentprofile,deletaccount})(Dashboard);
