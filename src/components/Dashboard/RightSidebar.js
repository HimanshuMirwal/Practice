import React from "react";
import { Colors } from "../Constants/Colors";
import { Title } from "../Constants/SideBarListItem";
import DisplayUser from "./DisplayUser";
const RightSidebar = (props) => {
    const UserData = JSON.parse(localStorage.getItem("User"))
    return (<div style={{
        height: "100%",
        width: "70%",
        backgroundColor: `${Colors.Light}`,
        display: "flex",
        flexDirection: "row"
    }}>
        {props.activeLink !== Title.TotalUser ? <DisplayUser /> :
            <><ListElement message="All users" color={Colors.Blue} count={UserData.length} />
                <ListElement message="Total Admin" color={"orange"} count={(UserData.filter(data=>data.role==="admin")).length} />
                <ListElement message="Total Users" color={"#F94C66"} count={(UserData.filter(data=>data.role!=="admin")).length} /></>
        }
    </div>)
}
const ListElement = (props) => {
    return (
        <div style={{
            height: "100px",
            width: "250px",
            background: `${props.color}`,
            color: Colors.Light,
            borderRadius: "10px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            margin: "5px",
        }}>
            <i className="fa fa-user" style={{ fontSize: "50px", margin: "auto 10px" }}></i>
            <div style={{
                display: "flex",
                flexDirection: "column",
                width: "100%"
            }}>
                <label style={{ fontSize: "15px", fontWeight: "bold" }}>{props.message}</label>
                <div style={{
                    padding: "5px",
                    fontWeight: "bold",
                    fontSize: "20px",
                }}>
                    <label style={{
                    }}>{props.count}</label>
                </div>
            </div>
        </div>
    )
}

export default RightSidebar