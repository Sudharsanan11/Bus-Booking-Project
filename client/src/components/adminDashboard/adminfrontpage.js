import React from "react";
import { Link } from "react-router-dom";

export function Adminpage(){
    return(
        <>
            <div className="admin-page">
            <div className="card">
               <Link to='/busdetails' className="button mb-2 p-2">Update Bus</Link>
               <Link to='/userdetails' className="button mb-2 p-2">Update Users</Link>
               <Link to='/availableBuses' className="button mb-2 p-2">Available Buses</Link>
               {/* <Link to='/bookingdetails' className="button mb-2 p-2">Booking Details</Link> */}
            </div>
            </div>
        </>
    );
}