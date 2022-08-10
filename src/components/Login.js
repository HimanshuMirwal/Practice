import React, { useState } from "react";
import { Colors } from "./Constants/Colors";
import LoginSignup from "./Helper/Login_Signup";
const Login = () => {
    const [userEmail, setEmail]=useState("");
    const [userPassword, setPassword]=useState("");
    function CheckEmail(email) {
        setEmail(email)
    }

    function CheckPassword(password) { 
        setPassword(password)
    }
    function Continue() {
       let userData = JSON.parse(localStorage.getItem("User"));
       console.log(userData)
       let check = false;
       userData.map((data)=>{
        if((data.email === userEmail) && (data.password===userPassword)){
            localStorage.setItem("current_user",JSON.stringify({name:data.name, email:data.email, role:data.role, password:data.password, id:data.id, status:data.status}))
            check=true
            window.location.href="http://localhost:3000/";
        }
       })
       if(!check){
        alert("not Found!")
       }
    }
    return (
        <LoginSignup 
            HeadingName="Login"
            Message="Sign in to your account."
            Tags={<><div className="form-group">
                            <label >Email address</label>
                            <input 
                            onChange={(e)=>CheckEmail(e.target.value)}
                            value={userEmail}
                            type="email" className="form-control"  aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label >Password</label>
                            <input 
                            value={userPassword}
                            onChange={(e)=>CheckPassword(e.target.value)}
                            type="password" className="form-control"  placeholder="Password" />
                        </div>
                        <button type="button" 
                        onClick={()=>Continue()}
                        className="btn btn-block" style={{backgroundColor:Colors.Blue,
                        color:Colors.Light}}>Sign In</button>
                        <div className="form-group d-flex justify-content-between align-items-center flex-row ">
                            <a href="/forgot" style={{color:Colors.Blue, textDecoration:"none", marginTop:"10px"}}>Forgot Password</a>
                            <a href="/signup" style={{color:Colors.Blue, textDecoration:"none", marginTop:"10px"}}>Signup Here</a>
                        </div>
                        </>
                        }
        />
    )
}
export default Login