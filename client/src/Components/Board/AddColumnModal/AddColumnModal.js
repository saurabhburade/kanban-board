import React from "react";
import Modal from "antd/lib/modal/Modal";
import {Button, Divider} from "antd";
import {Input} from "antd";
import {notification} from "antd";
import { addColumn } from './../../../Utils/boardHelpers';

function AddColumnModal({modalVisible, onCancel,_id}) {
    const handleOk = e => {
        e.preventDefault();
        const data = {
            columnName: e.target.columnName.value,
            _id,
        };
                addColumn(data, result => {
                    notification[result]({
                        message: "Add Board " + result,
                        description:
                            result === "success"
                                ? "Column added successfuly"
                                : "Unable to add new column",
                    });
                    onCancel();
                });
        console.log(data);

    };
    return (
        <div>
            <Modal
                visible={modalVisible}
                title="Add New Column"
                onOk={handleOk}
                onCancel={onCancel}
                footer={null}
            >
                <form onSubmit={handleOk}>
                    <div>
                        <label htmlFor="columnName">
                            Enter Name of the column
                        </label>
                        <Input type="text" name="columnName" required />
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

export default AddColumnModal;
