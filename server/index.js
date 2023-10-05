const express = require("express")
const cors = require("cors")
const bodyparser = require("body-parser")
const mysql = require("mysql")
const crypto = require("crypto")

var expressfun = express()
expressfun.use(cors())
expressfun.use(bodyparser.json())
expressfun.use(express.json())
expressfun.use(bodyparser.urlencoded({extened:true}))
expressfun.use(express.static("public"))

let db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Sudharsanan11@sql",
    database: "gobusgo"
})
db.connect((error) => {
    if(error){
        console.log(error)
    }
    else{
        console.log("db connected")
    }
})

expressfun.get("/getAll",(request,response) => {
    let selectQuery = "select * from cust_details where is_active=1";
    db.query(selectQuery,(error,result) => {
        if(error){
            response.send(error)
            console.log(error)
        }
        else{
            response.send(result)
            console.log(result)
        }
    })
})

expressfun.get("/busdetails",(request,response) => {
    let selectQuery = "select * from bus_details";
    db.query(selectQuery,(error,result) => {
        if(error){
            response.send(error)
            console.log(error)
        }
        else{
            response.send(result)
            console.log(result)
        }
    })
})

expressfun.post("/register",(request,response) => {
    let id = crypto.randomUUID();
    let mydate = new Date();
    let todayDate = mydate.toISOString().slice(0,10);
    console.log(todayDate);
    let isActive = 1;
    let role = "Customer";
    let {username,email,password,phonenumber} = request.body;
    let insertQuery = "insert into cust_details(cust_id,user_name,email,password,phone_number,created_by,created_date,updated_by,updated_date,is_active,designation) values(?,?,?,?,?,?,?,?,?,?,?)";
    db.query(insertQuery,[id,username,email,password,phonenumber,id,todayDate,id,todayDate,isActive,role],(error,result) => {
        if(error){
            response.send({"status" : "error"})
            console.log(error)
        }
        else{
            response.send({"status" : "success"})
        }
    })

})

expressfun.post("/login",(request,response) => {
    let {email,password} = request.body
    console.log(email)
    let loginQuery = 'select * from cust_details where email=? and is_active=1';
    db.query(loginQuery,[email],(error,result) => {
        if(error){
            response.send({"send":"error"})
            console.log("error");
        }
        else if(result.length > 0){
            let dbemail = result[0].email;
            let dbpassword = result[0].password;
            if(dbemail === email && dbpassword == password){
                let id = result[0].cust_id;
                let designation = result[0].designation;
                response.send({"status":"success","id" : id,"designation":designation})
                console.log("success");
            }
            else{
                response.send({"status":"invalid"})
                console.log("invalid");
            }
        }
        else{
            response.send({"status":"empty_set"})
            console.log("empty")
        }
    })
})

expressfun.get("/getOne/:id",(request,response) => {
    let {id} = request.params
    console.log(id);
    let getQuery = "select * from cust_details where cust_id=?"
    db.query(getQuery,[id],(error,result) => {
        if(error){
            response.send({"status":"error"})
            console.log(error)
        }
        else{
            response.send(result)
            // console.log(result)
        }
    })
})

expressfun.get("/getOneBus/:id",(request,response) => {
    let {id} = request.params
    let getBusQuery = "select * from bus_details where bus_id=?";
    db.query(getBusQuery,[id],(error,result) => {
        if(error){
            response.send({"status":"error"})
            console.log(error);
        }
        else{
            response.send(result);
            console.log(result);
        }
    })
})

expressfun.post("/update/:id",(request,response) => {
    let {id} = request.params
    let {username,email,phonenumber,password,role} = request.body
    let updateQuery = "update cust_details set user_name=?,email=?,phone_number=?,password=?,designation=? where cust_id=?";
    db.query(updateQuery,[username,email,phonenumber,password,role,id],(error,result) => {
        if(error){
            response.send({"status":"error"})
            console.log(error)
        }
        else{
            response.send({"status":"success"})
            console.log(result);
        }
    })
})

expressfun.post("/deleteUser",(request,response) => {
    let id = request.body.id
    let deleteQuery = "update cust_details set is_active=0 where cust_id=?";
    db.query(deleteQuery,[id],(error,result) => {
        if(error){
            response.send({"status":"error"})
            console.log(error)
        }
        else{
            response.send({"status":"success"})
            console.log(result)
        }
    })
})

expressfun.post("/deleteBus",(request,response) => {
    let id = request.body.id
    let deleteQuery = "delete from bus_details where bus_id=?";
    db.query(deleteQuery,[id],(error,result) => {
        if(error){
            response.send({"status":"error"})
            console.log(error)
        }
        else{
            response.send({"status":"success"})
            console.log(result)
        }
    })
})

expressfun.post("/updateBus/:id",(request,response) => {
    let {id} = request.params
    let {source,destination,fare,fromtime,totime,date,seats} = request.body
    let sno = crypto.randomUUID();
    let mydate = new Date(date);
    let onboarddate = mydate.toISOString().slice(0,10);
    let updateQuery = "insert into available_buses(s_no,bus_id,onboard_point,dest_point,start_time,end_time,bus_fare,remaining_seats,onboard_date) values(?,?,?,?,?,?,?,?,?)";
    db.query(updateQuery,[sno,id,source,destination,fromtime,totime,fare,seats,onboarddate],(error,result) => {
        if(error){
            response.send({"status":"error"})
            console.log(error)
        }
        else{
            // response.send({"status":"success"})
            // response.send(result)
        }
    })
})

expressfun.post("/editBus",(request,response) => {
    let {busid,busname,busnumber,bustype,seats} = request.body
    let updateQuery = "update bus_details set bus_name=?,bus_number=?,bus_type=?,total_seats=? where bus_id=?";
    db.query(updateQuery,[busname,busnumber,bustype,seats,busid],(error,result) => {
        if(error){
            response.send({"status":"error"})
            console.log(error)
        }
        else{
            response.send({"status":"success"})
            console.log(result)
        }
    })
})

expressfun.post("/addBus",(request,response) => {
    let {busid,busname,busnumber,bustype,seats} = request.body
    let updateQuery = "insert into bus_details(bus_id,bus_name,bus_number,bus_type,total_seats) values(?,?,?,?,?)";
    db.query(updateQuery,[busid,busname,busnumber,bustype,seats],(error,result) => {
        if(error){
            response.send({"status":"error"})
            console.log(error)
        }
        else{
            response.send({"status":"success"})
            console.log(result)
        }
    })
})

expressfun.get("/availableBuses",(request,response) => {
    let getQuery = "select b.s_no,a.bus_id,a.bus_name,a.bus_number,a.bus_type,b.onboard_date,b.onboard_point,b.dest_point,b.bus_fare,b.start_time,b.end_time,b.remaining_seats from bus_details as a inner join available_buses as b on a.bus_id=b.bus_id";
    db.query(getQuery,(error,result) => {
        if(error){
            response.send({"status" : "error"})
            console.log(error)
        }
        else{
            response.send(result)
            console.log(result)
        }
    })
})

expressfun.post("/removeBus",(request,response) => {
    let id = request.body.id;
    let removeQuery = "delete from available_buses where s_no=?";
    db.query(removeQuery,[id],(error,result) => {
        if(error){
            response.send({"status":"error"})
            console.log(error)
        }
        else{
            response.send({"status":"success"})
            console.log(result)
        }
    })
})

expressfun.post("/searchBus",(request,response) => {
    let {onboard_point,dest_point,onboard_date}= request.body
    let getQuery = "select a.s_no,a.bus_id,a.onboard_date,a.onboard_point,a.dest_point,a.start_time,a.remaining_seats,a.end_time, b.bus_name,a.bus_fare, b.bus_number, b.bus_type from available_buses as a inner join bus_details as b on a.bus_id = b.bus_id where "
    + "onboard_date=? and onboard_point=? and dest_point=?;";
    db.query(getQuery,[onboard_date,onboard_point,dest_point],(error,result) => {

        if(error){
            response.send({"status":"error"})
        }
        else{
            response.send(result)
            console.log(result)
        }
    })
})

expressfun.get("/getbooking/:sno",(request,response) => {
    let {sno} = request.params
    let getQuery = "select a.bus_id,a.onboard_date,a.onboard_point,a.dest_point,a.start_time,a.remaining_seats, b.bus_name, b.bus_number,a.bus_fare,b.bus_type from available_buses as a inner join bus_details as b on a.bus_id = b.bus_id where s_no=?;";
    db.query(getQuery,[sno],(error,result) => {
        if(error){
            response.send({"status":"error"})
        }
        else{
            response.send(result)
            console.log(result)
        }
    })
})

expressfun.post("/bookticket/:sno",(request,response) => {
    let {sno} = request.params
    let {ticket,gender,id} = request.body
    let select = "select * from available_buses where s_no=?";
    db.query(select,[sno],(error,result) => {
        if(error){
            response.send({"status":"error"})
        }
        else if(result.length > 0){
            let remainingseats = result[0].remaining_seats;
            if(remainingseats > 0){
            let bookingid = crypto.randomUUID();
          let busid = result[0].bus_id;
          let date = result[0].onboard_date;
          let source = result[0].onboard_point;
          let dest = result[0].dest_point;
          let start = result[0].start_time;
          let end = result[0].end_time;
          let fare = result[0].bus_fare;
          let totalfare = fare * ticket;
          let order = 1;
          var insert = "insert into booking_details(booking_id,cust_id,bus_id,onboard_date,onboard_point,dest_point,start_time,end_time,gender,order_ok,tickets_booked,total_fare) values(?,?,?,?,?,?,?,?,?,?,?,?)";
          db.query(insert,[bookingid,id,busid,date,source,dest,start,end,gender,order,ticket,totalfare],(error2,result2) => {
            if(error2){
                response.send({"status":"error2"})
            }
            else{
                let seats = remainingseats - ticket;
                console.log(seats);
                console.log(sno)
                let update = "update available_buses set remaining_seats=? where s_no=?";
                db.query(update,[seats,sno],(error3,result3) => {
                    if(error3){
                        response.send({"status":"error3"})
                    }
                    else{
                        response.send({"status":"success"})
                        console.log(result3);
                    }
                })
            }
          })
        }
    }
    else{
        response.send({"status":"full"})
    }
    })
})

expressfun.get("/mytickets/:id",(request,response) => {
    let {id} = request.params
    console.log(id);
    let select = "select bo.booking_id, b.bus_name, b.bus_number,bo.tickets_booked,bo.total_fare,bo.onboard_date,bo.onboard_point,bo.dest_point,bo.start_time,bo.end_time,bo.gender from booking_details as bo inner join bus_details as b on bo.bus_id = b.bus_id where cust_id=? and bo.order_ok=1";
    db.query(select,[id],(error,result) => {
        if(error){
            response.send({"status":"error"})
        }
        else{
            response.send(result)
            console.log(result)
        }
    })
})
expressfun.post("/cancel",(request,response) => {
    let bid = request.body.bid
    console.log(bid);
    let update = "DELETE FROM booking_details WHERE booking_id=?;";
    db.query(update,[bid],(error,result) => {
        if(error){
            response.send({"status":"error"})
        }
        else{
            console.log(result);
        }
    })
})

expressfun.get("/bookingdetails/:sno",(request,response) => {
    let {sno} = request.params
    let select = "select a.bus_id,a.onboard_date,b.booking_id,b.cust_id,b.onboard_point,b.dest_point,b.start_time,b.end_time,b.gender,b.tickets_booked,b.total_fare from available_buses as a inner join booking_details as b on a.bus_id = b.bus_id where a.s_no=?;"
    db.query(select,[sno],(error,result) => {
        if(error){
            response.send({"status":"error"})
        }
        else{
            response.send(result)
        }
    })
})

expressfun.listen(8000,() => {
    console.log("your port running in 8000");
})