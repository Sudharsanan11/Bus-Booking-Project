import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function UpdateBus(){
    var {id} = useParams()
    const[seats,setSeats] = useState()
    const[busname,setBusname] = useState()
    const[busnumber,setBusnumber] = useState()
    const[bustype,setBustype] = useState()
    useEffect(() => {
        fetch("http://localhost:8000/getOneBus/"+id)
        .then(data => data.json())
        .then((res) => {
            setSeats(res[0].total_seats)
            setBusname(res[0].bus_name)
            setBusnumber(res[0].bus_number)
            setBustype(res[0].bus_type)
        })
    })

    function updatebus(){
        var source = document.getElementById("source").value
        var destination = document.getElementById("destination").value
        var fare = document.getElementById("fare").value
        var fromtime = document.getElementById("fromtime").value
        var totime = document.getElementById("totime").value
        var date = document.getElementById("date").value

        let updatedBus ={
            source : source,
            destination : destination,
            fare : fare,
            fromtime : fromtime,
            totime : totime,
            date : date,
            seats : seats
        }

        axios.post("http://localhost:8000/updateBus/"+id,updatedBus)
        .then((res) => {
            if(res.data.status === "error"){
                alert("datas are not inserted")
            }
            else{
                alert("datas are inserted")
                window.location.href = `/adminpage`
                
            }
        })
    }
    return(
        <>
            <div className="updatebus">
                <h1>Update Bus</h1>
                {/* <div className="card"> */}
                    <h5>{id}</h5>
                    <h4>{busname}</h4>
                    <h4>{busnumber}</h4>
                    <form onSubmit={updatebus}>
                        <label>
                            <input id="source" className="mb-3 ps-3 p-2" type="text" placeholder="Enter the source"/><br/>
                            <input id="destination" className="mb-3 ps-3 p-2" type="text" placeholder="Enter the destination"/><br/>
                            <input id="fromtime" className="mb-3 ps-3 p-2" type="time"/><br/>
                            <input id="totime" className="mb-3 ps-3 p-2" type="time"/><br/>
                            <input id="fare" className="mb-3 ps-3 p-2" type="text" placeholder="Enter the bus fare"/><br/>
                            <input id="date" className="mb-3 ps-3 p-2" type="date"/><br/>
                            <input className="mb-3 ps-3 p-2 updatebtn" type="submit"/>
                        </label>
                    </form>
                {/* </div> */}
            </div>
        </>
    );
}