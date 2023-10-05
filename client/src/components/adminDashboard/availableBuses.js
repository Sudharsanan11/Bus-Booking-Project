import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function AvailableBuses(){
    const[data,setData] = useState([])
    useEffect(() => {
        fetch("http://localhost:8000/availableBuses")
        .then(res => res.json())
        .then(details => setData(details))
    },[])

    function handleremove(id){
        var sno = id;

        let deletedetails = {
            id : sno
        }

        axios.post("http://localhost:8000/removeBus",deletedetails)
        .then((res) => {
            if(res.data.status === "error"){
                alert("error")
            }
            else if(res.data.status === "success"){
                alert("success")
            }
        })
    }
    return(
        <>
            <div className="availablebus">
                <h1>Available Buses</h1>
                <table>
                    <thead>
                        <th>Bus id</th>
                        <th>Bus Name</th>
                        <th>Bus Number</th>
                        <th>Bus type</th>
                        <th>Source</th>
                        <th>Destination</th>
                        <th>From Time</th>
                        <th>To Time</th>
                        <th>Bus Fare</th>
                        <th>Seats</th>
                        <th>Delete Bus</th>
                        <th>Booking Details</th>
                    </thead>
                    <tbody>
                    {
                data.map((value,index) => (
                    <>
                    <tr>
                    <td>{value.bus_id}</td>
                        <td>{value.bus_name}</td>
                        <td>{value.bus_number}</td>
                        <td>{value.bus_type}</td>
                        <td>{value.onboard_point}</td>
                        <td>{value.dest_point}</td>
                        <td>{value.start_time}</td>
                        <td>{value.end_time}</td>
                        <td>{value.bus_fare}</td>
                        <td>{value.remaining_seats}</td>
                        <td><button className="btn p-3 deletebtn" onClick={() => {handleremove(value.s_no)}}>Delete</button></td>
                        <td><Link to={`/bookingdetails/${value.s_no}`} className="btn bookbtn p-1">Booking Details</Link></td>
                    </tr>
                    </>
                ))
            }
                    </tbody>
                </table>
            </div>
        </>
    );
}