import React from "react";
import "./board.css";
import {useEffect} from "react";
import {connect} from "react-redux";
import {fetchBoard} from "./../../Redux/board/board.actionCreators";
import Column from "./Column/Column";
import { socket } from './../../Utils/socket';

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
            console.log(data)
            if (!!data) {
                props.fetchBoard(id);
            }
            console.log(data);
        });
    }, []);
    return (
        <div className="board-cont-main">
            <div className="board-head">
                <h4>Board Title Here</h4>
            </div>
            <div className="columns-cont-main d-flex">
                <Column _id={props?.match?.params?.id} />
            </div>
        </div>
    );
}
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
    return {fetchBoard: data => dispatch(fetchBoard(data))};
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
