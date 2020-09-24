import { GET_POSTS,POST_ERROR,UPDATE_LIKES,DELETE_POST,ADD_POST,GET_POST,ADD_COMMENT,REMOVE_COMMENT} from './types';
import axios from 'axios';
import { setAlert } from './alert';

export const getPosts=()=>async dispatch=>{

try {
    
const res = await axios.get('/api/posts');


dispatch({
    type:GET_POSTS,
    payload:res.data
})
} catch (error) {
    
    dispatch({
        type:POST_ERROR,
        payload:{msg:error.response.statusText}
    })
}
}

export const addlike=id=>async dispatch=>{

    try {
        
    const res = await axios.put(`/api/posts/like/${id}`);
    
    
    dispatch({
        type:UPDATE_LIKES,
        payload:{id,post:res.data}
    })
    } catch (error) {
         
        dispatch({
            type:POST_ERROR,
            payload:{msg:error.response.statusText}
        })
        
    }
    }

    
export const removelike=id=>async dispatch=>{

    try {
        
    const res = await axios.put(`/api/posts/unlike/${id}`);
    
    
    dispatch({
        type:UPDATE_LIKES,
        payload:{id,post:res.data}
    })
    } catch (error) {
        
        dispatch({
            type:POST_ERROR,
            payload:{msg:error.response.statusText}
        })
    }
    }
   
   
    export const deletepost=id=>async dispatch=>{

        try {
            
         await axios.delete(`/api/posts/${id}`);
        
        
        dispatch({
            type:DELETE_POST,
            payload:id
        })

        
        dispatch(setAlert("post removed","danger"))
        } catch (error) {
            
            dispatch({
                type:POST_ERROR,
                payload:{msg:error.response.statusText}
            })
        }
        }


        
export const addpost=formdata=>async dispatch=>{

    const config={
        headers:{
            "Content-Type":"application/json",
        },
    }

    try {
        
    const res = await axios.post(`/api/posts`,formdata,config);
    
    
    dispatch({
        type:ADD_POST,
        payload:res.data
    })
    
    dispatch(setAlert("post added","success"))
    } catch (error) {
        
        dispatch({
            type:POST_ERROR,
            payload:{msg:error.response.statusText}
        })
    }
    }


    export const getPost=id=>async dispatch=>{

        try {
            
        const res = await axios.get(`/api/posts/${id}`);
        
        
        dispatch({
            type:GET_POST,
            payload:res.data
        })
        } catch (error) {
            
            dispatch({
                type:POST_ERROR,
                payload:{msg:error.response.statusText}
            })
        }
        }


        export const addcomment=(postId,formdata)=>async dispatch=>{

            const config={
                headers:{
                    "Content-Type":"application/json",
                },
            }
        
            try {
                
            const res = await axios.post(`/api/posts/comment/${postId}`,formdata,config);
            
            
            dispatch({
                type:ADD_COMMENT,
                payload:res.data
            })
            
            dispatch(setAlert("comment added","success"))
            } catch (error) {
                
                dispatch({
                    type:POST_ERROR,
                    payload:{msg:error.response.statusText}
                })
            }
            }
        
            export const removecomment=(postId,commentId)=>async dispatch=>{
            
                try {
                    
                const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
                
                
                dispatch({
                    type:REMOVE_COMMENT,
                    payload:{commentId,post:res.data}
                })
                
                dispatch(setAlert("comment deleted","danger"))
                } catch (error) {
                    
                    dispatch({
                        type:POST_ERROR,
                        payload:{msg:error.response.statusText}
                    })
                }
                }