import React from "react";
import Modal from "antd/lib/modal/Modal";
import {Button, Divider} from "antd";
import {Input} from "antd";
import {addBoard} from "./../../Utils/boardHelpers";
import {notification} from "antd";

function AddBoardModal({modalVisible, onCancel, owner}) {
    const handleOk = e => {
        e.preventDefault();
        const data = {
            title: e.target.title.value,
            owner,
        };
        console.log(data);
        addBoard(data, result => {
            notification[result]({
                message: "Add Board " + result,
                description:
                    result === "success"
                        ? "Board id added successfuly"
                        : "Unable to add new board",
            });
            onCancel();
        });
    };
    console.log("own", owner);
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
                        <label htmlFor="title">Enter Title of Board</label>
                        <Input type="text" name="title" required />
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

export default AddBoardModal;
