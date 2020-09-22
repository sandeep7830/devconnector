import React, { Fragment ,useEffect} from 'react'
import PropTypes from 'prop-types';
import { getprofileById } from '../../action/profile';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileTop from './PofileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';

const Profile = ({getprofileById,auth,profile:{profile,loading},match}) => {

useEffect(() => {
    getprofileById(match.params.id)
}, [getprofileById,match.params.id])

    return (<Fragment>
        {profile===null || loading?<Spinner/>:<Fragment>
            <Link to='/profiles' className='bt btn-light' > Back To Profiles </Link>
           {auth.isAuthenticated &&auth.loading===false &&auth.user._id===profile.user._id&&(<Link to='/edit-profile'className="btn btn-dark" >
               EditProfile
           </Link>) }
           <div className="profile-grid my-1">
               <ProfileTop profile={profile} />
               <ProfileAbout profile={profile} />
               <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>
          {profile.experience.length>0?(<Fragment>{profile.experience.map(experience =>(<ProfileExperience  key={experience._id} experience={experience}/>) )}</Fragment> ):<h2> No Experience</h2>}
          </div>
          <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
          {profile.education.length>0?(<Fragment>{profile.education.map(education =>(<ProfileEducation  key={education._id} education={education}/>) )}</Fragment> ):<h2> No Education</h2>}
          </div>

           </div>
            </Fragment>}
    </Fragment>
    )
}

Profile.propTypes = {
profile:PropTypes.object.isRequired,
auth:PropTypes.object.isRequired,
getprofileById:PropTypes.func.isRequired,
}

const mapStateToProps=state=>({
    profile:state.profile,
    auth:state.auth
})

export default connect(mapStateToProps,{getprofileById})(Profile)
