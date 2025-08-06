import React, { useState } from 'react'
import { API_PATH } from '../../helpers/ApiPath'

const AddFirm = () => {
    const [firmname,setFirmname] = useState("")
    const [area,setArea] = useState("")
    const [category,setCategory] = useState([])
    const [region,setRegion] = useState([])
    const [offer,setOffer] = useState("")
    const [file,setFile] = useState(null)

    const hc = (e) => {
        const val = e.target.value
        if(category.includes(val)){
            setCategory(category.filter((item)=>item!==val))
        }else{
            setCategory([...category, val])
        }
    }


    const hr = (e) => {
        const val = e.target.value
        if(region.includes(val)){
            setRegion(region.filter((i)=>i!=val))
        }else{
            setRegion([...region, val])
        }
        console.log(region)
    }

    const hi = (e) => {
        const i = e.target.files[0]
        setFile(i)
    }


    const hafirm = async(e) => {
        e.preventDefault()
        try {
            const logintoken = localStorage.getItem("loginToken")
            console.log(logintoken)
            if(!logintoken){
                alert("User not authenticated")
            }
            const fd = new FormData();
            fd.append("firmname",firmname)
            category.forEach((v)=> {
                fd.append('category',v)
            }) 
            fd.append("area",area)
            region.forEach((v)=>{
                fd.append('region',v)
            })
            fd.append("offer",offer)
            fd.append('image',file)

            console.log(fd)

            const response = await fetch(`${API_PATH}firm/add-firm`,{
                method:"POST",
                headers:{
                    'token':`${logintoken}`
                },
                body:fd
            })

            const res = await response.json()
            if(response.ok){
                alert("Firm added Successfully")
                const id = res.id
                localStorage.setItem('firmid',id)
                console.log(res)
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
                <form className='form' onSubmit={hafirm}>
                    <h2><strong>ADD FIRM</strong></h2>
                    <div className="input-group">
                        <input type="text" placeholder='Firm Name' name="firmname" value={firmname} onChange={(e)=>setFirmname(e.target.value)} required />
                    </div>
                    <div className="check">
                        Category:&nbsp;&nbsp;&nbsp;&nbsp;
                        <label>Veg:<input type="checkbox" name="category" checked={category.includes('veg')} value="veg" onChange={hc}/></label>
                        <label>Non-Veg<input type="checkbox" name="category" checked={category.includes('non-veg')} value="non-veg" onChange={hc}/></label>
                    </div>
                    <div className="input-group">
                        <input type="text" placeholder='Area' name="area" value={area} onChange={(e)=>setArea(e.target.value)} required />
                    </div>
                    <div className="check">
                        Region:<br /><br />
                        <label>South-Indian:<input type="checkbox" name="region" value="south-indian" checked={region.includes('south-indian')} onChange={hr}/></label>&nbsp;&nbsp;
                        <label>North-Indian:<input type="checkbox" name="region" value="north-india" checked={region.includes('north-india')} onChange={hr}/></label>&nbsp;&nbsp;
                        <label>Chinese:<input type="checkbox" name="region" value="chinese" checked={region.includes('chinese')} onChange={hr}/></label>&nbsp;&nbsp;
                        <label>Bakery:<input type="checkbox" name="region" value="bakery" checked={region.includes('bakery')} onChange={hr}/></label>&nbsp;&nbsp;
                    </div>
                    <div className="input-group">
                        <input type="text" placeholder='Offer in %' name="offer" value={offer} onChange={(e)=>setOffer(e.target.value)}/>
                    </div>
                    <input type="file" name="image" onChange={hi}/><br /><br />
                    <div className="form-actions">
                        <button type="submit">Add Firm</button>
                    </div>
                </form>
            </div>    
        </div>     
    </div>
  )
}

export default AddFirm
