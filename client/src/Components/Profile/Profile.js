import React from 'react'
import "./Profile.css"
import {
    InsertRowAboveOutlined,
    SmileOutlined,
    EditOutlined,
    LogoutOutlined,
    AppstoreAddOutlined,
} from "@ant-design/icons";
import MenuItem from './MenuItem'
import { connect } from 'react-redux';
import BoardCard from './BoardCard';
import { Button } from 'antd';
function Profile({user}) {
    return (
        <div className="profile-dash-cont">
            <div className="dash-menu-cont">
                <div className="user">
                    <p>SB</p>
                    <p>Saurabh Burade</p>
                </div>
                <div>
                    <MenuItem icon={<SmileOutlined />} name="Profile" />
                    <MenuItem
                        icon={<InsertRowAboveOutlined />}
                        name="Your Boards"
                    />
                    <MenuItem icon={<EditOutlined />} name="Edit Profile" />
                    <MenuItem icon={<LogoutOutlined />} name="Logout" />
                </div>
            </div>
            <div className="boards-main-cont">
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
            </div>
        </div>
    );
}
const mapStateToProps = (state) => ({
    user:state.user.user
})

const mapDispatchToProps =dispatch=> {
    
}

export default connect(mapStateToProps)(Profile);
