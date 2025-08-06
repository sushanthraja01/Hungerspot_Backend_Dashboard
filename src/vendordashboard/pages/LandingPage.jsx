import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Login from '../components/forms/Login'
import Slidebar from '../components/Slidebar'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import AllProducts from '../components/AllProducts'

const LandingPage = () => {
  const [login,setLogin] = useState(false)
  const [reg,setReg] = useState(false)
  const [firm,setFirm] = useState(false)
  const [afirm,setAfirm] = useState(false)
  const [sp,setSp] = useState(false)
  const [logout,setLogout] = useState(false)

  useEffect(()=>{
    const lt = localStorage.getItem("loginToken")
    console.log(lt)
      if(lt){
        setLogout(true)
      }
  },[])

  const hl = () => {
    if(confirm("Are you sure to logout")){
      localStorage.removeItem("firmid")
    localStorage.removeItem("loginToken")
    localStorage.removeItem("vendorid")
    setLogout(false)
    }
  }
 


  const slogin = () => {
    setAfirm(false)
    setReg(false)
    setFirm(false)
    setSp(false)
    setLogin(true)
  }

  const sregister = () => {
    setAfirm(false)
    setLogin(false)
    setFirm(false)
    setSp(false)
    setReg(true)
  }

  const sf = () => {
    setAfirm(false)
    setReg(false)
    setLogin(false)
    setSp(false)
    setFirm(true)
  }

  const sap = () => {
    setReg(false)
    setLogin(false)
    setFirm(false)
    setSp(false)
    setAfirm(true)
  }

  const sprods = () => {
    setAfirm(false)
    setReg(false)
    setFirm(false)
    setLogin(false)
    setSp(true)
  }

  return (
    <div>
      <Navbar sl = {slogin} sr={sregister} l={logout} slogout={hl}/>
      <div className='collection'>
        <Slidebar sf={sf} sap={sap} sprods={sprods}/>
        {login&&<Login sr={sregister} setLogout={setLogout}/>}
        {reg&&<Register sl = {slogin}/>}
        {firm&&<AddFirm />}
        {afirm&&<AddProduct />}
        {sp&&<AllProducts />}
      </div>
    </div>
  )
}

export default LandingPage
