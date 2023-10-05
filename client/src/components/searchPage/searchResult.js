import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function SearchBus(){
    const[data1,setData1] = useState([])
    var b = localStorage.getItem("search")
    var c = JSON.parse(b);
    let source = c["onboard_point"]
    let destination = c["dest_point"]
    let date = c["onboard_date"]
   
    let result = {
        onboard_point : source,
        dest_point : destination,
        onboard_date : date
    }
    console.log(result);
    useEffect(() => {
        axios.post("http://localhost:8000/searchBus",result)
       .then((res)=>{
            setData1(res.data)
       })

    },[])
    function handleid(sno){
        var busdetails = {
            sno : sno
        }
        var a = JSON.stringify(busdetails)
            localStorage.setItem("busdetails",a);
    }
    return(
        <>
            <div className="buses">
                <h4>Search Result</h4>
        {
            data1.map((value,index) => (
                <>
                    <div className="bus-card mb-2 mt-2">
                    <pre>{value.bus_number}          {value.start_time}     -    {value.end_time}          {value.bus_fare}      seats       <Link className="bookbtn p-2 px-3" onClick={() => {handleid(value.s_no)}} to={`/bookingpage/${value.s_no}`}>Book Now</Link> <br/>
                        {value.bus_name}                {value.onboard_point}         {value.dest_point}                    {value.remaining_seats}<br/>
                        {value.bus_type}</pre>
                    </div>
                </>
            ))
        }
            </div>
        </>
    );
}