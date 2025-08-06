import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { mail, eye, eyeOff } from 'ionicons/icons';
import {API_PATH} from '../../helpers/ApiPath'

const Login = ({sr,setLogout}) => {

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const [username,setUsername] = useState("")
  const [pass,setPass] = useState("")

  const handlelogin = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_PATH}vendor/login`,{
        method:'POST',
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify({username, password:pass})
      });
      const res = await response.json();
      if(response.ok){
        console.log(res)
        alert("Login Successfull")
        localStorage.setItem('loginToken',res.token)
        localStorage.setItem('vendorid',res.id)
        setUsername("")
        setPass("")
        setLogout(true)
      }else{
        console.log(res)
        alert(res)
      }
    } catch (error) {
      if(error instanceof TypeError && error.message == "Failed to fetch"){
        alert("Server is down or backend server not yet started")
      }
      console.error(error)
    }
  }

  return (
    <div className="container">
      <div className="card-wrapper">
        <div className="card">
          <h2><strong>LOGIN</strong></h2>
          <form className="form" onSubmit={handlelogin}>
            <div className="input-group">
              <span className="input-icon1">
                <IonIcon icon={mail} />
              </span>
              <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} name="username" placeholder="Username" required />
            </div>

            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={pass}
                onChange={(e)=>setPass(e.target.value)}
                placeholder="Password"
                required
              />
              <span className="input-icon" onClick={togglePassword} style={{ cursor: 'pointer' }}>
                <IonIcon icon={showPassword ? eyeOff : eye} />
              </span>
            </div>

            <div className="form-actions">
              <button type="submit">Login</button>
              <a className='button'>Forgot Password?</a>
            </div>

            <div className="register-link">
              <p>I don`t have an account - <a className='button' onClick={sr}>Register</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
