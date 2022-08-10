import React, { useEffect, useState } from "react";
import { Colors } from "../Constants/Colors";
import PopupForm from "../Helper/PopupForm";
const DisplayUser = (props) => {
    const [DisplayModal, setDisplayModal] = useState(false);
    const [EditUSerData, setEditUSerData] = useState("");
    const [Users, setUsers] = useState(JSON.parse(localStorage.getItem("User")));
    console.log("display",Users)
    const current_user = JSON.parse(localStorage.getItem("current_user"));
    function DeleteUser(id){
        const NewData = Users.filter(data=>data.id!==id);
        localStorage.setItem("User",JSON.stringify(NewData))
    }
    function EditDetails(data){
        setEditUSerData(data)
    }
    return (
        <>
            <div style={{ display: DisplayModal ? "block" : "none", }}>

                <PopupForm Form={DisplayModal === "Edit" ? <EditForm data={EditUSerData} setUsers={setUsers}/> : <NewUserForm setUsers={setUsers} />} closeButton={
                    <div class="form-group d-flex justify-content-center align-items-center flex-row ">
                        <label onClick={() => {
                            setDisplayModal(false)
                        }} style={{ color: Colors.Blue, textDecoration: "none", marginTop: "10px" }}>Close</label>
                    </div>
                } />
            </div>
            <div style={{ overflow: "scroll", width: "100%", padding: "2%",marginBottom: "70px" }}>
                <table class="table" >
                    <thead>
                        <tr>
                            <th colSpan={(current_user.role === "admin")?4:3}>
                                <label style={{ fontSize: "20px", fontWeight: "bold", color: Colors.Black }}>User Access</label>
                            </th>
                            <th>
                                <button
                                    onClick={() => {
                                        setDisplayModal("New User");
                                    }}
                                    type="button" className="btn float-right" style={{ backgroundColor: Colors.Blue, color: Colors.Light }} >+ New User</button>
                            </th>
                        </tr>
                        <tr>
                            <th scope="col">UserName</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Status</th>
                            {(current_user.role === "admin")?<th scope="col">Action</th>:""}
                        </tr>
                    </thead>
                    <tbody>
                        {Users.map(data => {
                            if (current_user.role === "admin") {
                                return <tr>
                                    <th scope="row">{data.name}</th>
                                    <td>{data.email}</td>
                                    <td>{data.role}</td>
                                    <td>{data.status}</td>
                                    <td>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}>
                                            <button type="button" onClick={() => {
                                                setDisplayModal("Edit");
                                                EditDetails(data)
                                            }} className="btn btn-outline-primary " style={{ marginRight: "10px" }}>Edit</button>
                                            <button 
                                            onClick={()=>{
                                                DeleteUser(data.id)
                                                window.location.href="http://localhost:3000"
                                            }}  
                                            type="submit" className="btn btn-outline-danger">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            } else {
                                return <tr>
                                    <th scope="row">{data.name}</th>
                                    <td>{data.email}</td>
                                    <td>{data.role}</td>
                                    <td>{data.status}</td>
                                </tr>
                            }

                        })}

                    </tbody>
                </table>
            </div>
        </>
    )
}
const EditForm = (props)=>{
    const [userName, setName] = useState(props.data.name);
    const [userEmail, setEmail] = useState(props.data.email);
    const [userPassword, setPassword] = useState(props.data.password);
    const [error, setError] = useState({ email: true, name: true, password: true })
    const [userRole, setUserRole] = useState(props.data.role);
    function CheckName(name) {
        setName(name)
        if (/^[a-zA-Z ]+$/.test(userName)) {
            setError({ ...error, name: true })
        } else {
            setError({ ...error, name: false })
        }
    }
    function CheckEmail(email) {
        setEmail(email)
        const Check = userEmail.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (Check) {
            setError({ ...error, email: true })
        } else {
            setError({ ...error, email: false })
        }
    }

    function CheckPassword(password) {
        setPassword(password)
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (re.test(userPassword)) {
            setError({ ...error, password: true })
        } else {
            setError({ ...error, password: false })
        }
    }
    
    function Continue() {
        let LocalData = JSON.parse(localStorage.getItem("User")) ? JSON.parse(localStorage.getItem("User")) : []
        
        if (error.name && error.email && error.password) {
            let User = {
                id: props.data.id,
                name: userName,
                password: userPassword,
                email: userEmail,
                role: userRole,
                status: props.data.status
            }
            console.log(User)
            let NewUsers=LocalData.map(data=>{
                if(data.id===User.id){
                    return User
                }
                return data
            })
            // console.log(NewUsers)
            localStorage.setItem("User", (JSON.stringify(NewUsers)))
            props.setUsers(JSON.parse(localStorage.getItem("User")));
            console.log(JSON.parse(localStorage.getItem("User")))
            alert("Detail Updated");
            setEmail("");
            setError({ email: false, name: false, password: false })
            setName("")
            setPassword("")
            setUserRole("user")
        } else {
            alert("please Check the Details you entered.")
        }
    }
    
return <>
    <div className="form-group">
        <h3 >Edit Details</h3>
        <label >Enter your name</label>
        <input type="email" value={userName} onChange={(e) => CheckName(e.target.value)} className="form-control" aria-describedby="emailHelp" placeholder="Enter Name" />
    </div>
    <div class="form-group">
        <label >Email address</label>
        <input type="email" value={userEmail} onChange={(e) => CheckEmail(e.target.value)} className="form-control" aria-describedby="emailHelp" placeholder="Enter email" />
    </div>
    <div class="form-group">
        <label>Password</label>
        <input type="password" value={userPassword} onChange={(e) => CheckPassword(e.target.value)} className="form-control" placeholder="Password" />
    </div>
    <div class="form-group">
        <label>Role</label>
        <select class="custom-select" value={userRole} onChange={(e) =>{
            setUserRole(e.target.value)
        }} id="inputGroupSelect01">
            <option value="Admin" >Admin</option>
            <option value="User">User</option>
        </select>
    </div>
    <button type="button"
    onClick={()=>{
        Continue()
    }}
     className="btn btn-block" style={{
        backgroundColor: Colors.Blue,
        color: Colors.Light
    }}>Continue</button>
</>}


const NewUserForm = (props) => {
    const [userName, setName] = useState("");
    const [userEmail, setEmail] = useState("");
    const [userPassword, setPassword] = useState("");
    const [error, setError] = useState({ email: false, name: false, password: false })
    const [userRole, setUserRole] = useState("user");
    function CheckName(name) {
        setName(name)
        if (/^[a-zA-Z ]+$/.test(userName)) {
            setError({ ...error, name: true })
        } else {
            setError({ ...error, name: false })
        }
    }
    function CheckEmail(email) {
        setEmail(email)
        const Check = userEmail.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (Check) {
            setError({ ...error, email: true })
        } else {
            setError({ ...error, email: false })
        }
    }

    function CheckPassword(password) {
        setPassword(password)
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (re.test(userPassword)) {
            setError({ ...error, password: true })
        } else {
            setError({ ...error, password: false })
        }
    }
    function Continue() {
        let NewUsers = JSON.parse(localStorage.getItem("User")) ? JSON.parse(localStorage.getItem("User")) : []
        if (error.name && error.email && error.password) {
            NewUsers.push({
                id: (Math.random() * 1000),
                name: userName,
                password: userPassword,
                email: userEmail,
                role: userRole,
                status: "invitation"
            })
            localStorage.setItem("User", (JSON.stringify(NewUsers)))
            props.setUsers(JSON.parse(localStorage.getItem("User")));
            console.log(JSON.parse(localStorage.getItem("User")))
            alert("Account Created");
            setEmail("");
            setError({ email: false, name: false, password: false })
            setName("")
            setPassword("")
            setUserRole("user")
            window.location.href="http://localhost:3000/"
        } else {
            alert("please Check the Details you entered.")
        }
    }
    return <>
        <div className="form-group">
            <h3 >Add user</h3>
            <label >Enter your name</label>
            <input type="email" onChange={(e) => CheckName(e.target.value)} value={userName} className="form-control" aria-describedby="emailHelp" placeholder="Enter Name" />
        </div>
        <div class="form-group">
            <label >Email address</label>
            <input type="email" onChange={(e) => CheckEmail(e.target.value)} value={userEmail} className="form-control" aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" onChange={(e) => CheckPassword(e.target.value)} value={userPassword} className="form-control" placeholder="Password" />
        </div>
        <div class="form-group">
            <label>Status</label>
            <select class="custom-select" value={userRole} onChange={(e) => setUserRole(e.target.value)} id="inputGroupSelect01">
                <option value="User">User</option>
                <option value="Admin">Admin</option>
            </select>
        </div>
        <button type="submit" className="btn btn-block" style={{
            backgroundColor: Colors.Blue,
            color: Colors.Light
        }}
            onClick={() => Continue()}>Continue</button>

    </>
}
export default DisplayUser;