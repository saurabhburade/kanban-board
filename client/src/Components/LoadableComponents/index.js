import React from "react";
import Loadable from "react-loadable";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin />;
export const Board = Loadable({
    loader: () => import("../Board/Board.js"),
    loading: () => <Spin indicator={antIcon} />,
});
export const AddBoardModal = Loadable({
    loader: () => import("../AddBoard/AddBoardModal"),
    loading: () => <Spin indicator={antIcon} />,
});
export const AddColumnModal = Loadable({
    loader: () => import("../Board/AddColumnModal/AddColumnModal"),
    loading: () => <Spin indicator={antIcon} />,
});
export const Column = Loadable({
    loader: () => import("../Board/Column/Column"),
    loading: () => <Spin indicator={antIcon} />,
});
export const TaskCard = Loadable({
    loader: () => import("../Board/TaskCard/TaskCard"),
    loading: <Spin indicator={antIcon} />,
});

export const AddTaskModal = Loadable({
    loader: () => import("../Board/TaskCard/AddTaskModal"),
    loading: <Spin indicator={antIcon} />,
});

export const Header = Loadable({
    loader: () => import("../Header/Header"),
    loading: <Spin indicator={antIcon} />,
});
export const Home = Loadable({
    loader: () => import("../home/Home"),
    loading: <Spin indicator={antIcon} />,
});
export const Login = Loadable({
    loader: () => import("../Login/Login"),
    loading: <Spin indicator={antIcon} />,
});
export const Profile = Loadable({
    loader: () => import("../Profile/Profile"),
    loading: <Spin indicator={antIcon} />,
});
export const BoardCard = Loadable({
    loader: () => import("../Profile/BoardCard"),
    loading: <Spin indicator={antIcon} />,
});
export const MenuItem = Loadable({
    loader: () => import("../Profile/MenuItem"),
    loading: <Spin indicator={antIcon} />,
});
export const SignUp = Loadable({
    loader: () => import("../SignUp/SignUp"),
    loading: <Spin indicator={antIcon} />,
});
export const UserProfile = Loadable({
    loader: () => import("../UserProfile/UserProfile"),
    loading: <Spin indicator={antIcon} />,
});