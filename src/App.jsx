import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Top from "./Components/Top";
import Mid from "./Components/Mid";
import Bottom from "./Components/Bottom";
import Loader from "./Components/Loader";
import LoginCanvas from "./Components/LoginCanvas";
import ForgotCanvas from "./Components/ForgotCanvas";
import CreateCanvas from "./Components/CreateCanvas";

function App() {
  const [count, setCount] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState({isLoggedIn:true});


  return (
    <div className="bg-black h-[100vh]">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex justify-center items-center h-[100vh]">
                <Loader />
              </div>
            }
          />
          <Route
            path="/home"
            element={
              <>
                <LoginCanvas />
              </>
            }
          />

          <Route
            path="/forgotPass"
            element={
              <>
                <ForgotCanvas />
              </>
            }
          />

          <Route
            path="/create"
            element={
              <>
                <CreateCanvas />
              </>
            }
          />


<Route
            path="/create"
            element={
              <>
              <Top />
                <Mid />
                <Bottom />
              </>
            }
          />



<Route
            path="/dash"
            element={
              loggedInUser.isLoggedIn?
              <>
                <Top />
                <Mid />
                <Bottom />
              </>:""
            }
           
          />





        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
