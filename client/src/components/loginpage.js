import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";


export function Loginpage(){
    function login(event){
        event.preventDefault()
        var email = document.getElementById("email").value
        var password = document.getElementById("password").value

        var loginDetails={
            email : email,
            password : password
        }

        if(email == ""){
            alert("please enter your email")
        }
        else if(password == ""){
            alert("please enter your password")
        }
        else{
        axios.post("http://localhost:8000/login",loginDetails)
        .then((res) => {
            if(res.data.status === "success"){
                let designation = res.data.designation
                let id = res.data.id
                if(designation === "Admin"){
                    window.location.href = `/adminpage`
                }
                else if(designation === "Customer"){
                    window.location.href = `/searchPage/${id}`
                }
            }
            else if(res.data.status === "invalid"){
                alert("Invalid your email or password")
            }
            else if(res.data.status === "empty_set"){ 
                alert("User does not exists")
            }
            else if(res.data.status === "error"){
                alert("Contact Admin")
            }
        })
    }
    }
    return(
        <>
            <div className="container-fluid login-form">
                <div>
                    <h1 className="mb-3">Gigo</h1>
                    <form onSubmit={login}>
                        <label>
                            <input type="text" className="mb-3 ps-3 p-2" id="email" placeholder="Enter Email"/><br/>
                            <input type="password" className="mb-3 ps-3 p-2" id="password" placeholder="Enter Password"/><br/>
                            <button className="p-2 mb-3 loginbtn" type="submit">LOGIN</button>
                        </label>
                    </form>
                    <Link className="text-decoration-none" to='/signup'><h4 className="signup">SignUp</h4></Link>
                    
                </div>
            </div>
        </>
    );
} 