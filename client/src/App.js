// import logo from './logo.svg';
import './App.css';
import './components/adminDashboard/adminpage.css'
import { Loginpage } from './components/loginpage';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignUpPage } from './components/signuppage';
import { Searchpage } from './components/searchPage/searchPage';
import { Adminpage } from './components/adminDashboard/adminfrontpage';
import { UpdateUserDetails } from './components/adminDashboard/updateUserDetails';
import { UserDetails } from './components/adminDashboard/userdetails';
import { BusDetails } from './components/adminDashboard/busDetails';
import { UpdateBus } from './components/adminDashboard/updateBusDetails';
import { EditBusDetails } from './components/adminDashboard/editBusDetails';
import { AddBusDetails } from './components/adminDashboard/addBusDetails';
import { AvailableBuses } from './components/adminDashboard/availableBuses';
import { SearchBus, searchResult } from './components/searchPage/searchResult';
import { Bookingpage } from './components/searchPage/bookingpage';
import { Myprofile } from './components/searchPage/myprofile';
import { Mytickets } from './components/searchPage/mytickets';
import { Bookingdetails } from './components/adminDashboard/bookingdetails';

function App() {
  return (
    <>
         <BrowserRouter>
            <Routes>
              <Route path='/' element={<Loginpage/>}/>
              <Route path='/signup' element={<SignUpPage/>}/>
              <Route path='/searchPage/:id' element={<Searchpage/>}/>
              <Route path='/myprofile/:id' element={<Myprofile/>}/>
              <Route path='/tickets/:id' element={<Mytickets/>}/>
              <Route path='/searchBus' element={<SearchBus/>}/>
              <Route path='/bookingpage/:sno' element={<Bookingpage/>}/>
              <Route path='/adminpage' element ={<Adminpage/>}/>
              <Route path='/busdetails' element={<BusDetails/>}/>
              <Route path='/updateBusDetails/:id' element={<UpdateBus/>}/>
              <Route path='/editBusDetails/:id' element={<EditBusDetails/>}/>
              <Route path='/userdetails' element ={<UserDetails/>}/>
              <Route path='/updateUserDetails/:id' element={<UpdateUserDetails/>}/>
              <Route path='/addBus' element={<AddBusDetails/>}/>
              <Route path='/availablebuses' element={<AvailableBuses/>}/>
              <Route path='/bookingdetails/:sno' element={<Bookingdetails/>}/>
            </Routes>
         </BrowserRouter>
         {/* <Loginpage/>
         <SignUpPage/> */}
         {/* <Searchpage/> */}
    </>
  );
}

export default App;
