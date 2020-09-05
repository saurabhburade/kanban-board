import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import Header from "./Components/Header/Header";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import Home from "./Components/home/Home";
import './App.css';
const ENDPOINT = "http://127.0.0.1:8000";

function App() {
    const [response, setResponse] = useState("");

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("changeData", data => {
            setResponse(data);
            console.log(data)
        });
    }, []);

       return (
           <Router>
               <div className="App">
                   <Header />
                   <Switch>
                       <Route path="/login" exact component={Login} />
                       <Route path="/" exact component={Home} />
                       <Route path="/register" exact component={SignUp} />
                   </Switch>
               </div>
           </Router>
       );
}

export default App;
