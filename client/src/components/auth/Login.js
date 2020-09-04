import React,{useState} from 'react'
import { Link } from 'react-router-dom';


const Login = () => {

const [formData, setFormData]= useState({

    email:'',
    password:''
    
}
);

const{email,password}=formData;


const onchange= e=>setFormData({...formData,[e.target.name]:e.target.value})

const onSubmit= e=>{
    e.preventDefault();
      
      console.log('success')  
    


}

    return (
        <div>
            <section >
      <h1 className="large text-primary">login Up</h1>
      <p className="lead"><i className="fas fa-user"></i> login into Your Account</p>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <input 
          type="email" 
          placeholder="Email Address"
           name="email"
           value={email}
          onChange={e=>onchange(e)}
          
            />
           </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
          onChange={e=>onchange(e)}
          
          />
        </div>
     <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </section>
        </div>
    )
}

export default Login
