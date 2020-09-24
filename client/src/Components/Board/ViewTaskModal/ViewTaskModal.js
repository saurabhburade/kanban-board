import React from "react";
import Modal from "antd/lib/modal/Modal";
import {Badge, Button, Divider} from "antd";
import {Input} from "antd";
import {notification} from "antd";
import {addColumn} from "./../../../Utils/boardHelpers";

function ViewTaskModal({
    modalVisible,
    onCancel,
    title,
    label,
    description,
    created,
    modified,
}) {
    return (
        <div>
            <Modal
                visible={modalVisible}
                title={title}
                onCancel={onCancel}
                footer={null}
            >
                <Badge count={label} />

                <div className=" w-100 d-flex justify-content-between">
                    <div>
                        <p className="m-0 p-0" style={{fontSize:"1.2em"}}>Description : </p>
                        <p>{description}</p>
                    </div>
                    <div>
                        <p>Created At : {new Date(created).toDateString()}</p>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ViewTaskModal
