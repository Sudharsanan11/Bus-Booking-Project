import React,{useState,useEffect} from "react";
import '../searchPage/searchPage.css'
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export function Searchpage(){
    // const[data1,setData1] = useState([])
    var {id} = useParams();
    function searchbus(){
        var source = document.getElementById("source").value
    var destination = document.getElementById("destination").value
    var date = document.getElementById("date").value
    let search = {
        onboard_point : source,
        dest_point : destination,
        onboard_date : date,
        id : id
    }  

    var a = JSON.stringify(search)
            localStorage.setItem("search",a);

    }
    return(
        <>
            <div className="searchpage">
                <div className="account">
            <Link className="btn accbtn" to={`/myprofile/${id}`}><FontAwesomeIcon icon={faUser}/>  My Profile</Link>
            
            </div>
            <div className="card-only">
                <div className="card p-4">
                    <p>From</p>
                    <input className="p-2" type="text" placeholder="Enter Source" id="source"/><br/>
                    <p>To</p>
                    <input type="text" placeholder="Enter Destination" id="destination"/><br/>
                    <p>Travel Date</p>
                    <input id="date" type="date"/>
                    <div className="search">
                   <Link to={`/searchBus`}><button onClick={searchbus} className="searchbtn mt-4 px-5 py-2">Search Bus</button></Link>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
}