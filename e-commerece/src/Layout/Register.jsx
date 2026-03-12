import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
const Register = () => {

    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState();
    const[number, setNumber] = useState();
    const [password, setPassword] = useState();

    const handleRegister= async (e)=>{
        e.preventDefault();
        console.log("FullName ======>", fullName)
        console.log("Email ======>", email)
        console.log("Number ======>", number)
        console.log("Password ======>", password)
        try{
                const {data} = await axios.post("http://localhost:3000/register",
                    {
                        fullName, email, password, number
                    }
                )
                console.log(data)
                toast(data.message)
                setFullName('')
                setEmail('')
                setPassword('')
                setNumber('')
        }
        catch(err){
                alert(err.response.data.message)
        }
    }

    return (
        <>
        <ToastContainer/>
            <div className="container">
                <div className="row justify-content-center" style={{ padding: "50px" }}>
                    <div className="col-4" style={{ padding: "50px", border: "1px solid", borderRadius: "20px" }}>
                        <h1 className='text-center'>Register Page</h1>
                        <form onSubmit={handleRegister}>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Full Name</label>
                                <input type="text" value={fullName} className="form-control" onChange={(e) => setFullName(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required/>

                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Phone No.</label>
                                <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" required/>
                            </div>


                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register