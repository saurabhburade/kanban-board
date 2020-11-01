import React, {useState, useEffect} from "react";
import socketIOClient from "socket.io-client";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

import "./App.css";
import {fetchUser} from "./Redux/user/user.actionCreators";
import {connect} from "react-redux";
import {isAuth} from "./Utils/auth";
// import Board from './Components/Board/Board';
import { socket } from './Utils/socket';
import {
    Login,
    SignUp,
    Board,
    Profile,
    Home,
    Header,
} from "./Components/LoadableComponents/index";
function App(props) {
    const [response, setResponse] = useState("");

    useEffect(() => {
        if (isAuth()) {
            socket.emit("connected", {key: localStorage.getItem("_id")});
            socket.on("changeData", data => {
                setResponse(data);
                if (!!data) {
                    props.fetchUser();
                }
                console.log(data);
            });
        }
    }, []);
    useEffect(() => {
       isAuth() && props.fetchUser();
    }, []);
    return (
        <Router>
            <div className="App">
                <Header />
                <Switch>
                    <Route path="/login" exact component={Login} />
                    <Route path="/" exact component={Home} />
                    <Route path="/register" exact component={SignUp} />
                    <Route path="/dashboard" exact component={Profile} />
                    <Route path="/boards/:id" exact component={Board} />
                </Switch>
            </div>
        </Router>
    );
}

const mapDispatchToProps = dispatch => {
    return {fetchUser: () => dispatch(fetchUser())};
};

export default connect(null, mapDispatchToProps)(App);
