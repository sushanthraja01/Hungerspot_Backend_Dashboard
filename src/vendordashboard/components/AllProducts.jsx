import React, { useEffect, useState } from 'react'
import { API_PATH } from '../helpers/ApiPath'

const AllProducts = () => {
    const [prods,setProds] = useState([])
    const [flag,setFlag] = useState(true)
    const hsp = async() => {
        try {
            const id = localStorage.getItem('firmid')
            const response = await fetch(`${API_PATH}product/productsbyfirm/${id}`);
              const res = await response.json()
              setProds(res)
              console.log(res)
              if(res == "No products"){
                setFlag(false)
              }
        } catch (error) {
            console.error(error)
        }
    }

    const dp = async(id) => {
      if(confirm("Are you sure you want to delete")){
        try {
        const response = await fetch(`${API_PATH}product/${id}`,{
          method:"DELETE"
        })
        if(response.ok){
          setProds(prods.filter(p => p._id !== id))
          alert("Product Deleted Successfully")
        }
      } catch (error) {
        console.error(error)
      }
      }
      
    }
    
    useEffect(()=>{
        hsp()
    },[])

  return (
    <div className='container1'>
  <div className="table-scroll">
    <table border="1" className='pt'>
      <thead className="bg-orange-500 text-white">
        <tr>
          <th>Product Name</th>
          <th>Image</th>
          <th>Price</th>
          <th>Description</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {flag && prods.map((i) => (
          <tr key={i._id}>
            <td>{i.productname}</td>
            <td><img src={`${API_PATH}uploads/${i.image}`} alt={i.productname} /></td>
            <td>{i.price}</td>
            <td>{i.description}</td>
            <td><button onClick={() => dp(i._id)}>DELETE</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  )
}

export default AllProducts
