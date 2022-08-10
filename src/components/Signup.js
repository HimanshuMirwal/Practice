import React, { useState } from "react";
import { Colors } from "./Constants/Colors";
import { Users } from "./Constants/Users";
import LoginSignup from "./Helper/Login_Signup";

const Signup = () =>{
    const [userName, setName]=useState("");
    const [userEmail, setEmail]=useState("");
    const [userPassword, setPassword]=useState("");
    const [error, setError] = useState({email:false,name:false,password:false})
    function CheckName(name){
        setName(name)
       if( /^[a-zA-Z ]+$/.test( userName)){
            setError({...error, name:true})
       }else{
        setError({...error, name:false})
       }
    }
    function CheckEmail(email) {
        setEmail(email)
        const Check = userEmail.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if(Check){
            setError({...error, email:true})
        }else{
            setError({...error, email:false})
        }
    }

    function CheckPassword(password) { 
        setPassword(password)
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if(re.test(userPassword)){
            setError({...error,password:true})
        }else{
            setError({...error,password:false})
        }
    }
    function Continue() {
        let NewUsers=JSON.parse(localStorage.getItem("User"))?JSON.parse(localStorage.getItem("User")):Users
        if(error.name && error.email && error.password){
            NewUsers.push({
                id:(Math.random()*1000),
                name:userName, 
                password:userPassword,
                email:userEmail,
                role:"user",
                status:"registration"
            })
            localStorage.setItem("User",(JSON.stringify(NewUsers)))
            console.log(JSON.parse(localStorage.getItem("User")))
            alert("Account Created")
            window.location.href="http://localhost:3000/login"
        }else{
            alert("please Check the Details you entered.")
        }
    }
    return (
        
        <LoginSignup 
            HeadingName="Sign up"
            Message="Enter Your Detail."
            Tags={<>
            <div className="form-group">
                            <label >Enter your name</label>
                            <input 
                            onChange={(e)=>CheckName(e.target.value)}
                            type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter Name" />
                        </div>
                        <div className="form-group">
                            <label >Email address</label>
                            <input 
                            onChange={(e)=>CheckEmail(e.target.value)}
                            type="email" className="form-control"  aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input 
                            onChange={(e)=>CheckPassword(e.target.value)}
                            type="password" className="form-control"  placeholder="Password" />
                        </div>
                        <button 
                        onClick={()=>Continue()}
                        type="button" className="btn btn-block" style={{backgroundColor:Colors.Blue,
                        color:Colors.Light}}>Continue</button>
                        <div className="form-group d-flex justify-content-center align-items-center flex-row ">
                            <a href="/login" style={{color:Colors.Blue, textDecoration:"none", marginTop:"10px"}}>Login Here</a>
                        </div></>}
        />
    )
}
export default Signup;