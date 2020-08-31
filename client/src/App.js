import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";

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
        <p>
            It's
        </p>
    );
}

export default App;
