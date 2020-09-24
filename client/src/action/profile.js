import axios from "axios";
import { GET_PROFILE,PROFILE_ERROR,UPDATE_PROFILE, CLEAR_PROFILE, LOGOUT, GET_PROFILES,GET_REPOS } from "./types";
import { setAlert } from './alert'



export const getcurrentprofile =()=>async dispatch=>{
try {
    
const res= await axios.get("/api/profile/me");
dispatch({
    type:GET_PROFILE,
   payload:res.data

})

} catch (error) {

    dispatch({
        type:PROFILE_ERROR,
        payload:{msg:error.response.statusText}
    })


}


} 

export const getprofiles =()=>async dispatch=>{
    try {
        dispatch({type:CLEAR_PROFILE});

    const res= await axios.get("/api/profile");
    dispatch({
        type:GET_PROFILES,
       payload:res.data
    
    })
    
    } catch (error) {
    
        dispatch({
            type:PROFILE_ERROR,
        
        })

        console.log(error)
    }
     } 

     export const getprofileById =userId=>async dispatch=>{
        try {
            
            
        const res= await axios.get(`/api/profile/user/${userId}`);
        dispatch({
            type:GET_PROFILE,
           payload:res.data
        
        })
        
        } catch (error) {
        
            dispatch({
                type:PROFILE_ERROR,
                payload:{msg:error.response.statusText}
            })
        }
         } 

export const createprofile =(formdata,history,edit=false)=>async dispatch=>{

    const config={
        headers:{
            "Content-Type":"application/json",
        },
    }
     

    try {
        
     const res =await axios.post('api/profile',formdata,config);

     dispatch({
        type:GET_PROFILE,
       payload:res.data
    
    })


dispatch(setAlert(edit?"profile updated":"profile created"))
if (!edit) {
    history.push('/dashboard')
}

    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText}
        })
        const errors = error.response.data.errors;
    
        console.log(errors);
    
        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
    }


}



export const addexperience =(formdata,history)=>async dispatch=>{

    const config={
        headers:{
            "Content-Type":"application/json",
        },
    }
     

    try {
        
     const res =await axios.put('api/profile/experience',formdata,config);

     dispatch({
        type:UPDATE_PROFILE,
       payload:res.data
    
    })


dispatch(setAlert("experience added","success"))

    history.push('/dashboard');

    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText}
        })
        const errors = error.response.data.errors;
    
        console.log(errors);
    
        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
    }


}


export const addeducation =(formdata,history)=>async dispatch=>{

    const config={
        headers:{
            "Content-Type":"application/json",
        },
    }
     

    try {
        
     const res =await axios.put('api/profile/education',formdata,config);

     dispatch({
        type:UPDATE_PROFILE,
       payload:res.data
    
    })


dispatch(setAlert("education added","success"))

    history.push('/dashboard');

    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText}
        })
        const errors = error.response.data.errors;
    
        console.log(errors);
    
        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
    }


}


export const deletexperience=id=> async dispatch=>{


    try {
        const res= await axios.delete(`/api/profile/experience/${id}`)


        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })

        dispatch(setAlert("experience deleted","danger"))

    } catch (error) {
        
        const errors = error.response;
    
        console.log(errors);
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
          }
    }

}
export const deleteducation=id=> async dispatch=>{


    try {
        const res= await axios.delete(`/api/profile/education/${id}`)


        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })

        dispatch(setAlert("education deleted","danger"))

    } catch (error) {
        
        const errors = error.response;
    
        console.log(errors);
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
          }
    }

}
export const deletaccount=()=> async dispatch=>{

if (window.confirm('are  you sure you want to delet your account')) {
    
    try {
         await axios.delete(`/api/profile`)


        dispatch({
            type:CLEAR_PROFILE,
        });
        
        dispatch({
            type:LOGOUT,
        })

        dispatch(setAlert("account deleted","danger"))

    } catch (error) {
        
        const errors = error.response;
    
        console.log(errors);
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
          }
    }
    
}
    
}