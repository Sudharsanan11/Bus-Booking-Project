import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

export function SignUpPage(){
    function signup(){
        var username = document.getElementById("username").value
        var email = document.getElementById("email").value
        var password = document.getElementById("password").value
        var phonenumber = document.getElementById("phonenumber").value

        let userdata ={
            username : username,
            email : email,
            password : password,
            phonenumber : phonenumber
        }

        var pattern1 = /\w{5}/;
            var pattern2 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            var pattern3 = /^[6-9]{1,1}[0-9]{9,9}/;
            var pattern4 = /\w\S{6}/;

            var check1 = pattern1.test(username);
            var check2 = pattern2.test(email);
            var check3 = pattern3.test(phonenumber);
            var check4 = pattern4.test(password);

        if(check1 === true){
            if(check2 === true){
                if(check3 === true){
                    if(check4 === true){
                        axios.post("http://localhost:8000/register",userdata)
                        .then( (res) =>{
                            if(res.data.status === "error"){
                                alert("datas are not inserted")
                            }
                            else if(res.data.status === "success"){
                                window.location.href = '/';
                            }
                        })
                    }
                    else{
                       document.getElementById("password-correction").textContent = "The Password must contains 6 characters";
                    }
                }
                else{
                   alert(`document.getElementById("numner-correction").textContent = "The Phone number must contains 10 digits";`)
                }
            }
            else{
               alert(`document.getElementById("email-correction").textContent = "The email does not match the requirement";`)
            }
        }
        else{
            document.getElementById("username-correction").textContent = "The username must contains 5 characters"
        }
    }
    return(
        <>
            <div className="container-fluid signup-form">
                <div>
                <h1 className="mb-3">Gigo</h1>
                    <form>
                        <label>
                            <input id="username" type="text" className="mb-3 ps-3 p-2" placeholder="Enter Username" required/><br/>
                            <p id="username-correction"></p>
                            <input id="email" type="text" className="mb-3 ps-3 p-2" placeholder="Enter Email" required/><br/>
                            <p id="email-correction"></p>
                            <input id="password" type="password" className="mb-3 ps-3 p-2" placeholder="Enter Password" required/><br/>
                            <p id="password-correction"></p>
                            <input id="phonenumber" type="text" className="mb-3 ps-3 p-2" placeholder="Enter Phone Number" required/><br/>
                            <p id="number-correction"></p>

                            {/* <input type="button" className="p-2 signupbtn" value="SignUp" /> */}
                            <button onClick={signup} className="mb-3 p-2 signupbtn">SignUp</button>
                           <Link className="text-decoration-none" to='/'> <h4 className="login">Login</h4></Link>
                           

                        </label>
                    </form>
                </div>
            </div>
        </>
    );
}