import React, {useState, useEffect} from "react";
import "./column.css";
import TaskCard from "./../TaskCard/TaskCard";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {Tag, Button, Tooltip} from "antd";
import {FileAddOutlined} from "@ant-design/icons";

import {connect} from "react-redux";
import {updateOnTaskMove} from "./../../../Utils/boardHelpers";

function Column({board, _id}) {
    const [columns, setColumns] = useState(board?.columns);
    useEffect(() => {
        setColumns(board?.columns);
    }, [board]);
    console.log("board", board);
    const [taskCol, settaskCol] = useState([]);
    const dragEnd = result => {
        console.log(result, columns, setColumns);
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
                setColumns(updatedColumns);
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
            setColumns(updatedColumns);
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
    return (
        <DragDropContext onDragEnd={dragEnd}>
            {columns?.map((columnItem, i) => {
                return (
                    <div className="column-main">
                        <div className="col-head w-100 d-flex justify-content-between pl-3 pr-3   ">
                            <h5>{columnItem.columnName}</h5>
                            <Tooltip title="Add task">
                                <Button
                                    icon={<FileAddOutlined />}
                                    shape="circle"
                                />
                            </Tooltip>
                        </div>
                        <Droppable droppableId={columnItem.columnName} key={i}>
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
                                                        // isDragDisabled={
                                                        //     true
                                                        // }
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
                                                                        title={
                                                                            task.title
                                                                        }
                                                                        label={
                                                                            task.label
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
    );
}
const mapStateToProps = ({board}) => ({
    board: board?.board,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps)(Column);
