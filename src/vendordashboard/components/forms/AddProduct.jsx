import React, { useRef, useState } from 'react'
import { API_PATH } from '../../helpers/ApiPath'

const AddProduct = () => {
    const [pname,setPname] = useState("")
    const [price,setPrice] = useState("")
    const [cat,setCat] = useState([])
    const file = useRef(null)
    const [bsell,setBsell] = useState(false)
    const [desc,setDesc] = useState("")

    const hc = (e) => {
        const val = e.target.value
        if(cat.includes(val)){
            setCat(cat.filter((v)=>v!==val))
        }else{
            setCat([...cat,val])
        }
    }


    const hb = (e) => {
        const val = e.target.value === 'true';
        setBsell(val)
    }

    const hap = async(e) => {
        e.preventDefault()
        try {
            const proddata = new FormData();
            proddata.append('productname',pname)
            proddata.append('price',price)
            cat.forEach((v)=>{
                proddata.append('category',v)
            })
            proddata.append('bestseller',bsell)
            proddata.append('description',desc)
            proddata.append('image',file)

            const id = localStorage.getItem("firmid")
            if(!id){
                alert("No firm found")
            }
            const response = await fetch(`${API_PATH}product/addproduct/${id}`,{
                method:"POST",
                body:proddata
            })
            const res = await response.json()
            if(response.ok){
                alert("Product added Successfully")
                setPname("")
                setPrice("")
                setCat([])
                file.current.value=null;
                setBsell(false)
                setDesc("")
            }else{
                alert(res)
            }
        } catch (error) {
            console.error(error)
        }
    }



  return (
    <div className='container'>
        <div className="card-wrapper1">
            <div className="card">
                <form className='form' onSubmit={hap}>
                    <h2><strong>ADD PRODUCT</strong></h2>
                    <div className="input-group">
                        <input type="text" placeholder='Product Name' name="Productname" onChange={(e)=>setPname(e.target.value)} value={pname} required />
                    </div>
                    <div className="input-group">
                        <input type="text" placeholder='Price' name="price" onChange={(e)=>setPrice(e.target.value)} value={price} required />
                    </div>
                    <div className="check">
                        Category:&nbsp;&nbsp;&nbsp;&nbsp;veg
                        <label>Veg:<input type="checkbox" name="veg" value="veg" checked={cat.includes("veg")} onChange={hc}/></label>
                        <label>Non-Veg<input type="checkbox" name="non-veg" value="non-veg" checked={cat.includes("non-veg")} onChange={hc}/></label>
                    </div><br /><br />
                    <input type="file" name="image" ref={file}/><br /><br />
                    <div className="check">
                        Best-Seller:&nbsp;&nbsp;&nbsp;&nbsp;
                        <label>Yes:<input type="radio" name="bestseller" value="Yes" onChange={hb} checked={bsell===true}/></label>&nbsp;&nbsp;
                        <label>No:<input type="radio" name="bestseller" value="No" onChange={hb} checked={bsell===false}/></label>&nbsp;&nbsp;
                    </div>
                    <div className="input-group">
                        <input type="text" placeholder='Description' name="offer" onChange={(e)=>setDesc(e.target.value)} value={desc}/>
                    </div>
                    
                    <div className="form-actions">
                        <button type="submit">Add Product</button>
                    </div>
                </form>
            </div>    
        </div>     
    </div>
  )
}

export default AddProduct
