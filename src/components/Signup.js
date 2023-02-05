import {  useNavigate } from 'react-router-dom';
import React,{useState} from 'react'

const Signup=(props)=> {
  const [credentials, setcredentials] = useState({name:"" ,email:"", password:"", cpassword:""})
  let navigate= useNavigate();
  const handlesubmit = async (e)=>{
      e.preventDefault();
      const {name, email, password}= credentials
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
          method: 'POST',
         // mode: 'cors',
         // cache: 'no-cache',
          //credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name,email,password})
        });

        const json = await response.json();
        if(json.success){
          localStorage.setItem('token', json.authToken)
          props.showAlert(" Account created succesfully ","success")
          navigate("/home")
        }
        else{
          props.showAlert(" Invalid Cred ","danger")
        }
  }
  const onChange =(e)=>{
      setcredentials({...credentials,[e.target.name]:e.target.value})
  }
  return (
    <div>
    <form onSubmit={handlesubmit}>
    <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
            <input type="text" className="form-control" onChange={onChange} value={credentials.name} id="name" name='name' aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" onChange={onChange} value={credentials.email} id="email" name='email' aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" onChange={onChange} value={credentials.password} minLength ={5} required id="password" name='password'/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" onChange={onChange} value={credentials.cpassword} minLength ={5} required id="cpassword" name='cpassword'/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
</div>
  )
}

export default Signup