import React from 'react'
import Loadable from "react-loadable";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin />;
export const Board = Loadable({
    loader: () => import("../Board/Board.js"),
    loading: () => <Spin indicator={antIcon} />,
});