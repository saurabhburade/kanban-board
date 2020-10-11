import React from "react";
import "./board.css";
import {useEffect} from "react";
import {connect} from "react-redux";
import {fetchBoard} from "./../../Redux/board/board.actionCreators";
import Column from "./Column/Column";
import {socket} from "./../../Utils/socket";
import Badge from "../Presentational/Badge/Badge";
import {MergeCellsOutlined} from "@ant-design/icons";
function Board(props) {
    useEffect(() => {
        console.log("props", props);
        const {id} = props.match.params;
        props.fetchBoard(id);
    }, []);
    useEffect(() => {
        const {id} = props.match.params;
        socket.emit("connected", {key: id});
        socket.on("changeBoardData", data => {
            console.log(data);
            if (!!data) {
                props.fetchBoard(id);
            }
            console.log(data);
        });
    }, []);
    return (
        <div className="board-cont-main">
            <div className="board-head d-flex justify-content-start align-items-center ml-3 mr-3">
                <h4 className="p-0 m-0">{props?.board?.title}</h4>
                <div className="d-flex m-0 ml-3 mr-3">
                    {props.board?.team ? (
                        <Badge
                            title={props.board?.owner}
                            icon={<MergeCellsOutlined />}
                        />
                    ) : null}
                    {props.board?.team?.map(element => {
                        return <Badge title={element} />;
                    })}
                </div>
            </div>
            <div className="columns-cont-main d-flex">
                <Column _id={props?.match?.params?.id} />
            </div>
        </div>
    );
}
const mapStateToProps = ({board}) => ({
    board: board.board,
});

const mapDispatchToProps = dispatch => {
    return {fetchBoard: data => dispatch(fetchBoard(data))};
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
