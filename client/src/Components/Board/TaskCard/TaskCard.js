import React from 'react'
import "./TaskCard.css"
import {Tag} from "antd";

function TaskCard({title,label}) {
    return (
        <div className="column-card">
            <p>{title}</p>
            <Tag color="default">{label}</Tag>
        </div>
    );
}

export default TaskCard
