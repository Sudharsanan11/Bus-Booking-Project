import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Mytickets(){
    let {id} = useParams()
    console.log(id)
    const[ticket,setTicket] = useState([])
    useEffect(() => {
        fetch("http://localhost:8000/mytickets/"+id)
        .then(res => res.json())
        .then(details => setTicket(details))
    },[])

    function handlecancel(bid){
        let bookid = bid;
        let cancel = {
            bid : bookid
        }
        axios.post("http://localhost:8000/cancel",cancel)
        .then((res) => {
            if(res.data.status === "error"){
                alert("error")
            }
            else{
                alert("Ticket canceled successfully")
                window.location.href = `/myprofile/${id}`
            }
        })
    }
    return(
        <>
            <div className="myticket">
                <table>
                    <tbody>
                {
                    ticket.map((value,index) => (
                        <>
                            <div>
                                <tr>
                                    <td>booking id</td>
                                    <td><p>{value.booking_id}</p></td>
                                </tr>
                                <tr>
                                    <td>Bus Name</td>
                                    <td><p>{value.bus_name}</p></td>
                                </tr>
                                <tr>
                                    <td>Bus Number</td>
                                    <td><p>{value.bus_number}</p></td>
                                </tr>
                                <tr>
                                    <td>Bus Time</td>
                                    <td><p>{value.start_time}-{value.end_time}</p></td>
                                </tr>
                                <tr>
                                    <td>Tickets</td>
                                    <td><p>{value.tickets_booked}</p></td>
                                </tr>
                                <tr>
                                    <td>Total Fare</td>
                                    <td><p>{value.total_fare}</p></td>
                                </tr>
                                <tr>
                                    <td>Date</td>
                                    <td><p>{value.onboard_date}</p></td>
                                </tr>
                                <tr>
                                    <td>From</td>
                                    <td><p>{value.onboard_point}</p></td>
                                </tr>
                                <tr>
                                    <td>To</td>
                                    <td><p>{value.dest_point}</p></td>
                                </tr>
                                <tr>
                                <button onClick={() => {handlecancel(value.booking_id)}}>Cancel Ticket</button>
                                </tr>
                            </div>
                        </>
                    ))
                }
                    </tbody>
                </table>
            </div>
        </>
    );
}