import {  useNavigate } from 'react-router-dom';
import React,{useState} from 'react'

const Login = (props) => {
    const [credentials, setcredentials] = useState({email:"", password:""})
    let navigate= useNavigate();

    const handlesubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
          //mode: 'cors',
          //cache: 'no-cache',
          //credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json = await response.json();
          console.log( json)
          if(json.success){
            localStorage.setItem('token', json.authToken)
            props.showAlert(" Logged in succesfully ","success")
            navigate("/home")
          }
          else{
            props.showAlert(" Invalid details ","danger")
        }
    }
    const onChange =(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (
        <>
        <div>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} value={credentials.email} id="email" name='email' aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={credentials.password} id="password" name='password'/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        </>
    )
}
export default Login