import axios from "axios";
import React from "react";

export function AddBusDetails(){
    function addBus(){
        var busid = document.getElementById("busid").value
        var busname = document.getElementById("busname").value
        var busnumber = document.getElementById("busnumber").value
        var bustype = document.getElementById("bustype").value
        var seats = document.getElementById("seats").value

        let busdetails = {
            busid : busid,
            busname : busname,
            busnumber : busnumber,
            bustype : bustype,
            seats : seats
        }

        axios.post("http://localhost:8000/addBus",busdetails)
        .then((res) => {
            if(res.data.status === "error"){
                alert("datas are not inserted")
            }
            else if(res.data.status === "success"){
                alert("datas are inserted")
            }
        })
    }

    return(
        <>
            <div className="addbus">
                <h1>Add Bus</h1>
                <form>
                    <label>
                        <input className="mb-3 ps-3 p-2" type="text" id="busid" placeholder="Enter the bus id"/><br/>
                        <input className="mb-3 ps-3 p-2" type="text" id="busname" placeholder="Enter the bus name"/><br/>
                        <input className="mb-3 ps-3 p-2" type="text" id="busnumber" placeholder="Enter the bus number"/><br/>
                        <select className="mb-3 ps-3 p-2" id="bustype">
                            <option>Select bus type</option>
                            <option value="semi-sleeper">Semi-Sleeper</option>
                            <option value="sleeper">Sleeper</option>
                        </select><br/>
                        <input className="mb-3 ps-3 p-2" type="text" id="seats" placeholder="Enter the no of seats"/><br/>
                        <input className="addbtn mb-3 ps-3 p-2" onClick={addBus} type="submit"/>
                    </label>
                </form>
            </div>
        </>
    );
}