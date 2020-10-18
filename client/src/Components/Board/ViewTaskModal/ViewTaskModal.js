import React, {useState, useEffect} from "react";
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
import {fetchChecklist, updateChecklist} from "../../../Utils/checklist.helper";
import {Checkbox} from "antd";

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
    deleteTaskBtn,
    activeId,
}) {
    const [checklistInit, setchecklistInit] = useState([]);
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
    useEffect(() => {
        console.log("fetch");
        if (!!activeId) {
            fetchChecklist(activeId, d => {
                setchecklistInit(d.data);
                console.log(d);
            });
        }
    }, []);
    const onCheck = (d, value,index) => {
        console.log(d.target.checked, value);
        const data = {
            _id:activeId,
            value,
            checked: d.target.checked,
            index,
        };
        updateChecklist(data, val => {
            setchecklistInit(val.data);
               fetchChecklist(activeId, res => {
                   setchecklistInit(res.data);
                   console.log(res);
               });
            console.log(val);
        });
    };
    return (
        <div>
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
                    {!deleteTaskBtn && (
                        <Button
                            type="danger"
                            icon={<DeleteOutlined />}
                            size={"middle"}
                            onClick={showConfirm}
                        >
                            Delete Task
                        </Button>
                    )}
                </div>
            </div>

            <div>
                {checklistInit?.map((element, index) => {
                    return (
                        <Checkbox
                            checked={element.checked}
                            onChange={d => onCheck(d, element.value, index)}
                        >
                            {element.value}
                        </Checkbox>
                    );
                })}
            </div>
        </Modal>
     </div>
    );
}

export default ViewTaskModal;
