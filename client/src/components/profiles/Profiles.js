import React,{Fragment,useEffect} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getprofiles } from '../../action/profile';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem'


const Profiles = ({getprofiles,profile:{profiles,loading}}) => {

useEffect(() => {
    getprofiles();
}, [getprofiles])
    return (
        <Fragment>
         {loading?<Spinner/>:<Fragment>
             <h1 className="large text primary">Devloper</h1>
             <div className="profiles">
                 {profiles.length>0?(profiles.map(profile=>(<ProfileItem key={profile._id} profile={profile} />))):<h4>No profile found</h4>}

             </div>
             </Fragment>}



        </Fragment>
            
        
    )
}

Profiles.propTypes = {
getprofiles:PropTypes.func.isRequired,
profile:PropTypes.object.isRequired,
}

const mapStateToProps=state=>({
    profile:state.profile
})

export default connect(mapStateToProps,{getprofiles})(Profiles)
