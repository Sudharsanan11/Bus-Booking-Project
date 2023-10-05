import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function EditBusDetails(){
    var {id} = useParams()
    const[busid,setBusid] = useState()
    const[busname,setBusname] = useState()
    const[busnumber,setBusnumber] = useState()
    const[bustype,setBustype] = useState()
    const[totalseats,setTotalseats] = useState()
    useEffect(() => {
        fetch("http://localhost:8000/getOneBus/"+id)
        .then(data => data.json())
        .then((res) => {
            setBusid(res[0].bus_id)
            setBusname(res[0].bus_name)
            setBusnumber(res[0].bus_number)
            setBustype(res[0].bus_type)
            setTotalseats(res[0].total_seats)
        })
    },[])

    function handleUpdate(){
        var busname = document.getElementById("busname").value
        var busnumber = document.getElementById("busnumber").value
        var bustype = document.getElementById("bustype").value
        var seats = document.getElementById("seats").value

        let updateDetails = {
            busid : busid,
            busname : busname,
            busnumber : busnumber,
            bustype : bustype,
            seats : seats
        }

        axios.post("http://localhost:8000/editBus",updateDetails)
        .then((res) => {
            if(res.data.status === "error"){
                alert("datas are not updated")
            }
            else if(res.data.status === "success"){
                alert("datas are updated")
            }
        })
    }
    return(
        <>
            <div className="editbus">
            <h1>Edit Bus</h1>
                    <input type="text" className="mb-3 ps-3 p-2" id="busname" onChange={(updateData) => {setBusname(updateData.target.value)}} value={busname}/>
                    <input type="text" className="mb-3 ps-3 p-2" id="busnumber" onChange={(updateData) => {setBusnumber(updateData.target.value)}} value={busnumber}/>
                    <input type="text" className="mb-3 ps-3 p-2" id="bustype" onChange={(updateData) => {setBustype(updateData.target.value)}} value={bustype}/>
                    <input type="text" className="mb-3 ps-3 p-2" id="seats" onChange={(updateData) => {setTotalseats(updateData.target.value)}} value={totalseats}/>
                    <input type="button" className="mb-3 ps-3 p-2 editbtn" onClick={handleUpdate} value="Update"/>
            </div>
        </>
    );
}