import React from 'react'

const Navbar = ({sl,l,slogout}) => {
        console.log(l)
  return (
    <div className='navsection'>
      <div className='company'>
        vendor dashboard
      </div>
      <div className='userauth'>
        {!l?<span onClick={sl} className='button'>Login</span>:<span onClick={slogout} className='button'>Logout</span>}
      </div>
    </div>
  )
}

export default Navbar
