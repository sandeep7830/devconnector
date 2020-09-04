import axios from 'axios';
import { REGISTER_SUCCESS,REGISTER_FAIL } from "./types";
 

export const register=({name,emai,password})=>async dispatch=>{
const config={
    headers:{
        "Content-Type":"application/json",
    },
}
const body=JSON.stringify({name,emai,password});


try {
    const res = await axios.post("/api/users",body,config);
    dispatch({
        type:REGISTER_SUCCESS,
        payload:res
    })
} catch (error) {

    dispatch({
        type:REGISTER_FAIL
    })
    console.log(error);
}

}