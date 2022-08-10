import React, { useReducer, useState } from "react";
import { Colors } from "../Constants/Colors";
import LogoIcon from "../LogoIcon/LogoIcon";
import PopupForm from "./PopupForm";

const TopNavbar = () => {
    const [display, setDisplay] = useState(false);
    const UserData = JSON.parse(localStorage.getItem("current_user"))
    return (
        <>
            <div style={{ display: display ? "block" : "none" }}>
                <PopupForm Form={<Form name={UserData.name} email={UserData.email} />} navbar={true} />
            </div>
            <div style={{
                height: "100px",
                width: "100%",
                position: "fixed",
                boxShadow: "0 0 5px 0 black",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "2%",
            }}
            >
                <LogoIcon />

                <div style={{
                    height: "50px",
                    width: "200px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    borderRadius: "35px",
                    border: `2px solid ${Colors.Blue}`

                }}
                    onClick={() => setDisplay(!display)}>
                    <img style={{ height: "30px", width: "30px", borderRadius: "15px" }}
                        src="data:image/jpeg;base64,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"
                        alt="profile" />
                    {!display ? <label style={{ color: Colors.Black, fontSize: "15px", fontWeight: "bold" }}>
                        {UserData.name.substring(0, 15)}</label> : <i className="fa fa-times" style={{ color: Colors.Blue, fontSize: "20px", fontWeight: "400" }} ></i>}
                </div>
            </div>
        </>
    )
}

const Form = (props) => {
    const [Name, setName] = useState({ name: props.name, Clicked: false })
    const [Email, setEmail] = useState({ email: props.email, Clicked: false })
    function CheckName(data) {
        if (data.key === "Enter") {
            if (/^[a-zA-Z ]+$/.test(Name.name)) {
                let LocalData = JSON.parse(localStorage.getItem("User")) ? JSON.parse(localStorage.getItem("User")) : []
                let current_user = JSON.parse(localStorage.getItem("current_user"));    
                let User = {
                        id: current_user.id,
                        name: Name.name,
                        password: current_user.password,
                        email: current_user.email,
                        role: current_user.role,
                        status: current_user.status
                    }
                    console.log(User)
                    let NewUsers = LocalData.map(data => {
                        if (data.id === User.id) {
                            return User
                        }
                        return data
                    })
                    console.log(NewUsers)
                    localStorage.setItem("User", (JSON.stringify(NewUsers)))
                    localStorage.setItem("current_user",(JSON.stringify(User)))
                    alert("Detail Updated");
                    window.location.href="http://localhost:3000/"
            }else {
                alert("please enter correct name.")
            }
        }
    }
        function CheckEmail(data) {
            if (data.key === "Enter") {
                const Check = (Email.email).match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                if (Check) {
                    if (data.key === "Enter") {
                        if (/^[a-zA-Z ]+$/.test(Name.name)) {
                            let LocalData = JSON.parse(localStorage.getItem("User")) ? JSON.parse(localStorage.getItem("User")) : []
                            let current_user = JSON.parse(localStorage.getItem("current_user"));    
                            let User = {
                                    id: current_user.id,
                                    name: current_user.name,
                                    password: current_user.password,
                                    email: Email.email,
                                    role: current_user.role,
                                    status: current_user.status
                                }
                                console.log(User)
                                let NewUsers = LocalData.map(data => {
                                    if (data.id === User.id) {
                                        return User
                                    }
                                    return data
                                })
                                console.log(NewUsers)
                                localStorage.setItem("User", (JSON.stringify(NewUsers)))
                                localStorage.setItem("current_user",(JSON.stringify(User)))
                                alert("Detail Updated");
                                window.location.href="http://localhost:3000/"
                        }
                    }
                } else {
                    alert("Please enter correct email.")
                }
            }
        }
        return <div style={{ width: "100%" }}>
            <div style={{ width: "100%", height: "auto" }}>
                <div style={{ height: "150px", width: "100%" }}>
                    <div style={{
                        backgroundColor: "#3330e4",
                        backgroundImage: "url(https://www.transparenttextures.com/patterns/gplay.png)",
                        height: "100px",
                        width: "100%"
                    }}>
                        <div style={{
                            height: "auto",
                            width: "auto",
                            /* position: absolute; */
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                            zIndex: "+10",
                            marginTop: "0px",
                        }}>
                            <img
                                style={{
                                    height: "100px",
                                    width: "100px",
                                    marginTop: "50px",
                                    borderRadius: "50px"
                                }}
                                src="data:image/jpeg;base64,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"
                                alt="user" />
                        </div>
                    </div>
                </div>
                <div style={{
                    height: "auto",
                    width: "auto", padding: "10px"
                }}>
                    <h6 style={{ color: Colors.Blue }}>Profile</h6>
                    <label style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "gray"
                    }}>User Name</label>

                    <div style={{
                        display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", fontSize: "20px",
                    }}>{Name.Clicked ? <input type="text" className="form-control" value={Name.name}
                        onChange={(e) => {
                            setName({ ...Name, name: e.target.value })
                        }}
                        onKeyDown={(e) => CheckName(e)}
                    /> : <h6>{props.name}</h6>}
                        <i className={Name.Clicked ? "fa fa-times" : "fa fa-pencil"}
                            onClick={() => setName({ ...Name, Clicked: !Name.Clicked })}></i>
                    </div>
                    <hr />
                    <label style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "gray"
                    }}>Email</label>
                    <div style={{
                        display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", fontSize: "20px",
                    }}>{Email.Clicked ? <input type="email" className="form-control" value={Email.email}
                        onChange={(e) => {
                            setEmail({ ...Email, email: e.target.value })
                        }}
                        onKeyDown={(e) => CheckEmail(e)}
                    /> : <h6>{props.email}</h6>}
                        <i className={Email.Clicked ? "fa fa-times" : "fa fa-pencil"} onClick={() => setEmail({ ...Email, Clicked: !Email.Clicked })}></i>
                    </div>
                    <hr />
                    <div
                        style={{
                            display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", fontSize: "20px",
                            fontWeight: "500"
                        }}>
                        <i className="fa fa-sign-out mr-2"></i>
                        <label onClick={() => {
                            localStorage.removeItem("current_user");
                            window.location.href = "http://localhost:3000/login"
                        }}>Logout</label>
                    </div>

                </div>
            </div>
        </div>
    }

    export default TopNavbar;