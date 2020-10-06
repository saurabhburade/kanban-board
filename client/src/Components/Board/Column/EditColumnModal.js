import React, {useState} from "react";
import Modal from "antd/lib/modal/Modal";
import {Input} from "antd";
import {notification} from "antd";
import {updateColumnDetails} from "./../../../Utils/boardHelpers";

function EditColumnModal({modalVisible, onCancel, _id, columnName}) {
    console.log(columnName);
    const [newColName, setnewColName] = useState(columnName);
    const handleOk = e => {
        e.preventDefault();
        const data = {
            columnName,
            newColumnName: newColName,
            _id,
        };
        updateColumnDetails(data, result => {
            notification[result]({
                message: "Update Board " + result,
                description:
                    result === "success"
                        ? "Column updated successfuly"
                        : "Unable to update the column",
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
                        <label htmlFor="newColumnName">
                            Enter Name of the column
                        </label>
                        <Input
                            type="text"
                            value={newColName}
                            onChange={v => setnewColName(v)}
                            name="newColumnName"
                            required
                        />
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

export default EditColumnModal;
