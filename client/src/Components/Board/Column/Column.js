import React, {useState, useEffect} from "react";
import "./column.css";
import TaskCard from "./../TaskCard/TaskCard";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {Tag} from "antd";
import {connect} from "react-redux";

function Column({board}) {
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
            let tasks = columns?.find((element, index) => {
                return element.columnName == source.droppableId;
            })?.tasks;

            const [removed] = tasks?.splice(source.index, 1); //delete
            tasks.splice(destination.index, 0, removed); //insert
            console.log(taskCol, tasks);
        } else {
            console.log("columns", columns);
            let sourceTasks = columns?.find((element, index) => {
                return element.columnName == source.droppableId;
            })?.tasks;
            let destinationTasks = columns?.find((element, index) => {
                return element.columnName == destination.droppableId;
            })?.tasks;

            const [removed] = sourceTasks?.splice(source.index, 1);
            destinationTasks.splice(destination.index, 0, removed);
            console.log(taskCol, destinationTasks, sourceTasks);
        }
    };
    return (
        <DragDropContext onDragEnd={dragEnd}>
            {columns?.map((columnItem, i) => {
                return (
                    <div className="column-main">
                        <h5>{columnItem.columnName}</h5>
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
