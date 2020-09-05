import React from 'react'
import "./BoardCard.css"
import {EyeOutlined, DeleteOutlined} from "@ant-design/icons";
import { Button } from 'antd';

function BoardCard({name}) {
    return (
        <div className="p-board-card">
            <p>{name}</p>
            <div>
                <Button icon={<EyeOutlined />} size={"middle"} />
                <Button
                    type="danger"
                    icon={<DeleteOutlined />}
                    size={"middle"}
                />
            </div>
        </div>
    );
}

export default BoardCard
