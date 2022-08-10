import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import DashBoard from './components/Dashboard/DashBoard';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
  return (
    <div className="App">
                <Router>
                        <Routes>
                        <Route path="/" exact element={<ProtectedRoutes><DashBoard/></ProtectedRoutes>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signup" element={<Signup/>}/>
                        </Routes>
                </Router>
                
            </div>
  );
}
const ProtectedRoutes = ({children})=>{
  if(localStorage.getItem("current_user")){
    return children
  }else{
    return <Login />
  }
}

export default App;
