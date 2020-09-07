import React from 'react'
import "./BoardCard.css"
import {
    EyeOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button } from 'antd';
import { useState } from 'react';
import confirm from 'antd/lib/modal/confirm';
import { deleteBoard } from '../../Utils/boardHelpers';

function BoardCard({name,_id}) {
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    
       const showConfirm = _ => {
           confirm({
               title: `Do you Want to delete ${name} Board ?`,
               icon: <ExclamationCircleOutlined />,
               content: "Note: If you own this board then it will be deleted for all of your team members",
               onOk() {
                   deleteBoard(_id,(result)=>{
                       console.log("result",result);
                   });
               },
               onCancel() {
                   setDeleteModalVisible(false);
               },
           });
       };
    return (
        <div className="p-board-card">
            <p>{name}</p>
            <div>
                <Button icon={<EyeOutlined />} size={"middle"} />
                <Button
                    type="danger"
                    icon={<DeleteOutlined />}
                    size={"middle"}
                    onClick={showConfirm}
                />
            </div>
        </div>
    );
}

export default BoardCard
