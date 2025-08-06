import React, { useState } from 'react'
import {IonIcon} from '@ionic/react'
import {mail, person, eye, eyeOff} from 'ionicons/icons'
import { API_PATH } from '../../helpers/ApiPath'

const Register = ({sl}) => {
  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [spass,setSpass] = useState(false)
  const [error,setError] = useState("")

  const handleSubmit = async(e)=> {
    e.preventDefault()
    try {
      const response = await fetch(`${API_PATH}vendor/register`,{
        method:'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({username,email,password})
      })
      const res = await response.json();
      if(response.ok){
        console.log(res)
        alert("Vendor Registetred Successfully")
        setEmail("")
        setUsername("")
        setPassword("")
        sl();
      }
      else{
        console.log(res)
        alert(res)
      }
    } catch (error) {
      console.error(error)
      alert("Error Registration")
    }
  }

  const sp = () => {
    setSpass(!spass)
  }

  return (
    <div className='container'>
      <div className="card-wrapper">
        <div className="card">
          <form className="form" onSubmit={handleSubmit}>
            <h2><strong>Register</strong></h2>
            <div className="input-group">
              <div className="input-icon1"><span><IonIcon icon={person} /></span></div>
              <input type="text" onChange={(e)=>setUsername(e.target.value)} name="username" value={username} placeholder='Username' required/>
            </div>
            <div className="input-group">
              <div className="input-icon1"><span><IonIcon icon={mail} /></span></div>
              <input type="email" onChange={(e)=>setEmail(e.target.value)} name="email" value={email} placeholder='Email' required/>
            </div>
            <div className="input-group">
              <div className="input-icon"><span><IonIcon onClick={sp} icon={spass?eyeOff:eye} /></span></div>
              <input type={spass?"text":"password"} onChange={(e)=>setPassword(e.target.value)} name="password" value={password} placeholder='password' />
            </div>
            <div className="form-actions">
              <button type='submit'>Register</button>
            </div>
            <div className="register-link">
              <p>Already have an account - <a className='button' onClick={sl}>Login</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
