import React from 'react'
import "./Profile.css"
import {
    InsertRowAboveOutlined,
    SmileOutlined,
    EditOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import MenuItem from './MenuItem'
import { connect } from 'react-redux';
import BoardCard from './BoardCard';
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
                <p>Your Boards</p>
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
