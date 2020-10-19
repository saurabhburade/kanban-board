import React from "react";
import "./board.css";
import {useEffect} from "react";
import {connect} from "react-redux";
import {fetchBoard} from "./../../Redux/board/board.actionCreators";
import Column from "./Column/Column";
import {socket} from "./../../Utils/socket";
import Badge from "../Presentational/Badge/Badge";
import {MergeCellsOutlined} from "@ant-design/icons";
import { Button } from 'antd';
import { isAuth } from '../../Utils/auth';
import { Tooltip } from 'antd';
import {
    FileAddOutlined,
    ExclamationCircleOutlined,
    EditTwoTone,
} from "@ant-design/icons";
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
                    <Tooltip className="p-0 m-0 ml-2" title="Add team member">
                        <Button
                            disabled={
                                !(
                                    isAuth() &&
                                    (props.user?.email == props.board?.owner ||
                                        props.board?.team?.includes(
                                            props.user?.email
                                        ))
                                )
                            }
                            icon={<FileAddOutlined />}
                            shape="circle"
                            size="small"
                        />
                    </Tooltip>
                </div>
            </div>
            <div className="columns-cont-main d-flex">
                <Column _id={props?.match?.params?.id} />
            </div>
        </div>
    );
}
const mapStateToProps = ({board, user}) => ({
    board: board.board,
    user: user.user,
});

const mapDispatchToProps = dispatch => {
    return {fetchBoard: data => dispatch(fetchBoard(data))};
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
