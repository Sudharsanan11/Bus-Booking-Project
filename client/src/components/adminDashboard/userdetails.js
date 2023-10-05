import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export function UserDetails(){
    const[users,setUsers] = useState([])
    useEffect(() => {
        fetch("http://localhost:8000/getAll")
        .then(res => res.json())
        .then(details => setUsers(details))
    },[])
    
    function handleDelete(id){
        var custid = id;

        let deleteDetails = {
            id : custid
        }
        axios.post("http://localhost:8000/deleteUser",deleteDetails)
        .then((res) => {
            if(res.data.status === "error"){
                alert("can't delete the user")
            }
            else if(res.data.status === "success"){
                alert("user deleted successfully");
            }
        })
        
    }
    return(
        <>
            <div className="showuser">
                <h1>User Details</h1>
                <table>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Role</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((value,index) =>(
                                <tr>
                                    <td>{value.user_name}</td>
                                    <td>{value.email}</td>
                                    <td>{value.phone_number}</td>
                                    <td>{value.designation}</td>
                                    <td><Link className="btn btn-success" to={`/updateUserDetails/${value.cust_id}`}>Update</Link></td>
                                    <td><button onClick={() => {handleDelete(value.cust_id)}} className="btn bg-danger">Delete</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}