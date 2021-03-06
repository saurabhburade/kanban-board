import React, {useState, useEffect} from "react";
import "./column.css";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {Button, Tooltip} from "antd";
import {FileAddOutlined, EditTwoTone} from "@ant-design/icons";

import {connect} from "react-redux";
import {updateOnTaskMove} from "./../../../Utils/boardHelpers";
import {
    TaskCard,
    AddTaskModal,
    AddColumnModal,
} from "../../LoadableComponents/index";

import {isAuth} from "./../../../Utils/auth";
import EditColumnModal from './EditColumnModal';

function Column({board, _id, user}) {
    // const [columns, setColumns] = useState(board?.columns);
    let columns=board?.columns
    const [modalVisible, setModalVisible] = useState(false);
    const [activeColumnName, setactiveColumnName] = useState("");
    const [addColumnVisible, setaddColumnVisible] = useState(false);
const [editColumnNameModal, seteditColumnNameModal] = useState(false)
    const handleModalCancel = () => {
        setModalVisible(false);
    };
    console.log("board", board);
    const [taskCol, settaskCol] = useState([]);
    const dragEnd = result => {
        // console.log(result, columns, setColumns);
        if (!result.destination) return;
        const {source, destination} = result;
        if (source.droppableId === destination.droppableId) {
            console.log("columns", columns);
            let updatedColumns = columns;

            let commonColumn = columns?.find((element, index) => {
                return element.columnName == source.droppableId;
            });
            let tasks = commonColumn?.tasks;
            const [removed] = tasks?.splice(source.index, 1); //delete
            tasks.splice(destination.index, 0, removed); //insert
            commonColumn.tasks = tasks;
            updatedColumns.splice(
                columns.indexOf(commonColumn),
                1,
                commonColumn
            );
            const data = {
                _id,
                columns: updatedColumns,
            };
            updateOnTaskMove(data, res => {
                console.log(res);
                // setColumns(updatedColumns);
            });
            console.log(taskCol, tasks);
        } else {
            console.log("columns", columns);
            let updatedColumns = columns;
            let sourceColumn = columns?.find((element, index) => {
                return element.columnName == source.droppableId;
            });
            let sourceTasks = sourceColumn?.tasks;
            let destinationColumn = columns?.find((element, index) => {
                return element.columnName == destination.droppableId;
            });
            let destinationTasks = destinationColumn?.tasks;
            const [removed] = sourceTasks?.splice(source.index, 1);
            destinationTasks.splice(destination.index, 0, removed);

            sourceColumn.tasks = sourceTasks;
            destinationColumn.tasks = destinationTasks;
            updatedColumns.splice(
                columns.indexOf(sourceColumn),
                1,
                sourceColumn
            );
            updatedColumns.splice(
                columns.indexOf(destinationColumn),
                1,
                destinationColumn
            );
            // setColumns(updatedColumns);
            const data = {
                _id,
                columns: updatedColumns,
            };
            updateOnTaskMove(data, res => {
                console.log(res);
            });
            console.log(
                taskCol,
                destinationTasks,
                sourceTasks,
                columns.indexOf(sourceColumn),
                columns
            );
        }
    };
    const handleAddColumnModalCancel = () => {
        setaddColumnVisible(false);
    };
    
    return (
        <>
            <AddColumnModal
                modalVisible={addColumnVisible}
                onCancel={handleAddColumnModalCancel}
                _id={_id}
            />
            <DragDropContext onDragEnd={dragEnd}>
                {columns?.map((columnItem, i) => {
                    return (
                        <div className="column-main">
                            <AddTaskModal
                                modalVisible={modalVisible}
                                onCancel={handleModalCancel}
                                columnName={activeColumnName}
                                key={i}
                                _id={_id}
                            />
                            <EditColumnModal
                                modalVisible={editColumnNameModal}
                                onCancel={() => seteditColumnNameModal(false)}
                                columnName={activeColumnName}
                                _id={_id}
                            />
                            <div className="col-head w-100 d-flex justify-content-between pl-3 pr-3   ">
                                <h5>{columnItem.columnName}</h5>
                                <div className="d-flex">
                                    <Tooltip title="Add task">
                                        <Button
                                            disabled={
                                                !(
                                                    isAuth() &&
                                                    (user?.email ==
                                                        board?.owner ||
                                                        board?.team?.includes(
                                                            user?.email
                                                        ))
                                                )
                                            }
                                            icon={<FileAddOutlined />}
                                            shape="circle"
                                            onClick={() => {
                                                setModalVisible(true);
                                                setactiveColumnName(
                                                    columnItem?.columnName
                                                );
                                            }}
                                            className="mr-3"
                                        />
                                    </Tooltip>
                                    <Tooltip title="Edit Column">
                                        <Button
                                            disabled={
                                                !(
                                                    isAuth() &&
                                                    (user?.email ==
                                                        board?.owner ||
                                                        board?.team?.includes(
                                                            user?.email
                                                        ))
                                                )
                                            }
                                            icon={<EditTwoTone />}
                                            shape="circle"
                                            onClick={() => {
                                                seteditColumnNameModal(true);
                                                setactiveColumnName(
                                                    columnItem?.columnName
                                                );
                                            }}
                                        />
                                    </Tooltip>
                                </div>
                            </div>
                            <Droppable
                                droppableId={columnItem.columnName}
                                key={i}
                            >
                                {(provided, snapshot) => {
                                    return (
                                        <div
                                            className="colmn-cont-secondary"
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            style={{
                                                minHeight: "100px",

                                                background: snapshot.isDraggingOver
                                                    ? "lightblue"
                                                    : "transparent",
                                            }}
                                        >
                                            {columnItem?.tasks.map(
                                                (task, index) => {
                                                    return (
                                                        <Draggable
                                                            isDragDisabled={
                                                                !(
                                                                    isAuth() &&
                                                                    (user?.email ==
                                                                        board?.owner ||
                                                                        board?.team?.includes(
                                                                            user?.email
                                                                        ))
                                                                )
                                                            }
                                                            draggableId={
                                                                "draggable" +
                                                                columnItem.columnName +
                                                                index
                                                            }
                                                            key={index}
                                                            index={index}
                                                        >
                                                            {(
                                                                providedD,
                                                                snapshotD
                                                            ) => {
                                                                return (
                                                                    <div
                                                                        ref={
                                                                            providedD.innerRef
                                                                        }
                                                                        {...providedD.draggableProps}
                                                                        {...providedD.dragHandleProps}
                                                                        style={{
                                                                            userSelect:
                                                                                "none",
                                                                            ...providedD
                                                                                .draggableProps
                                                                                .style,
                                                                        }}
                                                                    >
                                                                        <TaskCard
                                                                            _id={
                                                                                _id
                                                                            }
                                                                            tasks={
                                                                                columnItem?.tasks
                                                                            }
                                                                            {...task}
                                                                            taskIndex={
                                                                                index
                                                                            }
                                                                            columnName={
                                                                                columnItem?.columnName
                                                                            }
                                                                            deleteTaskBtn={
                                                                                !(
                                                                                    isAuth() &&
                                                                                    (user?.email ==
                                                                                        board?.owner ||
                                                                                        board?.team?.includes(
                                                                                            user?.email
                                                                                        ))
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                );
                                                            }}
                                                        </Draggable>
                                                    );
                                                }
                                            )}
                                            {provided.placeholder}
                                        </div>
                                    );
                                }}
                            </Droppable>
                        </div>
                    );
                })}
            </DragDropContext>
            {board?.owner? (!isAuth() && !(user?.email == board?.owner)) ||
                (!board?.team?.includes(user?.email) && (
                    <div
                        className="column-main pl-5 pr-5"
                        style={{width: "400px", height: "fit-content"}}
                    >
                        <Button
                            icon={<FileAddOutlined />}
                            onClick={() => {
                                setaddColumnVisible(true);
                            }}
                        >
                            Add New Column
                        </Button>
                    </div>
                )):null}
        </>
    );
}
const mapStateToProps = ({board, user}) => ({
    board: board?.board,
    user: user?.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps)(Column);
