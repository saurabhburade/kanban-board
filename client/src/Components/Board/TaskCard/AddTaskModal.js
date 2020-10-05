import React from "react";
import Modal from "antd/lib/modal/Modal";
import {Button, Divider} from "antd";
import {Input} from "antd";
import {notification} from "antd";
import { addTask } from "../../../Utils/boardHelpers";

function AddTaskModal({modalVisible, onCancel,_id,columnName}) {
    console.log(modalVisible, onCancel, _id, columnName);
    const handleOk = e => {
        e.preventDefault();
        const data = {
            title: e.target.title.value,
            label: e.target.label.value,
            description: e.target.description.value,
            _id,
            columnName,
        };
        addTask(data,(d)=>{
            console.log(d);
            onCancel();
        })
        console.log(data);
    };
    return (
        <div>
            <Modal
                visible={modalVisible}
                title="Title"
                onOk={handleOk}
                onCancel={onCancel}
                footer={null}
            >
                <form onSubmit={handleOk}>
                    <div>
                        <label htmlFor="title">Enter Title of Task</label>
                        <Input type="text" name="title" required />
                    </div>{" "}
                    <div>
                        <label htmlFor="label">Add Label</label>
                        <Input type="text" name="label" required />
                    </div>{" "}
                    <div>
                        <label htmlFor="description">Description </label>
                        <Input.TextArea type="text" name="description" required />
                    </div>
                    <br />
                    <button
                        key="submit"
                        className="btn-sm btn mr-3 bg-aqua  border"
                        type="button"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        key="submit"
                        className="btn-sm btn ml-3 bg-primary text-white"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </Modal>
        </div>
    );
}

export default AddTaskModal;
