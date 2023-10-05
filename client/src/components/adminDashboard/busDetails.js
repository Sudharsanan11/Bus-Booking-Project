import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function BusDetails(){
    const[buses,setbuses] = useState([])
    useEffect(() => {
        fetch("http://localhost:8000/busdetails")
        .then(res => res.json())
        .then(details => setbuses(details))
    },[])

    function handleDelete(id){
        var busid = id;

        let deleteDetails = {
            id : busid
        }
        axios.post("http://localhost:8000/deleteBus",deleteDetails)
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
            <div className="showbus">
                <h1>Bus Details</h1>
                 <table>
                    <thead>
                        <tr>
                            <th>Bus Id</th>
                            <th>Bus Name</th>
                            <th>Bus Number</th>
                            <th>Bus Type</th>
                            <th>Total Seats</th>
                            <th>Update</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            buses.map((value,index) => (
                                <>
                                    <tr>
                                        <td>{value.bus_id}</td>
                                        <td>{value.bus_name}</td>
                                        <td>{value.bus_number}</td>
                                        <td>{value.bus_type}</td>
                                        <td>{value.total_seats}</td>
                                        <td><Link className="btn btn-success updatebtn" to={`/updateBusDetails/${value.bus_id}`}>Update</Link></td>
                                        <td><Link className="btn bg-danger editbtn" to={`/editBusDetails/${value.bus_id}`}>Edit</Link></td>
                                    <td><button onClick={() => {handleDelete(value.bus_id)}} className="btn bg-danger deletebtn">Delete</button></td>
                                    </tr>
                                </>
                            ))
                        }
                    </tbody>
                 </table>
                 <Link className="addbusbtn p-2 px-4 mt-4" to='/addBus'>Add Bus</Link>
            </div>
        </>
    );
}