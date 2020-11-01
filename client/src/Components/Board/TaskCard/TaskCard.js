import React, { useState } from "react";
import "./TaskCard.css";
import {Tag} from "antd";
import ViewTaskModal from "../ViewTaskModal/ViewTaskModal";

function TaskCard(props) {
    const [viewColumnVisible, setviewColumnVisible] = useState(false);
    const handleViewColumnModalCancel = () => {
        setviewColumnVisible(false);
    };
    return (
        <>
            <ViewTaskModal
                {...props}
                activeId={props.checklist}
                modalVisible={viewColumnVisible}
                onCancel={handleViewColumnModalCancel}
            />
            <div
                className="column-card"
                onClick={() => setviewColumnVisible(true)}
            >
                <p>{props.title}</p>
                <Tag color="default">{props.label}</Tag>
            </div>
        </>
    );
}

export default TaskCard;
