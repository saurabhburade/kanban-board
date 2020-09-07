import React, {useState} from "react";
import "./Profile.css";
import {
    InsertRowAboveOutlined,
    SmileOutlined,
    EditOutlined,
    LogoutOutlined,
    AppstoreAddOutlined,
} from "@ant-design/icons";
import MenuItem from "./MenuItem";
import {connect} from "react-redux";
import BoardCard from "./BoardCard";
import {Button} from "antd";
import UserProfile from './../UserProfile/UserProfile';
import AddBoardModal from './../AddBoard/AddBoardModal';
function Profile({user}) {
    const [dashView, setDashView] = useState(0);
    const [modalVisible, setModalVisible] = useState(false)
    const handleModalCancel=()=>{
        setModalVisible(false)
    }
    return (
        <div className="profile-dash-cont">
            <div className="dash-menu-cont">
                <div className="user">
                    <p>SB</p>
                    <p>Saurabh Burade</p>
                </div>
                <div>
                    <div onClick={() => setDashView(0)}>
                        <MenuItem
                            icon={<InsertRowAboveOutlined />}
                            name="Your Boards"
                        />
                    </div>
                    <div onClick={() => setDashView(1)}>
                        <MenuItem icon={<SmileOutlined />} name="Profile" />
                    </div>
                    <div onClick={() => setDashView(2)}>
                        <MenuItem icon={<EditOutlined />} name="Edit Profile" />
                    </div>
                    <div onClick={() => console.log("Logout")}>
                        <MenuItem icon={<LogoutOutlined />} name="Logout" />
                    </div>
                </div>
            </div>
            {dashView === 0 ? (
                // <UserProfile />
                <div className="boards-main-cont">
                    <div className="board-title-add-board mt-4">
                        <p>Your Boards</p>{" "}
                        <Button
                            shape="round"
                            icon={<AppstoreAddOutlined />}
                            size={"middle"}
                            className="ml-5"
                            onClick={()=>setModalVisible(true)}
                        >
                            Add New Board
                        </Button>
                    </div>
                    <div className="boards-cont">
                        {user?.boards?.map((element, index) => {
                            return (
                                <BoardCard
                                    name={element.title}
                                    _id={element._id}
                                />
                            );
                        })}
                    </div>
                </div>
            ) : dashView === 1 ? (
                <UserProfile />
            ) : (
                <div className="boards-main-cont">
                    <Button
                        shape="round"
                        icon={<AppstoreAddOutlined />}
                        size={"middle"}
                        className="ml-5"
                    >
                        Edit profile
                    </Button>
                </div>
            )}
            {/* <div className="boards-main-cont">
                <div className="board-title-add-board mt-4">
                    <p>Your Boards</p>{" "}
                    <Button
                        shape="round"
                        icon={<AppstoreAddOutlined />}
                        size={"middle"}
                        className="ml-5"
                    >
                        Add New Board
                    </Button>
                </div>
                <div className="boards-cont">
                    {user?.boards?.map((element, index) => {
                        return <BoardCard name={element.title} />;
                    })}
                </div>
            </div> */}
            <AddBoardModal  modalVisible={modalVisible} owner={user?.email} onCancel={handleModalCancel}/>
        </div>
    );
}
const mapStateToProps = state => ({
    user: state.user.user,
});

export default connect(mapStateToProps)(Profile);
