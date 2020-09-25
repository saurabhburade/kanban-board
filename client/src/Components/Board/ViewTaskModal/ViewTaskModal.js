import React, {useState} from "react";
import Modal from "antd/lib/modal/Modal";
import {Badge, Button, Divider} from "antd";
import {Input, Tooltip} from "antd";
import {notification} from "antd";
import {addColumn, deleteTask} from "./../../../Utils/boardHelpers";
import {
    MenuUnfoldOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
import confirm from "antd/lib/modal/confirm";

function ViewTaskModal({
    modalVisible,
    onCancel,
    title,
    label,
    description,
    created,
    columnName,
    taskIndex,
    _id,
    tasks,
}) {
    const showConfirm = _ => {
        confirm({
            title: `Do you Want to delete this Task ?`,
            icon: <ExclamationCircleOutlined style={{color: "red"}} />,

            onOk() {
                console.log("OK");
                let updatedTasks = tasks;
                updatedTasks.splice(taskIndex, 1);
                deleteTask(
                    {
                        columnName,
                        _id,
                        tasks: updatedTasks,
                    },
                    result => {
                        console.log(result);
                        onCancel();
                    }
                );
            },
        });
    };
    return (
        // <div>
        <Modal
            visible={modalVisible}
            title={<strong>{title}</strong>}
            onCancel={onCancel}
            footer={null}
            width={700}
        >
            <Badge count={label} />

            <div className=" w-100 d-flex justify-content-between">
                <div className="w-100 d-flex  pt-4">
                    <div className=" mr-3 p-0">
                        <Tooltip title="Description">
                            <MenuUnfoldOutlined style={{margin: "0%"}} />
                        </Tooltip>
                    </div>
                    <p className="w-100 m-0 p-0">{description}</p>
                </div>
                <div>
                    <p>Created At : {new Date(created).toDateString()}</p>
                    <Button
                        type="danger"
                        icon={<DeleteOutlined />}
                        size={"middle"}
                        onClick={showConfirm}
                    >
                        Delete Task
                    </Button>
                </div>
            </div>
        </Modal>
        // </div>
    );
}

export default ViewTaskModal;
