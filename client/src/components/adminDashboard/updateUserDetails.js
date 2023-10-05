import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'

export function UpdateUserDetails(){
    var {id} = useParams()
    const[username,setUsername] = useState('')
    const[email,setEmail] = useState('')
    const[phonenumber,setPhonenumber] = useState('')
    const[password,setPassword] = useState('')
    const[role,setRole] = useState('')
    useEffect(() => {
        fetch("http://localhost:8000/getOne/"+id)
        .then(data => data.json())
        .then((res) => {
            setUsername(res[0].user_name)
            setEmail(res[0].email)
            setPhonenumber(res[0].phone_number)
            setPassword(res[0].password)
            setRole(res[0].designation)
        })
    },[])
    function updateUser(){
        var username = document.getElementById("username").value
        var email = document.getElementById("email").value
        var phonenumber = document.getElementById("phonenumber").value
        var password = document.getElementById("password").value
        var role = document.getElementById("role").value

        let updatedata = {
            username : username,
            email : email,
            phonenumber : phonenumber,
            password : password,
            role :role
        }

        axios.post("http://localhost:8000/update/"+id,updatedata)
        .then((res) => {
            if(res.data.status === "error"){
                alert("datas are not updated");
            }
            else if(res.data.status === "success"){
                alert("datas are updated");
            }
        })
    }
    return(
        <>
            <div className="userupdate">
                <h1>Update User</h1>
                <input type="text" className="mb-3 ps-3 p-2" id="username" onChange={(updateData) => {setUsername(updateData.target.value)}} value={username}/>
                <input type="text" className="mb-3 ps-3 p-2" id="email" onChange={(updateData) => {setEmail(updateData.target.value)}} value={email}/>
                <input type="text" className="mb-3 ps-3 p-2" id="phonenumber" onChange={(updateData) => {setPhonenumber(updateData.target.value)}} value={phonenumber}/>
                <input type="text" className="mb-3 ps-3 p-2" id="password" onChange={(updateData) => {setPassword(updateData.target.value)}} value={password}/>
                <select id="role" className="mb-3 ps-3 p-2" onChange={(updateData) => {setRole(updateData.target.value)}} value={role}>
                    <option>Select Option</option>
                    <option value='Admin'>Admin</option>
                    <option value='Customer'>Customer</option>
                </select>
                <button className="updatebtn mb-3 ps-3 p-2" onClick={updateUser}>Update</button>
            </div>
        </>
    );
}