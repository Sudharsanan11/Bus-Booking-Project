import React, { useEffect, useState } from "react";

export function ShowBuses(){
    const[data,setData] = useState([])
    useEffect(() => {
        fetch("http://localhost:8000/getBus")
        .then(details => details.json())
        .then((res) => setData(res))
    })
    return(
        <>
            <div className="showbuses">
            {
                data.map((value,index) => {
                    <h1>{value.bud_id}</h1>
                })
            }
            </div>
        </>
    );
}