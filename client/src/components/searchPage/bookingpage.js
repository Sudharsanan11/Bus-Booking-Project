import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export function Bookingpage(){
    let {sno} = useParams()
    const[busname,setBusname] = useState('')
    const[source,setSource] = useState('')
    const[dest,setDest] = useState('')
    const[bustype,setBustype] = useState('')
    const[fare,setFare] = useState('')
    useEffect(() => {
        fetch("http://localhost:8000/getbooking/"+sno)
        .then(data => data.json())
        .then((res) => {
            setBusname(res[0].bus_name)
            setSource(res[0].onboard_point)
            setDest(res[0].dest_point)
            setBustype(res[0].bus_type)
            setFare(res[0].bus_fare)
        })
    })
    function handlebook(){
        var ticket = document.getElementById('ticket').value
        var gender = document.getElementById('gender').value

        var b = localStorage.getItem("search")
            var c = JSON.parse(b);
        console.log(c.id);
        var id = c["id"];

        let ticketdetails = {
            ticket : ticket,
            gender : gender,
            id : id
        }
        axios.post("http://localhost:8000/bookticket/"+sno,ticketdetails)
        .then((res) => {
            if(res.data.status === "error"){
                alert("error")
            }
            else if(res.data.status === "error1"){
                alert("error1")
            }
            else if(res.data.status === "error2"){
                alert("error2")
            }
            else if(res.data.status === "success"){
                alert("Ticket Booked Successfully")
                window.location.href = `/searchPage/${id}`
            }
        })
    }
    return(
        <>
            <div className="booking">
                <table>
                    <tbody>
                        <tr>
                            <td>Bus Name</td>
                            <td><p>{busname}</p></td>
                        </tr>
                        <tr>
                            <td>From</td>
                            <td><p>{source}</p></td>
                        </tr>
                        <tr>
                            <td>To</td>
                            <td><p>{dest}</p></td>
                        </tr>
                        <tr>
                            <td>Bus Type:</td>
                            <td><p>{bustype}</p></td>
                        </tr>
                        <tr>
                            <td>Bus Fare</td>
                            <td><p>{fare}</p></td>
                        </tr>
                    
                        <tr>
                            <td>Ticket</td>
                            <td><input type="number" id="ticket" placeholder="Enter Ticket Count"/><br/></td>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <td><select id="gender">
                            <option>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select></td>
                        </tr>
                        <button className="bookbtn p-2 pe-3" onClick={handlebook}>Book Ticket</button>
                </tbody>
                </table>
            </div>
        </>
    );
}