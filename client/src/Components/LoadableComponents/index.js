import React from "react";
import Loadable from "react-loadable";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin />;
function SpinLoad(){
    return(<div className="ldr">
        <Spin indicator={antIcon} />
    </div>)
}
export const Board = Loadable({
    loader: () => import("../Board/Board.js"),
    loading: SpinLoad,
});
export const AddBoardModal = Loadable({
    loader: () => import("../AddBoard/AddBoardModal"),
    loading: SpinLoad,
});
export const AddColumnModal = Loadable({
    loader: () => import("../Board/AddColumnModal/AddColumnModal"),
    loading: SpinLoad,
});
export const Column = Loadable({
    loader: () => import("../Board/Column/Column"),
    loading: SpinLoad,
});
export const TaskCard = Loadable({
    loader: () => import("../Board/TaskCard/TaskCard"),
    loading: SpinLoad,
});

export const AddTaskModal = Loadable({
    loader: () => import("../Board/TaskCard/AddTaskModal"),
    loading: SpinLoad,
});

export const Header = Loadable({
    loader: () => import("../Header/Header"),
    loading: SpinLoad,
});
export const Home = Loadable({
    loader: () => import("../home/Home"),
    loading: SpinLoad,
});
export const Login = Loadable({
    loader: () => import("../Login/Login"),
    loading: SpinLoad,
});
export const Profile = Loadable({
    loader: () => import("../Profile/Profile"),
    loading: SpinLoad,
});
export const BoardCard = Loadable({
    loader: () => import("../Profile/BoardCard"),
    loading: SpinLoad,
});
export const MenuItem = Loadable({
    loader: () => import("../Profile/MenuItem"),
    loading: SpinLoad,
});
export const SignUp = Loadable({
    loader: () => import("../SignUp/SignUp"),
    loading: SpinLoad,
});
export const UserProfile = Loadable({
    loader: () => import("../UserProfile/UserProfile"),
    loading: SpinLoad,
});