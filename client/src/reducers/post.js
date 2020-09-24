import { GET_POSTS,POST_ERROR,UPDATE_LIKES,DELETE_POST,ADD_POST ,GET_POST,ADD_COMMENT,REMOVE_COMMENT} from '../action/types';


const initialState={
    posts:[],
    post:null,
    loading:true,
    errors:{}
}

export default function(state = initialState,action){

    const{type, payload}=action
switch (type) {
    case GET_POSTS:
        return{
            ...state,
            posts:payload,
            loading:false
        }
        case  POST_ERROR:
             return{
                 ...state,
                 error:payload,
                 loading:false
             }
        case UPDATE_LIKES:
            return{
                ...state,
                posts:state.posts.map(post=>post._id===payload.id?payload.post:post),
                post:payload.post,
                loading:false
            }
            case GET_POST:
                return{
                    ...state,
                    post:payload,
                    loading:false
                }
            case ADD_POST:
                return{
                    ...state,
                    posts:[payload,...state.posts],
                    loading:false
                }
                case ADD_COMMENT:
                    return{
                        ...state,
                        post:payload,
                        loading:false
                    }
                    case REMOVE_COMMENT:
                return{
                    ...state,
                    posts:state.posts.map(post=>post._id===payload.id?payload.post:post),
                    post:payload.post,
                    loading:false
                }
        case DELETE_POST:
            return{
                ...state,
                posts:state.posts.filter(post=>post._id !==payload),
                post:null,
                loading:false
            }
        break;

    default:
        return state
}

}