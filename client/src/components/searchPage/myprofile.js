import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLarge } from "@fortawesome/free-solid-svg-icons";

export function Myprofile(){
        let {id} = useParams()
        const[custid,setCustid] = useState('')
        const[name,setName] = useState('')
        const[email,setEmail] = useState('')
        const[number,setNumber] = useState('')

    useEffect(() => {
        fetch("http://localhost:8000/getOne/"+id)
        .then(details => details.json())
        .then((res) => {
            setCustid(id)
            setName(res[0].user_name)
            setEmail(res[0].email)
            setNumber(res[0].phone_number)
        })
    })
    return(
        <>
            <div className="container-fluid profile">
                <div className="card1">
                <h1>My Profile</h1>
                <FontAwesomeIcon className="usericon" icon={faUserLarge} />
                <table>
                    <tbody>
                        <tr>
                            <td>User Name:</td>
                            <td>{name}</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>{email}</td>
                        </tr>
                        <tr>
                            <td>Phone Number:</td>
                            <td>{number}</td>
                        </tr>
                    </tbody>
                </table>
                <Link className="order p-2 mb-3" to={`/tickets/${id}`}>My Orders</Link>
                <Link className="logout p-2 mb-3" to={`/`}>Logout</Link>
                </div>
            </div>
        </>
    );
}