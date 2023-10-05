import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Bookingdetails(){
    let {sno} = useParams()
    const[data,setData] = useState([])
    useEffect(() => {
        fetch("http://localhost:8000/bookingdetails/"+sno)
        .then(details => details.json())
        .then(res => setData(res))
    })
    return(
        <>
            <div className="bookingdetails">
                <h1>Booking Details</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Booking Id</th>
                            <th>Customer Id</th>
                            <th>Bus Id</th>
                            <th>Date</th>
                            <th>Source</th>
                            <th>Destination</th>
                            <th>Time</th>
                            <th>Gender</th>
                            <th>Tickets Booked</th>
                            <th>Total Fare</th>
                        </tr>
                    </thead>
                {
                    data.map((value,index) => (
                        <>
                            <tr>
                                <td>{value.booking_id}</td>
                                <td>{value.cust_id}</td>
                                <td>{value.bus_id}</td>
                                <td>{value.onboard_date}</td>
                                <td>{value.onboard_point}</td>
                                <td>{value.dest_point}</td>
                                <td>{value.start_time}-{value.end_time}</td>
                                <td>{value.gender}</td>
                                <td>{value.tickets_booked}</td>
                                <td>{value.total_fare}</td>
                            </tr>
                        </>
                    ))
                }
                </table>
            </div>
        </>
    );
}