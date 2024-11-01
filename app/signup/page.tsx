"use client"
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from '@/src/hooks/use-toast'
const Signup = () => {
    const router = useRouter();
    const [data,setData] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        pin: ""
    })
    const HandleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setData({...data, [e.target.name]:e.target.value})
    }
    const HandleSubmit =async (e: React.FormEvent)=>{
        e.preventDefault();
        try {
            const response =await axios.post("https://paymentbackend.vasprojects.com/api/signup",data);
            if (response.status === 201) {
                toast({
                  title: "Success",
                  description: "User created succesfully!. Go ahead and signin!",
                  className:  "bg-black text-stone-200 p-2 rounded-md m-2 fixed bottom-4 right-4 w-auto max-w-xs shadow-lg",
                });
                router.push("/signin");
              }
            console.log(response);
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='flex h-screen flex-col md:flex-row bg-green-50'>
    <div className="flex flex-1 justify-center items-center border-2">
        <img className='rounded-2xl shadow-md' src="https://i.pinimg.com/564x/c9/4d/57/c94d57ef1a4a3a8dd0b9cd2392a0cc6f.jpg" alt="payment-img"/>
      </div>
    <div className='flex flex-1 w-full h-screen justify-center items-center'>
        <div className='flex p-2  w-[400px] h-[380px] flex-col border-2 shadow-md rounded-md bg-stone-50 '>
        <h1 className='text-4xl flex justify-center items-center'>Signup</h1>
        <form className='flex flex-col justify-between p-2 gap-2'   onSubmit={HandleSubmit}>
            <input className='py-2 border-b-2 outline-none focus: ring-0 focus:border-slate-600  ' name='name' value={data.name} type="text" placeholder='Name' onChange={HandleChange} />
            <input className='py-2 border-b-2 outline-none focus: ring-0 focus:border-slate-600 ' name='phone' value={data.phone} type="phone" placeholder='Phone' onChange={HandleChange} />
            <input className='py-2 border-b-2 outline-none focus: ring-0 focus:border-slate-600 ' name='email' value={data.email} type="email" placeholder='Email' onChange={HandleChange}/>
            <input className='py-2 border-b-2 outline-none focus: ring-0 focus:border-slate-600 ' name='password' value={data.password} type="password" placeholder='Password' onChange={HandleChange} />
            <input className='py-2 border-b-2 outline-none focus: ring-0 focus:border-slate-600 ' name='pin' value={data.pin} type="text" placeholder='Enter a 4 digit pin for transactions' onChange={HandleChange} />
            <button className='px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-800' type='submit' >Submit</button>
        </form>
        </div>
        
    </div>
    </div>
  )
}


export default Signup;