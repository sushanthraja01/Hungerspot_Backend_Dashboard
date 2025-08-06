import React from 'react'

const Slidebar = ({sf,sap,sprods}) => {
  return (
    <div className='slidebar'>
      <ul>
        <li onClick={sf}>Add Firm</li>
        <li onClick={sap}>Add Products</li>
        <li onClick={sprods}>All Products</li>
        <li>User-Details</li>
      </ul>
    </div>
  )
}

export default Slidebar
