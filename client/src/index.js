import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import {Provider} from "react-redux";
import {store} from "./Redux";
import Loadable from "react-loadable";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin />;
 const App = Loadable({
    loader: () => import("./App"),
    loading: () => <Spin indicator={antIcon} />,
});
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
