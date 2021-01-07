import React, {useState, useEffect} from "react";
import Modal from "antd/lib/modal/Modal";
import {Badge, Button, Divider} from "antd";
import {Input, Tooltip} from "antd";
import {notification} from "antd";
import {addColumn, addTask, deleteTask} from "./../../../Utils/boardHelpers";
import {
    MenuUnfoldOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
    AlignLeftOutlined,
    UnorderedListOutlined,
    CheckSquareOutlined,
} from "@ant-design/icons";
import confirm from "antd/lib/modal/confirm";
import {
    fetchChecklist,
    updateChecklist,
    createFirstChecklist,
    addToChecklist,
} from "../../../Utils/checklist.helper";
import {Checkbox} from "antd";
import "./ViewTaskModal.css";
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
    console.log(columnName, taskIndex, _id);
    const [checklistInit, setchecklistInit] = useState([]);
    const [toggleAddCheck, settoggleAddCheck] = useState(false);
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
    const onCheck = (d, value, index) => {
        console.log(d.target.checked, value);
        const data = {
            _id: activeId,
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
    const addNewCheckItem = e => {
        e.preventDefault();
        console.log(e.target.check.value);
        settoggleAddCheck(false);
        const data = {
            value: e.target.check.value,
            _id: activeId,
        };
        addToChecklist(data, d => {
            fetchChecklist(activeId, res => {
                setchecklistInit(res.data);
                console.log(res);
            });
        });
    };
    const createChecklist = () => {
        const data = {
            columnName,
            taskIndex,
            _id,
        };
        createFirstChecklist(data, d => {
            console.log(d);
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

                <div className=" w-100 p-3 d-flex justify-content-between">
                    <div className="w-100   pt-3">
                        <div className="d-flex">
                            <div className=" mr-3 p-0">
                                <Tooltip title="Description">
                                    <AlignLeftOutlined style={{margin: "0%"}} />
                                </Tooltip>
                            </div>
                            <p className="w-100 m-0 p-0">{description}</p>
                        </div>
                        <div>
                            <div className="d-flex mt-3 checklist-title-cont">
                                <CheckSquareOutlined style={{margin: "0%"}} />

                                <h4>Checklist</h4>
                            </div>
                            {!!activeId && checklistInit ? (
                                <div className="check-container">
                                    {checklistInit.map((element, index) => {
                                        return (
                                            <div className="checklist-item">
                                                <Checkbox
                                                    checked={element?.checked}
                                                    onChange={d =>
                                                        onCheck(
                                                            d,
                                                            element.value,
                                                            index
                                                        )
                                                    }
                                                >
                                                    {element?.checked ? (
                                                        <strike>
                                                            {element?.value}
                                                        </strike>
                                                    ) : (
                                                        element?.value
                                                    )}
                                                </Checkbox>
                                            </div>
                                        );
                                    })}

                                    <div>
                                        {toggleAddCheck ? (
                                            <form onSubmit={addNewCheckItem}>
                                                <Input.TextArea
                                                    type="text"
                                                    name="check"
                                                    required
                                                />
                                                <div className="d-flex mt-2">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-sm bg-primary text-white"
                                                    >
                                                        Add Item
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            settoggleAddCheck(
                                                                false
                                                            )
                                                        }
                                                        className="btn btn-sm ml-3 bg-primary text-white"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    settoggleAddCheck(true)
                                                }
                                                className="btn btn-sm bg-primary text-white"
                                            >
                                                Add Item
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ) : !activeId ? (
                                <button
                                    onClick={createChecklist}
                                    className="btn btn-sm bg-primary text-white"
                                >
                                    Create Checklist
                                </button>
                            ) : null}
                        </div>
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
            </Modal>
        </div>
    );
}

export default ViewTaskModal;
