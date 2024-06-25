import React, { useState } from 'react'
import axios from 'axios'

const Resgister = () => {
    const [formData,setFormData] = useState({
        "username":"",
        "image":null,
    })

    const OnChangeForm = (e) =>{
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData((prev) => ({
                ...prev,
                [name]: files[0]
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
        console.log(formData);
    }

    const SubmitForm = async(e) =>{
        e.preventDefault();
        const config = {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
        const res = await axios.post("http://localhost:3000/registration",formData,config)
        if(res.data.status === 401 || !res.data.status )
            {
                alert("Image Not uploaded Try again")
            }
        else{
            history.back()
        }
        
        setFormData({
            "username":"",
            "image":null,
        })
    }

  return (
    <div className='flex justify-center items-center h-[80vh]'>
        <form action="" className='w-[40%] m-auto flex justify-center flex-col gap-5 items-center' method='POST' onSubmit={SubmitForm}>
        <h1 className='text-[30px]'>Upload Image Form : </h1>
        <label htmlFor="" className='text-[18px] text-zinc-500'>
            Username :
            <input type="text" className='w-full border-[2px] border-[black] mt-4'
            name='username' onChange={OnChangeForm} value={formData.username}/>
        </label>
        <label htmlFor="" className='text-[18px] text-zinc-500'>
            Image :
            <input type="file" name="image" id="" className='w-full mt-4 text-[14px]' accept="image/png, image/jpeg" onChange={OnChangeForm} />
        </label>
        <button className='rounded-[10px] bg-blue-500 text-white px-5 py-2 w-[50%] m-auto'>Submit</button>
        </form>
    </div>
  )
}

export default Resgister